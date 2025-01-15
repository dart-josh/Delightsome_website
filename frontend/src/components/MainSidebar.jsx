/* eslint-disable react-hooks/exhaustive-deps */
import {
  LayoutGrid,
  Menu,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { useSidebarHooks, usePageHooks } from "../Hooks/useGeneralHooks";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const MainSidebar = () => {
  const mainSideBarRef = useRef(null);
  const { mainSidebarOpen, closeMainSidebar } = useSidebarHooks();
  const {currentPage} = usePageHooks();
  const [isOpen, setIsOpen] = useState(mainSidebarOpen);
  const [activeTab, setActiveTab] = useState("menu"); // who-we-are, menu

  useEffect(() => {
    // Add event listener to the document object
    document.addEventListener("mousedown", (event) => {
      if (
        mainSideBarRef.current &&
        mainSideBarRef.current.contains(event.target)
      ) {
        closeSideBar();
      }
    });

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", closeSideBar);
    };
  }, []);

  useEffect(() => {
    if (mainSidebarOpen) {
      setIsOpen(true);
    }

    setActiveTab("menu");
  }, [mainSidebarOpen]);

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const closeSideBar = async () => {
    setIsOpen(false);
    await delay(400);
    closeMainSidebar();
  };

  const menu_list = [
    {
      name: "Parfait",
      link: "/product-category/parfait",
    },
    {
      name: "Smoothies",
      link: "/product-category/smoothies",
    },
    {
      name: "Yoghurt",
      link: "/product-category/yoghurt",
    },
    {
      name: "Tigernut",
      link: "/product-category/tigernut",
    },
    {
      name: "Honey",
      link: "/product-category/honey",
    },
    {
      name: "Juice",
      link: "/product-category/juice",
    },
    {
      name: "Granola",
      link: "/product-category/granola",
    },
  ];

  const who_we_are_list = [
    {
      name: "Track order",
      link: "/track-order",
    },
    {
      name: "My account",
      link: "/my-account",
    },
    {
      name: "About Us",
      link: "/about",
    },
    {
      name: "My Orders",
      link: "/orders",
    },
    {
      name: "Wishlist",
      link: "/wishlist",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "LogOut",
      link: "/log-out",
    },
  ];

  return (
    <div
      className={`min-w-screen fixed inset-0 z-[70] flex min-h-screen transition-all duration-500 lg:hidden ${mainSidebarOpen ? "block" : "hidden"}`}
    >
      <div
        ref={mainSideBarRef}
        className="absolute z-10 h-full w-full bg-black opacity-70"
      ></div>

      {/* Main content */}
      <div
        className={`xs:w-[80%] absolute z-20 flex h-full w-[85%] max-w-[400px] flex-col justify-between bg-white transition-all duration-500 ${isOpen ? "left-0" : "-left-[400px]"}`}
      >
        {/* // body */}
        <div>
          {/* Top selector */}
          <div className="flex w-full items-center">
            <div
              onClick={() => setActiveTab("menu")}
              className={`flex h-[45px] w-full cursor-pointer items-center justify-center gap-2 transition-all duration-300 ${activeTab === "menu" ? "border bg-gray-100 text-green-700" : "bg-white text-gray-400"}`}
            >
              <Menu strokeWidth={2} size={23} />
              <span>Menu</span>
            </div>
            <div
              onClick={() => setActiveTab("who-we-are")}
              className={`flex h-[45px] w-full cursor-pointer items-center justify-center gap-2 transition-all duration-300 ${activeTab === "who-we-are" ? "border bg-gray-100 text-green-700" : "bg-white text-gray-400"}`}
            >
              <LayoutGrid strokeWidth={1} size={23} />
              <span>Who We Are</span>
            </div>
          </div>

          {/* Heading */}
          <div className="flex items-center justify-center border-b py-[10px]">
            Menu
          </div>

          {/* Menu list */}
          {activeTab === "menu" &&
            menu_list.map((item) => (
              <Link
                key={item.name}
                className={`flex cursor-pointer items-center justify-start border-b px-4 py-[10px] transition-all duration-300 hover:text-green-700 ${currentPage === item.name ? "text-green-700" : ""}`}
                onClick={closeSideBar}
                to={item.link}
              >
                {item.name}
              </Link>
            ))}

          {/* Who we are list */}
          {activeTab === "who-we-are" &&
            who_we_are_list.map((item) => (
              <Link
                key={item.name}
                className={`flex cursor-pointer items-center justify-start border-b px-4 py-[10px] transition-all duration-300 hover:text-green-700 ${currentPage === item.name ? "text-green-700" : ""}`}
                onClick={closeSideBar}
                to={item.link}
              >
                {item.name}
              </Link>
            ))}
        </div>

        {/* footer */}
        <div className="flex items-center justify-around border-t py-[10px] text-green-950">
          <Link>
          <Facebook
            strokeWidth={1}
            size={18}
            onClick={closeSideBar}
            className="cursor-pointer transition-all duration-300 hover:text-green-700"
          />
          </Link>
          <Link>
          <Instagram
            strokeWidth={1}
            size={18}
            onClick={closeSideBar}
            className="cursor-pointer transition-all duration-300 hover:text-green-700"
          />
          </Link>
          <Link>
          <Linkedin
            strokeWidth={1}
            size={18}
            onClick={closeSideBar}
            className="cursor-pointer transition-all duration-300 hover:text-green-700"
          />
          </Link>
          <Link>
          <Twitter
            strokeWidth={1}
            size={18}
            onClick={closeSideBar}
            className="cursor-pointer transition-all duration-300 hover:text-green-700"
          />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainSidebar;
