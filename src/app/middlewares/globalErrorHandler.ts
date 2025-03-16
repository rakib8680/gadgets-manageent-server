import { ErrorRequestHandler } from "express";
import AppError from "../errors/AppError";
import { TErrorResponse } from "../Types/TErrorResponse";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import mongoose from "mongoose";
import handleCastError from "../errors/handleCastError";
import duplicateKeyError from "../errors/duplicateKeyError";
import handleValidationError from "../errors/handleValidationError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let errorResponse: TErrorResponse = {
    success: false,
    message: "Error",
    errorMessage: "Something Went Wrong",
  };

  // console.log(err instanceof mongoose.Error.ValidationError);

  if (err instanceof ZodError) {
    errorResponse = handleZodError(err);
  } else if (err instanceof mongoose.Error.ValidationError) {
    errorResponse = handleValidationError(err);
  } else if (err instanceof mongoose.Error.CastError) {
    errorResponse = handleCastError(err);
  } else if (err?.code === 11000) {
    errorResponse = duplicateKeyError(err);
  } else if (err instanceof AppError) {
    errorResponse = {
      success: false,
      message: err.message,
      errorMessage: err.message,
    };
  } else if (err instanceof Error) {
    errorResponse = {
      success: false,
      message: "Validation Error",
      errorMessage: err.message,
    };
  }

  res.status(err.statusCode || 500).json({
    success: errorResponse.success,
    message: errorResponse.message,
    errorMessage: errorResponse.errorMessage,
    errorDetails: errorResponse.errorDetails || err,
    stack: errorResponse.stack || err?.stack,
  });
};

export default globalErrorHandler;
