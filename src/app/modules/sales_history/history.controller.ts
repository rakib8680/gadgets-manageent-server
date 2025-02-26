import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { HistoryServices } from "./history.service";

// get all sales history
const getSalesHistory = catchAsync(async (req, res, next) => {
  const result = await HistoryServices.getSalesHistory();
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Sales history fetched successfully",
    data: result,
  });
});

export const HistoryController = {
  getSalesHistory,
};
