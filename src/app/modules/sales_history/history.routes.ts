import { Router } from "express";
import { HistoryController } from "./history.controller";

const router = Router();

router.get("/sales-history", HistoryController.getSalesHistory);

export const HistoryRoutes = router;
