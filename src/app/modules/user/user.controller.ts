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

export const UserControllers = {
  updateMyProfile,
};
