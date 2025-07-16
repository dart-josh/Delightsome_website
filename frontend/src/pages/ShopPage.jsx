/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import ProductTile from "../components/ProductTile";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronDown,
  LayoutGrid,
  StretchHorizontal,
  Filter,
  ChevronRight,
  ListRestart,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import FilterSidebar from "../components/FilterSidebar";
import { useSidebarHooks, usePageHooks } from "../Hooks/useGeneralHooks";
import { useProductStore } from "../Hooks/useProductStore";
import MetaWrap from "../utils/MetaWrap";

const ShopPage = ({ path }) => {
  const { openFilterSidebar } = useSidebarHooks();
  const {
    setCurrentPage: setPage,
    capitalizeFirstLetter,
    deafultTile_type,
    setDefaultTileType,
    applyPriceFilter,
  } = usePageHooks();
  const listRef = useRef(null);
  const { productList } = useProductStore();
  const [categorizedProducts, setCategorizedProducts] = useState([]);

  const [productsToView, setProductsToView] = useState(categorizedProducts);

  const history = useNavigate();

  let { category: param } = useParams();
  let { tag } = useParams();

  const category =
    (param && capitalizeFirstLetter(param)) ||
    (tag && capitalizeFirstLetter(tag)) ||
    "Shop";

  const [currentPage, setCurrentPage] = useState(1);
  const [sortValue, setSortValue] = useState("Default sorting");

  const [pageList, setPageList] = useState([]);

  // Apply category/tag
  useEffect(() => {
    const tempP = productList.filter((product) => {
      if (param) {
        return (
          product.category.toLocaleLowerCase() === param.toLocaleLowerCase()
        );
      } else if (tag) {
        return product.tag
          .toLocaleLowerCase()
          .includes(tag.toLocaleLowerCase());
      } else {
        return product;
      }
    });

    setCategorizedProducts(tempP);
  }, [param, tag, category, productList]);

  // Apply sort
  useEffect(() => {
    if (sortValue === "Default sorting") {
      productsToView.sort((a, b) => {
        return a.id - b.id;
      });
    }

    if (sortValue === "Popularity") {
      productsToView.sort((a, b) => {
        return b.reviewCount - a.reviewCount;
      });
    }

    if (sortValue === "Average rating") {
      productsToView.sort((a, b) => {
        return b.averageRating - a.averageRating;
      });
    }

    if (sortValue === "Latest") {
      productsToView.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
    }

    if (sortValue === "Price: low to high") {
      productsToView.sort((a, b) => {
        return a.price - b.price;
      });
    }

    if (sortValue === "Price: high to low") {
      productsToView.sort((a, b) => {
        return b.price - a.price;
      });
    }

    setProductsToView([...productsToView]);
  }, [sortValue]);

  // apply price filter
  useEffect(() => {
    const tempP = categorizedProducts.filter((product) => {
      if (
        applyPriceFilter[0] <= product.price &&
        product.price <= applyPriceFilter[1]
      ) {
        return product;
      }
    });

    setProductsToView(tempP);
    setCurrentPage(1);
  }, [applyPriceFilter, categorizedProducts]);

  // Divide list for pagination
  useEffect(() => {
    const tempPageList = [];
    const pages = productsToView.length / 12;
    for (let index = 1; index <= Math.ceil(pages); index++) {
      tempPageList.push(index);
    }

    setPageList(tempPageList);
    setCurrentPage(1);
    listRef.current.scrollIntoView({ top: 0, behavior: "smooth" });
  }, [productsToView]);

  // Set current page
  useEffect(() => {
    setPage(category);
    listRef.current.scrollIntoView({ top: 0, behavior: "smooth" });
  }, [currentPage, category]);

  // meta details
  const meta = category === "Yoghurt" ? "/yoghurt" : path;

  return (
    <MetaWrap path={meta}>
      <div className="xs:px-1 xs:mx-5 relative mx-2 max-w-[1200px] justify-center pt-5 sm:px-5 md:mx-auto">
        {/* Top bar */}
        <div className="hidden md:block">
          <div className="text-md mb-6 flex justify-between">
            <div className="flex gap-3">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>{category}</span>
            </div>

            <div
              onClick={() => history(-1)}
              className="flex cursor-pointer items-center gap-3 text-black"
            >
              <ChevronLeft size={18} />
              <span>Previous Page</span>
            </div>
          </div>

          {/* Page Title */}
          <div className="mb-8 text-3xl font-bold">{category}</div>
        </div>

        {/* Page details */}
        <div className="flex w-full">
          {/* Side bar */}
          <FilterSidebar additionalClasses={"max-w-[230px] hidden lg:flex"} />

          {/* Product details */}
          <div className="w-full">
            {/* Banner */}
            {category !== "Shop" && <Banner category={category} />}

            {/* Filter & sort */}
            <div ref={listRef} className="xs:mb-10 mb-6 px-0 md:px-5">
              <div className="flex items-center justify-between">
                <div
                  className="flex cursor-pointer items-center gap-2 md:hidden"
                  onClick={() => openFilterSidebar()}
                >
                  <Filter size={20} className="stroke-green-600" /> Filter
                </div>

                <div className="hidden items-center gap-4 md:flex">
                  <div
                    onClick={() => openFilterSidebar()}
                    className="hidden cursor-pointer rounded-lg border border-gray-400 p-[10px] md:flex lg:hidden"
                  >
                    <Filter size={22} />
                  </div>
                  {(productsToView && productsToView.length > 0 && (
                    <span>
                      {" "}
                      Showing{" "}
                      {productsToView.length <= 12
                        ? "all"
                        : `${(currentPage - 1) * 12 + 1}-${currentPage < pageList.length ? 12 : productsToView.length}`}{" "}
                      of {productsToView.length} results{" "}
                    </span>
                  )) || <span>No products</span>}
                </div>

                <div className="flex items-center gap-3">
                  <SortMenu
                    additionalClasses={"hidden xs:block"}
                    sortValue={sortValue}
                    setSortValue={setSortValue}
                  />
                  <LayoutGrid
                    onClick={() => setDefaultTileType("grid")}
                    className="cursor-pointer"
                    fill={deafultTile_type === "grid" ? "green" : "black"}
                    stroke={deafultTile_type === "grid" ? "green" : "black"}
                  />
                  <StretchHorizontal
                    onClick={() => setDefaultTileType("list")}
                    className="cursor-pointer"
                    fill={deafultTile_type === "list" ? "green" : "black"}
                    stroke={deafultTile_type === "list" ? "green" : "black"}
                  />
                </div>
              </div>

              <SortMenu
                additionalClasses={"xs:hidden block pt-2 w-full"}
                sortValue={sortValue}
                setSortValue={setSortValue}
              />
            </div>

            {/* Products */}
            {(productsToView && productsToView.length > 0 && (
              <div
                className={
                  deafultTile_type === "grid"
                    ? "xs:gap-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-0 lg:grid-cols-4"
                    : "flex w-full flex-col"
                }
              >
                {productsToView
                  .slice((currentPage - 1) * 12, currentPage * 12)
                  .map((product, idx) => {
                    return (
                      <div key={idx}>
                        <ProductTile
                          tile_type={deafultTile_type}
                          key={product.id}
                          product={product}
                        />
                      </div>
                    );
                  })}
              </div>
            )) || (
              <div className="flex items-center justify-center gap-4 text-lg font-bold">
                <ListRestart /> No products to view
              </div>
            )}

            <PageSelector
              pageList={pageList}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </MetaWrap>
  );
};

