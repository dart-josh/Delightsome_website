/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { TwoThumbInputRange } from "react-two-thumb-input-range";
import { Minus } from "lucide-react";
import { SquareX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePageHooks, useSidebarHooks } from "../Hooks/useGeneralHooks";
import { Link } from "react-router-dom";
import { useProductStore } from "../Hooks/useProductStore";
import { fetch_image } from "../Hooks/serveruploader";

const FilterSidebar = ({ additionalClasses }) => {
  const [priceRange, setPriceRange] = useState([1500, 10000]);
  const { setApplyPriceFilter, applyPriceFilter } =
    usePageHooks();
  const { closeFilterSidebar } = useSidebarHooks();

  useEffect(() => {
    setPriceRange(applyPriceFilter);
  }, [applyPriceFilter]);

  const categoryList = [
    "Granola",
    "Honey",
    "Juice",
    "Parfait",
    "Smoothies",
    "Tigernut",
    "Yoghurt",
    "View All",
  ];

  const tagList = [
    "Granola",
    "Honey",
    "Juice",
    "Parfait",
    "Smoothies",
    "Tigernut",
    "Yoghurt",
    "Detox",
  ];

  const {featuredProducts} = useProductStore();

  return (
    <div
      className={`w-full flex-col gap-3 border-r text-[15px] ${additionalClasses}`}
    >
      {/* Category */}
      <div className="flex flex-col gap-5">
        <p className="font-bold">Product categories</p>
        {categoryList.map((category, idx) => (
          <Link
            to={`${category == "View All" ? `/shop` : `/product-category/${category}`}`}
            key={idx}
            onClick={() => closeFilterSidebar(false)}
          >
            <p className="cursor-pointer">{category}</p>
          </Link>
        ))}
      </div>

      {/* Price filter */}
      <div className="mt-6 flex flex-col gap-4 border-t border-gray-300 py-8">
        <h4 className="font-bold">Price</h4>

        {/*  slider */}
        <RangeSlider value={priceRange} setValue={setPriceRange} />

        <div className="flex items-center gap-1">
          <span>Price:</span>
          <span className="font-semibold">{`₦${priceRange[0].toLocaleString()}`}</span>
          <span className="">
            <Minus strokeWidth={1} />{" "}
          </span>
          <span className="font-semibold">{`₦${priceRange[1].toLocaleString()}`}</span>
        </div>
        <button
          onClick={() => setApplyPriceFilter([priceRange[0], priceRange[1]])}
          className="text-md max-w-28 rounded-md bg-green-600 px-5 py-2 font-bold text-white"
        >
          Filter
        </button>
      </div>

      {/* Product tags */}
      <div className="flex flex-col gap-4 border-t border-gray-300 py-8">
        <h4 className="font-bold">Product tags</h4>
        <ul className="flex-wrap">
          {tagList.map(
            (tag, idx) =>
              (
                <Link
                  to={`/product-tag/${tag}`}
                  key={idx}
                  onClick={() => closeFilterSidebar(false)}
                >
                  <div className="mb-3 mr-3 inline-flex cursor-pointer rounded-xl bg-gray-200 px-4 py-[3px] text-[14px] text-gray-800 transition-all duration-300 hover:bg-gray-300">
                    {tag}
                  </div>
                </Link>
              ),
          )}
        </ul>
      </div>

      {/* Feautured Products */}
      <div className="flex flex-col gap-4 border-t border-gray-300 py-8">
        <h4 className="font-bold">Products</h4>
        <ul className="flex flex-col">
          {featuredProducts && featuredProducts.length > 0 && featuredProducts.map((product, idx) => (
            <Link key={idx} to={`/product/${product.link}`} onClick={() => closeFilterSidebar(false)}>
            <div
              
              className="mb-4 flex cursor-pointer gap-4 text-[15px]"
            >
              <img
                src={product.images && fetch_image(product.images[0])}
                alt="Product image"
                className="max-w-[70px]"
              />
              <div className="flex max-w-[120px] flex-col">
                <span className="mb-1">{product.name}</span>
                <span className="font-semibold text-red-600">
                ₦{product.price.toLocaleString()}
                </span>
              </div>
            </div>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

function RangeSlider({ value, setValue }) {
  const onValueChange = (values) => {
    if (values[1] - values[0] > 500) {
      setValue(values);
    }
  };

  return (
    <TwoThumbInputRange
      onChange={onValueChange}
      values={value}
      min={1000}
      max={20000}
      thumbColor="#2d7b3b"
      trackColor="#2d7b3b"
      showLabels={false}
    />
  );
}

export const FilterSidebarDiv = () => {
  const sideNavRef = useRef(null);
  const { filterSidebarOpen, closeFilterSidebar } = useSidebarHooks();
  const [isOpen, setIsOpen] = useState(filterSidebarOpen);

  useEffect(() => {
    // Add event listener to the document object
    document.addEventListener("mousedown", (event) => {
      if (sideNavRef.current && sideNavRef.current.contains(event.target)) {
        closeSideBar();
      }
    });

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", closeSideBar);
    };
  }, []);

  useEffect(() => {
    if (filterSidebarOpen) {
      setIsOpen(true);
    }
  }, [filterSidebarOpen]);

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const closeSideBar = async () => {
    setIsOpen(false);
    await delay(400);
    closeFilterSidebar();
  };

  return (
    <div
      className={`min-w-screen fixed inset-0 z-[70] flex min-h-screen lg:hidden ${filterSidebarOpen ? "block" : "hidden"}`}
    >
      <div
        ref={sideNavRef}
        className="absolute z-10 h-full w-full bg-black opacity-70"
      ></div>
      <div
        className={`scrollbar relative z-40 w-full max-w-[280px] overflow-y-scroll bg-white transition-all duration-500 ${isOpen ? "left-0" : "-left-[280px]"}`}
      >
        {/* Close button */}
        <div
          onClick={closeSideBar}
          className="fixed top-0 flex w-full max-w-[280px] cursor-pointer justify-center gap-6 bg-gray-200 p-3 text-gray-600 transition-all duration-300 hover:bg-gray-300"
        >
          <SquareX />
        </div>
        <FilterSidebar additionalClasses={"pl-5 pt-16"} />
      </div>
    </div>
  );
};

export default FilterSidebar;
