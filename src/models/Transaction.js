import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["expense", "income"],
  },
  subCategory: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  notes: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
