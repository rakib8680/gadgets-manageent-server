import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import { UserControllers } from "./user.controller";

const router = Router();

router.patch(
  "/profile/update",
  auth(USER_ROLE.admin, USER_ROLE.buyer, USER_ROLE.seller),
  UserControllers.updateMyProfile
);

export const UserRoutes = router;
