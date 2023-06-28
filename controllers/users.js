require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const UnauthorizedError = require("../errors/UnauthorizedError");
const NotFoundError = require("../errors/NotFoundError");
const { OK, CREATED } = require("../utils/statusCode");

const { NODE_ENV = "development", JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError("Неправильная почта."));
      }

      return bcrypt.compare(
        password,
        user.password,
        (compareError, isMatch) => {
          if (compareError || !isMatch) {
            return next(new UnauthorizedError("Неправильный пароль."));
          }

          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === "production" ? JWT_SECRET : "some-secret-key",
            {
              expiresIn: "7d",
            },
          );

          return res
            .cookie("jwt", token, {
              maxAge: 60 * 60 * 24 * 30,
              httpOnly: true,
              sameSite: false,
              secure: false,
            })
            .status(OK)
            .send({ message: "Вы успешно авторизовались!", token });
        },
      );
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.genSalt(10, (saltError, salt) => {
    if (saltError) {
      return saltError;
    }

    return bcrypt.hash(password, salt, (hashError, hash) => {
      if (hashError) {
        return hashError;
      }

      return User.create({
        name,
        email,
        password: hash,
      })
        .then(() => res.status(CREATED).send({
          name, email,
        }))
        .catch(next);
    });
  });
};

module.exports.signout = (req, res) => {
  res
    .status(OK)
    .clearCookie("jwt")
    .send({ message: "Вы успешно вышли из учетной записи!" });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError("Пользователь не найден."));
      }

      return res.status(OK).send(user);
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError("Пользователь по указанному _id не найден."));
      }

      return res.status(OK).send(user);
    })
    .catch(next);
};
