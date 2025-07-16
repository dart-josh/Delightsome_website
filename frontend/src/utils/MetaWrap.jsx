/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet";

const MetaWrap = ({ children, path }) => {
  // meta details
  const meta = metadata[path] || {};

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Helmet>
      {children}
    </>
  );
};

// metadata.js
const metadata = {
  "/": {
    title: "Cold-Pressed Juices & Smoothies in Lagos – Delightsome Juice",
    description:
      "Discover 100% natural cold-pressed juices, smoothies, Greek yoghurt, and whole foods made fresh in Lagos. Taste the difference. Nourish your body",
  },

  "/shop": {
    title: "Shop Healthy Juices, Smoothies & Greek Yoghurt – Delightsome Lagos",
    description:
      "Explore our full range of cold-pressed juices, smoothies, creamy Greek yoghurt, and whole food snacks. Fresh, local, and made for your wellness journey.",
  },

  "/about": {
    title: "About Delightsome – Fresh Wellness, Nigerian Roots",
    description:
      "Delightsome is a Nigerian wellness brand creating 100% natural cold-pressed juices, smoothies, Greek yoghurt, and whole foods to support your health every day.",
  },

  "/faq": {
    title: "Lagos Juice Delivery & FAQs – Delightsome Juice",
    description:
      "We deliver fresh cold-pressed juices and healthy snacks across Lagos. Learn about delivery zones, payment options, shelf life, and how to order with ease.",
  },

  "/articles": {
    title: "Juice & Wellness Tips for Lagos Living – Delightsome Blog",
    description:
      "From detox smoothies to immune support, discover practical wellness tips, lifestyle guides, and healthy recipes tailored to Lagos life.",
  },

  "/yoghurt": {
    title:
      "Natural Greek Yoghurt in Lagos – Made with Jaggery & Full Cream Milk",
    description:
      "Try our thick, creamy Greek yoghurt made with full cream milk and sweetened naturally with jaggery. No refined sugar. Delicious with granola, coconut flakes & honey.",
  },

  "/admin": {
    title: "Manager – Delightsome Juice",
    description:
      "Discover 100% natural cold-pressed juices, smoothies, Greek yoghurt, and whole foods made fresh in Lagos. Taste the difference. Nourish your body",
  },

  "/dash": {
    title: "Dashboard – Delightsome Juice",
    description:
      "Discover 100% natural cold-pressed juices, smoothies, Greek yoghurt, and whole foods made fresh in Lagos. Taste the difference. Nourish your body",
  },
};

export default MetaWrap;
