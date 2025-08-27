import {
  generateExcelReport,
  processExcelUpload,
} from "../services/reportService.js";

export const handleDownloadReport = async (req, res, next) => {
  try {
    const userId = req.user._id;
    
    const { startDate, endDate } = req.validatedQuery;

    const { buffer, filename } = await generateExcelReport(userId, startDate, endDate);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.send(buffer);
  } catch (err) {
    next(err);
  }
};



export const handleUploadReport = async (req, res, next) => {
  try {

    if (!req.file) {
      throw new Error("No file uploaded.");
    }

    const userId = req.user._id;
    const fileBuffer = req.file.buffer;

    const result = await processExcelUpload(userId, fileBuffer);

    res.status(200).json({
      message: "File processed successfully.",
      ...result,
    });
  } catch (err) {
    next(err);
  }
};