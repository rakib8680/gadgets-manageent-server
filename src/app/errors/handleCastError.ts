import mongoose from "mongoose";
import { TErrorResponse } from "../Types/TErrorResponse";

const handleCastError = (err: mongoose.Error.CastError): TErrorResponse => {
  const errorMessage = `${err?.value} is not a valid ID`;

  return {
    success: false,
    message: "MongoDB Cast Error",
    errorMessage,
  };
};

export default handleCastError;
