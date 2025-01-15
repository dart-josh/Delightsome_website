/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";

// const images = [
//   "/sliders/slider-1-360x187.jpg",
//   "/sliders/slider-2-360x187.jpg",
//   "/sliders/slider-3-360x187.jpg",
//   "/sliders/slider-4-360x187.jpg",
// ];

// const images_xs = [
//   "/sliders/slider-1-570x131.jpg",
//   "/sliders/slider-2-570x131.jpg",
//   "/sliders/slider-3-570x131.jpg",
//   "/sliders/slider-4-570x131.jpg",
// ];

// 640 sm - 768 md

const images = [
  "/sliders/slider-4-1536x352.jpg",
  "/sliders/slider-1-1536x352.jpg",
  "/sliders/slider-2-1536x352.jpg",
  "/sliders/slider-3-1536x352.jpg",
];

const images_lg = [
  "/sliders/slider-4-1920x440.jpg",
  "/sliders/slider-1-1920x440.jpg",
  "/sliders/slider-2-1920x440.jpg",
  "/sliders/slider-3-1920x440.jpg",
];

const ImageSlider = () => {
  // const lg_condition = window.matchMedia("( min-width: 1024px )");
  const md_condition = window.matchMedia("( min-width: 600px )");
  // const xs_condition = window.matchMedia("( min-width: 500px )");

  const [imagesToDisplay, setImagesToDisplay] = useState([]);
  const [imageHeight, setImageHeight] = useState("h-[250px]"); // 360, 180, 190, 140

  // const [lgView, setLgView] = useState(lg_condition.matches);
  const [mdView, setMdView] = useState(md_condition.matches);
  // const [xsView, setXsView] = useState(xs_condition.matches);

  // window resize listener
  useEffect(() => {
    window.addEventListener("resize", () => {
      // setLgView(lg_condition.matches);
      setMdView(md_condition.matches);
      // setXsView(xs_condition.matches);
    });

    return () => {
      window.addEventListener("resize", {});
    };
  }, [md_condition.matches]);

  // resize image effect
  useEffect(() => {
    if (mdView) {
      setImageHeight("h-[440px]");
      setImagesToDisplay(images_lg);
    } else {
      setImageHeight("h-[250px]");
      setImagesToDisplay(images);
    }
  }, [mdView]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [canChange, setCanChange] = useState(true);
  const [canAutomate, setCanAutomate] = useState(true);

  // next slide
  const handleNext = () => {
    if (!canChange) return;
    setCanChange(false);
    setCanAutomate(false);
    setTimeout(() => {
      setCanChange(true);
    }, 1000);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
    // clearTimeout(myTimeout);
  };

  // previous slide
  const handlePrev = () => {
    if (!canChange) return;
    setCanChange(false);
    setCanAutomate(false);
    setTimeout(() => {
      setCanChange(true);
    }, 1500);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  // change slide
  const changeSlide = (index) => {
    if (!canChange) return;
    setCanChange(false);
    setTimeout(() => {
      setCanChange(true);
    }, 1500);
    setCurrentImageIndex(index);
  }

  useEffect(() => {
    const secondInterval = setInterval(() => {
      if (canAutomate) handleNext()
      
      setCanAutomate(true)
    }, 6000);
    return () => clearInterval(secondInterval);
  }, []);

  return (
    <div className={`relative w-full ${imageHeight}`}>
      {/* Main Image */}
      <div
        style={{
          backgroundImage: `url(${imagesToDisplay[currentImageIndex]}) `,
        }}
        className="h-full w-full bg-cover bg-center duration-[1000ms]"
      ></div>

      {/* Navigation Arrows */}
      <div className="absolute max-w-[1200px] mx-auto inset-0 hidden sm:flex">
        {/* previous button */}
        <div className="group absolute left-5 md:left-16 lg:left-24 top-[42%] flex -translate-y-1/2 font-bold text-white">
          {/* small button */}
          <button
            onClick={handlePrev}
            className="absolute z-[1] flex min-h-[65px] min-w-[65px] items-center justify-center rounded-[50%] bg-gray-800/55 group-hover:hidden"
          >
            <ChevronLeft size={30} strokeWidth={1.8} />
          </button>

          {/* next image */}
          <div
            style={{
              backgroundImage: `url(${currentImageIndex === 0 ? imagesToDisplay[images.length - 1] : imagesToDisplay[currentImageIndex - 1]}) `,
            }}
            className="absolute z-[2] hidden min-h-[65px] min-w-[130px] rounded-[40px] bg-cover bg-center group-hover:flex"
          ></div>
          {/* full button */}
          <button
            onClick={handlePrev}
            className="absolute z-[3] hidden min-h-[65px] min-w-[130px] items-center justify-center gap-1 rounded-[40px] bg-gray-800/65 group-hover:flex"
          >
            <ChevronLeft size={30} strokeWidth={1.8} />
            <span>SLIDE</span>
            <span className="w-[12px]"></span>
          </button>
        </div>

        {/* next button */}
        <div className="group absolute right-5 md:right-16 lg:right-24 top-[42%] flex -translate-y-1/2 justify-end font-bold text-white">
          {/* small button */}
          <button
            onClick={handlePrev}
            className="absolute z-[1] flex min-h-[65px] min-w-[65px] items-center justify-center rounded-[50%] bg-gray-800/55 group-hover:hidden"
          >
            <ChevronRight size={30} strokeWidth={1.8} />
          </button>

          {/* next image */}
          <div
            style={{
              backgroundImage: `url(${currentImageIndex === images.length - 1 ? imagesToDisplay[0] : imagesToDisplay[currentImageIndex + 1]}) `,
            }}
            className="absolute z-[2] hidden min-h-[65px] min-w-[130px] rounded-[40px] bg-cover bg-center group-hover:flex"
          ></div>
          {/* full button */}
          <button
            onClick={handleNext}
            className="absolute z-[3] hidden min-h-[65px] min-w-[130px] items-center justify-center gap-1 rounded-[40px] bg-gray-800/65 group-hover:flex"
          >
            <span className="w-[12px]"></span>
            <span>SLIDE</span>
            <ChevronRight size={30} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex w-full items-center justify-center gap-2 xs:bottom-6 sm:bottom-8">
        {imagesToDisplay.map((e) => {
          const index = imagesToDisplay.findIndex((i) => i === e);
          return (
            <div key={e}>
              <Circle
              onClick={() => changeSlide(index)}
              size={12}
                className={`${currentImageIndex === index ? "fill-green-700" : "fill-white"} transition-all duration-300 cursor-pointer md:hover:fill-green-700`}
                strokeWidth={0}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageSlider;
