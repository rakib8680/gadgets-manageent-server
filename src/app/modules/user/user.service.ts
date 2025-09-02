import { JwtPayload } from "jsonwebtoken";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

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

//get my profile
const getMyProfile = async (user: JwtPayload): Promise<TUser | null> => {
  const result = await UserModel.findById(user._id);
  return result;
};

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

export const UserServices = {
  updateMyProfile,
  getAllUsers,
  getSingleUser,
  getMyProfile,
};
