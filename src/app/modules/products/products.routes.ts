import { Router } from "express";
import { ProductController } from "./products.controller";
import validateRequest from "../../middlewares/validateRequest";
import { productValidations } from "./products.validation";

const router = Router();

router.post(
  "/add-gadgets",
  validateRequest(productValidations.createProductValidationSchema),
  ProductController.addProduct
);
router.get("/all-gadgets", ProductController.getAllProducts);
router.delete("/delete-gadget/:id", ProductController.deleteProduct);
router.patch(
  "/sell-gadget/:id",
  validateRequest(productValidations.sellProductValidationSchema),
  ProductController.sellProduct
);
router.patch(
  "/update-gadget/:id",
  validateRequest(productValidations.updateProductValidationSchema),
  ProductController.updateProduct
);
router.get("/:id", ProductController.getSingleProduct);

export const ProductRoutes = router;
