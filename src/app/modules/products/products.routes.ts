import { Router } from "express";
import { ProductController } from "./products.controller";
import validateRequest from "../../middlewares/validateRequest";
import { productValidations } from "./products.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/add-gadgets",
  auth(USER_ROLE.admin, USER_ROLE.seller),
  validateRequest(productValidations.createProductValidationSchema),
  ProductController.addProduct
);
router.get("/all-gadgets", ProductController.getAllProducts);
router.delete(
  "/delete-gadgets",
  auth(USER_ROLE.admin, USER_ROLE.seller),
  validateRequest(productValidations.bulkDeleteProductValidationSchema),
  ProductController.deleteMultipleProducts
);
router.delete(
  "/delete-gadget/:id",
  auth(USER_ROLE.admin, USER_ROLE.seller),
  ProductController.deleteProduct
);
router.patch(
  "/sell-gadget/:id",
  auth(USER_ROLE.seller),
  validateRequest(productValidations.sellProductValidationSchema),
  ProductController.sellProduct
);
router.patch(
  "/update-gadget/:id",
  auth(USER_ROLE.admin, USER_ROLE.seller),
  validateRequest(productValidations.updateProductValidationSchema),
  ProductController.updateProduct
);
router.get("/:id", ProductController.getSingleProduct);

export const ProductRoutes = router;
