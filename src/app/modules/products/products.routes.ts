import { Router } from "express";
import { ProductController } from "./products.controller";

const router = Router();

router.post("/add-gadgets", ProductController.addProduct);
router.get("/all-gadgets", ProductController.getAllProducts);
router.delete("/delete-gadget/:id", ProductController.deleteProduct);
router.patch("/sell-gadget/:id", ProductController.sellProduct);

export const ProductRoutes = router;
