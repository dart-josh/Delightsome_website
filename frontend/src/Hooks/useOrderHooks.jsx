import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useOrderHooks = create((set, get) => ({
  locationList: [
    { location: "Lagos", price: 6000 },
    { location: "Ikorodu", price: 2000 },
    { location: "Maryland", price: 3500 },
  ],

  getReviews: async (product) => {
    try {
      const response = await axios.get(`/api/store/get_reviews/${product}`);
      if (response.status == 200) return response.data.reviews;

      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  getOrderDetails: async (order_id) => {
    try {
      const response = await axios.get(`/api/store/view_order/${order_id}`);
      if (response.status == 200) return response.data.order;
    } catch (error) {
      console.log(error);
      toast.error("error fetching order details");
      return null;
    }
  },

  onPaymentComplete: async (order_id) => {
    try {
      const response = await axios.post(`/api/store/mark_payment/${order_id}`);
      if (response.status == 200) {
        set({refresh_order: order_id});
        return response.data.message;
      } else {
        toast.error(response.data.message || "error making payment");
        return null;
      }
    } catch (error) {
      console.log(error);
      toast.error("error making payment!!");
      return null;
    }
  },

  refresh_order: "",

  order: null,

  isLoading: false,
  allOrders: [],
  getAllOrders: async () => {
    if (get().isLoading) return;

    try {
      set({ isLoading: true });
      const response = await axios.get("/api/store/get_orders");
      if (response.status == 200) {
        set({ allOrders: response.data.record });

        console.log(response.data.record.map((order) => order.orderId));
      }

      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
      toast.error("error fetching orders");
    }
  },

  track_order: async (order_id) => {
    if (get().isLoading) return;

    try {
      set({ isLoading: true });
      const response = await axios.get(`/api/store/view_order/${order_id}`);
      set({ isLoading: false });

      if (response.status == 200) {
        return response.data.order;
      }
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
      toast.error("error fetching order");
      return null;
    }
  },

  makePaymentDialog: false,
  trackOrderDialog: false,

  toggle_makePaymentDialog: ({ value, order }) => {
    set({ order: order });
    set({ makePaymentDialog: value });
  },

  toggle_trackOrderDialog: ({ value }) => {
    set({ trackOrderDialog: value });
  },
}));
