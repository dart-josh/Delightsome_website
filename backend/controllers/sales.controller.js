const { nanoid } = require("nanoid");
const SalesRecord = require("../models/sales.model.js");
var nodemailer = require("nodemailer");

const save_order = async (req, res) => {
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

    const message = `
      <h1>New Order</h1>
      <p>Order ID: ${orderId}</p>
      <p>Customer Name: ${customerName}</p>
      <p>Customer Phone: ${customerPhone}</p>
      <p>Customer Address: ${customerAddress}</p>
      <p>Location: ${location}</p>
      <p>Customer Email: ${customerEmail}</p>
      <p>Short Note: ${shortNote}</p>
      <p>Delivery Method: ${deliveryMethod}</p>
      <p>Order Cost: ${orderCost}</p>
      <p>Delivery Fee: ${deliveryFee}</p>
      <p>Total Cost: ${totalCost}</p>
      <p>Total Quantity: ${totalQuantity}</p>
      <h2>Products</h2>
      <ul>
        ${products.map(product => `
          <li>
            <p>Name: ${product.name}</p>
            <p>Quantity: ${product.quantity}</p>
            <p>Price: ${product.price}</p>
          </li>
        `).join('')}
      </ul>
    `;

    send_email('order@delightsomejuice.com', "info@delightsomejuice.com", "New Order", message);
  } catch (error) {
    console.log("Error in save_order: ", error.message);
    res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};

const send_contact_mail = async (req, res) => {
  const {fullname, email, subject, message} = req.body;

  if (!fullname || !email || !subject) {
    return res.status(500).json({ message: "Enter all required fields" });
  }

  const htmlMessage = `
    <h1>Contact Form Submission</h1>
    <p>Full Name: ${fullname}</p>
    <p>Email: ${email}</p>
    <p>Subject: ${subject}</p>
    <p>Message: ${message}</p>
  `;

  try {
    send_email('info@delightsomejuice.com', 'info@delightsomejuice.com', `From Website- ${subject}`, htmlMessage);
    
    res.json({ message: 'Message sent successfully'});
  } catch (error) {
    console.log('Error in send_contact_mail:', error)
    return res.status(500).json({ message: "Error Sending message" });
  }
}

const view_order = async (req, res) => {
  const { id: orderId } = req.params;

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

const mark_payment = async (req, res) => {
  const { id: orderId } = req.params;

  if (!orderId) {
    return res.status(500).json({ message: "Invalid Entry" });
  }

  try {
    const order = await SalesRecord.findOne({ orderId });

    if (!order) {
      return res.status(500).json({ message: "Invalid Order Id" });
    }

    const response = await SalesRecord.findOneAndUpdate(
      { orderId },
      {
        paymentStatus: "Awaiting Confirmation",
        paymentMethod: "Bank Transfer",
      },
    );

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

const get_orders = async (req, res) => {
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
const generate_record_id = () => {
  return "" + nanoid(11);
};

const send_email = async (to, from, subject, message) => {
  var transporter = nodemailer.createTransport({
    host: "mail.delightsomejuice.com",
    port: 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return false;
    } else {
      return true;
    }
  });
};

module.exports = {
  save_order,
  view_order,
  mark_payment,
  get_orders,
  generate_record_id,
  send_contact_mail,
};
