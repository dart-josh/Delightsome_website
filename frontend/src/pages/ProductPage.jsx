/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
import { usePageHooks } from "../Hooks/useGeneralHooks";
import {
  PenBox,
  Circle,
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
  Star,
  Twitter,
  UserCircle2,
  Loader,
} from "lucide-react";
import { useEffect, useState } from "react";
import ProductRatings from "../components/ProductRatings";
import RelatedProducts from "../components/RelatedProducts";
import { useProductStore } from "../Hooks/useProductStore";
import toast from "react-hot-toast";
import { useOrderHooks } from "../Hooks/useOrderHooks";

const ProductPage = () => {
  const { id: link } = useParams();

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productList, link]);

  const { setCurrentPage: setPage } = usePageHooks();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [itemQty, setItemQty] = useState(1);

  const [isLiked, setIsLiked] = useState(false);

  const { getReviews } = useOrderHooks();

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
      link: product.link,
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
        removeFromCart(product.id);
      }
    }
  };

  const [loadingReviews, setLoadingReviews] = useState(false);
  const [reviews, setReviews] = useState([]);

  const get_reviews = async (id) => {
    setLoadingReviews(true);
    const r = await getReviews(id);

    setReviews(r);
    setLoadingReviews(false);
  };

  // pgae title
  useEffect(() => {
    if (!product) return;
    setPage(product.name || "undefined");

    get_reviews(product.name);
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
    <div className="xs:mx-5 relative mx-[10px] max-w-[1200px] justify-center pt-5 md:mx-auto md:px-5">
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
              {reviews && reviews.length > 0 && reviews.length || 0} customer reviews
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
                          className={`h-[85px] w-[85px] transition-all duration-300 hover:opacity-100 ${isActive ? "cursor-not-allowed opacity-100" : "cursor-pointer opacity-50"}`}
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
                            removeFromCart(product.id);
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
            <div className="mt-14 w-full text-[15px] text-gray-700">
              {(product.productCode == "DJJCBR" && <BR />) ||
                (product.productCode == "DJJCBS" && <BS />) ||
                (product.productCode == "DJJCFGJ" && <FGJ />) ||
                (product.productCode == "DJJCLMU" && <LMU />) ||
                (product.productCode == "DJSMFM" && <FM />) ||
                (product.productCode == "DJSMGB" && <GB />) || (
                  <div className="flex w-full flex-col gap-4">
                    {product.fullDescription &&
                      product.fullDescription.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                  </div>
                )}
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
                <Link
                  to={`/drop-review?product=${product.link}`}
                  target="_blank"
                  className="flex items-center gap-2 rounded-[4px] border border-gray-400 bg-gray-200 px-4 py-[6px] text-[15px] text-gray-600 transition-all duration-300 hover:border-green-800 hover:bg-transparent hover:text-green-600"
                >
                  <PenBox size={18} /> <span>Leave a Review</span>
                </Link>

                {/* <Link
                  to={`/drop-rating?product=${product.link}`}
                  target="_blank"
                  className="flex items-center gap-2 rounded-[4px] border border-gray-400 bg-gray-200 px-4 py-[6px] text-[15px] text-gray-600 transition-all duration-300 hover:border-green-800 hover:bg-transparent hover:text-green-600"
                >
                  <Star size={18} /> <span>Rate this Product</span>
                </Link> */}
              </div>

              {/* All reviews */}
              <div>
                {(loadingReviews && (
                  <div className="flex w-full justify-center">
                    <Loader className="size-6 animate-spin" />
                  </div>
                )) ||
                  (reviews && reviews.length > 0 && (
                    <div className="flex flex-col gap-3">
                      {reviews.map((review, index) => (
                        <div key={index}>
                          <div className="flex gap-2 border-b border-gray-200 pb-3">
                            <UserCircle2
                            className="size-7"
                              strokeWidth={1}
                            />

                            <div className="w-full">
                              <div className="mb-2 font-semibold">
                                {review.name}
                              </div>

                              <div className="text-sm">{review.reviewText}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )) || <p>There are no reviews yet.</p>}
              </div>
            </div>

            {/*  */}
          </div>

          {/* Related products */}
          <RelatedProducts
            additionalClasses={"max-w-full lg:w-[300px]"}
            product={product}
          />
        </div>
      </div>
    </div>
  );
};

// Products Description
// br
function BR() {
  return (
    <div>
      {/* title */}
      <div className="mb-2 font-bold">
        Be Radiant: Glow from the Inside Out!
      </div>

      {/* p's */}
      <div className="flex flex-col gap-4">
        <div>
          Bright, bold, and bursting with flavor,{" "}
          <span className="font-bold">Be Radiant</span> is your ultimate
          companion for vibrant health and immunity. Crafted from the perfect
          blend of fresh carrot, juicy watermelon, tropical pineapple, tangy
          orange, and a touch of spicy ginger, this cold-pressed juice is
          designed to make you feel as radiant as you look.
        </div>

        <div>
          Made with 100% natural and organic ingredients,{" "}
          <span className="font-bold">Be Radiant</span> delivers a refreshing
          taste with no preservatives or additives. Thanks to our cold-pressed
          process, every sip is packed with essential nutrients, vitamins, and
          minerals straight from nature to your bottle. Ready to brighten your
          day and boost your health? Drink{" "}
          <span className="font-bold">Be Radiant</span> and let your inner glow
          shine!
        </div>

        <div>
          <div className="my-2 font-bold">Main Nutrients</div>

          <div className="ml-5 flex flex-col gap-0">
            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Carrot:</span> Rich in
                beta-carotene, vitamin A, and antioxidants.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Watermelon:</span> High in lycopene,
                vitamin C, and hydration properties.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Pineapple:</span> Contains vitamin
                C, bromelain, and manganese.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Orange:</span> Packed with vitamin
                C, potassium, and flavonoids.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Ginger:</span> Contains gingerol, an
                anti-inflammatory compound.
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="my-2 font-bold">Health Benefits</div>

          <div className="ml-5 flex flex-col gap-0">
            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Enhances Immunity:</span> High
                vitamin C content strengthens your immune system.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Boosts Eye Health:</span> Carrot’s
                beta-carotene supports clear vision and eye health.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Hydrates and Refreshes:</span>{" "}
                Watermelon keeps your body hydrated and energized.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Improves Skin Health:</span>{" "}
                Antioxidants and vitamins promote glowing, healthy skin.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Aids Digestion:</span> Ginger and
                pineapple support a healthy gut and reduce bloating.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Supports Heart Health:</span>{" "}
                Lycopene in watermelon and vitamin C improve cardiovascular
                function.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Reduces Inflammation:</span> Ginger
                and antioxidants combat inflammation in the body.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Detoxifies Naturally:</span> Helps
                cleanse the liver and flush out toxins.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        At{" "}
        <span className="font-bold">
          Delightsome Juices, Smoothies & Whole Foods
        </span>
        , we’ve perfected the art of cold-pressing to ensure every nutrient and
        drop of flavor is preserved. Unlike traditional juicing, our method
        keeps the goodness intact—no heat, no compromise, just pure, radiant
        health in every sip
      </div>
    </div>
  );
}

// bs
function BS() {
  return (
    <div>
      {/* title */}
      <div className="mb-2 font-bold">
        Brighter Side - Your Daily Dose of Immunity and Vitality
      </div>

      {/* p's */}
      <div className="flex flex-col gap-4">
        <div>
          Introducing <span className="font-bold">Brighter Side</span>, a
          cold-pressed juice crafted by{" "}
          <span className="font-bold">
            Delightsome Juices, Smoothies & Whole Foods
          </span>{" "}
          to brighten your health and invigorate your senses. This
          immunity-boosting blend of carrot, pineapple, orange, lemon, apple,
          and ginger is a powerhouse of vitamins, antioxidants, and natural
          goodness. Cold-pressed to preserve every nutrient and ounce of flavor,{" "}
          <span className="font-bold">Brighter Side</span> offers pure, organic
          nourishment with no preservatives or additives. Sip your way to a
          stronger immune system, a healthier you, and a brighter day all in one
          delicious bottle.
        </div>

        <div>
          Made with 100% natural and organic ingredients,{" "}
          <span className="font-bold">Brighter Side</span> delivers a refreshing
          taste with no preservatives or additives. Thanks to our cold-pressed
          process, every sip is packed with essential nutrients, vitamins, and
          minerals straight from nature to your bottle. Ready to brighten your
          day and boost your health? Drink{" "}
          <span className="font-bold">Brighter Side</span> and let your inner
          glow shine!
        </div>

        <div>
          <div className="my-2 font-bold">Main Nutrients</div>

          <div className="ml-5 flex flex-col gap-0">
            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Carrot:</span> Beta-carotene,
                Vitamin A, Fiber
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Pineapple:</span> Vitamin C,
                Bromelain, Manganese
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Orange:</span> Vitamin C, Potassium,
                Flavonoids
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Lemon:</span> Vitamin C, Citric
                Acid, Antioxidants
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Apple:</span> Fiber, Vitamin C,
                Natural Sweetness
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Ginger:</span> Gingerol,
                Anti-inflammatory Compounds
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="my-2 font-bold">Health Benefits</div>

          <div className="ml-5 flex flex-col gap-0">
            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Boosts immunity</span> with a high
                dose of Vitamin C from orange, lemon, and pineapple.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Promotes eye health</span> with
                carrot’s beta-carotene and Vitamin A.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Reduces inflammation</span> and
                soothes digestion with ginger and pineapple’s bromelain.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Supports skin health</span> with
                antioxidants that combat free radicals.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Enhances digestion</span> with the
                natural enzymes from ginger and pineapple.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">
                  Provides a natural energy boost
                </span>{" "}
                with fruit-based sugars and vitamins.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Aids in weight management</span>{" "}
                with nutrient-dense, low-calorie ingredients.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">
                  Hydrates and detoxifies the body
                </span>{" "}
                with the alkalizing properties of lemon and orange.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        Drink <span className="font-bold">Brighter Side </span>
        and discover the delicious way to fuel your body, fight fatigue, and
        feel your best every day.
      </div>
    </div>
  );
}

// fgj
function FGJ() {
  return (
    <div>
      {/* title */}
      <div className="mb-2 font-bold">
        Feel Good – Refresh, Detox, and Thrive Naturally
      </div>

      {/* p's */}
      <div className="flex flex-col gap-4">
        <div>
          Step into a world of vitality with{" "}
          <span className="font-bold">Feel Good</span>, our fresh, green
          cold-pressed juice that’s designed to detox your body and boost your
          immunity. This exquisite blend of cucumber, pineapple, spinach, mint
          leaves, basil leaves, pumpkin leaves, and ginger is 100% natural and
          organic—crafted without preservatives or additives to deliver pure,
          green goodness in every sip.
        </div>

        <div>
          Cold-pressed to perfection,{" "}
          <span className="font-bold">Feel Good</span> preserves the full
          spectrum of nutrients, making it your ultimate companion for
          detoxification, hydration, and rejuvenation. Whether you’re cleansing,
          looking to energize, or simply aiming for better health,{" "}
          <span className="font-bold">Feel Good</span> is your ticket to
          thriving inside and out.
        </div>

        <div>
          <div className="my-2 font-bold">Main Nutrients</div>

          <div className="ml-5 flex flex-col gap-0">
            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Cucumber:</span> Hydration, Vitamin
                K, Silica
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Pineapple:</span> Vitamin C,
                Bromelain, Manganese
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Spinach:</span> Iron, Magnesium,
                Vitamin A
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Mint Leaves:</span> Antioxidants,
                Vitamin C, Menthol
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Basil Leaves:</span> Vitamin K,
                Anti-inflammatory Properties
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Pumpkin Leaves:</span> Fiber,
                Potassium, Beta-Carotene
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Ginger:</span> Gingerol,
                Anti-inflammatory Compounds
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="my-2 font-bold">Health Benefits</div>

          <div className="ml-5 flex flex-col gap-0">
            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Aids in detoxification</span> by
                supporting liver and kidney function with cucumber and greens.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Boosts immunity</span> with Vitamin
                C from pineapple and mint leaves.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">
                  Enhances hydration and skin health
                </span>{" "}
                with the high water content of cucumber and pumpkin leaves.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Promotes better digestion</span>{" "}
                with ginger and bromelain from pineapple.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Reduces inflammation</span> with
                ginger and basil leaves’ natural compounds.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">
                  Supports eye health and vision
                </span>{" "}
                with beta-carotene from pumpkin leaves.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Helps alkalize the body</span>,
                balancing pH levels for optimal health.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Provides essential nutrients</span>{" "}
                like iron and magnesium for improved energy and vitality.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        Whether you’re starting your day or winding down,{" "}
        <span className="font-bold">Feel Good </span>
        is the perfect companion for health-conscious individuals who refuse to
        compromise. Take the step toward balance, vitality, and true wellness
        with every bottle.
      </div>
    </div>
  );
}

// lmu
function LMU() {
  return (
    <div>
      {/* title */}
      <div className="mb-2 font-bold">Rise and Shine with Lift Me Up</div>

      {/* p's */}
      <div className="flex flex-col gap-4">
        <div>
          Meet <span className="font-bold">Lift Me Up</span>, the ultimate super
          detox cold-pressed juice crafted by Delightsome Juices, Smoothies &
          Whole Foods to rejuvenate your body and energize your spirit. Packed
          with the cleansing power of cucumber, celery, spinach, parsley, apple,
          and ginger, this nutrient-rich blend is your go-to solution for
          detoxification, healthy weight loss, and a fresh start. Every bottle
          of <span className="font-bold">Lift Me Up</span> is a burst of
          vitality, designed to help you feel lighter, healthier, and more
          alive. Whether {"you're"} embarking on a cleanse program or just
          looking for a refreshing reset,{" "}
          <span className="font-bold">Lift Me Up</span> is here to elevate your
          health and your day.
        </div>

        <div>
          <div className="my-2 font-bold">Main Nutrients</div>

          <div className="ml-5 flex flex-col gap-0">
            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Cucumber:</span> Hydration, Vitamin
                K, Potassium
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Celery:</span> Vitamin K, Potassium,
                Antioxidants, Fiber
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Spinach:</span> Iron, Folate,
                Magnesium, Vitamin K
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Parsley:</span> Vitamin C, Vitamin
                K, Antioxidants, Calcium
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Apple:</span> Fiber, Vitamin C,
                Natural Sweetness
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Ginger:</span> Gingerol,
                Anti-inflammatory Compounds
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="my-2 font-bold">Health Benefits</div>

          <div className="ml-5 flex flex-col gap-0">
            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Cleanses the body</span>: Celery,
                parsley, and cucumber work together to flush out toxins and
                support kidney function.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Promotes healthy digestion</span>:
                Ginger and fiber from apple aid in reducing bloating and
                improving gut health.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Boosts immunity</span>: Parsley and
                spinach provide Vitamin C and iron to strengthen your immune
                system.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Supports weight loss</span>:
                Low-calorie, nutrient-dense ingredients help maintain a healthy
                weight.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Reduces inflammation</span>: Ginger
                and celery contain anti-inflammatory compounds that soothe the
                body.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Enhances hydration</span>: Cucumber
                and celery are hydrating powerhouses to keep you refreshed.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Improves bone health</span>: Spinach
                and parsley are rich in Vitamin K and calcium, essential for
                strong bones.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Aids skin health</span>:
                Antioxidants in parsley and apple promote radiant and youthful
                skin.
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="my-2 mt-5 font-bold">
            Nutritional Facts (Per 500ml Serving)
          </div>

          {/* head */}
          <div className="mb-1 ml-5 flex items-center gap-1 font-bold">
            <div className="w-[160px]">Nutrient</div>
            <div className="ml-2 w-[100px] text-center">Amount</div>
            <div className="ml-10 w-[100px] text-center">% Daily Value</div>
          </div>

          {/* list */}
          <div className="ml-5 flex flex-col gap-0">
            <div className="flex items-center gap-1">
              <div className="w-[160px] font-medium">Calories</div>
              <div className="ml-2 w-[100px] text-center">80-100 kcal</div>
              <div className="ml-10 w-[100px] text-center">5%</div>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-[160px] font-medium">Total Fat</div>
              <div className="ml-2 w-[100px] text-center">0.5g</div>
              <div className="ml-10 w-[100px] text-center">1%</div>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-[160px] font-medium">Saturated Fat</div>
              <div className="ml-2 w-[100px] text-center">0g</div>
              <div className="ml-10 w-[100px] text-center">0%</div>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-[160px] font-medium">Cholesterol</div>
              <div className="ml-2 w-[100px] text-center">0mg</div>
              <div className="ml-10 w-[100px] text-center">0%</div>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-[160px] font-medium">Sodium</div>
              <div className="ml-2 w-[100px] text-center">20mg</div>
              <div className="ml-10 w-[100px] text-center">1%</div>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-[160px] font-medium">Total Carbohydrates</div>
              <div className="ml-2 w-[100px] text-center">22g</div>
              <div className="ml-10 w-[100px] text-center">7%</div>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-[160px] font-medium">Dietary Fiber</div>
              <div className="ml-2 w-[100px] text-center">4g</div>
              <div className="ml-10 w-[100px] text-center">16%</div>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-[160px] font-medium">Sugars</div>
              <div className="ml-2 w-[100px] text-center">18g</div>
              <div className="ml-10 w-[100px] text-center">-</div>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-[160px] font-medium">Protein</div>
              <div className="ml-2 w-[100px] text-center">2g</div>
              <div className="ml-10 w-[100px] text-center">4%</div>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-[160px] font-medium">Vitamin C</div>
              <div className="ml-2 w-[100px] text-center">75mg</div>
              <div className="ml-10 w-[100px] text-center">83%</div>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-[160px] font-medium">Vitamin K</div>
              <div className="ml-2 w-[100px] text-center">140mcg</div>
              <div className="ml-10 w-[100px] text-center">117%</div>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-[160px] font-medium">Potassium</div>
              <div className="ml-2 w-[100px] text-center">450mg</div>
              <div className="ml-10 w-[100px] text-center">10%</div>
            </div>

            {/*  */}
          </div>
        </div>

        <div>
          <div className="mb-2 mt-5 text-[16px] font-bold">
            Compelling Marketing Story
          </div>

          <div className="font-bold">
            Lift Me Up – Elevate Your Health, One Sip at a Time
          </div>

          <div className="flex flex-col gap-3">
            <div>
              In the hustle and bustle of everyday life, your body deserves a
              moment to recharge. That’s why we created{" "}
              <span className="font-bold">Lift Me Up</span>, a cold-pressed
              juice that combines nature’s most powerful detoxifying ingredients
              to help you cleanse, refresh, and feel your best.
            </div>

            <div>
              With every sip, you’ll experience the crisp hydration of cucumber,
              the revitalizing crunch of celery, and the earthy strength of
              spinach and parsley. Apple brings a touch of natural sweetness,
              while ginger adds a zesty kick to wake up your senses.
            </div>

            <div>
              Designed for detox enthusiasts and anyone on a journey to healthy
              weight loss, <span className="font-bold">Lift Me Up</span> is more
              than a juice—it’s a commitment to your well-being. Start your
              cleanse, lighten your load, and let{" "}
              <span className="font-bold">Lift Me Up</span> carry you to a
              healthier, happier you.
            </div>
          </div>
        </div>

        {/*  */}
      </div>

      <div className="mt-6"></div>
    </div>
  );
}

// fm
function FM() {
  return (
    <div>
      {/* title */}
      <div className="mb-2 font-bold">
        Follow Me - The Smoothie That Leads the Way to Wellness
      </div>

      {/* p's */}
      <div className="flex flex-col gap-4">
        <div>
          Imagine a drink that’s not just delicious but also works wonders for
          your body—welcome to the world of{" "}
          <span className="font-bold">Follow Me</span>. With the hydrating power
          of watermelon, the tropical zing of pineapple, the creamy sweetness of
          banana, and the crisp vitality of apple, this smoothie is a sensory
          delight packed with health benefits.
        </div>

        <div>
          Join the growing community of health-conscious individuals who’ve made{" "}
          <span className="font-bold">Follow Me</span> their go-to wellness
          drink. Available now in our signature 500ml bottle, this smoothie is
          more than a treat; it’s a step towards a better you. So, why wait?
          Follow the path to health and happiness with{" "}
          <span className="font-bold">Follow Me</span> today!
        </div>

        <div>
          <div className="my-2 font-bold">Main Nutrients</div>

          <div className="ml-5 flex flex-col gap-0">
            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Watermelon:</span> Vitamin C,
                Vitamin A, Potassium, Lycopene
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Pineapple:</span> Vitamin C,
                Manganese, Bromelain
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Banana:</span> Potassium, Vitamin
                B6, Magnesium
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Apple:</span> Fiber, Vitamin C,
                Antioxidants
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="my-2 font-bold">Health Benefits</div>

          <div className="ml-5 flex flex-col gap-0">
            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Boosts hydration levels</span> with
                watermelon’s high water content.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Enhances immune function</span> with
                Vitamin C from pineapple and apple.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Supports digestion</span> with fiber
                and natural enzymes like bromelain.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Provides natural energy</span> from
                banana and its healthy carbohydrates.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Aids heart health</span> with
                potassium from banana and watermelon.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Promotes glowing skin</span> with
                antioxidants like lycopene and Vitamin C.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Helps reduce inflammation</span>{" "}
                with pineapple’s anti-inflammatory properties.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Maintains a healthy weight</span>{" "}
                with its low-calorie, nutrient-dense ingredients.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6"></div>
    </div>
  );
}

// gb
function GB() {
  return (
    <div>
      {/* title */}
      <div className="mb-2 font-bold">
        Green Blossom – The Creamy Delight of Wellness!
      </div>

      {/* p's */}
      <div className="flex flex-col gap-4">
        <div>
          Indulge in the creamy goodness of{" "}
          <span className="font-bold">Green Blossom</span>, the ultimate avocado
          smoothie that brings together nature’s finest. With the lush richness
          of avocado, the tangy sweetness of pineapple, the green power of
          spinach, and the crisp freshness of apple, this smoothie is more than
          just a drink – it’s a green revolution in a bottle! Bursting with
          nutrients, flavor, and natural energy,{" "}
          <span className="font-bold">Green Blossom</span> is your perfect
          partner for a healthier, happier you. 100% natural, organic, and free
          from preservatives or additives, it’s the perfect sip for those who
          love their wellness fresh, delicious, and green.
        </div>

        <div>
          <div className="my-2 font-bold">Main Nutrients</div>

          <div className="ml-5 flex flex-col gap-0">
            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Avocado:</span> Healthy fats,
                potassium, and vitamin E.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Pineapple:</span> Vitamin C,
                bromelain, and antioxidants.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Spinach:</span> Iron, folate, and
                magnesium.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Apple:</span> Dietary fiber and
                natural sugars.
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="my-2 font-bold">Health Benefits</div>

          <div className="ml-5 flex flex-col gap-0">
            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Boosts immunity</span> with rich
                antioxidants and vitamin C.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Supports heart health</span> with
                healthy fats and potassium.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Enhances digestion</span> through
                dietary fiber and bromelain.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Promotes glowing skin</span> with
                vitamin E and hydration.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Provides sustained energy</span> and
                curbs unhealthy cravings.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Supports eye health</span> with
                lutein and vitamin A from spinach.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Aids in weight management</span> by
                providing satiety with low-calorie density.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Circle className="fill-gray-700" size={7} />
              <div>
                <span className="font-bold">Helps reduce inflammation</span>{" "}
                with natural anti-inflammatory compounds.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6"></div>
    </div>
  );
}

const ImagePreview = ({ src, alt, width, height, zoomScale = 2 }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top } = e.target.getBoundingClientRect();
    const x = e.clientX - left + 170;
    const y = e.clientY - top + 120;

    setCursorPosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className="relative inline-block overflow-hidden"
      style={{ width, height }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover`}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      {isHovered && (
        <div
          className="pointer-events-none absolute z-10 border-[2px] bg-center bg-no-repeat transition"
          style={{
            width: `150px`,
            height: `150px`,
            top: `${cursorPosition.y - height / (2 * zoomScale)}px`,
            left: `${cursorPosition.x - width / (2 * zoomScale)}px`,
            backgroundImage: `url(${src})`,
            backgroundPosition: `-${cursorPosition.x * (zoomScale - 1)}px -${cursorPosition.y * (zoomScale - 1)}px`,
            backgroundSize: `${width * zoomScale}px ${height * zoomScale}px`,
          }}
        />
      )}
    </div>
  );
};

export default ProductPage;
