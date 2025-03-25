import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "../user/user.validation";

const router = Router();

router.post(
  "/register-user",
  validateRequest(UserValidations.createUserValidationSchema),
  AuthControllers.registerUser
);

export const AuthRoutes = router;
