/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

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
import { Footer, MobileFooter } from "./components/Footer";
import ProductQuickView from "./components/ProductQuickView";
import { useEffect } from "react";
import { useProductStore } from "./Hooks/useProductStore";
import ContactPage from "./pages/ContactPage";
import ViewOrderPage from "./pages/ViewOrderPage";
import PaymentDialog from "./components/PaymentDialog";
import TrackOrderPage from "./pages/TrackOrderPage";
import ReviewPage from "./pages/ReviewPage";
import DropReviewPage from "./pages/DropReviewPage";
import ManageProducts from "./adminPages/ManageProducts";
import Dashboard from "./adminPages/Dashboard";
import { useAuthStore } from "./store/authStore";
import LoadingSpinner from "./components/LoadingSpinner";
import SignUpPage from "./authPages/SignUpPage";
import LoginPage from "./authPages/LoginPage";
import EmailVerificationPage from "./authPages/EmailVerificationPage";
import ForgotPasswordPage from "./authPages/ForgotPasswordPage";
import ResetPasswordPage from "./authPages/ResetPasswordPage";
import UserProfile from "./authPages/UserProfile";
import OrderList from "./adminPages/OrderList";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const ProtectVerifyEmailRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  if (user && !user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

function App() {
  const location = useLocation();
  const { updateProductList, updateFeaturedProducts, productList } =
    useProductStore();

  useEffect(() => {
    updateProductList();
  }, [location.pathname]);

  useEffect(() => {
    updateFeaturedProducts();
  }, [productList]);

  const { isCheckingAuth, checkAuth, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className="relative min-h-screen overflow-hidden bg-white font-sans text-black">
      {/* Sidebar */}
      <MainSidebar />
      <FilterSidebarDiv />
      <ProductQuickView />
      <PaymentDialog />

      <MobileHeader />
      <MainHeader />

      <div className="relative z-40 mt-[60px] pb-[55px] lg:mt-[200px]">
        <Routes>
          <Route path="/" element={<HomePage path="/" />} />
          <Route path="/shop" element={<ShopPage path="/shop" />} />
          <Route
            path="/product-category/:category"
            element={<ShopPage path="/shop" />}
          />
          <Route path="/product-tag/:tag" element={<ShopPage path="/shop" />} />
          <Route path="/product/:id" element={<ProductPage path="/shop" />} />
          <Route path="/cart" element={<CartPage path="/" />} />
          <Route path="/checkout" element={<CheckoutPage path="/" />} />
          <Route path="/about" element={<AboutPage path="/about" />} />
          <Route path="/contact" element={<ContactPage path="/" />} />
          <Route
            path="/view-order/:order_id"
            element={<ViewOrderPage path="/" />}
          />
          <Route path="/track-order" element={<TrackOrderPage path="/" />} />
          <Route path="/reviews" element={<ReviewPage path="/" />} />
          <Route path="/drop-review" element={<DropReviewPage path="/" />} />

          <Route path="/faq" element={<Page404 path="/faq" />} />
          <Route path="/articles" element={<Page404 path="/articles" />} />

          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUpPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <LoginPage />
              </RedirectAuthenticatedUser>
            }
          />

          <Route
            path="/verify-email"
            element={
              <ProtectVerifyEmailRoute>
                <EmailVerificationPage />
              </ProtectVerifyEmailRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />

          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <ResetPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />

          <Route
            path="/myaccount"
            element={
              <ProtectedRoute>
                <UserProfile path="/" user={user} />
              </ProtectedRoute>
            }
          />

          {/* admin routes */}
          <Route
            path="/dashboard"
            element={
              <AdminProtectedRoute>
                <Dashboard path="/dash" />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/manage-product"
            element={
              <AdminProtectedRoute>
                <ManageProducts path="/admin" />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/manage-product/:link"
            element={
              <AdminProtectedRoute>
                <ManageProducts path="/admin" />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/all-orders"
            element={
              <AdminProtectedRoute>
                <OrderList path="/admin" />
              </AdminProtectedRoute>
            }
          />

          <Route path="*" element={<Page404 path="/" />} />
        </Routes>

        {/* Footer */}
        <Footer />
        <MobileFooter />
      </div>

      <Toaster />
    </div>
  );
}

export default App;
