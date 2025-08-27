import express from "express";
import { validateMiddleware } from "../middlewares/validateMiddleWare.js";
import { updateUserSchema } from "../schemas/userSchema.js";
import {
    handleUpdateMyProfile,
    handleGetMyProfile
} from  "../controllers/userControllers.js";
const userRouter = express.Router();

userRouter.patch("/",validateMiddleware(updateUserSchema),handleUpdateMyProfile);
userRouter.get("/",handleGetMyProfile);

export default userRouter;