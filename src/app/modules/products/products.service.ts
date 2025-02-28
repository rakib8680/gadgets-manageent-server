import status from "http-status";
import { TSalesHistory } from "../sales_history/history.interface";
import { TProduct } from "./products.interface";
import { ProductModel } from "./products.model";
import { SalesHistoryModel } from "../sales_history/history.model";
import AppError from "../../errors/AppError";

// insert Product to DB
const addProduct = async (payload: TProduct) => {
  const result = await ProductModel.create(payload);

  return result;
};

// get all products
const getAllProducts = async () => {
  const result = await ProductModel.find();

  return result;
};

// delete products from DB
const deleteProduct = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

// sell product ....................................................... start here
const sellProduct = async (productId: string, payload: TSalesHistory) => {
  // check if product exists
  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new AppError(status.NOT_FOUND, "Product not found");
  }

  // check if quantity is sufficient
  if (product.quantity < payload.quantity) {
    throw new AppError(status.BAD_REQUEST, "Insufficient quantity");
  }

  // update product quantity & save
  product.quantity -= payload.quantity;
  await product.save();

  // create sales history data & save to DB
  const salesHistoryData = {
    productId,
    productName: product?.name,
    quantity: payload.quantity,
    totalAmount: (product?.price as number) * payload.quantity,
    buyerName: payload.buyerName,
    buyerEmail: payload.buyerEmail,
    dateOfSale: new Date().toISOString(),
  };
  const result = await SalesHistoryModel.create(salesHistoryData);

  return result;
};

export const ProductServices = {
  addProduct,
  getAllProducts,
  deleteProduct,
  sellProduct,
};
