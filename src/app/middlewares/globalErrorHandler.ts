import { ErrorRequestHandler } from "express";
import AppError from "../errors/AppError";
import { TErrorResponse } from "../Types/TErrorResponse";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let errorResponse: TErrorResponse = {
    success: false,
    message: "Error",
    errorMessage: "Something Went Wrong",
  };

  if (err instanceof AppError) {
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
