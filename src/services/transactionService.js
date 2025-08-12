import Transaction from "../models/Transaction.js";

export const createTransaction = async (transactionObject) => {
  const transaction = await Transaction.create(transactionObject);
  return {
    message: "Transaction Successfully Created",
    transaction: transaction,
  };
};

export const getTransactionsByUser = async (userId) => {
  const transactions = await Transaction.find({ user: userId });
  return {
    message: "Transactions Found",
    transactions: transactions,
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

export const updateTransactionById = async (tId, obj) => {
  const updatedTransaction = await Transaction.findByIdAndUpdate(tId, obj, {
    new: true,
    runValidators: true,
  });
  return {
    message: "Transaction updated successfully",
    updated_transaction: updatedTransaction,
  };
};
