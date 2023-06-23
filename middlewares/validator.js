const { celebrate, Joi, Segments } = require("celebrate");
const validator = require("validator");
const { ObjectId } = require("mongoose").Types;

module.exports.validateSignIn = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi
      .string()
      .email()
      .required(),
    password: Joi
      .string()
      .required(),
  }),
});

module.exports.validateSignUp = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }

        return helpers.message("Невалидный email.");
      })
      .message({
        "any.required": "Поле {#label} должно быть заполнено.",
      }),
    password: Joi
      .string()
      .required()
      .messages({
        "string.min": "Минимальная длина поля {#label} - 2.",
        "string.max": "Максимальная длина поля {#label} - 30.",
        "any.required": "Поле {#label} должно быть заполнено.",
      }),
    name: Joi
      .string()
      .min(2)
      .max(30)
      .messages({
        "string.min": "Минимальная длина поля {#label} - 2.",
        "string.max": "Максимальная длина поля {#label} - 30.",
      }),
  }),
});

module.exports.validateProfile = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi
      .string()
      .required()
      .min(2)
      .max(30)
      .messages({
        "string.min": "Минимальная длина поля {#label} - 2.",
        "string.max": "Максимальная длина поля {#label} - 30.",
        "any.required": "Поле {#label} должно быть заполнено.",
      }),
    email: Joi
      .string()
      .required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }

        return helpers.message("Невалидный email.");
      })
      .message({
        "any.required": "Поле {#label} должно быть заполнено.",
      }),
  }),
});

module.exports.validateCreateMovie = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi
      .string()
      .required()
      .messages({
        "any.required": "Поле {#label} должно быть заполнено.",
      }),
    director: Joi
      .string()
      .required()
      .messages({
        "any.required": "Поле {#label} должно быть заполнено.",
      }),
    duration: Joi
      .number()
      .required()
      .messages({
        "any.required": "Поле {#label} должно быть заполнено.",
      }),
    year: Joi
      .string()
      .required()
      .messages({
        "any.required": "Поле {#label} должно быть заполнено.",
      }),
    description: Joi
      .string()
      .required()
      .messages({
        "any.required": "Поле {#label} должно быть заполнено.",
      }),
    image: Joi
      .string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }

        return helpers.message("Невалидная ссылка.");
      })
      .messages({
        "any.required": "Поле {#label} должно быть заполнено.",
      }),
    trailerLink: Joi
      .string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }

        return helpers.message("Невалидная ссылка.");
      })
      .messages({
        "any.required": "Поле {#label} должно быть заполнено.",
      }),
    thumbnail: Joi
      .string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }

        return helpers.message("Невалидная ссылка.");
      })
      .messages({
        "any.required": "Поле {#label} должно быть заполнено.",
      }),
    movieId: Joi
      .number()
      .required()
      .messages({
        "any.required": "Поле {#label} должно быть заполнено.",
      }),
    nameRU: Joi
      .string()
      .required()
      .messages({
        "any.required": "Поле {#label} должно быть заполнено.",
      }),
    nameEN: Joi
      .string()
      .required()
      .messages({
        "any.required": "Поле {#label} должно быть заполнено.",
      }),
  }),
});

module.exports.validateDeleteMovie = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi
      .string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }

        return helpers.message("Невалидный {#label}.");
      }),
  }),
});
