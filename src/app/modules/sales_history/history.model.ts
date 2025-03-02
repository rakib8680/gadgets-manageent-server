import { Schema, model } from "mongoose";
import { TSalesHistory } from "./history.interface";

const salesHistorySchema = new Schema<TSalesHistory>({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  buyerName: {
    type: String,
    required: true,
  },
  buyerEmail: {
    type: String,
    // required: true,
  },
  dateOfSale: {
    type: Date,
    required: true,
  },
});

export const SalesHistoryModel = model<TSalesHistory>(
  "salesHistory",
  salesHistorySchema
);
