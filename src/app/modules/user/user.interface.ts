import { USER_ROLE } from "./user.constant";

export type TUserRole = keyof typeof USER_ROLE;

export type TUser = {
  name: string;
  role: TUserRole;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};
