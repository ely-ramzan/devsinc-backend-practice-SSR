import express from "express";
import { validateMiddleware } from "../middlewares/validateMiddleWare.js";
import { LoginSchema, SignupSchema } from "../schemas/authSchema.js";
import { signupHandler, loginHandler, verifyEmailHandler, resendVerificationHandler } from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/register", validateMiddleware(SignupSchema), signupHandler);
authRouter.post("/login", validateMiddleware(LoginSchema), loginHandler);

authRouter.get("/verify-email", verifyEmailHandler);
authRouter.post("/resend-verification", resendVerificationHandler);

export default authRouter;