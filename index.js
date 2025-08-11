import express from "express";

import { connectToMongoDb } from "./src/db/dbConnections.js";
import authRouter from "./src/routes/authRoutes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import config from "./src/configs/envConfig.js";

const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);
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
