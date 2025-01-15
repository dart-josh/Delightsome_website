/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useProductStore } from "../Hooks/useProductStore";
import { Link } from "react-router-dom";

const RelatedProducts = ({ product, additionalClasses }) => {
  const { getRelatedProducts, relatedProducts } = useProductStore();

  const mql = window.matchMedia("(min-width: 1024px)");
  const mql2 = window.matchMedia("(max-width: 600px)");

  const [bigScreen, setBigScreen] = useState(mql.matches);
  const [mobileView, setMobileView] = useState(mql2.matches);

  // Fetch related products
  useEffect(() => {
    getRelatedProducts(product);
    setActiveSlide(0);
  }, [product]);

  mql.addEventListener("change", (e) => {
    const largeView = e.matches;
    if (largeView) {
      setBigScreen(true);
    } else {
      setBigScreen(false);
    }
  });

  mql2.addEventListener("change", (e) => {
    const smallView = e.matches;
    if (smallView) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  });

  const [activeSlide, setActiveSlide] = useState(0);
  const [products_to_display, setProductsToDisplay] = useState([]);

  const [minSlide, setMinSlide] = useState(0);
  const [maxSlide, setMaxSlide] = useState(0);

  // change slide
  const changeSlide = (direction) => {
    if (direction === "left") {
      if (activeSlide > minSlide) {
        setActiveSlide(activeSlide - 1);
      }
    } else {
      if (activeSlide < maxSlide) {
        setActiveSlide(activeSlide + 1);
      }
    }
  };

  // set products to view
  const setActiveProducts = (index) => {
    if (bigScreen || mobileView) {
      setProductsToDisplay(relatedProducts.slice(index * 3, 3 * (index + 1)));
    } else {
      setProductsToDisplay(relatedProducts.slice(index * 6, 6 * (index + 1)));
    }
  };

  // split products nto view
  useEffect(() => {
    if (relatedProducts.length > 0) {
      const multiple = bigScreen || mobileView ? 3 : 6;
      const max = relatedProducts.length / multiple - 1;

      if (activeSlide > max) {
        setActiveSlide(max.toFixed());
      }

      setMinSlide(0);
      setMaxSlide(max < 0 ? 0 : max);

      setActiveProducts(activeSlide);
    }
  }, [activeSlide, relatedProducts]);

  return (
    <div
      className={`mt-10 w-full flex-col overflow-hidden lg:mt-0 ${additionalClasses}`}
    >
      {/* Title */}
      <div className="flex items-center justify-between border-b pb-3 font-semibold">
        <span>{product ? 'Related products' : 'Featured products'}</span>
        <div className="flex items-center">
          <ChevronLeft
            className={`cursor-pointer transition-all duration-300 ${activeSlide <= minSlide ? "cursor-not-allowed opacity-30" : "cursor-pointer hover:text-green-700"}`}
            onClick={() => changeSlide("left")}
            strokeWidth={2}
            size={24}
          />
          <ChevronRight
            className={`transition-all duration-300 ${activeSlide >= maxSlide ? "cursor-not-allowed opacity-30" : "cursor-pointer hover:text-green-700"}`}
            onClick={() => changeSlide("right")}
            strokeWidth={2}
            size={24}
          />
        </div>
      </div>

      {/* products */}
      <div className={`flex-wrap transition-all duration-300 lg:flex-col`}>
        {products_to_display &&
          products_to_display.map((product) => (
            <Link
              to={`/product/${product.link}`}
              key={product.id}
              className={`mr-5 inline-flex min-w-full cursor-pointer gap-4 border-b py-4 text-[15px] sm:min-w-[250px] lg:min-w-full`}
            >
              <img
                src={product.images && product.images[0]}
                alt="Product image"
                className="max-w-[50px]"
              />
              <div className="flex flex-col">
                <span className="mb-1 font-semibold">{product.name}</span>
                <span className="font-semibold text-red-600">
                  ₦{product.price.toLocaleString()}
                </span>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
