const Movie = require("../models/movie");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");
const { OK, CREATED } = require("../utils/statusCode");

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => {
      if (!movies) {
        return next(new NotFoundError("Нет сохраненных фильмов."));
      }

      return res.status(OK).send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(CREATED).send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError("Фильм не найден."));
      }

      if (!movie.owner.equals(userId)) {
        return next(new ForbiddenError("Нет прав на удаление фильма."));
      }

      return movie
        .deleteOne()
        .then(() => res.status(OK).send({ message: "Фильм успешно удален." }))
        .catch(next);
    })
    .catch(next);
};