const Banner = ({ category }) => {
  const { categoryList } = useProductStore();

  const cat = categoryList.filter((cat) => {
    return category.toLocaleLowerCase() == cat.cat.toLocaleLowerCase();
  });

  if (cat && cat[0] && cat[0].banner)
    return (
      <div className="mb-8 w-full px-0 lg:px-5">
        <img src={cat[0].banner} alt="Banner Image" className="object-cover" />
      </div>
    );
};

const SortMenu = ({ additionalClasses, sortValue, setSortValue }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownRef = useRef(null);

  useEffect(() => {
    // Add event listener to the document object
    document.addEventListener("mousedown", (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    });

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", setIsOpen);
    };
  }, [setIsOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (value) => {
    setIsOpen(false);
    setSortValue(value);
  };

  const list_classes =
    "block px-4 py-3 border-b border-gray-100 text-sm text-gray-700 hover:text-green-700 cursor-pointer transition-all duration-300";

  const sortlist = [
    "Default sorting",
    "Popularity",
    "Average rating",
    "Latest",
    "Price: low to high",
    "Price: high to low",
  ];

  return (
    <div
      ref={dropDownRef}
      className={`mr-2 w-[200px] md:w-[280px] ${additionalClasses}`}
    >
      <div className="relative text-[15px]">
        <button
          className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-[10px]"
          onClick={toggleDropdown}
        >
          {" "}
          <div>
            <span className="mr-3 hidden font-bold md:inline">Sort by:</span>{" "}
            <span>{sortValue}</span>
          </div>
          <ChevronDown size={22} />
        </button>

        {isOpen && (
          <div className="scrollbar absolute z-10 max-h-[250px] w-full origin-top-right overflow-y-scroll bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <ul
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {sortlist.map((option) => (
                <li
                  key={option}
                  className={list_classes}
                  onClick={() => closeDropdown(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const PageSelector = ({ currentPage, setCurrentPage, pageList }) => {
  function changePage(increase) {
    if (increase) {
      if (currentPage < pageList.length) setCurrentPage(currentPage + 1);
    } else {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    }
  }

  return (
    <div className="my-10 flex w-full items-center justify-center gap-2">
      {currentPage > 1 && (
        <div
          onClick={() => changePage(false)}
          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-[50%] p-1 text-gray-600 transition-all duration-500 hover:bg-green-100 hover:text-green-950`}
        >
          <ChevronLeft size={22} />
        </div>
      )}
      {pageList.map((page) => (
        <div
          onClick={() => setCurrentPage(page)}
          key={page}
          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-[50%] p-1 transition-all duration-500 hover:bg-green-100 hover:text-green-950 ${currentPage == page ? "bg-green-100 text-green-950" : ""}`}
        >
          {page}
        </div>
      ))}
      {currentPage < pageList.length && (
        <div
          onClick={() => changePage(true)}
          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-[50%] p-1 text-gray-600 transition-all duration-500 hover:bg-green-100 hover:text-green-950`}
        >
          <ChevronRight size={22} />
        </div>
      )}
    </div>
  );
};

export default ShopPage;
