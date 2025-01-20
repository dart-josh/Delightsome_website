/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { ShoppingCart, Heart, Eye, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useProductHooks } from "../Hooks/useGeneralHooks";
import ProductRatings from "./ProductRatings";
import { useProductStore } from "../Hooks/useProductStore";
import { Link } from "react-router-dom";

const ProductTile = ({ product, tile_type }) => {
  // LIST
  if (tile_type === "list")
    return (
      <div className="xs:flex-row group mb-14 flex flex-col gap-5 md:mb-6 md:p-5">
        {/* Image */}

        <Image
          product={product}
          additional_box_class="max-w-[200px]"
          addtional_img_class="h-full object-cover"
        />

        <div className="xs:pl-2 flex flex-col pl-0 md:flex-row md:pl-4">
          {/* Product name, rating, description */}
          <div className="mb-5 md:mb-0 md:mr-5">
            {/* product name */}
            <p className="text-md mb-2 h-10 font-bold">{product.name}</p>

            {/* Rating */}
            <Ratings product={product} />

            {/* description */}
            <p className="text-md max-w-[400px] text-sm">
              {product.shortDescription}
            </p>
          </div>

          {/* Price & add to cart */}
          <div className="min-w-[150px]">
            <Price product={product} />
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    );

  // GRID
  return (
    <div className="group rounded-lg border border-transparent transition-all duration-500 hover:shadow-sm md:p-5 md:hover:border-gray-200">
      {/* Image */}
      <Image product={product} />

      {/* product name */}
      <p className="text-md mb-3 mt-3 h-10">{product.name}</p>

      {/* Rating */}
      <Ratings product={product} />

      {/* Price */}
      <Price product={product} />

      {/* Add to cart */}
      <AddToCartButton product={product} />

      <div className="h-3"></div>
    </div>
  );
};

// WIDGETS
// Image
const Image = ({ product, additional_box_class, addtional_img_class }) => {
  const { likedProducts, updateLikedProducts } = useProductStore();

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

  const { toggleProductQuickView } = useProductHooks();

  return (
    <div className={"relative " + additional_box_class}>
      <Link to={`/product/${product.link}`}>
        <img
          src={product.images && product.images[0]}
          alt={product.name}
          className={`w-full ${addtional_img_class} ${product.images[0] == "/products/" ? "h-[200px]" : ""}`}
        />
      </Link>
      {/* Bottom hover */}
      <div className="absolute bottom-0 left-0 hidden h-0 w-full items-center justify-around overflow-hidden bg-white transition-all duration-300 group-hover:h-11 md:flex">
        <div
          className="flex cursor-pointer flex-col items-center text-[13px]"
          onClick={() => updateLikedProducts(product.id)}
        >
          <Heart
            size={20}
            className={isLiked ? "fill-red-500 stroke-red-500" : ""}
          />
          <span>Wishlist</span>
        </div>
        <div
          onClick={() => toggleProductQuickView({ value: true, product })}
          className="flex cursor-pointer flex-col items-center text-[13px]"
        >
          <Eye size={20} />
          <span>Quickview</span>
        </div>
      </div>

      {/* Like button for smaller device */}
      <div className="absolute bottom-2 left-2 flex md:hidden">
        <Heart
          size={20}
          className={
            "cursor-pointer" + (isLiked ? " fill-red-500 stroke-red-500" : "")
          }
          onClick={() => updateLikedProducts(product.id)}
        />
      </div>

      {/* Quickview button for smaller device */}
      <div className="absolute bottom-2 right-2 flex md:hidden">
        <Eye
          onClick={() => toggleProductQuickView({ value: true, product })}
          size={22}
          className={"cursor-pointer"}
        />
      </div>
    </div>
  );
};

// BUTTON
const AddToCartButton = ({ product }) => {
  const { cartProducts, updateCart, removeFromCart } = useProductStore();

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [itemQty, setItemQty] = useState(1);

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
      link: product.link,
    };

    updateCart(cartP);
  };

  const increaseItemQty = () => {
    setItemQty(itemQty + 1);
  };

  const decreaseItemQty = () => {
    if (itemQty > 1) {
      setItemQty(itemQty - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  if (isAddedToCart)
    return (
      <div className="flex h-10 w-full max-w-[280px] items-center text-gray-700 md:max-w-full">
        <button
          onClick={decreaseItemQty}
          className="flex h-full w-[80px] items-center justify-center rounded-l-lg bg-gray-200 py-2"
        >
          <Minus size={20} />
        </button>
        <div className="flex h-full w-full items-center justify-center border-y border-gray-200">
          {itemQty}
        </div>
        <button
          onClick={increaseItemQty}
          className="flex h-full w-[80px] items-center justify-center rounded-r-lg bg-orange-400 py-2"
        >
          <Plus size={20} />
        </button>
      </div>
    );
  else
    return (
      <button
        onClick={() => addToCart(itemQty)}
        className="flex h-10 w-full max-w-[280px] items-center justify-center gap-2 rounded-md bg-green-700 px-4 py-2 text-xl text-white transition-all duration-500 hover:bg-green-800 md:max-w-full"
      >
        <ShoppingCart size={20} fill="white" />{" "}
        <span className="text-sm font-bold">Add to cart</span>
      </button>
    );
};

// PRICE
const Price = ({ product }) => {
  return (
    <p className="text-md mb-4 font-semibold text-red-500">
      ₦{product.price.toLocaleString()}
    </p>
  );
};

// RATINGS
const Ratings = ({ product }) => {
  return (
    <div className="mb-2 flex items-center gap-0.5">
      <ProductRatings rating={product.averageRating} />
      <span className="pl-1 text-[14px]">{product.reviewCount || 0}</span>
    </div>
  );
};

export default ProductTile;
