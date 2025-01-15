/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
import { usePageHooks } from "../Hooks/useGeneralHooks";
import {
  Camera,
  CreditCard,
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  LoaderPinwheel,
  Mail,
  Minus,
  Plus,
  ShoppingCart,
  Twitter,
  Verified,
} from "lucide-react";
import { useEffect, useState } from "react";
import ProductRatings from "../components/ProductRatings";
import RelatedProducts from "../components/RelatedProducts";
import { useProductStore } from "../Hooks/useProductStore";
import toast from "react-hot-toast";

const ProductPage = () => {
  const { id:link } = useParams();

  const {
    productList,
    likedProducts,
    updateLikedProducts,
    cartProducts,
    updateCart,
    removeFromCart,
  } = useProductStore();

  const [product, setProduct] = useState();

  // Get product
  useEffect(() => {
    const p = productList.filter((product) => {
      if (product.link == link) {
        return product;
      }
    });

    setProduct(p[0]);
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [productList, link]);

  const { setCurrentPage: setPage } = usePageHooks();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [itemQty, setItemQty] = useState(1);

  const [isLiked, setIsLiked] = useState(false);

  // Like product effect
  useEffect(() => {
    if (!product) return;
    if (likedProducts.includes(product.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likedProducts, product]);

  // cart effect
  useEffect(() => {
    if (!product) return;
    const cart_Product = cartProducts.filter((p) => p.id === product.id)[0];
    if (cart_Product) {
      setItemQty(cart_Product.qty);
      setIsAddedToCart(true);
    } else {
      setIsAddedToCart(false);
    }
  }, [cartProducts, product]);

  // quantity effect to update cart
  useEffect(() => {
    if (isAddedToCart) {
      addToCart(itemQty);
    }
  }, [itemQty]);

  // Add/update cart
  const addToCart = (item_qty) => {
    const cartP = {
      name: product.name,
      price: product.price,
      image: product.images[0],
      id: product.id,
      qty: item_qty,
      link: product.link
    };

    updateCart(cartP);
  };

  // increaae quantity
  const increaseItemQty = () => {
    if (itemQty < 5) {
      setItemQty(itemQty + 1);
    }
  };

  // decreaae quantity
  const decreaseItemQty = () => {
    if (itemQty > 1) {
      setItemQty(itemQty - 1);
    } else {
      if (isAddedToCart) {
        removeFromCart(product.id);
      }
    }
  };

  // pgae title
  useEffect(() => {
    if (!product) return;
    setPage(product.name || "undefined");
  }, [setPage, product]);

  const [activeImage, setActiveImage] = useState(0);

  // No product
  if (!product) {
    return (
      <div className="flex w-full items-center justify-center">
        <div className="animate-spin">
          <LoaderPinwheel className="h-8 w-8 text-green-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="xs:mx-5 relative mx-[10px] max-w-[1200px] pt-5 justify-center md:mx-auto md:px-5">
      {/* Top bar */}
      <div className="hidden md:block">
        <div className="text-md mb-6 flex justify-between">
          <div className="flex gap-3">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/shop">Shop</Link>
            <span>/</span>
            <span>{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product details */}
      <div>
        {/* Product name */}
        <div className="mb-2 text-2xl font-bold">{product.name}</div>

        {/* Ratings, reviews, social icons */}
        <div className="mb-6 flex flex-col gap-2 md:mb-8 md:flex-row md:items-center md:justify-between md:gap-0">
          {/* Rating */}
          <div className="xs:flex-row xs:items-center xs:gap-2 flex flex-col">
            <ProductRatings rating={product.averageRating || 0} />
            <span className="text-[14px]">
              {product.reviewCount || 0} customer reviews
            </span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3 md:gap-5">
            <Link to={"/"} target="_blank">
              <Facebook
                strokeWidth={1}
                className="size-5 cursor-pointer text-gray-800 transition-all duration-300 hover:text-green-800 md:size-6"
              />
            </Link>
            <Link to={"/"} target="_blank">
              <Twitter
                strokeWidth={1}
                className="size-5 cursor-pointer text-gray-800 transition-all duration-300 hover:text-green-800 md:size-6"
              />
            </Link>
            <Link to={"/"} target="_blank">
              <Linkedin
                strokeWidth={1}
                className="size-5 cursor-pointer text-gray-800 transition-all duration-300 hover:text-green-800 md:size-6"
              />
            </Link>
            <Link to={"/"} target="_blank">
              <Instagram
                strokeWidth={1}
                className="size-5 cursor-pointer text-gray-800 transition-all duration-300 hover:text-green-800 md:size-6"
              />
            </Link>
            <Link to={"/"} target="_blank">
              <Mail
                strokeWidth={1}
                className="size-5 cursor-pointer text-gray-800 transition-all duration-300 hover:text-green-800 md:size-6"
              />
            </Link>
          </div>
        </div>

        {/* CONTENT */}
        <div className="w-full gap-10 lg:flex">
          {/* Product details */}
          <div className="w-full">
            <div className="flex flex-col gap-8 md:flex-row md:gap-14">
              {/* Product image */}
              <div className="w-full">
                <img
                  src={product.images && product.images[activeImage]}
                  alt="Product Image"
                  className="w-full"
                />

                {/* Thumbnails */}
                <div className="mt-5 flex w-full justify-center">
                  {product.thumbnails &&
                    product.thumbnails.map((thumbnail) => {
                      const index = product.thumbnails.findIndex(
                        (e) => e == thumbnail,
                      );
                      const isActive = index == activeImage;
                      return (
                        <img
                          onClick={() => setActiveImage(index)}
                          key={thumbnail}
                          src={thumbnail}
                          alt={index}
                          className={`h-[85px] w-[85px] cursor-pointer transition-all duration-300 hover:opacity-100 ${isActive ? "opacity-100" : "opacity-50"}`}
                        />
                      );
                    })}
                </div>
              </div>

              {/* Other details */}
              <div className="flex w-full flex-col gap-2">
                {/* Price & like button */}
                <div className="mb-2 flex w-full items-center justify-between">
                  <p className="text-[20px] font-semibold text-red-500">
                    ₦{(product.price && product.price.toLocaleString()) || 0}.00
                  </p>

                  <Heart
                    size={20}
                    onClick={() => updateLikedProducts(product.id)}
                    className={`cursor-pointer transition-all duration-300 hover:scale-110 ${isLiked ? "fill-red-500 stroke-red-500" : "stroke-gray-500"}`}
                  />
                </div>

                {/* Short description */}
                <p className="w-full max-w-[600px] text-[15px]">
                  {product.shortDescription}
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

                {/* Action buttons */}
                <div className="xs:flex-row mt-3 flex flex-col gap-3 md:mt-5 md:flex-col">
                  {/* Add to cart */}
                  <button
                    onClick={
                      !isAddedToCart
                        ? () => addToCart(itemQty)
                        : () => {
                          removeFromCart(product.id)
                        }
                    }
                    className={`flex h-12 w-full items-center justify-center gap-3 rounded-md px-4 py-2 text-xl text-white transition-all duration-500 ${!isAddedToCart ? "bg-green-700 hover:bg-green-800" : "bg-red-500 hover:bg-red-700"}`}
                  >
                    <ShoppingCart size={22} fill="white" />
                    <span className="text-[15px] font-bold">
                      {!isAddedToCart ? "Add to Cart" : "Remove Item"}
                    </span>
                  </button>

                  {/* Buy now */}
                  <button
                    onClick={() => {
                      toast.error("Not available", { toastId: "success1" });
                    }}
                    className={`flex h-12 w-full items-center justify-center gap-3 rounded-md bg-orange-500 px-4 py-2 text-xl text-black transition-all duration-500 hover:bg-orange-600`}
                  >
                    <CreditCard size={22} />
                    <span className="text-[15px] font-bold">Buy Now</span>
                  </button>
                </div>

                {/* Code category & details */}
                <div className="mt-7 flex w-full flex-col gap-2 border-t border-gray-200 pt-5 text-[15px]">
                  <span>SKU: {product.productCode}</span>
                  <span>Category: {product.category}</span>
                  <span>Tag: {product.tag}</span>
                </div>
              </div>
            </div>

            {/* Full description */}
            <div className="mt-14 flex w-full flex-col gap-4 text-[15px] text-gray-700">
              {product.fullDescription &&
                product.fullDescription.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>

            {/* Reviews */}
            <div className="mt-14 flex w-full flex-col gap-4">
              <div className="font-semibold">Reviews</div>

              <div className="flex w-full flex-col gap-3">
                <div className="flex w-[90%] items-center gap-5">
                  <ProductRatings
                    rating={5}
                    size={18}
                    fillColor={"fill-orange-400"}
                    strokeColor="stroke-orange-400"
                  />
                  <div className="shimmer h-3 w-full animate-pulse rounded-r-3xl bg-gray-300"></div>
                </div>
                <div className="flex w-[90%] items-center gap-5">
                  <ProductRatings
                    rating={4}
                    size={18}
                    fillColor={"fill-orange-400"}
                    strokeColor="stroke-orange-400"
                  />
                  <div className="shimmer h-3 w-full animate-pulse rounded-r-3xl bg-gray-300"></div>
                </div>
                <div className="flex w-[90%] items-center gap-5">
                  <ProductRatings
                    rating={3}
                    size={18}
                    fillColor={"fill-orange-400"}
                    strokeColor="stroke-orange-400"
                  />
                  <div className="shimmer h-3 w-full animate-pulse rounded-r-3xl bg-gray-300"></div>
                </div>
                <div className="flex w-[90%] items-center gap-5">
                  <ProductRatings
                    rating={2}
                    size={18}
                    fillColor={"fill-orange-400"}
                    strokeColor="stroke-orange-400"
                  />
                  <div className="shimmer h-3 w-full animate-pulse rounded-r-3xl bg-gray-300"></div>
                </div>
                <div className="flex w-[90%] items-center gap-5">
                  <ProductRatings
                    rating={1}
                    size={18}
                    fillColor={"fill-orange-400"}
                    strokeColor="stroke-orange-400"
                  />
                  <div className="shimmer h-3 w-full animate-pulse rounded-r-3xl bg-gray-300"></div>
                </div>
              </div>

              {/* Review options */}
              <div className="mt-6 flex flex-wrap items-center gap-5 border-b pb-6">
                <button className="flex items-center gap-2 rounded-[4px] border border-gray-400 bg-gray-200 px-4 py-[6px] text-[15px] text-gray-600 transition-all duration-300 hover:border-green-800 hover:bg-transparent hover:text-green-600">
                  <Camera size={18} /> <span>With images ({0})</span>
                </button>

                <button className="flex items-center gap-2 rounded-[4px] border border-gray-400 bg-gray-200 px-4 py-[6px] text-[15px] text-gray-600 transition-all duration-300 hover:border-green-800 hover:bg-transparent hover:text-green-600">
                  <Verified size={18} /> <span>Verified ({0})</span>
                </button>

                <button className="flex items-center gap-2 rounded-[4px] border border-gray-400 bg-gray-200 px-4 py-[6px] text-[15px] text-gray-600 transition-all duration-300 hover:border-green-800 hover:bg-transparent hover:text-green-600">
                  <span>All Stars ({0})</span>
                </button>
              </div>

              {/* All reviews */}
              <div className="flex flex-col gap-5">
                <p>There are no reviews yet.</p>
                <p>
                  Only logged in customers who have purchased this product may
                  leave a review.
                </p>
              </div>
            </div>

            {/*  */}
          </div>

          {/* Related products */}
        <RelatedProducts additionalClasses={"max-w-full lg:w-[300px]"} product={product} />  
        </div>
      </div>
    </div>
  );
};

function ZommImg() {
  // new

  // call the custom hook
  // useMouseOverZoom(source, target); // new

  return (
    <div className="relative h-screen w-screen bg-gradient-to-tr from-indigo-200 to-indigo-50">
      <div className="grid h-full grid-cols-12 gap-6">
        <div className="relative col-span-12 flex items-center px-12 md:col-span-6 md:px-24">
          {/* ...other contents */}
        </div>
        <div className="relative z-10 col-span-12 border-t-8 border-indigo-500 md:col-span-4 md:col-start-9 md:border-l-8 md:border-t-0">
          <img
            src={"/Tigernut-Relish-web.jpg"}
            className="h-full w-full cursor-crosshair bg-gray-100 object-cover"
          />
          <canvas className="pointer-events-none absolute bottom-full left-1/2 z-10 h-32 w-32 -translate-x-1/2 translate-y-1/2 border-8 border-indigo-500 bg-gray-200 md:-left-16 md:bottom-16 md:translate-x-0 md:translate-y-0" />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
