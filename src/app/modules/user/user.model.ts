import { Schema, model } from "mongoose";
import { StaticUserModel, TUser } from "./user.interface";
import { USER_ROLE } from "./user.constant";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser, StaticUserModel>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    role: {
      type: String,
      enum: {
        values: Object.values(USER_ROLE),
        message: "{VALUE} is not supported",
      },
      default: USER_ROLE.buyer,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// pre save hook to hash password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user?.password) {
    user.password = await bcrypt.hash(
      user?.password,
      Number(config.bcryptSalt)
    );
  }
  next();
});

// Static methods to check if user exists
userSchema.statics.isUserExists = async function (email) {
  return await this.findOne({ email });
};

userSchema.statics.isPasswordMatched = async function (
  plainPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const UserModel = model<TUser, StaticUserModel>("user", userSchema);
