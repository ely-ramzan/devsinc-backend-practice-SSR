import express from "express";
import { connectToMongoDb } from "./src/db/dbConnections.js";
import authRouter from "./src/routes/authRoutes.js";
import { errorHandler } from "./src/middlewares/errorMiddleware.js";
import config from "./src/configs/envConfig.js";
import transactionRouter from "./src/routes/transactionRoutes.js";
import catRouter from "./src/routes/catRouter.js";
import userRouter from "./src/routes/userRoutes.js";
import { authMiddleware } from "./src/middlewares/authMiddleware.js";
import verifyRouter from "./src/routes/verifyRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/transactions", authMiddleware, transactionRouter);
app.use("/api/subCategories", authMiddleware, catRouter);
app.use("/api/user/me", authMiddleware, userRouter);
app.use("/verify",verifyRouter);

app.use(errorHandler);

(async () => {
  try {
    await connectToMongoDb(config.url);
    console.log("Mongo db has been connected");

    app.listen(config.port, () => {
      console.log(`Server is listening on port ${config.port}`);
    });
  } catch (err) {
    console.error(`${err}: in connection`);
  }
})();
