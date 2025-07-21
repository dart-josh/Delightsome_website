import { create } from "zustand";
import { get_products, likeProduct, updateCart } from "./serverHooks";

export const useProductStore = create((set, get) => ({
  productList: [],
  updateProductList: async () => {
    if (get().productList && get().productList.length > 0) return;

    const products = await get_products();

    if (products && products.length > 0) {
      console.log("Store updated");
      set({ productList: products });
    }
  },

  fetchLikedProducts: async (likedProducts) => {
    set({ likedProducts });
  },

  fetchCartProducts: async (cartP) => {
    let cart = [];
    const products = get().productList;

    for (let index = 0; index < cartP.length; index++) {
      const element = cartP[index];
      const p = products.find((p) => p._id == element.id);
      p.qty = element.qty;
      if (p) {
        cart = [...cart, p];
      }
    }

    const cartProducts = cart.map((c) => {
      return {
        name: c.name,
        price: c.price,
        image: c.images[0],
        id: c.id,
        qty: c.qty,
      };
    });

    if (cartProducts.length > 0) set({ cartProducts });
  },

  getLikedProductFromProduct: (likedProducts) => {
    let likes = [];
    const products = get().productList;

    for (let index = 0; index < likedProducts.length; index++) {
      const element = likedProducts[index];
      const p = products.find((p) => p._id == element);
      if (p) {
        likes = [...likes, p];
      }
    }

    return likes;
  },

  likedProducts: [],

  cartProducts: [],

  featuredProducts: [],

  relatedProducts: [],

  categoryList: [
    { cat: "Juice", banner: "/category/juice-web.jpg" },
    { cat: "Smoothies", banner: "/category/smoothies-web.jpg" },
    { cat: "Tigernut", banner: "/category/tigernut-web.jpg" },
    { cat: "Yoghurt", banner: "" },
    { cat: "Parfait", banner: "" },
    { cat: "Granola", banner: "" },
    { cat: "Honey", banner: "" },
    { cat: "View All", banner: "" },
  ],

  // Get featured products
  updateFeaturedProducts: () => {
    let tempP = [];
    set((state) => {
      if (state.productList && state.productList.length > 0) {
        for (let i = 0; i < 3; i++) {
          let randomIndex = Math.floor(
            Math.random() * state.productList.length,
          );
          {
            tempP = [...tempP, state.productList[randomIndex]];
          }
        }

        return { featuredProducts: tempP };
      } else return { featuredProducts: [] };
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
  updateLikedProducts: (userId, productId) => {
    set((state) => {
      if (state.likedProducts.includes(productId))
        return {
          likedProducts: state.likedProducts.filter((p) => p !== productId),
        };
      else return { likedProducts: [...state.likedProducts, productId] };
    });

    if (userId) {
      likeProduct(userId, productId);
    }
  },

  // add/update cart
  updateCart: (userId, product) => {
    set((state) => {
      const cart_Product = state.cartProducts.filter(
        (p) => p.id === product.id,
      )[0];

      if (cart_Product) {
        const pi = state.cartProducts.findIndex((p) => p.id === product.id);
        state.cartProducts[pi] = product;

        return { cartProducts: [...state.cartProducts] };
      } else return { cartProducts: [...state.cartProducts, product] };
    });

    const cartProducts = get().cartProducts;
    if (userId) {
      const finalCart = cartProducts.map((c) => {
        return { id: c.id, qty: c.qty };
      });

      updateCart(userId, finalCart);
    }
  },

  // remove from cart
  removeFromCart: (userId, productId) => {
    set((state) => {
      return {
        cartProducts: state.cartProducts.filter((p) => p.id !== productId),
      };
    });

    const cartProducts = get().cartProducts;
    if (userId) {
      const finalCart = cartProducts.map((c) => {
        return { id: c.id, qty: c.qty };
      });

      updateCart(userId, finalCart);
    }
  },

  // clear cart
  clearCart: (userId) => {
    set(() => {
      return {
        cartProducts: [],
      };
    });

    const cartProducts = get().cartProducts;
    if (userId) {
      const finalCart = cartProducts.map((c) => {
        return { id: c.id, qty: c.qty };
      });

      updateCart(userId, finalCart);
    }
  },

  // Shuffle list
  shuffleList: (list) => {
    return list
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  },
}));
