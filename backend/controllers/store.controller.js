import Product from "../models/product.model.js";

export const get_products = async (req, res) => {
  try {
    const product = await Product.find({});

    res.json(product);
  } catch (error) {
    console.log("Error in get_products: ", error.message);
    res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};

// get one product
export const find_product = async (req, res) => {
  const { link } = req.params;

  try {
    const product = await Product.findOne({ link });
    res.json(product);
  } catch (error) {
    console.log("Error in find_product: ", error.message);
    res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};

// add_update_products
export const add_update_products = async (req, res) => {
  const {
    id,
    link,
    name,
    slogan,
    price,
    category,
    tag,
    productCode,
    introText,
    shortDescription,
    fullDescription,
    summaryText,
    ingredients,
    healthBenefits,
    images,
    thumbnails,
    isAvailable,
  } = req.body;

  // check required fields
  if (!link || !name || !price || !category) {
    return res.status(500).json({ message: "Invalid Entry" });
  }

  try {
    // create
    if (!id) {
      const productExists = await Product.findOne({ name });

      if (productExists) {
        return res.status(500).json({ message: "Product exists" });
      }

      const productExists2 = await Product.findOne({ link });

      if (productExists2) {
        return res.status(500).json({ message: "Link already in use" });
      }

      const product = await Product.create({
        link,
        name,
        slogan,
        price,
        category,
        tag,
        productCode,
        introText,
        shortDescription,
        fullDescription,
        summaryText,
        ingredients,
        healthBenefits,
        images,
        thumbnails,
        isAvailable,
      });

      if (!product) {
        return res.status(500).json({ message: "Product Failed" });
      }

      res.json({ message: "Product Created", product });
    }

    // update
    else {
      const product = await Product.findOneAndUpdate(
        { _id: id },
        {
          link,
          name,
          slogan,
          price,
          category,
          tag,
          productCode,
          introText,
          shortDescription,
          fullDescription,
          summaryText,
          ingredients,
          healthBenefits,
          images,
          thumbnails,
          isAvailable,
        },
        { new: true },
      );

      if (!product) {
        return res.status(500).json({ message: "Product Update Failed" });
      }

      res.json({ message: "Product Updated", product });
    }
  } catch (error) {
    console.log("Error in add_update_products: ", error.message);
    res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};

export const update_image = async (req, res) => {
  const { link, images } = req.body;

  try {
    const product = await Product.findOneAndUpdate(
      { link },
      {
        images,
      },
      { new: true },
    );

    if (!product) {
      return res.status(500).json({ message: "Image Update Failed" });
    }

    res.json({ message: "Product Image Updated", product });
  } catch (error) {
    console.log("Error in update_image: ", error.message);
    res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};

export const delete_product = async (req, res) => {
  const { link } = req.params;

  if (!link) {
    return res.status(500).json({ message: "Invalid Product" });
  }

  try {
    const productExists = await Product.findOne({ link });

    if (!productExists) {
      return res.status(500).json({ message: "Product does not exist" });
    }

    await Product.findOneAndDelete({ link });

    res.json({ message: "Product Deleted" });
  } catch (error) {
    console.log("Error in delete_product: ", error.message);
    res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};
