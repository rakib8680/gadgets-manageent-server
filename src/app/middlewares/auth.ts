import status from "http-status";
import config from "../config";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import { UserModel } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";

const auth = (...roles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    // check if token is provided
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
    }
    // check if token is valid
    const decodedData = jwt.verify(
      token,
      config.jwtSecret as string
    ) as JwtPayload;

    const {email, role } = decodedData;

    // check if user exists
    const user = await UserModel.isUserExists(email);
    if (!user) {
      throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
    }

    // check if user role is valid
    if (roles && !roles.includes(role)) {
      throw new AppError(
        status.FORBIDDEN,
        "You are not authorized to access this feature"
      );
    }

    req.user = decodedData;

    next();
  });
};

export default auth;



//todo - check jwt error handling