import { SalesHistoryModel } from "./history.model";

// get all sales history
const getSalesHistory = async () => {
  const result = await SalesHistoryModel.find();
  return result;
};

export const HistoryServices = {
  getSalesHistory,
};
