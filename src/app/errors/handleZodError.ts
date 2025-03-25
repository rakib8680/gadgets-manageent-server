import { ZodError } from "zod";
import { TErrorResponse } from "../Types/TErrorResponse";

const handleZodError = (error: ZodError): TErrorResponse => {
  console.log(error.issues);

  // Create a unique error message set to avoid duplicates
  const extractedMessages = new Set<string>();

  error.issues.forEach((issue) => {
    const fieldName = issue.path.join(".");

    // Ensure field name is mentioned only once
    if (!issue.message.toLowerCase().includes(fieldName.toLowerCase())) {
      extractedMessages.add(`${fieldName} is required`);
    } else {
      extractedMessages.add(issue.message);
    }
  });

  return {
    success: false,
    message: "Validation Error",
    errorMessage: Array.from(extractedMessages).join(". "), // Convert Set to string
  };
};

export default handleZodError;
