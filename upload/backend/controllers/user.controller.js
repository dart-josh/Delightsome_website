import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import OpenAI from "openai";

// update liked products
export const likeProduct = async (req, res) => {
  const { id, likedProduct } = req.body;

  if (!id || !likedProduct) {
    return res.status(400).json({ success: false, message: "Invalid product" });
  }

  try {
    const user = await User.findById(id);

    const alreadyExists = user.likedProducts.includes(likedProduct);

    if (alreadyExists) {
      // Remove the likedProduct
      await User.updateOne(
        { _id: id },
        { $pull: { likedProducts: likedProduct } },
      );
    } else {
      // Add the likedProduct
      await User.updateOne(
        { _id: id },
        { $addToSet: { likedProducts: likedProduct } },
      );
    }

    if (!alreadyExists) {
      // update product
      await Product.updateOne(
        { _id: likedProduct },
        {
          $inc: {
            likes: 1,
          },
        },
      );
    }

    res.status(200).json({
      success: true,
      message: "Product Liked",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCart = async (req, res) => {
  const { id, cartProducts } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid products" });
  }

  try {
    await User.updateOne({ _id: id }, { cartProducts });

    res.status(200).json({
      success: true,
      message: "Cart Updated",
    });
  } catch (error) {
    console.log(error);
  }
};

// update orders

// update cart

// /pages/api/chat.js (Next.js) or any backend route

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const handler = async (req, res) => {
  const { message } = req.body;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [{ role: "user", content: message }],
    });

    res.status(200).json({
      reply: chatCompletion.choices[0].message.content,
    });
  } catch (err) {
    console.error("Chat API Error:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
};
