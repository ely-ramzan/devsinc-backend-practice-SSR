import { handleVerification } from "../controllers/verifiyControllers.js";
import express from "express";
const verifyRouter = express.Router();


verifyRouter.get("/:token",handleVerification);
export default verifyRouter;