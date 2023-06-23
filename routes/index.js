const router = require("express").Router();
const signInRouter = require("./signin");
const signUpRouter = require("./signup");
const signOutRouter = require("./signout");
const auth = require("../middlewares/auth");
const usersRouter = require("./users");
const moviesRouter = require("./movies");
const { requestLogger, errorLogger } = require("../middlewares/logger");
const cors = require("../middlewares/cors");
const NotFoundError = require("../errors/NotFoundError");

router.use(requestLogger);
router.use(cors);
router.use("/signin", signInRouter);
router.use("/signup", signUpRouter);
router.use(auth);
router.use("/users", usersRouter);
router.use("/movies", moviesRouter);
router.use("/signout", signOutRouter);
router.use((req, res, next) => {
  next(new NotFoundError("Такая страница не существует."));
});
router.use(errorLogger);

module.exports = router;
