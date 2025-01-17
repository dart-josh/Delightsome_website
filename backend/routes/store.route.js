const express = require("express");
const { get_orders, mark_payment, save_order, view_order } = require("../controllers/sales.controller.js");

const router = express.Router();

router.get("/view_order/:id", view_order);
router.get("/get_orders", get_orders);
router.post("/save_order", save_order);
router.post("/mark_payment/:id", mark_payment);

module.exports = router;