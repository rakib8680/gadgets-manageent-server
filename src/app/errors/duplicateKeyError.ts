import { TErrorResponse } from "../Types/TErrorResponse";

// easy version
/*const duplicateKeyError = (err: any): TErrorResponse => {
  const keyValue = err.keyValue;
  const key = Object.keys(keyValue)[0];

  const errorMessage = `The ${key} ${keyValue[key]} is already in use. Please use a different ${key}.`;

  return {
    success: false,
    message: "Duplicate Key Error",
    errorMessage,
    errorDetails: err,
  };
};

export default duplicateKeyError; */

// chat gpt advance version
const duplicateKeyError = (err: any): TErrorResponse => {
  let key = "Unknown Key";
  let value = "Unknown Value";
  let collection = "Unknown Collection";

  if (err?.keyValue) {
    key = Object.keys(err.keyValue)[0] || "Unknown Key";
    value = err.keyValue[key] || "Unknown Value";
  }

  // Extracting collection name from error message
  const collectionMatch = err?.errmsg?.match(/collection: (\S+)/);
  collection = collectionMatch ? collectionMatch[1] : "Unknown Collection";

  return {
    success: false,
    message: `Duplicate Key Error in ${collection}`,
    errorMessage:
      key !== "Unknown Key"
        ? `The ${key} "${value}" is already in use. Please choose a different ${key}.`
        : "A duplicate key error occurred, but the specific key could not be determined.",
    errorDetails: {
      key,
      value,
      collection,
      code: err.code ?? "Unknown Code",
      index: err.index ?? "Unknown Index",
    },
  };
};

export default duplicateKeyError;
