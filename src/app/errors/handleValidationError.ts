import mongoose from "mongoose";
import { TErrorResponse } from "../Types/TErrorResponse";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TErrorResponse => {
  console.log(err.errors);

  const errorMessage = Object.values(err.errors)
    .map((error) => {
      return `${error?.path} is ${error?.kind}`;
    })
    .join(", ");

  const errorDetails = Object.values(err.errors).map((error: any) => ({
    field: error.path,
    message: error.message,
  }));

  return {
    success: false,
    message: "Validation Error",
    errorMessage: errorMessage,
    errorDetails,
  };
};

export default handleValidationError;
