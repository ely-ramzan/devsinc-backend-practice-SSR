import {
  createNewCategory,
  getAllCategoriesByUser,
  getCategoriesDynamically,
  deleteCategoryById,
  updateCategoryById,
} from "../services/catService.js";

const handleCreateNewCategory = async (req, res, next) => {
  try {
    const { name, category } = req.body;
    const userId = req.user._id;

    const catObject = {
      name,
      category,
      owner: userId,
    };

    const result = await createNewCategory(catObject);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const handleGetAllCategoriesByUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const result = await getAllCategoriesByUser(userId);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const handleGetCategoriesDynamically = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const filter = req.validatedQuery;
    filter["owner"] = userId;
    const result = await getCategoriesDynamically(filter);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const handleDeleteCategoryById = async (req, res, next) => {
  try {
    const cId = req.params._id;
    const result = await deleteCategoryById(cId);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const handleUpdateCategoryById = async (req, res, next) => {
  try {
    const cId = req.params._id;
    const obj = req.body;
    const result = await updateCategoryById(cId,obj);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};


export {
  handleCreateNewCategory,
  handleGetAllCategoriesByUser,
  handleGetCategoriesDynamically,
  handleDeleteCategoryById,
  handleUpdateCategoryById,
};