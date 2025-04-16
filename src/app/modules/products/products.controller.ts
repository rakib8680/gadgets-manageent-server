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
  const result = await ProductServices.getAllProducts(req.query);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "All products fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

// get My products
const getMyProducts = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await ProductServices.getMyProducts(req.query, user);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "All products fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

// get single product by ID
const getSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getSingleProduct(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Product fetched successfully",
    data: result,
  });
});

// update product
const updateProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.updateProduct(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Product updated successfully",
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

// delete multiple products
const deleteMultipleProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.deleteMultipleProducts(req.body);
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Products deleted successfully",
    data: result,
  });
});

// sell product
const sellProduct = catchAsync(async (req, res) => {
  const productId = req.params.id;
  const payload = req.body;
  const result = await ProductServices.sellProduct(productId, payload);
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Product sold successfully",
    data: result,
  });
});

export const ProductController = {
  addProduct,
  getAllProducts,
  getMyProducts,
  getSingleProduct,
  deleteProduct,
  deleteMultipleProducts,
  sellProduct,
  updateProduct,
};
