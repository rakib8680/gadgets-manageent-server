import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./products.service";

// insert Product to DB
const addProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.addProduct(req.body);

  sendResponse(res, {
    success: true,
    statusCode: status.CREATED,
    message: "Product added successfully",
    data: result,
  });
});

// get all products
const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProducts();

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "All products",
    data: result,
  });
});

export const ProductController = {
  addProduct,
    getAllProducts,
};
