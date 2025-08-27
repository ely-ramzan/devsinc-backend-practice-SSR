import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";

export const getChartData = async (userId, startDate, endDate) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const pipeline = [
    {
      $match: {
        user: userObjectId,
        date: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $facet: {
        summary: [
          {
            $group: {
              _id: "$category",
              totalAmount: { $sum: "$amount" },
            },
          },
        ],

        lineChart: [
          {
            $group: {
              _id: {
                date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                category: "$category",
              },
              totalAmount: { $sum: "$amount" },
            },
          },
          {
            $group: {
              _id: "$_id.date",
              income: { $sum: { $cond: [{ $eq: ["$_id.category", "income"] }, "$totalAmount", 0] } },
              expense: { $sum: { $cond: [{ $eq: ["$_id.category", "expense"] }, "$totalAmount", 0] } },
            },
          },
          { $sort: { _id: 1 } },
          { $project: { _id: 0, date: "$_id", income: 1, expense: 1 } },
        ],

        pieChart: [
          { $match: { category: "expense" } },
          {
            $group: {
              _id: "$subCategory",
              value: { $sum: "$amount" },
            },
          },
          { $project: { _id: 0, name: "$_id", value: 1 } },
        ],
        
        stackedBarChart: [
            { $match: { category: "expense" } },
            {
                $group: {
                    _id: {
                        month: { $dateToString: { format: "%Y-%m", date: "$date" } },
                        subCategory: "$subCategory",
                    },
                    totalAmount: { $sum: "$amount" },
                },
            },
            {
                $group: {
                    _id: "$_id.month",
                    subCategoryAmounts: { $push: { k: "$_id.subCategory", v: "$totalAmount" } },
                },
            },
            { $sort: { _id: 1 } },
            {
                $replaceRoot: {
                    newRoot: { $mergeObjects: [{ month: "$_id" }, { $arrayToObject: "$subCategoryAmounts" }] },
                },
            },
        ],
      },
    },
  ];

  const result = await Transaction.aggregate(pipeline);


  const facetedData = result[0];

  const summaryData = facetedData.summary;
  const totalIncome = summaryData.find(d => d._id === 'income')?.totalAmount || 0;
  const totalExpense = summaryData.find(d => d._id === 'expense')?.totalAmount || 0;

  return {
    summary: {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    },
    lineChartData: facetedData.lineChart,
    pieChartData: facetedData.pieChart,
    stackedBarChartData: facetedData.stackedBarChart,
  };
};