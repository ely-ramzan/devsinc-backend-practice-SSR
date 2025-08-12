import express from "express";
import {
  handleCreateNewCategory,
  handleGetAllCategoriesByUser,
  handleGetCategoriesDynamically,
  handleDeleteCategoryById,
  handleUpdateCategoryById,
} from "../controllers/catControllers.js";

import { catSchema, catQueryParams } from "../schemas/catSchema.js";
import { validateQueryParams } from "../middlewares/validateQueryParams.js";
import { validateMiddleware } from "../middlewares/validateMiddleWare.js";

const catRouter = express.Router();

catRouter.post("/", validateMiddleware(catSchema), handleCreateNewCategory);

catRouter.get("/me", handleGetAllCategoriesByUser);
catRouter.get(
  "/",
  validateQueryParams(catQueryParams),
  handleGetCategoriesDynamically
);

catRouter.delete("/:id", handleDeleteCategoryById);
catRouter.patch(
  "/:id",
  validateMiddleware(catSchema),
  handleUpdateCategoryById
);

export default catRouter;
