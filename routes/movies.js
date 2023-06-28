const movieRoutes = require("express").Router();
const { getMovies, createMovie, deleteMovie } = require("../controllers/movies");
const { validateCreateMovie, validateDeleteMovie } = require("../middlewares/validator");

movieRoutes.get("/", getMovies);
movieRoutes.post("/", validateCreateMovie, createMovie);
movieRoutes.delete("/:movieId", validateDeleteMovie, deleteMovie);

module.exports = movieRoutes;
