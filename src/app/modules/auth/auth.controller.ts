import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

// register user
const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: status.CREATED,
    message: "User registered successfully",
    data: result,
  });
});

export const AuthControllers = {
  registerUser,
};
