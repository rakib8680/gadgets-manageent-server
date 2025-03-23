import { USER_ROLE } from "./user.constant";

export type TUserRole = keyof typeof USER_ROLE;

export const TUser = {
  name: "string",
  role: "string",
  email: "string",
  password: "string",
};
