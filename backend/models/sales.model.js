import mongoose from "mongoose";

const salesSchema = new mongoose.Schema(
  {
    recordDate: {
      type: Date,
      required: true,
    },
    deliveryDate: {
      type: Date,
    },
    orderId: {
      type: String,
      required: true,
    },
    products: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    orderCost: {
      type: Number,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    customerAddress: {
      type: String,
    },
    location: {
      type: String,
    },
    customerEmail: {
      type: String,
    },
    shortNote: {
      type: String,
    },
    orderStatus: {
      type: String,
      default: 'Order placed',
    },
    paymentStatus: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    deliveryMethod: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const SalesRecord = mongoose.model("SalesRecord", salesSchema);

export default SalesRecord;
