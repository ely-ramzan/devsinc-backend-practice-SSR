import Transaction from "../models/Transaction.js";

export const createTransaction = async (transactionObject) => {
  const transaction = await Transaction.create(transactionObject);
  return {
    message: "Transaction Successfully Created",
    transaction: transaction,
  };
};

export const getTransactionsByUser = async (userId, options) => {
  const { page, limit, sortBy, sortOrder, category, subCategory } = options;

  const query = { user: userId };
  if (category) {
    query.category = category;
  }
  if (subCategory) {
    query.subCategory = { $regex: subCategory, $options: "i" };
  }

  const sortOptions = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

  const transactions = await Transaction.find(query)
    .sort(sortOptions)
    .skip((page - 1) * limit)
    .limit(limit);

  const totalCount = await Transaction.countDocuments(query);

  return {
    message: "Transactions Found",
    data: transactions,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
    totalCount: totalCount,
  };
};

export const getTransactionDynamically = async (filter) => {
  const transactions = await Transaction.find(filter);
  return {
    message: "Transactions Found",
    transactions: transactions,
  };
};

export const deleteTransactionById = async (tId) => {
  const deletedTransaction = await Transaction.findByIdAndDelete(tId);
  return {
    message: "Transaction successfully deleted",
    deleted_transaction: deletedTransaction,
  };
};

export const updateTransactionById = async (tId, updateData, userId) => {
  const transaction = await Transaction.findOne({ _id: tId, user: userId });

  if (!transaction) {
    throw new Error(
      "Transaction not found or you do not have permission to edit it."
    );
  }

  Object.assign(transaction, updateData);

  const updatedTransaction = await transaction.save();

  return {
    message: "Transaction updated successfully",
    updated_transaction: updatedTransaction,
  };
};
