import { Router } from "express";
import { ProductRoutes } from "../modules/products/products.routes";
import { HistoryRoutes } from "../modules/sales_history/history.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { UserRoutes } from "../modules/user/user.routes";

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
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "",
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
