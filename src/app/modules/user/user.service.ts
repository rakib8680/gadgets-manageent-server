import { JwtPayload } from "jsonwebtoken";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";


//update self profile
const updateMyProfile = async (
  user: JwtPayload,
  payload: Partial<TUser>
): Promise<TUser | null> => {

  const result = await UserModel.findByIdAndUpdate(user._id, payload, {
    new: true,
  }).select("-password");

  return result;
};

export const UserServices = {
  updateMyProfile,
};
