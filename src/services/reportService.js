import ExcelJS from "exceljs";
import Transaction from "../models/Transaction.js";
import { transactionSchema } from "../schemas/transactionSchema.js"; 

export const generateExcelReport = async (userId, startDate, endDate) => {
   const query = { user: userId };

  if (startDate && endDate) {
    query.date = { $gte: startDate, $lte: endDate };
  } else {
    const now = dayjs();
    const thirtyDaysAgo = now.subtract(30, 'day').toDate();
    query.date = { $gte: thirtyDaysAgo, $lte: now.toDate() };
  }

  const transactions = await Transaction.find(query).sort({ date: -1 });

  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("Transactions");

  worksheet.columns = [
    { header: "Date", key: "date", width: 15 },
    { header: "Category", key: "category", width: 15 },
    { header: "Sub-Category", key: "subCategory", width: 20 },
    { header: "Amount", key: "amount", width: 15 },
    { header: "Notes", key: "notes", width: 30 },
  ];

  transactions.forEach((t) => {
    worksheet.addRow({
      date: t.date,
      category: t.category,
      subCategory: t.subCategory,
      amount: t.amount,
      notes: t.notes,
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const filename = `FlowTrack_Report_${new Date().toISOString().split("T")[0]}.xlsx`;

  return { buffer, filename };
};

export const processExcelUpload = async (userId, fileBuffer) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(fileBuffer);

  const worksheet = workbook.getWorksheet(1);
  if (!worksheet) {
    throw new Error("No worksheet found in the uploaded file.");
  }

  const transactionsToInsert = [];
  const errors = [];
  let successfulCount = 0;

  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber === 1) return;

    const rowData = {
      date: row.getCell("A").value,
      category: row.getCell("B").value,
      subCategory: row.getCell("C").value,
      amount: row.getCell("D").value,
      notes: row.getCell("E").value,
    };

    const validationResult = transactionSchema.safeParse(rowData);

    if (validationResult.success) {
      transactionsToInsert.push({
        ...validationResult.data,
        user: userId,
      });
      successfulCount++;
    } else {
      errors.push({ row: rowNumber, details: validationResult.error.flatten() });
    }
  });

  if (transactionsToInsert.length > 0) {
    await Transaction.insertMany(transactionsToInsert);
  }

  return { successfulCount, errors };
};