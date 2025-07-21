import {
  Copy,
  Heart,
  LogOut,
  Mail,
  ShoppingBag,
  Store,
  User,
} from "lucide-react";
import ConfirmBox from "../components/ConfirmBox";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useProductStore } from "../Hooks/useProductStore";
import { fetch_image } from "../Hooks/serveruploader";
import { useEffect } from "react";

export default function UserProfile() {
  const [showConfirm, setShowConfirm] = useState(false);

  const { likedProducts, getLikedProductFromProduct } = useProductStore();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleLogout = () => {
    logout();
  };

  const sortedOrders = user?.orders ? [...user.orders].sort(
    (a, b) => new Date(b.recordDate) - new Date(a.recordDate),
  ) : [];

  const likes = getLikedProductFromProduct(likedProducts);

  return (
    <div className="mx-auto max-w-5xl space-y-10 p-6">
      {/* Header with User Info and Logout */}
      <section className="flex flex-col gap-6 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border object-cover text-gray-600">
            <Store size={45} />
          </div>
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-semibold">
              <User size={20} /> {user.name}
            </h2>
            <p className="flex items-center gap-2 text-gray-600">
              <Mail size={16} /> {user.email}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Joined: {formatDate(user.createdAt)}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowConfirm(true)}
          className="flex items-center gap-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          <LogOut size={18} /> Logout
        </button>
      </section>

      {/* Liked Products */}
      <section>
        <h3 className="mb-4 flex items-end justify-between">
          <span className="flex items-center gap-2 text-lg font-semibold">
            <Heart className="text-pink-500" /> Liked Products
          </span>
          <Link
            to={"/wishlist"}
            className="cursor-pointer font-semibold text-green-700 underline hover:scale-105"
          >
            View all
          </Link>
        </h3>
        {likes && likes.length > 0 ? (
          <div className="scrollbar flex gap-4 overflow-x-auto pb-4">
            {likes.map((product, idx) => (
              <Link
                to={`/product/${product.link}`}
                key={idx}
                className="min-w-[180px] rounded-lg border bg-white p-4 shadow-sm sm:w-[200px]"
              >
                <img
                  src={fetch_image(product.images[0])}
                  alt={product.name}
                  className="mb-3 h-36 w-full rounded object-cover"
                />
                <h4 className="text-base font-medium">{product.name}</h4>
                <p className="text-sm text-gray-700">
                  ₦{product.price.toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No liked products yet.</p>
        )}
      </section>

      {/* Order History */}
      <section>
        <h3 className="mb-4 flex items-end justify-between">
          <span className="flex items-center gap-2 text-lg font-semibold">
            <ShoppingBag className="text-green-600" /> Order History
          </span>
          <Link
            to={"/orders"}
            className="cursor-pointer font-semibold text-green-700 underline hover:scale-105"
          >
            View all
          </Link>
        </h3>
        {sortedOrders && sortedOrders.length > 0 ? (
          <div className="space-y-6">
            {sortedOrders.map((order, idx) => (
              <div
                key={idx}
                className="rounded-lg border bg-white p-4 shadow-sm"
              >
                <div className="mb-2 inline-flex xs:flex flex-col gap-2 xs:flex-row xs:items-center xs:justify-between">
                  <span className="flex items-center gap-2 font-semibold">
                    Order
                    <Link
                      to={`/view-order/${order.orderId}`}
                      className="cursor-pointer text-green-700 underline transition-all duration-300 hover:scale-105 hover:no-underline"
                    >
                      #{order.orderId}
                    </Link>
                    <button
                      className="transition-all duration-300 hover:scale-110 hover:text-green-700"
                      onClick={() => {
                        navigator.clipboard.writeText(order.orderId);
                        toast("Order ID copied");
                      }}
                    >
                      <Copy size={16} />
                    </button>
                  </span>
                  <span
                    className={`rounded px-2 py-1 text-sm ${
                      order.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Date: {formatDate(order.recordDate)}
                </p>
                <ul className="mb-2 mt-2 list-disc pl-4 text-sm text-gray-700">
                  {order.products &&
                    order.products.length > 0 &&
                    order.products.map((item, i) => (
                      <li key={i}>
                        {item.quantity}× {item.name}
                      </li>
                    ))}
                </ul>
                <p className="text-right text-sm font-medium text-gray-600">
                  Total:{" "}
                  <span className="text-[16px] font-semibold text-gray-900">
                    ₦{order?.totalCost?.toLocaleString()}
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No orders yet.</p>
        )}
      </section>

      <ConfirmBox
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleLogout}
        title="Sign out"
        message="Are you sure you want to sign out? Order one of our products to feel good today."
      />
    </div>
  );
}
