import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";
import { NextFunction } from "express";

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req, res, next: NextFunction) => {
    await schema.parseAsync(req.body);
    next();
  });
};

export default validateRequest;
