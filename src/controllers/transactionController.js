import {
  createTransaction,
  getTransactionsByUser,
  getTransactionDynamically,
  deleteTransactionById,
  updateTransactionById,
} from "../services/transactionService.js";

const handleCreateTransaction = async (req, res, next) => {
  const { category, subCategory, amount, notes, date } = req.body;
  const userId = req.user._id;
  const transactionObject = {
    category,
    subCategory,
    amount,
    notes,
    date,
    user: userId,
  };
  try {
    const result = await createTransaction(transactionObject);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const handleGetTransactionsByUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const options = req.validatedQuery;

    const result = await getTransactionsByUser(userId, options);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const handleGetTransactionDynamically = async (req, res) => {
  try {
    const filter = req.validatedQuery;
    console.log(filter);
    const result = await getTransactionDynamically(filter);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const handleDeleteTransactionById = async (req, res) => {
  try {
    const tId = req.params.id;
    const result = await deleteTransactionById(tId);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const handleUpdateTransactionById = async (req, res, next) => {
  try {
    const tId = req.params.id;
    const obj = req.body;
    const userId = req.user._id; 

    const result = await updateTransactionById(tId, obj, userId);
    return res.status(200).json(result);
  } catch (err) {
    next(err); 
  }
};
export {
  handleCreateTransaction,
  handleGetTransactionsByUser,
  handleGetTransactionDynamically,
  handleDeleteTransactionById,
  handleUpdateTransactionById,
};
