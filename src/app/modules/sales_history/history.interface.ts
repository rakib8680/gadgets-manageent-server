import { Types } from "mongoose";

export type TSalesHistory = {
  productId: Types.ObjectId;
  productName: string;
  quantity: number;
  buyerName: string;
  buyerEmail: string;
  totalAmount: number;
  dateOfSale: string;
};
