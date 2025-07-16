/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
// import { Link } from "react-router-dom";
import {
  Menu,
  Search,
  Heart,
  X,
  ChevronDown,
  Phone,
  User2,
  ShoppingCart,
  Minus,
  Plus,
  Delete,
} from "lucide-react";
import { useSidebarHooks, usePageHooks } from "../Hooks/useGeneralHooks";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../Hooks/useProductStore";
import { fetch_image } from "../Hooks/serveruploader";
import { useAuthStore } from "../store/authStore";

export const MobileHeader = () => {
  const { openMainSidebar } = useSidebarHooks();
  const { currentPage, setCurrentPage } = usePageHooks();
  const { productList, likedProducts, cartProducts } = useProductStore();

  const inputRef = useRef();

  const [searchOn, setSearchOn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const [inputFocused, setinputFocused] = useState(false);
  const onFocus = () => setinputFocused(true);
  const onBlur = async () => {
    await delay(200);
    setinputFocused(false);
  };

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchList, setSearchList] = useState([]);

  const onChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  // Search effect
  useEffect(() => {
    if (searchKeyword) {
      const sc_list = productList.filter(
        (product) =>
          product.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
          (product.category === activeFilter || activeFilter === "All") &&
          searchKeyword !== " ",
      );
      setSearchList(sc_list);
    } else {
      setSearchList([]);
    }
  }, [searchKeyword, activeFilter]);

  const setFilter = (filter) => {
    setActiveFilter(filter);
    setShowFilterMenu(false);
  };

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const openSearch = async () => {
    setSearchOn(true);
    await delay(400);
    setIsOpen(true);
    inputRef.current.value = "";
    setSearchKeyword("");
    inputRef.current.focus();
  };

  const closeSearch = async () => {
    setSearchOn(false);
    setShowFilterMenu(false);
    await delay(400);
    setIsOpen(false);
  };

  const selectProduct = async (product) => {
    inputRef.current.value = product.name;
    await delay(300);
    closeSearch();
  };

  const categoryList = [
    "All",
    "Granola",
    "Honey",
    "Juice",
    "Parfait",
    "Smoothies",
    "Tigernut",
    "Yoghurt",
  ];

  return (
    // max-w-[1200px]
    <header className="min-w-screen fixed left-0 right-0 top-0 z-[60] block w-full md:mx-auto lg:hidden">
      {/* Cover */}
      <div
        onClick={closeSearch}
        className={`absolute inset-0 z-[30] min-h-screen bg-black opacity-70 ${isOpen ? "block" : "hidden"}`}
      ></div>

      {/* Header */}
      <div
        className={`absolute left-0 right-0 top-0 z-[40] flex min-h-[50px] items-center justify-between bg-white px-4 shadow-sm transition-all duration-500 sm:px-6 ${isOpen ? "border-b" : ""}`}
      >
        {/* side menu */}
        <div>
          <Menu
            onClick={() => {
              openMainSidebar();
              closeSearch();
            }}
            size={28}
          />
        </div>

        {/* logo */}
        <div className="font-semibold text-center">
          {currentPage == "Home" ? (
            <Link
              to={"/"}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img
                src="/delightsome-logo-121x61-1.png"
                alt="Logo"
                width={121}
              />
            </Link>
          ) : (
            currentPage
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5 text-gray-700">

          {/* User Profile */}
          <div className="md:flex hidden">
            <UserArea />
          </div>

          <div className="md:flex items-center hidden">
            <Link
            to={"/cart"}
            className="group relative cursor-pointer transition-all duration-300 hover:text-green-600"
            onClick={() => setCurrentPage("Cart")}
          >
            <div className="absolute -right-[9px] -top-[9px] flex h-[21px] w-[21px] items-center justify-center rounded-full border-2 border-white bg-orange-500 text-[12px] font-semibold transition-all duration-300 group-hover:scale-125 group-hover:bg-orange-600 group-hover:text-white">
              {cartProducts.length}
            </div>
            <ShoppingCart size={22} />
          </Link>
          </div>

          

          {/* Wishlist */}
          <Link
            to={"/wishlist"}
            className="group relative cursor-pointer transition-all duration-300 hover:text-green-600"
            onClick={closeSearch}
          >
            <div className="absolute -right-[9px] -top-[9px] flex h-[21px] w-[21px] items-center justify-center rounded-full border-2 border-white bg-orange-500 text-[12px] font-semibold transition-all duration-300 group-hover:scale-125 group-hover:bg-orange-600 group-hover:text-white">
              {likedProducts.length}
            </div>
            <Heart size={22} />
          </Link>

          {/* open Search */}
          {!searchOn ? (
            <Search
              onClick={openSearch}
              className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-green-900"
              size={21}
            />
          ) : (
            <X
              onClick={closeSearch}
              className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-green-900"
              size={21}
            />
          )}
        </div>
      </div>

      {/* Search area */}
      <div
        className={`absolute left-0 right-0 top-0 z-[35] flex min-h-[50px] items-center justify-between bg-white px-4 text-[16px] shadow-sm transition-all duration-1000 sm:px-6 ${searchOn ? "top-[50px]" : "top-[-50px]"}`}
      >
        <div className="flex w-full items-center gap-4">
          {/* Filter */}
          <div
            className="flex cursor-pointer items-center gap-1"
            onClick={() => setShowFilterMenu(!showFilterMenu)}
          >
            <span className="max-w-[80px] overflow-clip">{activeFilter}</span>
            <ChevronDown strokeWidth={1} size={18} />
          </div>

          <input
            ref={inputRef}
            className="w-full border-none outline-none"
            placeholder="Searching for..."
            type="text"
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
          />

          {searchKeyword ? (
            <X
              size={18}
              className="min-w-[18px] cursor-pointer"
              onClick={() => {
                setSearchKeyword("");
                inputRef.current.value = "";
              }}
            />
          ) : (
            <Search size={18} className="min-w-[18px]" />
          )}
        </div>
      </div>

      {/* Filter menu */}
      {showFilterMenu && (
        <div className="absolute left-3 top-[95px] z-[38] flex h-full min-h-[280px] w-full max-w-[200px] overflow-hidden rounded-md border bg-white shadow-md sm:left-5">
          <div className="scrollbar h-full w-full overflow-y-scroll">
            {categoryList.map((category) => (
              <div
                key={category}
                className="cursor-pointer border-b px-3 py-2 transition-all duration-300 hover:text-green-800"
                onClick={() => setFilter(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search list */}
      <div className="absolute left-0 right-0 top-[100px] z-[35]">
        {/* Search head */}
        {inputFocused && searchKeyword && (
          <div className="flex h-full min-h-[50px] w-full items-center bg-white px-4 sm:px-6">
            {searchList.length > 0
              ? `${searchList.length} results found with "${searchKeyword}"`
              : "No products found"}
          </div>
        )}

        {/* List */}
        {inputFocused && (
          <div className="scrollbar flex h-full max-h-[250px] w-full flex-col overflow-y-scroll bg-white">
            {searchList.map((product) => (
              <Link
                to={`/product/${product.link}`}
                key={product.id}
                className="flex cursor-pointer gap-4 border-t px-3 py-3 text-[15px]"
                onClick={() => selectProduct(product)}
              >
                <img
                  src={product.images && fetch_image(product.images[0])}
                  alt="Product image"
                  className="max-w-[60px]"
                />
                <div className="flex flex-col">
                  <span className="mb-1">{product.name}</span>
                  <span className="font-semibold text-green-700">
                    ₦{product.price.toLocaleString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export const MainHeader = () => {
  const [inputFocused, setinputFocused] = useState(false);

  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const [cartAreaOpen, setCartAreaOpen] = useState(false);

  const cartRef = useRef(null);

  return (
    <header className="min-w-screen relative left-0 right-0 top-0 z-[50] hidden w-full lg:flex">
      {/* Cover */}
      <div
        onClick={() => {
          setShowFilterMenu(false);
          setinputFocused(false);
          setCartAreaOpen(false);
        }}
        className={`fixed inset-0 z-[50] h-full min-h-screen bg-black opacity-70 transition-all duration-500 ${inputFocused || showFilterMenu || cartAreaOpen ? "block" : "hidden"}`}
      ></div>

      <div className="absolute left-0 right-0 top-0 z-[55]">
        {/* green top */}
        <div className="left-0 right-0 top-0 w-full bg-lime-500">
          <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-2 font-medium text-white">
            <span>Welcome to Delightsome Juice, Smoothies & Whole Foods</span>
            <Link to={"/wishlist"}>My Wishlist</Link>
          </div>
        </div>

        {/* Main head */}
        <div className="sticky left-0 right-0 top-0 w-full bg-white">
          <div className="mx-auto flex w-full max-w-[1200px] items-center gap-8 px-4 py-5 font-medium text-white xl:gap-12">
            {/* Logo */}
            <Link
              to={"/"}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="min-w-[165px]"
            >
              <img
                src="/delightsome-logo-165x83-1.png"
                alt="Logo"
                width={165}
              />
            </Link>

            {/* search box */}
            <SearchArea
              setinputFocused={setinputFocused}
              inputFocused={inputFocused}
              setShowFilterMenu={setShowFilterMenu}
              showFilterMenu={showFilterMenu}
            />

            <div className="relative flex items-end gap-3 xl:gap-10">
              <OnlineShopping />
              <UserArea />
              <CartButton
                setCartAreaOpen={setCartAreaOpen}
                cartAreaOpen={cartAreaOpen}
              />

              {
                <CartArea
                  cartAreaOpen={cartAreaOpen}
                  setCartAreaOpen={setCartAreaOpen}
                  cartRef={cartRef}
                />
              }
            </div>
          </div>
        </div>

        {/* Navbar */}
        <NavbarArea />
      </div>
    </header>
  );
};


const SearchArea = ({
  inputFocused,
  setinputFocused,
  showFilterMenu,
  setShowFilterMenu,
}) => {
  const inputRef = useRef();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchList, setSearchList] = useState([]);

  const [activeFilter, setActiveFilter] = useState("All");

  const onChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const { productList } = useProductStore();

  const onFocus = () => {
    setShowFilterMenu(false);
    setinputFocused(true);
  };
  const onBlur = async () => {
    await delay(200);
    setinputFocused(false);
  };

  // Search effect
  useEffect(() => {
    if (searchKeyword) {
      const sc_list = productList.filter(
        (product) =>
          product.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
          (product.category === activeFilter || activeFilter === "All") &&
          searchKeyword !== " ",
      );
      setSearchList(sc_list);
    } else {
      setSearchList([]);
    }
  }, [searchKeyword, activeFilter]);

  const setFilter = (filter) => {
    setActiveFilter(filter);
    setShowFilterMenu(false);
  };

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const selectProduct = async () => {
    inputRef.current.value = "";
    setSearchKeyword("");
    setinputFocused(false);
  };

  const categoryList = [
    "All",
    "Granola",
    "Honey",
    "Juice",
    "Parfait",
    "Smoothies",
    "Tigernut",
    "Yoghurt",
  ];

  return (
    <div className="relative flex h-full max-h-10 w-full items-center rounded-md border border-gray-300 bg-gray-200/50 text-black">
      {/* Category Filter */}
      <div
        className="flex cursor-pointer items-center gap-1 px-4 py-[10px]"
        onClick={() => {
          setShowFilterMenu(!showFilterMenu);
        }}
      >
        <span className="">{activeFilter}</span>
        <ChevronDown strokeWidth={1} size={18} />
      </div>

      {/* Text box */}
      <input
        type="text"
        className="w-full bg-transparent outline-none"
        ref={inputRef}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        placeholder="Search"
      />

      {/* Seacrh icon */}
      <div className="ml-4 cursor-pointer border-l border-gray-300 px-3 py-[10px]">
        {searchKeyword ? (
          <X
            size={18}
            className=""
            onClick={() => {
              setSearchKeyword("");
              inputRef.current.value = "";
            }}
          />
        ) : (
          <Search size={18} className="" />
        )}
      </div>

      {/* Filter menu */}
      {showFilterMenu && (
        <div className="absolute left-0 top-11 z-[70] flex h-full min-h-[280px] w-full max-w-[200px] overflow-hidden rounded-md border bg-white shadow-md">
          <div className="scrollbar h-full w-full overflow-y-scroll">
            {categoryList.map((category) => (
              <div
                key={category}
                className="cursor-pointer border-b px-3 py-2 transition-all duration-300 hover:text-green-800"
                onClick={() => setFilter(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search list */}
      <div
        className={`absolute left-0 right-0 top-11 z-[65] ${inputFocused && searchKeyword ? "border" : ""}`}
      >
        {/* Search head */}
        {inputFocused && searchKeyword && (
          <div className="flex h-full min-h-[50px] w-full items-center bg-white px-4 sm:px-6">
            {searchList.length > 0
              ? `${searchList.length} results found with "${searchKeyword}"`
              : "No products found"}
          </div>
        )}

        {/* List */}
        {inputFocused && (
          <div className="scrollbar flex h-full max-h-[250px] w-full flex-col overflow-y-scroll bg-white">
            {searchList.map((product) => (
              <Link
                to={`/product/${product.link}`}
                key={product.id}
                className="flex cursor-pointer gap-4 border-t px-3 py-3 text-[15px]"
                onClick={() => selectProduct()}
              >
                <img
                  src={product.images && fetch_image(product.images[0])}
                  alt="Product image"
                  className="max-w-[60px]"
                />
                <div className="flex w-full items-center justify-between">
                  <span>{product.name}</span>
                  <span className="font-semibold text-green-700">
                    ₦{product.price.toLocaleString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const OnlineShopping = () => {
  return (
    <div className="flex items-center gap-2 text-black">
      <Phone strokeWidth={0} className="fill-green-700" size={32} />
      <div className="flex flex-col gap-2 leading-none">
        <span className="max-w-[50px] text-[18px] font-bold">
          Online Shopping
        </span>
        <span className="min-w-[125px] text-[14px]">+234 903 846 3737</span>
      </div>
    </div>
  );
};

const UserArea = () => {
  const { user } = useAuthStore();

  return (
    <Link
      to={"/myaccount"}
      className="flex cursor-pointer items-center gap-0.5 lg:gap-2 text-black"
    >
      <User2 strokeWidth={0} className="fill-green-700" size={32} />

      <div className="flex flex-col gap-2 leading-none">
        <span className="max-w-[80px] text-[18px] font-bold">{user ? user?.name : 'Your Account'}</span>
        {<span className="min-w-[110px] text-[14px] hidden lg:flex">{user ? 'View account' : 'Login / Register'}</span>}
      </div>
    </Link>
  );
};

const CartButton = ({ setCartAreaOpen, cartAreaOpen }) => {
  const { cartProducts } = useProductStore();

  const [totalCartPrice, setTotalCartPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    for (let index = 0; index < cartProducts.length; index++) {
      const element = cartProducts[index];
      const amt = element.price * element.qty;
      total += amt;
    }

    setTotalCartPrice(total);
  }, [cartProducts]);

  return (
    <button
      onClick={() => setCartAreaOpen(!cartAreaOpen)}
      className="flex w-full min-w-[110px] cursor-pointer flex-col items-center rounded-md bg-orange-500 px-3 py-1 leading-none text-white"
    >
      <div className="flex items-center gap-6">
        <div className="relative mt-2">
          <div className="absolute -right-3 -top-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-green-500 text-[12px] font-semibold">
            {cartProducts.length}
          </div>
          <ShoppingCart strokeWidth={3} size={18} className="fill-white" />
        </div>

        <span className="font-bold">Cart</span>
      </div>

      <div className="flex w-full justify-end">
        <span className="text-[15px] font-normal">
          ₦{totalCartPrice.toLocaleString()}
        </span>
      </div>
    </button>
  );
};

const CartArea = ({ cartAreaOpen, setCartAreaOpen, cartRef }) => {
  const { cartProducts, updateCart, removeFromCart } = useProductStore();

  const [totalCartPrice, setTotalCartPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    for (let index = 0; index < cartProducts.length; index++) {
      const element = cartProducts[index];
      const amt = element.price * element.qty;
      total += amt;
    }
    setTotalCartPrice(total);
  }, [cartProducts]);

  const increaseItemQty = (itemId) => {
    const item = cartProducts.find((item) => item.id === itemId);
    if (item) {
      item.qty += 1;
      updateCart(item);
    }
  };

  // decreaae quantity
  const decreaseItemQty = (itemId) => {
    const item = cartProducts.find((item) => item.id === itemId);
    if (item && item.qty > 1) {
      item.qty -= 1;
      updateCart(item);
    }
  };

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(cartAreaOpen);
  }, [cartAreaOpen]);

  if (!cartAreaOpen) return <></>;

  return (
    <div
      ref={cartRef}
      className={`absolute right-0 top-[70px] z-[55] overflow-hidden transition-all duration-500 ${isOpen ? "max-w-[400px]" : "max-w-0"}`}
    >
      <div
        className={`flex min-w-[400px] max-w-[400px] flex-col gap-4 overflow-hidden rounded-lg border bg-white text-gray-700 shadow-md transition-all duration-500 ${isOpen ? "opacity-1" : "opacity-0"}`}
      >
        {/* Cart Items */}
        {(cartProducts && cartProducts.length > 0 && (
          <div
            className={`scrollbar flex max-h-[300px] flex-col gap-4 overflow-y-scroll px-5 py-5`}
          >
            {cartProducts.map((item) => {
              const { id, name, image, price, qty, link } = item;
              const total = price * qty;
              return (
                <div key={id} className="flex w-full gap-4">
                  <Link
                    to={`/product/${link}`}
                    className="w-[60px]"
                    onClick={() => setCartAreaOpen(false)}
                  >
                    <img
                      src={fetch_image(image)}
                      alt="Product Image"
                      width={60}
                      height={0}
                    />
                  </Link>

                  <div className="flex w-full items-center justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <Link
                        to={`/product/${link}`}
                        onClick={() => setCartAreaOpen(false)}
                        className="transition-all duration-300 hover:text-green-700"
                      >
                        {name}
                      </Link>

                      <div className="flex items-center gap-3">
                        {/* Item quantity */}
                        <div className="flex h-8 w-full min-w-[100px] items-center rounded-md border border-gray-200 text-gray-700">
                          <button
                            onClick={() => decreaseItemQty(id)}
                            className="flex h-full min-w-[30px] items-center justify-center rounded-l-md transition-all duration-300 hover:bg-gray-200 hover:text-green-900"
                          >
                            <Minus size={15} />
                          </button>
                          <div className="flex h-full w-full items-center justify-center">
                            {qty}
                          </div>
                          <button
                            onClick={() => increaseItemQty(id)}
                            className="flex h-full min-w-[30px] items-center justify-center rounded-r-md transition-all duration-300 hover:bg-orange-400 hover:text-green-900"
                          >
                            <Plus size={15} />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-[15px] font-bold text-red-500">
                          ₦{total.toLocaleString()}.00
                        </div>
                      </div>
                    </div>

                    <Delete
                      className="cursor-pointer"
                      onClick={() => removeFromCart(id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )) || (
          <div className="flex justify-center px-5 py-5">No Items in Cart</div>
        )}

        <div className="flex flex-col gap-5 border-t px-5 pb-5 pt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Total</div>
            <div className="text-2xl font-bold text-red-500">
              ₦{totalCartPrice.toLocaleString()}.00
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link
              to={"/checkout"}
              onClick={() => setCartAreaOpen(false)}
              className="flex items-center justify-center rounded-md bg-green-700 px-7 py-2 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-green-900"
            >
              Checkout
            </Link>

            <Link
              to={"/cart"}
              onClick={() => setCartAreaOpen(false)}
              className="flex items-center justify-center rounded-md border bg-transparent px-7 py-2 text-[15px] font-semibold text-gray-700 transition-all duration-300 hover:bg-green-700 hover:text-white"
            >
              View cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavbarArea = () => {
  const nav_list = [
    {
      name: "Tigernut",
      link: "/product-category/tigernut",
    },
    {
      name: "Smoothies",
      link: "/product-category/smoothies",
    },
    {
      name: "Juice",
      link: "/product-category/juice",
    },
    {
      name: "Yoghurt",
      link: "/product-category/yoghurt",
    },
    // {
    //   name: "Parfait",
    //   link: "/product-category/parfait",
    // },
    
    {
      name: "Honey",
      link: "/product-category/honey",
    },
    {
      name: "Granola",
      link: "/product-category/granola",
    },
    {
      name: "Track order",
      link: "/track-order",
    },
    {
      name: "About Us",
      link: "/about",
    },
    {
      name: "Reviews",
      link: "/reviews",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  return (
    <div className="top-0 flex w-full flex-col">
      <div className="w-full bg-white">
        <div className="mx-auto mb-1 flex w-full max-w-[1200px] items-center px-4 font-medium text-gray-700">
          {nav_list.map((item) => {
            const index = nav_list.findIndex((e) => e.name === item.name);
            return (
              <Link
                key={item.name}
                to={item.link}
                className={`border-gray-300 px-5 py-1 transition-all duration-300 hover:text-green-600 ${index === 0 ? "border-x" : "border-r"}`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex w-full">
        <div className="h-[5px] w-full bg-green-600"></div>
        <div className="h-[5px] w-full bg-yellow-500"></div>
        <div className="h-[5px] w-full bg-red-600"></div>
        <div className="h-[5px] min-w-[400px] bg-green-600"></div>
        <div className="h-[5px] w-full bg-yellow-500"></div>
        <div className="h-[5px] w-full bg-sky-500"></div>
        <div className="h-[5px] w-full bg-red-600"></div>
      </div>
    </div>
  );
};
