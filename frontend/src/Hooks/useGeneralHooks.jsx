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
