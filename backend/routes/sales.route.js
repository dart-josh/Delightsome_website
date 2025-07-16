import express from "express";
import {
  get_orders,
  mark_payment,
  save_order,
  view_order,
  send_contact_mail,
  drop_review,
  get_reviews,
  get_all_orders,
} from "../controllers/sales.controller.js";

const router = express.Router();

router.get("/get_all_orders", get_all_orders);
router.get("/view_order/:id", view_order);
router.get("/get_orders", get_orders);
router.post("/save_order", save_order);
router.post("/mark_payment/:id", mark_payment);

router.get("/get_reviews/:id", get_reviews);
router.post("/drop_review", drop_review);

router.post("/send_contact_mail", send_contact_mail);

export default router;
