import { create } from "zustand";
import temp_product_database from "./temp_database";

export const useProductStore = create((set, get) => ({
  productList: temp_product_database,

  likedProducts: [],

  cartProducts: [],

  featuredProducts: [],

  relatedProducts: [],

  categoryList: [
    { cat: "Granola", banner: "" },
    { cat: "Honey", banner: "" },
    { cat: "Juice", banner: "/category/juice-web.jpg" },
    { cat: "Parfait", banner: "" },
    { cat: "Smoothies", banner: "/category/smoothies-web.jpg" },
    { cat: "Tigernut", banner: "/category/tigernut-web.jpg" },
    { cat: "Yoghurt", banner: "" },
    { cat: "View All", banner: "" },
  ],

  // Get featured products
  updateFeaturedProducts: () => {
    let tempP = [];
    set((state) => {
      for (let i = 0; i < 3; i++) {
        let randomIndex = Math.floor(Math.random() * state.productList.length);
        {
          tempP = [...tempP, state.productList[randomIndex]];
        }
      }

      return { featuredProducts: tempP };
    });
  },

  // Get related products
  getRelatedProducts: (product) => {
    let tempP = [];

    set((state) => {
      for (let i = 0; i < state.productList.length; i++) {
        const product_from_ist = state.productList[i];
        if (product) {
          if (product_from_ist.id != product.id) {
            const product_tags = product.tag.replace(",", "").split(" ");
            if (product_tags.some((e) => product_from_ist.tag.includes(e))) {
              tempP = [...tempP, product_from_ist];
            }
          }
        } else {
          tempP = [...tempP, product_from_ist];
        }
      }
      // console.log(state.shuffleList(tempP))
      return { relatedProducts: state.shuffleList(tempP) };
    });

    return get().relatedProducts;
  },

  // update like product
  updateLikedProducts: (productId) =>
    set((state) => {
      if (state.likedProducts.includes(productId))
        return {
          likedProducts: state.likedProducts.filter((p) => p !== productId),
        };
      else return { likedProducts: [...state.likedProducts, productId] };
    }),

  // add/update cart
  updateCart: (product) =>
    set((state) => {
      const cart_Product = state.cartProducts.filter(
        (p) => p.id === product.id,
      )[0];
      if (cart_Product) {
        const pi = state.cartProducts.findIndex((p) => p.id === product.id);
        state.cartProducts[pi] = product;

        return { cartProducts: [...state.cartProducts] };
      } else return { cartProducts: [...state.cartProducts, product] };
    }),

  // remove from cart
  removeFromCart: (productId) =>
    set((state) => {
      return {
        cartProducts: state.cartProducts.filter((p) => p.id !== productId),
      };
    }),

  // clear cart
  clearCart: () =>
    set(() => {
      return {
        cartProducts: [],
      };
    }),

  // Shuffle list
  shuffleList: (list) => {
    return list
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  },
}));
