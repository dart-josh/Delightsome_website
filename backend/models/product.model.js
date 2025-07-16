import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  link: { type: String, required: true },
  name: { type: String, required: true },
  slogan: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tag: { type: String },
  productCode: { type: String },
  images: [{ type: String, required: true }],
  thumbnails: [{ type: String, required: true }],
  introText: { type: String },
  shortDescription: { type: String },
  fullDescription: { type: String },
  summaryText: {type: String},
  averageRating: { type: Number, default: 0 },
  ingredients: { type: String},
  healthBenefits: { type: String},
  quantitySold: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: false },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
