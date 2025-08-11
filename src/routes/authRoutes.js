import express from "express";
import { validateMiddleware } from "../middlewares/validationMiddleWare.js";
import { LoginSchema, SignupSchema } from "../schemas/authSchemas.js";
import { signupHandler, loginHandler } from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/register", validateMiddleware(SignupSchema), signupHandler);
authRouter.post("/login", validateMiddleware(LoginSchema), loginHandler);

export default authRouter;
