/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { usePageHooks } from "../Hooks/useGeneralHooks";
import { Link } from "react-router-dom";
import MetaWrap from "../utils/MetaWrap";

const AboutPage = ({ path }) => {
  const { setCurrentPage } = usePageHooks();

  useEffect(() => {
    setCurrentPage("About Us");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [setCurrentPage]);

  return (
    <MetaWrap path={path}>
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
          {/* about us */}
          <div className="flex flex-col gap-5 text-[15px] font-semibold text-gray-800 lg:text-[19px]">
            <div>
              At Delightsome, we believe that food should heal, fuel, and taste
              amazing.
            </div>

            <div>
              We’re a proudly Nigerian wellness brand dedicated to improving
              lives through 100% natural, nutrient-rich cold-pressed juices,
              smoothies, Greek yoghurt, and whole foods. Every product we create
              is designed to support better health, without compromising on
              taste.
            </div>

            <div>
              Our recipes are crafted by holistic health professionals using
              only the highest quality ingredients. From fresh, locally sourced
              produce to our thick, creamy Greek yoghurt made with full cream
              milk and natural jaggery instead of refined sugar - everything we
              make is clean, rich in nourishment, and deeply satisfying.
            </div>

            <div>
              We’re on a mission to make healthy living easy, enjoyable, and
              absolutely delicious - one bottle, bowl, or spoonful at a time.
            </div>
          </div>

          {/* vision & mission */}
          <div className="mt-10 flex flex-col items-center justify-center gap-10 lg:gap-14">
            <div className="w-full text-center font-bold lg:w-[65%]">
              <div className="mb-4 text-2xl text-green-600">Our Vision</div>
              <div className="text-[15px] lg:text-[19px]">
                To become Nigeria’s most trusted wellness brand, known for
                delivering the finest juices, smoothies, Greek yoghurt, and
                whole foods that combine great taste with real nourishment.
              </div>
            </div>

            <div className="w-[50%]">
              <hr className="border-gray-800" />
            </div>

            <div className="w-full text-center font-bold lg:w-[65%]">
              <div className="mb-4 text-2xl text-green-600">Our Mission</div>
              <div className="text-[15px] lg:text-[19px]">
                To produce clean, natural, and nutrient-dense food and drink
                using world-class methods, helping people feel better, live
                healthier, and enjoy every bite and sip along the way.
              </div>
            </div>
          </div>

          {/* Why Choose Delightsome */}
          <div className="mt-[100px] w-full lg:w-[55%]">
            <div className="mb-8 text-xl font-bold text-gray-800 md:text-2xl lg:text-[44px]">
              Why choose <span className="text-green-700">Delightsome</span>
            </div>

            <div className="flex flex-col gap-5 text-sm font-semibold text-gray-500">
              {/* 100% Natural, Always */}
              <div>
                <div className="mb-1 text-[16px] text-gray-700">
                  100% Natural, Always
                </div>
                No additives, no preservatives, no shortcuts - just clean,
                honest nutrition in every sip and bite.
              </div>

              {/* Cold-Pressed & Fresh Daily */}
              <div>
                <div className="mb-1 text-[16px] text-gray-700">
                  Cold-Pressed & Fresh Daily
                </div>
                Our juices and smoothies are made using cold-press technology
                that locks in vitamins, enzymes, and real flavor - with no heat
                damage.
              </div>

              {/* Greek Yoghurt, Reinvented */}
              <div>
                <div className="mb-1 text-[16px] text-gray-700">
                  Greek Yoghurt, Reinvented
                </div>
                Our full cream Greek yoghurt is thick, silky, and naturally
                sweetened with jaggery - never sugar. Paired with granola,
                coconut flakes or honey, it’s pure indulgence with real
                nourishment.
              </div>

              {/* Rooted in Science & Wellness */}
              <div>
                <div className="mb-1 text-[16px] text-gray-700">
                  Rooted in Science & Wellness
                </div>
                Created by holistic health professionals, every product is
                designed to support energy, immunity, digestion, and overall
                vitality.
              </div>

              {/* Locally Sourced, Lovingly Made */}
              <div>
                <div className="mb-1 text-[16px] text-gray-700">
                  Locally Sourced, Lovingly Made
                </div>
                We partner with trusted Nigerian farms to ensure freshness,
                sustainability, and superior taste.
              </div>
            </div>
          </div>
        </div>
      </div>
    </MetaWrap>
  );
};

export default AboutPage;

{
  /* <div className="flex flex-col gap-8 text-sm font-semibold text-gray-500">
              <div>
                Delightsome Juice, Smoothies and Whole foods is a Nigerian
                innovative brand basically established to enhance the quality of
                life and promote health through the production of 100% natural,
                fresh and nutrient-dense COLD-PRESSED JUICES, SMOOTHIES AND
                WHOLE FOODS.
              </div>

              <div>
                We are a group of holistic health professionals who are
                passionate about making a big difference in people’s health and
                lives.
              </div>

              <div>
                On a daily basis, we are unavoidably exposed to harmful toxins.
                No thanks to the various environmental assaults and pollution
                that come our way. How about the gulp of processed foods/ junks
                and refined sugars/carbs? All these ultimately lead to the
                generation of free radicals in the body system.
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
                Isn’t it wise then to utilize natural external antioxidant
                sources to boost the internal antioxidant system???
              </div>

              <div>Now, you get the gist…</div>

              <div>
                The role of dietary antioxidants as functional foods in the
                management of health-related issues can never be
                over-emphasized.
              </div>

              <div>
                We, at Delightsome Juices, Smoothies and Whole Foods are poised
                to offer you a DELIGHTFUL RIDE as you RELISH OUR PRODUCTS, while
                ENJOYING ALL THE SCIENTIFICALLY PROVEN BENEFICIAL EFFECTS to
                your health and state of well-being.
              </div>

              <div>
                We use only the highest quality ingredients for all our
                products, sourcing from local farms to ensure freshness, as well
                as superior nutrition and taste.
              </div>

              <div>We are an answer to your health prayers!</div>

              <div>
                Our Cold-Pressed Juice will make you feel better and look
                better! Your body will thank you! Our Smoothies deliver extra
                boost of vitamins, minerals and phytonutrients that will flood
                your entire body with nourishment. Our Whole foods are a pack of
                healthy ‘eats’… All natural, high in protein, high in fiber,
                high in various essential vitamins and minerals.
              </div>

              <div>
                You are warmly welcome to our world of ‘Great taste, Good
                health’!!!
              </div>
            </div> */
}
