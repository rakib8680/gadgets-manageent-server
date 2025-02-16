import { Router } from "express";
import { ProductController } from "./products.controller";

const router = Router();

router.post("/add-gadgets", ProductController.addProduct);

export const ProductRoutes = router;
