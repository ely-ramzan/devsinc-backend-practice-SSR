import express from "express";
import { forgotPasswordHandler, resetPasswordHandler } from "../controllers/passwordController.js";

const passwordRouter = express.Router();

passwordRouter.post("/forgot-password", forgotPasswordHandler);
passwordRouter.patch("/reset-password", resetPasswordHandler);

export default passwordRouter;