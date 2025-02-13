const express = require("express");
const { get_orders, mark_payment, save_order, view_order, send_contact_mail, drop_review } = require("../controllers/sales.controller.js");

const router = express.Router();

router.get("/view_order/:id", view_order);
router.get("/get_orders", get_orders);
router.post("/save_order", save_order);
router.post("/mark_payment/:id", mark_payment);

router.post("/drop_review", drop_review);

router.post("/send_contact_mail", send_contact_mail);

module.exports = router;