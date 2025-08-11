const express = require("express");
const authRouter = express.Router();
const {
  signupController,
  loginController,
} = require("../controllers/authControllers");
const {
  userRegistrationValidator,
} = require("../middlewares/validationMiddleWare");

authRouter.post("/register", userRegistrationValidator, signupController);
authRouter.post("/login", loginController);

module.exports = authRouter;
