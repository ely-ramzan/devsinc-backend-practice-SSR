import express from "express";
import multer from "multer";
import {
  handleDownloadReport,
  handleUploadReport,
} from "../controllers/reportController.js";
import { validateQueryParams } from "../middlewares/validateQueryParams.js"; 
import { reportQuerySchema } from "../schemas/reportSchema.js"; 

const reportRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

reportRouter.get("/download", validateQueryParams(reportQuerySchema) ,handleDownloadReport);

reportRouter.post(
  "/upload",
  upload.single("transactionsFile"),
  handleUploadReport
);

export default reportRouter;
