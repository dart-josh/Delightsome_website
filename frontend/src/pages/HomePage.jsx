import { AlignLeft, Verified } from "lucide-react";
import ImageSlider from "../components/Slider";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { usePageHooks } from "../Hooks/useGeneralHooks";

const HomePage = () => {
  const { setCurrentPage } = usePageHooks();

  useEffect(() => {
    setCurrentPage("Home");
  }, [setCurrentPage]);

  return (
    <div className="relative">
      {/* Banner */}
      <ImageSlider />

      <div className="relative max-w-[1200px] justify-center md:mx-auto lg:px-5">
        {/* Short Info */}
        <div className="bg-teal0 w-full px-1">
          <ShortInfo />
        </div>

        <Categories />

        <div className="flex justify-between bg-white">
          <span></span>
          <div className="mx-4 mt-5 flex items-center cursor-pointer font-semibold italic justify-center underline sm:text-xl gap-2 text-green-700 transition-all duration-500 hover:scale-105 sm:mx-10 sm:mt-10">
            <AlignLeft />
            <Link
              to={"/shop"}
            >
              Shop all
            </Link>
          </div>
        </div>

        <RecommendedProducts />
      </div>
    </div>
  );
};

const ShortInfo = () => {
  return (
    <div className="flex w-full flex-col bg-white py-10 sm:flex-row">
      <div className="my-7 flex w-full flex-col justify-center px-3 text-center md:px-4">
        <div className="mb-3 flex items-center justify-center gap-3 font-semibold">
          <Verified className="fill-green-600 stroke-white" size={26} />
          <span>Organic Certificated</span>
        </div>

        <span>
          Our products are fresh, 100% natural, delicious, nutritious, healthy
          and safe for consumption
        </span>
      </div>

      <div className="my-7 flex w-full flex-col justify-center border-x px-3 text-center md:px-4">
        <div className="mb-3 flex items-center justify-center gap-3 font-semibold">
          <Verified className="fill-green-600 stroke-white" size={26} />
          <span>Fast Delivery</span>
        </div>

        <span>We deliver to locations around our stores and within Lagos</span>
      </div>

      <div className="my-7 flex w-full flex-col justify-center px-3 text-center md:px-4">
        <div className="mb-3 flex items-center justify-center gap-3 font-semibold">
          <Verified className="fill-green-600 stroke-white" size={26} />
          <span>We Are Friendly</span>
        </div>

        <span>
          We give you an outstandingly delightful and satisfying experience
          every time we connect or interact with you across all channels
        </span>
      </div>
    </div>
  );
};

const Categories = () => {
  const categoryList = [
    {
      category: "Smoothies",
      id: 1,
      minPrice: 2000,
      image: "/smoothie.png",
      link: "/product-category/smoothies",
    },
    {
      category: "Juice",
      id: 2,
      minPrice: 2000,
      image: "/juice.png",
      link: "/product-category/juice",
    },
    {
      category: "Tigernut",
      id: 3,
      minPrice: 2000,
      image: "/tigernut.png",
      link: "/product-category/tigernut",
    },
    {
      category: "Greek Yoghurt",
      id: 4,
      minPrice: 5000,
      image: "/yoghurt.png",
      link: "/product-category/yoghurt",
    },
    {
      category: "Parfait",
      id: 5,
      minPrice: 3500,
      image: "/Parfait.png",
      link: "/product-category/parfait",
    },
    {
      category: "Honey",
      id: 6,
      minPrice: 4500,
      image: "/honey.png",
      link: "/product-category/honey",
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-1 bg-white sm:grid-cols-2 sm:gap-0 md:grid-cols-3 lg:gap-4">
      {categoryList.map((category) => (
        <div
          key={category.id}
          className="group relative z-0 min-h-[250px] cursor-pointer transition-all duration-300 sm:min-h-[350px]"
        >
          <img
            src={category.image}
            alt="Cover Image"
            className="z-1 absolute h-full w-full object-cover"
          />
          <div className="z-2 absolute h-full w-full bg-black opacity-35 transition-all duration-500 group-hover:opacity-55"></div>
          <div className="z-3 absolute flex h-full w-full items-center justify-center text-white">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex min-w-[150px] items-center justify-center border-b border-white pb-5 text-2xl font-bold text-white transition-all duration-500 group-hover:min-w-[180px]">
                {category.category}
              </div>
              <span className="text-xl font-semibold">
                From ₦{category.minPrice.toLocaleString()}
              </span>

              <Link
                to={category.link}
                className="rounded-lg bg-green-500 px-4 py-2 font-semibold text-white transition-all duration-500 group-hover:bg-green-700"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const RecommendedProducts = () => {
  const tagList = [
    {
      title: "Daily Drink Combination For Your Meals",
      id: 1,
      image: "/smoothie.png",
      link: "/product-tag/smoothies",
    },
    {
      title: "Detox and Body Cleansing Combination",
      id: 2,
      image: "/juice.png",
      link: "/product-tag/detox",
    },
    {
      title: "Daily Drink Combination For Skin Glow",
      id: 3,
      image: "/tigernut.png",
      link: "/product-tag/tigernut",
    },
    {
      title: "Greek Yoghurt",
      id: 4,
      image: "/yoghurt.png",
      link: "/product-tag/yoghurt",
    },
  ];

  return (
    <div className="mx-2 bg-white">
      <div className="flex w-full flex-col justify-center bg-white py-4">
        {/* Title */}
        <div className="mb-5 flex w-full items-center justify-between text-center">
          <span className="text-lg font-bold sm:text-2xl">
            Recommended For You
          </span>
        </div>

        <div className="xs:grid-cols-2 sm:grid-cols- grid grid-cols-1 gap-2 bg-white sm:gap-3 lg:grid-cols-4 lg:gap-4">
          {tagList.map((tag) => (
            <div
              key={tag.id}
              className="group relative z-0 min-h-[480px] cursor-pointer transition-all duration-300 sm:min-h-[480px]"
            >
              <img
                src={tag.image}
                alt="Cover Image"
                className="z-1 absolute h-full w-full object-cover"
              />
              <div className="z-2 absolute h-full w-full bg-black opacity-35 transition-all duration-500 group-hover:opacity-55"></div>
              <div className="z-3 absolute bottom-10 flex w-full flex-col items-center justify-center px-4 text-white">
                <div className="mb-4 flex items-center justify-center text-center text-2xl font-bold text-white">
                  {tag.title}
                </div>

                <Link
                  to={tag.link}
                  className="rounded-3xl bg-orange-500 px-10 py-2 font-semibold text-white transition-all duration-500 group-hover:bg-orange-700"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
