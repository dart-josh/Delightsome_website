import { create } from "zustand";

export const useSidebarHooks = create((set) => ({
  filterSidebarOpen: false,
  mainSidebarOpen: false,

  closeMainSidebar: () => {
    set({ mainSidebarOpen: false });
  },

  openMainSidebar: () => {
    set({ mainSidebarOpen: true });
  },

  closeFilterSidebar: () => {
    set({ filterSidebarOpen: false });
  },

  openFilterSidebar: () => {
    set({ filterSidebarOpen: true });
  },
}));

export const usePageHooks = create((set) => ({
  currentPage: "Home",
  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  deafultTile_type: "grid",
  setDefaultTileType: (value) => {
    set({ deafultTile_type: value });
  },

  deafultCurrentPage: 1,
  setDeafultCurrentPage: (value) => {
    set({ deafultCurrentPage: value });
  },

  applyPriceFilter: [1500, 10000],
  setApplyPriceFilter: (value) => {
    set({ applyPriceFilter: value });
  },

  deafultSortValue: "Default sorting",
  setDefaultSortValue: (value) => {
    set({ deafultSortValue: value });
  },

  capitalizeFirstLetter: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
}));

export const useProductHooks = create((set) => ({
  productQuickViewOpen: false,
  quickViewProduct: null,
  toggleProductQuickView: ({ value, product }) => {
    set({ productQuickViewOpen: value, quickViewProduct: product });
  },
}));

export const useGeneralHooks = create(() => ({
  formatDate: (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
},

formatAmount: (amount) => {
    return amount.toLocaleString("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
},
}));

// metadata.js
export const metadata = {
  "/": { title: "Cold-Pressed Juices & Smoothies in Lagos – Delightsome Juice", description: "Discover 100% natural cold-pressed juices, smoothies, Greek yoghurt, and whole foods made fresh in Lagos. Taste the difference. Nourish your body" },

  "/shop": { title: "Shop Healthy Juices, Smoothies & Greek Yoghurt – Delightsome Lagos", description: "Explore our full range of cold-pressed juices, smoothies, creamy Greek yoghurt, and whole food snacks. Fresh, local, and made for your wellness journey." },

  "/about": { title: "About Delightsome – Fresh Wellness, Nigerian Roots", description: "Delightsome is a Nigerian wellness brand creating 100% natural cold-pressed juices, smoothies, Greek yoghurt, and whole foods to support your health every day." },

  "/faq": { title: "Lagos Juice Delivery & FAQs – Delightsome Juice", description: "We deliver fresh cold-pressed juices and healthy snacks across Lagos. Learn about delivery zones, payment options, shelf life, and how to order with ease." },

  "/articles": { title: "Juice & Wellness Tips for Lagos Living – Delightsome Blog", description: "From detox smoothies to immune support, discover practical wellness tips, lifestyle guides, and healthy recipes tailored to Lagos life." },

  "/yoghurt": { title: "Natural Greek Yoghurt in Lagos – Made with Jaggery & Full Cream Milk", description: "Try our thick, creamy Greek yoghurt made with full cream milk and sweetened naturally with jaggery. No refined sugar. Delicious with granola, coconut flakes & honey." },
};
