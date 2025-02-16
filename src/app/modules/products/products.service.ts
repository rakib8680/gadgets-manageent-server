import { TProduct } from "./products.interface";
import { ProductModel } from "./products.model";

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

export const ProductServices = {
  addProduct,
    getAllProducts,
};
