import status from "http-status";
import { TSalesHistory } from "../sales_history/history.interface";
import { TProduct } from "./products.interface";
import { ProductModel } from "./products.model";
import { SalesHistoryModel } from "../sales_history/history.model";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../helpers/queryBuilder";
import { productsSearchableFields } from "./products.constant";

// insert Product to DB
const addProduct = async (payload: TProduct) => {
  // check if product exists
  const isProductExist = await ProductModel.findOne({ name: payload.name });

  // if product exists, update quantity if not add new product
  if (isProductExist) {
    isProductExist.quantity += payload.quantity;
    await isProductExist.save();
    return isProductExist;
  } else {
    const result = await ProductModel.create(payload);
    return result;
  }
};

// get all products
const getAllProducts = async (query: Record<string, unknown>) => {
  const productsQuery = new QueryBuilder(ProductModel.find(), query)
    .search(productsSearchableFields)
    .filterPrice()
    .sort()
    .filter()
    .paginate();

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
  if (!result) {
    throw new AppError(status.NOT_FOUND, "No product found");
  }
  return result;
};




// update product
const updateProduct = async (id: string, payload: Partial<TProduct>) => {
  console.log(payload);

  // remove non primitive fields
  const { features, dimensions, ...remainingFields } = payload;

  // check if product exists
  if (!(await ProductModel.findById(id))) {
    throw new AppError(status.NOT_FOUND, "No product found to update");
  }

  const modifiedPayload: Record<string, unknown> = { ...remainingFields };

  // List of non-primitive fields to update
  const nestedFields = ["features", "dimensions"];

  for (const field of nestedFields) {
    const data = payload[field as keyof typeof payload];
    if (data && Object.keys(data).length) {
      for (const [key, value] of Object.entries(data)) {
        modifiedPayload[`${field}.${key}`] = value;
      }
    }
  }

  const result = await ProductModel.findByIdAndUpdate(id, modifiedPayload, {
    new: true,
    runValidators: true,
  });

  return result;
};






// delete products from DB
const deleteProduct = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(status.NOT_FOUND, "No product found to delete");
  }
  return null;
};

// sell product
const sellProduct = async (productId: string, payload: TSalesHistory) => {
  // check if product exists
  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new AppError(status.NOT_FOUND, "No product found to sell");
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
  updateProduct,
};
