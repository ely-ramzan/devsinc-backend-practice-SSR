import { getChartData } from "../services/chartService.js";

export const handleGetChartData = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const { startDate, endDate } = req.validatedQuery;

    const chartData = await getChartData(userId, startDate, endDate);

    return res.status(200).json({
      message: "Chart data fetched successfully",
      data: chartData,
    });
  } catch (err) {
    next(err);
  }
};