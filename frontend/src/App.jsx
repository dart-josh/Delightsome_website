/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Page404 from "./pages/Page404";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AboutPage from "./pages/AboutPage";
import { MobileHeader, MainHeader } from "./components/Header";
import { Toaster } from "react-hot-toast";
import { FilterSidebarDiv } from "./components/FilterSidebar";
import MainSidebar from "./components/MainSidebar";
import {Footer, MobileFooter} from "./components/Footer";
import ProductQuickView from "./components/ProductQuickView";
import { useEffect } from "react";
import { useProductStore } from "./Hooks/useProductStore";
import ContactPage from "./pages/ContactPage";
import ViewOrderPage from "./pages/ViewOrderPage";
import PaymentDialog from "./components/PaymentDialog";
import TrackOrderPage from "./pages/TrackOrderPage";
import ReviewPage from "./pages/ReviewPage";
import DropReviewPage from "./pages/DropReviewPage";

function App() {
  const { updateFeaturedProducts } = useProductStore();

  useEffect(() => {
    updateFeaturedProducts();
  }, [])

  
  return (
    <div className="relative min-h-screen overflow-hidden bg-white font-sans text-black">
      {/* Sidebar */}
      <MainSidebar />
      <FilterSidebarDiv />
      <ProductQuickView />
      <PaymentDialog />

      <MobileHeader />
      <MainHeader />
      
      <div className="relative z-40 mt-[60px] lg:mt-[200px] pb-[55px]">
        <Routes>
          <Route path="/" element={<HomePage path="/" />} />
          <Route path="/shop" element={<ShopPage path="/shop" />} />
          <Route path="/product-category/:category" element={<ShopPage path="/shop" />} />
          <Route path="/product-tag/:tag" element={<ShopPage path="/shop" />} />
          <Route path="/product/:id" element={<ProductPage path="/shop" />} />
          <Route path="/cart" element={<CartPage path="/" />} />
          <Route path="/checkout" element={<CheckoutPage path="/" />} />
          <Route path="/about" element={<AboutPage path="/about" />} />
          <Route path="/contact" element={<ContactPage path="/" />} />
          <Route path="/view-order/:order_id" element={<ViewOrderPage path="/" />} />
          <Route path="/track-order" element={<TrackOrderPage path="/" />} />
          <Route path="/reviews" element={<ReviewPage path="/" />} />
          <Route path="/drop-review" element={<DropReviewPage path="/" />} />

          <Route path="/faq" element={<Page404 path="/faq" />} />
          <Route path="/articles" element={<Page404 path="/articles" />} />


          <Route path="*" element={<Page404 path="/" />} />
        </Routes>
        <Footer />
        <MobileFooter />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
