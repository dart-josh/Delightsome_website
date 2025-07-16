import express from "express";
import {
  get_products,
  add_update_products,
  find_product,
  update_image,
  delete_product,
} from "../controllers/store.controller.mjs";

const router = express.Router();

router.get("/get_products", get_products);
router.get("/find_product/:link", find_product);
router.post("/add_update_products", add_update_products);
router.post("/update_image", update_image);
router.delete("/delete_product/:link", delete_product);

export default router;
