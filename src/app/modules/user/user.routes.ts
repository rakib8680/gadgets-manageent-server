import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import { UserControllers } from "./user.controller";

const router = Router();

router.get("/all-users", auth(USER_ROLE.admin), UserControllers.getAllUsers);
router.get(
  "/profile",
  auth(USER_ROLE.admin, USER_ROLE.buyer, USER_ROLE.seller),
  UserControllers.getMyProfile
);
router.patch(
  "/profile/update",
  auth(USER_ROLE.admin, USER_ROLE.buyer, USER_ROLE.seller),
  UserControllers.updateMyProfile
);

router.get("/:id", auth(USER_ROLE.admin), UserControllers.getSingleUser);
export const UserRoutes = router;
