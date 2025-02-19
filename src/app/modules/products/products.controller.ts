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
    message: "All products fetched successfully",
    data: result,
  });
});

// delete products from DB
const deleteProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.deleteProduct(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Product deleted successfully",
    data: result,
  });
});

export const ProductController = {
  addProduct,
  getAllProducts,
  deleteProduct,
};
