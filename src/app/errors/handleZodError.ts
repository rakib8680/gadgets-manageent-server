import { ZodError } from "zod";
import { TErrorResponse } from "../Types/TErrorResponse";

const handleZodError = (error: ZodError): TErrorResponse => {
  console.log(error.issues);
  const extractedMessage = error.issues
    .map((issue) => {
      const fieldName = issue.path.join(".");

      // Check if the message already contains the field name to avoid duplication
      if (issue.message.toLowerCase().includes(fieldName.toLowerCase())) {
        return issue.message; // Use the message as is
      } else {
        return `${fieldName} ${issue.message}`; // Format as "fieldName message"
      }
    })
    .join(". ");

  return {
    success: false,
    message: "Validation Error",
    errorMessage: extractedMessage,
  };
};

export default handleZodError;
