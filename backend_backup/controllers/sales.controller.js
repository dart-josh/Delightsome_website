import { nanoid } from "nanoid";
import SalesRecord from "../models/sales.model.js";

export const save_order = async (req, res) => {
  // get values from body
  const {
    products,
    orderCost,
    deliveryFee,
    totalCost,
    customerName,
    customerPhone,
    customerAddress,
    location,
    customerEmail,
    shortNote,
    deliveryMethod,
  } = req.body;

  // verify all fields
  if (
    !orderCost ||
    !products ||
    !totalCost ||
    !customerName ||
    !customerPhone ||
    !deliveryMethod
  ) {
    return res.status(500).json({ message: "Invalid Entry" });
  }

  // verify products
  if (products.length < 1) {
    return res.status(500).json({ message: "No Products" });
  }

  // Verfiy each product field
  for (let i = 0; i < products.length; i++) {
    if (!products[i].name || !products[i].quantity || !products[i].price) {
      return res.status(500).json({ message: "Invalid Product Entry" });
    }
  }

  // get total quantity
  const totalQuantity = products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  // get order id
  const orderId = generate_record_id();

  // get date
  const recordDate = new Date();

  // convert date to local timezone
  recordDate.setMinutes(
    recordDate.getMinutes() - recordDate.getTimezoneOffset(),
  );
  
  try {
    
    const order = await SalesRecord.create({
      recordDate,
      orderId,
      products,
      orderCost,
      deliveryFee,
      totalCost,
      totalQuantity,
      customerName,
      customerPhone,
      customerAddress,
      location,
      customerEmail,
      shortNote,
      deliveryMethod,
    });

    res.json({ message: "Order Sent", order });
  } catch (error) {
    console.log("Error in save_order: ", error.message);
    res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};

export const view_order = async (req, res) => {
    const { id:orderId } = req.params;

    

  if (!orderId) {
    return res.status(500).json({ message: "Invalid Entry" });
  }

  

  try {
    const order = await SalesRecord.findOne({ orderId });

    if (!order) {
      return res.status(500).json({ message: "Invalid Order Id" });
    }

    

    res.json({ order });
  } catch (error) {
    console.log("Error in view_order: ", error.message);
    res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};

export const mark_payment = async (req, res) => {
  const { id:orderId } = req.params;

  if (!orderId) {
    return res.status(500).json({ message: "Invalid Entry" });
  }

  try {
    const order = await SalesRecord.findOne({ orderId });

    if (!order) {
      return res.status(500).json({ message: "Invalid Order Id" });
    }

    const response = await SalesRecord.findOneAndUpdate({ orderId }, {paymentStatus: 'Awaiting Confirmation', paymentMethod: 'Bank Transfer'});
    
    if (!response) {
      return res.status(500).json({ message: "Error marking payment" });
    }

    res.json({ message: "Payment Sent" });

  } catch (error) {
    console.log("Error in mark_payment: ", error.message);
    res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};

export const get_orders = async (req, res) => {
  try {
    const record = await SalesRecord.find({});
    res.json({ record });
  } catch (error) {
    console.log("Error in get_orders:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};

// generate record Id
export const generate_record_id = () => {
  return "" + nanoid(11);
};
