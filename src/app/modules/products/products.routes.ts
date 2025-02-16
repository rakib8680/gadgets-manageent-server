import { Router } from "express";
import { ProductController } from "./products.controller";

const router = Router();

router.post("/add-gadgets", ProductController.addProduct);
router.get("/all-gadgets", ProductController.getAllProducts);

export const ProductRoutes = router;
