const signOutRouter = require("express").Router();
const { signout } = require("../controllers/users");

signOutRouter.get("/", signout);

module.exports = signOutRouter;
