const userRoutes = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");
const { validateProfile } = require("../middlewares/validator");

userRoutes.get("/me", getCurrentUser);
userRoutes.patch("/me", validateProfile, updateProfile);

module.exports = userRoutes;
