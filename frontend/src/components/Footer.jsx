import {
  CircleUser,
  Facebook,
  Home,
  Instagram,
  Linkedin,
  List,
  Mail,
  Phone,
  RotateCcw,
  ShoppingCart,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";
import { usePageHooks } from "../Hooks/useGeneralHooks";
import { useProductStore } from "../Hooks/useProductStore";

export const MobileFooter = () => {
  const { setCurrentPage, currentPage } = usePageHooks();
  const { cartProducts } = useProductStore();
  return (
    <div className="min-w-screen fixed bottom-0 left-0 z-50 w-full md:hidden">
      <div className="flex min-h-[55px] items-center justify-around border-t bg-white px-4 pt-[10px] text-[12px] shadow-sm">
        <Link
          to={"/"}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`flex cursor-pointer flex-col items-center transition duration-300 hover:scale-110 hover:text-green-800 ${currentPage === "Home" ? "scale-110 text-green-800" : ""}`}
        >
          <Home size={20} />
          <span>Home</span>
        </Link>

        <Link
          to={"/cart"}
          onClick={() => setCurrentPage("Cart")}
          className={`relative flex cursor-pointer flex-col items-center transition duration-300 hover:scale-110 hover:text-green-800 ${currentPage === "Cart" ? "scale-110 text-green-800" : ""}`}
        >
          <div className="absolute -right-[9px] -top-[9px] flex h-[21px] w-[21px] items-center justify-center rounded-full border-2 border-white bg-orange-500 text-[12px] font-semibold">
            {cartProducts.length}
          </div>
          <ShoppingCart size={20} />
          <span>Cart</span>
        </Link>

        <Link
          to={"/orders"}
          onClick={() => setCurrentPage("My Orders")}
          className={`flex cursor-pointer flex-col items-center transition duration-300 hover:scale-110 hover:text-green-800 ${currentPage === "My Orders" ? "scale-110 text-green-800" : ""}`}
        >
          <List size={20} />
          <span>My Orders</span>
        </Link>

        <Link
          to={"/viewed"}
          onClick={() => setCurrentPage("Viewed")}
          className={`flex cursor-pointer flex-col items-center transition duration-300 hover:scale-110 hover:text-green-800 ${currentPage === "Viewed" ? "scale-110 text-green-800" : ""}`}
        >
          <RotateCcw size={20} />
          <span>Viewed</span>
        </Link>

        <Link
          to={"/my-account"}
          onClick={() => setCurrentPage("My Account")}
          className={`flex cursor-pointer flex-col items-center transition duration-300 hover:scale-110 hover:text-green-800 ${currentPage === "My Account" ? "scale-110 text-green-800" : ""}`}
        >
          <CircleUser size={20} />
          <span>Account</span>
        </Link>
      </div>
    </div>
  );
};

export const Footer = () => {
  const category_nav_list = [
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
    {
      name: "Parfait",
      link: "/product-category/parfait",
    },
    {
      name: "Honey",
      link: "/product-category/honey",
    },
    {
      name: "Granola",
      link: "/product-category/granola",
    },
  ];

  const help_nav_list = [
    {
      name: "Term Of Use",
      link: "/term-of-use",
    },
    {
      name: "Privacy Policy",
      link: "/privacy-policy",
    },
    {
      name: "About Us",
      link: "/about",
    },
    {
      name: "Reviews",
      link: "/reviews",
    },
  ];

  return (
    <div className="mt-10 w-full border-t bg-white">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-4 pb-2 pt-10 text-black md:pb-0 md:pt-20">
        {/* Top area */}
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row">
          <div className="flex w-full flex-col justify-between gap-12 md:flex-row lg:justify-normal lg:gap-14 xl:gap-20">
            {/* Company info */}
            <div className="flex flex-col gap-5 md:max-w-[400px]">
              <Link to={"/"} onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}>
                <img
                  src="/delightsome-logo-121x61-1.png"
                  alt="Logo"
                  width={121}
                />
              </Link>

              <div>
                Delightsome Juice, Smoothies and Whole Foods is a Nigerian
                innovative brand basically established to enhance the quality of
                life and promote health through the production of 100% natural,
                fresh and nutrient-dense COLD-PRESSED JUICES, SMOOTHIES AND
                WHOLE FOODS.
              </div>

              <div className="flex cursor-pointer items-center gap-4 transition-all duration-300 hover:text-green-600">
                <Mail size={20} />
                <span className="text-green-600">
                  info@delightsomejuice.com
                </span>
              </div>

              <div className="flex cursor-pointer items-center gap-4 transition-all duration-300 hover:text-green-600">
                <Phone size={20} />
                <span className="text-[18px] font-bold">+234 903 846 3737</span>
              </div>
            </div>

            {/* Navigations */}
            <div className="flex w-full max-w-[320px] justify-between gap-5">
              {/* Category */}
              <div className="flex flex-col gap-4">
                <div className="font-bold sm:mb-1">PRODUCTS</div>
                {category_nav_list.map((e) => {
                  return (
                    <Link
                      className={`cursor-pointer transition-all duration-300 hover:text-green-600`}
                      key={e.name}
                      to={e.link}
                    >
                      {e.name}
                    </Link>
                  );
                })}
              </div>

              {/* Help & guide */}
              <div className="flex flex-col gap-3">
                <div className="font-bold sm:mb-1">HELP & GUIDE</div>
                {help_nav_list.map((e) => {
                  return (
                    <Link
                      className="cursor-pointer transition-all duration-300 hover:text-green-600"
                      key={e.name}
                      to={e.link}
                    >
                      {e.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="max-w-[250px flex max-w-[280px] flex-col gap-4">
            <div className="font-bold lg:mb-1">NEWSLETTER</div>

            <div>
              Don’t miss out on{" "}
              <span className="font-semibold">thousands of great deals</span> &
              promotions from Delightsome.
            </div>

            <div className="relative flex min-h-10 w-full items-center rounded-md border border-gray-300 bg-gray-200/50 px-3 text-sm text-black">
              {/* Text box */}
              <input
                type="email"
                className="w-full bg-transparent outline-none"
                name="email"
                placeholder="Email address"
              />
            </div>

            <button className="flex w-[100px] items-center justify-center rounded-md bg-green-700 px-5 py-2 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-green-900">
              Subscribe
            </button>

            <div className="mt-6 flex gap-6 text-gray-700">
              <Facebook
                size={32}
                className="cursor-pointer fill-gray-700"
                strokeWidth={0}
              />
              <Instagram size={32} className="cursor-pointer" />
              <Linkedin
                size={32}
                className="cursor-pointer fill-gray-700"
                strokeWidth={0}
              />
              <Twitter
                size={32}
                className="cursor-pointer fill-gray-700"
                strokeWidth={0}
              />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-y-4 border-t pt-8 md:flex-row-reverse md:border-none md:pt-0">
          <img src="/card-payment.png" alt="Card Paymnet" width={121} />

          <div className="w-full font-medium text-gray-500">
            © {2024}{" "}
            <span className="font-bold">
              Delightsome Juice, Smoothies and Whole Foods.
            </span>{" "}
            All rights reserved | Dz Technology
          </div>
        </div>
      </div>
    </div>
  );
};
