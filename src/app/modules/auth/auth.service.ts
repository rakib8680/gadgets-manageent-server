import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";

// register user
const registerUser = async (payload: TUser) => {
  if (await UserModel.isUserExists(payload.email)) {
    throw new AppError(400, "User already exists");
  }

  const result = (await UserModel.create(payload)).toObject() as Partial<TUser>;
  delete result?.password;

  return result;
};

export const AuthServices = {
  registerUser,
};
