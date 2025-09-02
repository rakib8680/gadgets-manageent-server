import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

//update self profile
const updateMyProfile = catchAsync(async (req, res) => {
  const user = req.user;
  const payload = req.body;

  const result = await UserServices.updateMyProfile(user, payload);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

//get all users
const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsers();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

//get single user
const getSingleUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserServices.getSingleUser(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

export const UserControllers = {
  updateMyProfile,
  getAllUsers,
  getSingleUser,
};
