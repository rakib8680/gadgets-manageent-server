import status from "http-status";
import AppError from "../../errors/AppError";
import { SalesHistoryModel } from "./history.model";

// get all sales history
const getSalesHistory = async () => {
  const result = await SalesHistoryModel.find();
  if (!result) {
    throw new AppError(status.NOT_FOUND, "No sales history found");
  }
  return result;
};

export const HistoryServices = {
  getSalesHistory,
};
