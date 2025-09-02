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
  });

  return result;
};

//get all users
const getAllUsers = async (): Promise<TUser[]> => {
  const users = await UserModel.find();
  return users;
};

//get single user
const getSingleUser = async (id: string): Promise<TUser | null> => {
  const user = await UserModel.findById(id);
  return user;
};

export const UserServices = {
  updateMyProfile,
  getAllUsers,
  getSingleUser,
};
