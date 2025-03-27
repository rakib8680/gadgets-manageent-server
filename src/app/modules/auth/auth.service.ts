import config from "../../config";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { TLoginPayload } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { generateJwtToken } from "./auth.utils";

// register user
const registerUser = async (payload: TUser) => {
  if (await UserModel.isUserExists(payload.email)) {
    throw new AppError(400, "User already exists");
  }

  const result = (await UserModel.create(payload)).toObject() as Partial<TUser>;
  delete result?.password;

  return result;
};

// login user
const loginUser = async (payload: TLoginPayload) => {
  // check if user exists
  const user = (await UserModel.isUserExists(payload?.email));
  if (!user) {
    throw new AppError(400, "No account registered with this email");
  }

  // check if password matches
  if (
    !(await UserModel.isPasswordMatched(
      payload?.password,
      user?.password as string
    ))
  ) {
    throw new AppError(400, "Incorrect password");
  }

  // generate jwt token
  const JwtPayload: JwtPayload = {
    _id: user?._id,
    email: user?.email,
    role: user?.role,
  };
  const accessToken = generateJwtToken(
    JwtPayload,
    config.jwtSecret as string,
    config.jwtExpiresIn as number
  );


 

  return {
    user,
    accessToken,
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
};
