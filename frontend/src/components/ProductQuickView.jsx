/* eslint-disable react-hooks/exhaustive-deps */
import {
  CircleX,
  CreditCard,
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  Minus,
  Plus,
  ShoppingCart,
  Twitter,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useProductHooks } from "../Hooks/useGeneralHooks";

import ProductRatings from "./ProductRatings";
import { useProductStore } from "../Hooks/useProductStore";

const ProductQuickView = () => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [itemQty, setItemQty] = useState(1);
  const { toggleProductQuickView, productQuickViewOpen, quickViewProduct } =
    useProductHooks();
  const [isOpen, setIsOpen] = useState(productQuickViewOpen);

  const {
    likedProducts,
    updateLikedProducts,
    cartProducts,
    updateCart,
    removeFromCart,
  } = useProductStore();

  useEffect(() => {
    if (productQuickViewOpen) {
      setIsOpen(true);
    }
  }, [productQuickViewOpen]);

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const closeSideBar = async () => {
    setIsOpen(false);
    await delay(500);
    toggleProductQuickView({ value: false });
  };

  const [isLiked, setIsLiked] = useState(false);

  // Like product effect
  useEffect(() => {
    if (!quickViewProduct) return;
    if (likedProducts.includes(quickViewProduct.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likedProducts, quickViewProduct]);

  // cart effect
  useEffect(() => {
    if (!quickViewProduct) return;
    const cart_Product = cartProducts.filter(
      (p) => p.id === quickViewProduct.id,
    )[0];
    if (cart_Product) {
      setItemQty(cart_Product.qty);
      setIsAddedToCart(true);
    } else {
      setIsAddedToCart(false);
    }
  }, [cartProducts, quickViewProduct]);

  useEffect(() => {
    if (isAddedToCart) {
      addToCart(itemQty);
    }
  }, [itemQty]);

  // Add/update cart
  const addToCart = (item_qty) => {
    const cartP = {
      name: quickViewProduct.name,
      price: quickViewProduct.price,
      image: quickViewProduct.images[0],
      id: quickViewProduct.id,
      qty: item_qty,
      link: quickViewProduct.link,
    };

    updateCart(cartP);
  };

  // increaae quantity
  const increaseItemQty = () => {
    setItemQty(itemQty + 1);
  };

  // decreaae quantity
  const decreaseItemQty = () => {
    if (itemQty > 1) {
      setItemQty(itemQty - 1);
    } else {
      if (isAddedToCart) {
        removeFromCart(quickViewProduct.id);
      }
    }
  };

  if (!quickViewProduct) {
    return <div></div>;
  }

  return (
    <div
      className={`min-w-screen fixed inset-0 z-[80] min-h-screen ${productQuickViewOpen ? "block" : "hidden"}`}
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Content */}
      <div className="absolute z-50 flex h-full w-full items-center justify-center">
        <div
          className={`xs:w-[80%] relative h-[75%] w-[85%] max-w-[850px] overflow-y-hidden rounded-lg bg-white transition-all duration-500 ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-10"}`}
        >
          {/* Close button */}
          <div className="absolute right-3 top-3 z-[65]">
            <CircleX
              stroke="white"
              fill="gray"
              className="cursor-pointer transition-all duration-300 hover:fill-red-800"
              size={26}
              onClick={closeSideBar}
            />
          </div>

          {/* Product details */}
          <div className="scrollbar relative h-full w-full overflow-y-scroll px-5 py-5 md:px-10 md:py-8">
            {/* Product name */}
            <div className="mb-2 text-2xl font-bold">
              {quickViewProduct.name}
            </div>

            {/* Ratings, reviews, social icons */}
            <div className="mb-6 flex flex-col gap-[8px] md:mb-8 md:flex-row md:items-center md:justify-between md:gap-0">
              <div className="xs:flex-row xs:items-center xs:gap-2 flex flex-col">
                <ProductRatings rating={quickViewProduct.averageRating} />
                <span className="text-[14px]">
                  {quickViewProduct.reviewCount || 0} customer reviews
                </span>
              </div>

              <div className="flex items-center gap-3 md:gap-5">
                <Facebook
                  strokeWidth={1}
                  className="size-5 cursor-pointer text-gray-800 transition-all duration-300 hover:text-green-800 md:size-6"
                />
                <Twitter
                  strokeWidth={1}
                  className="size-5 cursor-pointer text-gray-800 transition-all duration-300 hover:text-green-800 md:size-6"
                />
                <Linkedin
                  strokeWidth={1}
                  className="size-5 cursor-pointer text-gray-800 transition-all duration-300 hover:text-green-800 md:size-6"
                />
                <Instagram
                  strokeWidth={1}
                  className="size-5 cursor-pointer text-gray-800 transition-all duration-300 hover:text-green-800 md:size-6"
                />
                <Mail
                  strokeWidth={1}
                  className="size-5 cursor-pointer text-gray-800 transition-all duration-300 hover:text-green-800 md:size-6"
                />
              </div>
            </div>

            {/* Product details */}
            <div className="flex w-full flex-col gap-8 md:flex-row md:gap-14">
              <div className="w-full">
                <img
                  src={quickViewProduct.images && quickViewProduct.images[0]}
                  alt="Product Image"
                  className="w-full"
                />
              </div>

              <div className="flex w-full flex-col gap-2">
                <div className="mb-2 flex w-full items-center justify-between">
                  <p className="text-[20px] font-semibold text-red-500">
                    ₦
                    {(quickViewProduct.price &&
                      quickViewProduct.price.toLocaleString()) ||
                      0}
                    .00
                  </p>

                  <Heart
                    size={20}
                    onClick={() => updateLikedProducts(quickViewProduct.id)}
                    className={`cursor-pointer transition-all duration-300 hover:scale-110 ${isLiked ? "fill-red-500 stroke-red-500" : "stroke-gray-500"}`}
                  />
                </div>

                <p className="w-full max-w-[600px] text-[15px]">
                  {quickViewProduct.shortDescription}
                </p>

                {/* Item quantity */}
                <div className="mt-3 flex h-11 w-full max-w-[150px] items-center rounded-xl border border-gray-200 text-gray-700 md:mt-5">
                  <button
                    onClick={decreaseItemQty}
                    className="flex h-full w-[100px] items-center justify-center rounded-l-lg py-2 transition-all duration-300 hover:bg-gray-200 hover:text-green-900"
                  >
                    <Minus size={20} />
                  </button>
                  <div className="flex h-full w-full items-center justify-center">
                    {itemQty}
                  </div>
                  <button
                    onClick={increaseItemQty}
                    className="flex h-full w-[100px] items-center justify-center rounded-r-lg transition-all duration-300 hover:bg-orange-400 hover:text-green-900"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                {/* Action button */}
                <div className="hidden flex-col gap-3 md:flex">
                  {/* Add to cart */}
                  <button
                    onClick={
                      isAddedToCart
                        ? () => removeFromCart(quickViewProduct.id)
                        : () => addToCart(itemQty)
                    }
                    className={`mt-3 flex h-12 w-full max-w-[250px] items-center justify-center gap-3 rounded-md px-4 py-2 text-xl text-white transition-all duration-500 md:mt-5 md:max-w-full ${isAddedToCart ? "bg-red-500 hover:bg-red-700" : "bg-green-700 hover:bg-green-800"}`}
                  >
                    <ShoppingCart size={22} fill="white" />
                    <span className="text-[15px] font-bold">
                      {isAddedToCart ? "Remove" : "Add to Cart"}
                    </span>
                  </button>

                  {/* Buy now */}
                  <button
                    onClick={() => {
                      toast.error("Not available", { toastId: "success1" });
                    }}
                    className={`flex h-12 w-full max-w-[250px] items-center justify-center gap-3 rounded-md bg-orange-500 px-4 py-2 text-xl text-black transition-all duration-500 hover:bg-orange-600 md:max-w-full`}
                  >
                    <CreditCard size={22} />
                    <span className="text-[15px] font-bold">Buy Now</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Space */}
            <div className="h-16"></div>
          </div>

          {/* Bottom action buttons for small devices */}
          <div className="absolute bottom-0 left-0 right-0 flex h-12 w-full pr-[6px] md:hidden">
            {/* Add to cart */}
            <div
              onClick={
                isAddedToCart
                  ? () => removeFromCart(quickViewProduct.id)
                  : () => addToCart(itemQty)
              }
              className={`flex h-full w-full cursor-pointer items-center justify-center gap-2 text-white transition-all duration-500 ${isAddedToCart ? "bg-red-500 hover:bg-red-700" : "bg-green-700 hover:bg-green-800"}`}
            >
              <ShoppingCart size={22} fill="white" />
              <span className="text-[15px] font-bold">
                {isAddedToCart ? "Remove" : "Add to Cart"}
              </span>
            </div>

            {/* Buy now */}
            <div
              onClick={() => {
                toast.error("Not available", { toastId: "success1" });
              }}
              className="flex h-full w-full cursor-pointer items-center justify-center gap-2 bg-orange-500 text-black transition-all duration-500 hover:bg-orange-600"
            >
              <CreditCard size={22} />
              <span className="text-[15px] font-bold">Buy Now</span>
            </div>
          </div>

          {/*  */}
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default ProductQuickView;
