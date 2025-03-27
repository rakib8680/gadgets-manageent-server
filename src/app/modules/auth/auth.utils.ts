import jwt, { JwtPayload } from "jsonwebtoken";

// create jwt token
export const generateJwtToken = (
  jwtPayload: JwtPayload,
  secret: string,
  expiresIn: number
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};
