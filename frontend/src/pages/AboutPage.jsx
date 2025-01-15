import { useEffect } from "react";
import { usePageHooks } from "../Hooks/useGeneralHooks";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const { setCurrentPage } = usePageHooks();

  useEffect(() => {
    setCurrentPage("About Us");
    // window.scrollTo({ top: 0, behavior: "smooth" });
  }, [setCurrentPage]);

  return (
    <div className="xs:px-1 xs:mx-5 relative mx-4 mb-32 max-w-[1200px] justify-center pt-5 sm:px-5 md:mx-auto md:px-10">
      {/* Top bar */}
      <div className="hidden md:block">
        <div className="text-md mb-6 flex justify-between">
          <div className="flex gap-3">
            <Link to="/">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400">About us</span>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8 text-2xl font-bold">About Us</div>
      </div>

      {/* Page Content */}
      <div className="">
        {/* 1st content */}
        <div className="mt-10 flex flex-col items-center justify-center gap-10 lg:gap-14">
          <div className="w-full text-center text-[15px] font-bold lg:w-[65%] lg:text-[19px]">
            Our vision is to build a brand known for the healthiest and world
            best product choices (Juices, Smoothies and Whole Foods) that will
            guarantee irresistibly great taste and profound wellness.
          </div>

          <div className="w-[50%]">
            <hr className="border-gray-800" />
          </div>

          <div className="w-full text-center text-[15px] font-bold lg:w-[65%] lg:text-[19px]">
            Our mission is to produce and deliver top-notch Cold-pressed juices,
            Smoothies and Whole foods using the best technologies you can find
            in the world today, providing you with very satisfying taste,
            alongside optimum nourishment.
          </div>
        </div>

        {/* 2nd content */}
        <div className="mt-[100px] w-full lg:w-[55%]">
          <div className="mb-8 text-xl font-bold text-gray-800 md:text-2xl lg:text-[44px]">
            Why choose <span className="text-green-700">Delightsome</span>
          </div>

          <div className="flex flex-col gap-8 text-sm font-semibold text-gray-500">
            <div>
              Delightsome Juice, Smoothies and Whole foods is a Nigerian
              innovative brand basically established to enhance the quality of
              life and promote health through the production of 100% natural,
              fresh and nutrient-dense COLD-PRESSED JUICES, SMOOTHIES AND WHOLE
              FOODS.
            </div>

            <div>
              We are a group of holistic health professionals who are passionate
              about making a big difference in people’s health and lives.
            </div>

            <div>
              On a daily basis, we are unavoidably exposed to harmful toxins. No
              thanks to the various environmental assaults and pollution that
              come our way. How about the gulp of processed foods/ junks and
              refined sugars/carbs? All these ultimately lead to the generation
              of free radicals in the body system.
            </div>

            <div>
              Many disease conditions actually result when the body gets
              overwhelmed as a result of unfavourable imbalances between free
              radical generation and the antioxidant defense of the body.
            </div>

            <div>
              Unfortunately/Sadly, no one has control over the innate/internal
              antioxidant system usage…
            </div>

            <div>
              Isn’t it wise then to utilize natural external antioxidant sources
              to boost the internal antioxidant system???
            </div>

            <div>Now, you get the gist…</div>

            <div>
              The role of dietary antioxidants as functional foods in the
              management of health-related issues can never be over-emphasized.
            </div>

            <div>
              We, at Delightsome Juices, Smoothies and Whole Foods are poised to
              offer you a DELIGHTFUL RIDE as you RELISH OUR PRODUCTS, while
              ENJOYING ALL THE SCIENTIFICALLY PROVEN BENEFICIAL EFFECTS to your
              health and state of well-being.
            </div>

            <div>
              We use only the highest quality ingredients for all our products,
              sourcing from local farms to ensure freshness, as well as superior
              nutrition and taste.
            </div>

            <div>We are an answer to your health prayers!</div>

            <div>
              Our Cold-Pressed Juice will make you feel better and look better!
              Your body will thank you! Our Smoothies deliver extra boost of
              vitamins, minerals and phytonutrients that will flood your entire
              body with nourishment. Our Whole foods are a pack of healthy
              ‘eats’… All natural, high in protein, high in fiber, high in
              various essential vitamins and minerals.
            </div>

            <div>
              You are warmly welcome to our world of ‘Great taste, Good
              health’!!!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
