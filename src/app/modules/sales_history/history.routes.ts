import { Router } from "express";
import { HistoryController } from "./history.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.get(
  "/sales-history",
  auth(USER_ROLE.admin, USER_ROLE.seller),
  HistoryController.getSalesHistory
);

export const HistoryRoutes = router;
