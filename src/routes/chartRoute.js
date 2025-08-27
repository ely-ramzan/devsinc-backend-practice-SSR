import express from "express";
import { handleGetChartData } from "../controllers/chartController.js";
import { validateQueryParams } from "../middlewares/validateQueryParams.js";
import { chartQuerySchema } from "../schemas/chartSchema.js"; 
import { authMiddleware } from "../middlewares/authMiddleware.js";

const chartRouter = express.Router();
chartRouter.get(
  "/",
  validateQueryParams(chartQuerySchema),
  handleGetChartData
);

export default chartRouter;
