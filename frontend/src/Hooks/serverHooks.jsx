import axios from "axios";
import temp_product_database from "./temp_database";

// eslint-disable-next-line no-undef
const dev_mode = process.env.NODE_ENV === "development";

const server_prefix = dev_mode ? "http://localhost:5000/api" : "/api";

export const get_products = async () => {
  try {
    const response = await axios.get(`${server_prefix}/store/get_products`);

    const products = response?.data != null ? response.data.map((p) => {return {...p, id: p._id}}) : [];

    return products;
  } catch (error) {
    console.log("Error in get_products function - ", error);
    return [];
  }
};

export const find_product = async (link) => {
  try {
    const response = await axios.get(
      `${server_prefix}/store/find_product/${link}`,
    );

    return response.data;
  } catch (error) {
    console.log("Error in find_product function - ", error);
    return null;
  }
};

export const add_update_products = async (data) => {
  try {
    const response = await axios.post(
      `${server_prefix}/store/add_update_products`,
      data,
    );

    return {
      success: true,
      message: response.data.message,
      product: response.data.product,
    };
  } catch (error) {
    console.log("Error in add_update_products function - ", error);
    return {
      success: false,
      message: error.response.data.message || error.message || error,
    };
  }
};

export const update_image = async (data) => {
  try {
    const response = await axios.post(
      `${server_prefix}/store/update_image`,
      data,
    );

    return {
      success: true,
      message: response.data.message,
      product: response.data.product,
    };
  } catch (error) {
    console.log("Error in update_image function - ", error);
    return {
      success: false,
      message: error.response.data.message || error.message || error,
    };
  }
};

export const delete_product = async (link) => {
  try {
    const response = await axios.delete(
      `${server_prefix}/store/delete_product/${link}`,
    );

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    console.log("Error in delete_product function - ", error);
    return {
      success: false,
      message: error.response.data.message || error.message || error,
    };
  }
};

export const sett = async () => {
  const new_data = transformProducts(temp_product_database);
  console.log(new_data.length);
  for (let index = 0; index < new_data.length; index++) {
    const element = new_data[index];

    console.log(index + 1);
    const respose = await add_update_products(element);
    console.log(respose);
  }
};

const transformProducts = (originalProducts) => {
  return originalProducts.map((product) => ({
    link: product.link,
    name: product.name,
    price: product.price,
    category: product.category,
    tag: product.tag.split(' ').join(', '),
    productCode: product.productCode,
    images: product.images || ["/products/placeholder.png"],
    thumbnails: product.thumbnails || ["/products/placeholder-160x160.png"],
    shortDescription: product.shortDescription || "",
    fullDescription: product.fullDescription || "",
    averageRating: product.averageRating || 1,
    reviewCount: product.reviewCount || 0,

    // new fields
    slogan: "",
    introText: "",
    ingredients: "",
    healthBenefits: "",
    isAvailable: true,
  }));
};
