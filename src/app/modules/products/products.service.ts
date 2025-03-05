import status from "http-status";
import { TSalesHistory } from "../sales_history/history.interface";
import { TProduct } from "./products.interface";
import { ProductModel } from "./products.model";
import { SalesHistoryModel } from "../sales_history/history.model";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../helpers/queryBuilder";

// insert Product to DB
const addProduct = async (payload: TProduct) => {
  const result = await ProductModel.create(payload);

  return result;
};

// get all products
const getAllProducts = async (query: Record<string, unknown>) => {
  console.log(query);
  const productsQuery = new QueryBuilder(ProductModel.find(), query)
    .filterPrice()
    .sort();

  const data = await productsQuery.modelQuery;
  const meta = await productsQuery.countTotal();
  return {
    meta,
    data,
  };
};

// get single product by ID
const getSingleProduct = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

// delete products from DB
const deleteProduct = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

// sell product
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
    dateOfSale: new Date(),
  };
  const result = await SalesHistoryModel.create(salesHistoryData);

  // delete product if quantity is 0
  if (product.quantity === 0) {
    await ProductModel.findByIdAndDelete(productId);
  }

  return result;
};

export const ProductServices = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  sellProduct,
};
