import express from "express";
import { validateMiddleware } from "../middlewares/validateMiddleWare.js";
import { LoginSchema, SignupSchema } from "../schemas/authSchema.js";
import { signupHandler, loginHandler } from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/register", validateMiddleware(SignupSchema), signupHandler);
authRouter.post("/login", validateMiddleware(LoginSchema), loginHandler);

export default authRouter;
