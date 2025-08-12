import express from "express";
import {
  handleCreateTransaction,
  handleGetTransactionsByUser,
  handleGetTransactionDynamically,
  handleDeleteTransactionById,
  handleUpdateTransactionById,
} from "../controllers/transactionControllers.js";
import { validateMiddleware } from "../middlewares/validateMiddleWare.js";
import {
  transactionQuerySchema,
  transactionSchema,
  updateTransactionSchema,
} from "../schemas/transactionSchema.js";
import { validateQueryParams } from "../middlewares/validateQueryParams.js";
const transactionRouter = express.Router();

transactionRouter.post(
  "/",
  validateMiddleware(transactionSchema),
  handleCreateTransaction
);

transactionRouter.get("/me", handleGetTransactionsByUser);

transactionRouter.get(
  "/",
  validateQueryParams(transactionQuerySchema),
  handleGetTransactionDynamically
);

transactionRouter.delete("/:id", handleDeleteTransactionById);

transactionRouter.patch(
  "/:id",
  validateMiddleware(updateTransactionSchema),
  handleUpdateTransactionById
);

export default transactionRouter;
