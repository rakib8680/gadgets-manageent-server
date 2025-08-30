import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUserRole = keyof typeof USER_ROLE;

export type TUser = {
  _id?: Types.ObjectId;
  name: string;
  role: TUserRole;
  email: string;
  image:string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

// Static methods for UserModel
export interface StaticUserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser | null>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
