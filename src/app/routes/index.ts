import { Router } from "express";
import { ProductRoutes } from "../modules/products/products.routes";
import { HistoryRoutes } from "../modules/sales_history/history.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/history",
    route: HistoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
