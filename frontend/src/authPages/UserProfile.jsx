
import { Heart, LogOut, Mail, ShoppingBag, Store, User } from "lucide-react";
import ConfirmBox from "../components/ConfirmBox";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";

const likedProducts = [];
[
  {
    id: 1,
    name: "Glow Juice",
    price: 2500,
    image: "/products/glow-juice.jpg",
  },
  {
    id: 2,
    name: "Granola Delight",
    price: 1800,
    image: "/products/granola.jpg",
  },
];

const orders = [];

[
  {
    id: "ORD-1001",
    date: "2025-07-12",
    status: "Delivered",
    total: 7300,
    items: [
      { name: "Glow Juice", qty: 2 },
      { name: "Granola Delight", qty: 1 },
    ],
  },
  {
    id: "ORD-1002",
    date: "2025-06-28",
    status: "Processing",
    total: 2500,
    items: [{ name: "Tigernut Milk", qty: 1 }],
  },
];

export default function UserProfile() {
  const [showConfirm, setShowConfirm] = useState(false);

  const { user, logout } = useAuthStore();
  const handleLogout = () => {
    
    logout();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* Header with User Info and Logout */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b pb-6">
        <div className="flex items-center gap-5">
          <div
            className="w-20 h-20 flex items-center text-gray-600 justify-center rounded-full object-cover border"
          >
            <Store size={45} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <User size={20} /> {user.name}
            </h2>
            <p className="text-gray-600 flex items-center gap-2">
              <Mail size={16} /> {user.email}
            </p>
            <p className="text-sm text-gray-500 mt-1">Joined: {formatDate(user.createdAt)}</p>
          </div>
        </div>
        <button
          onClick={() => setShowConfirm(true)}
          className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          <LogOut size={18} /> Logout
        </button>
      </section>

      {/* Liked Products */}
      <section>
        <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
          <Heart className="text-pink-500" /> Liked Products
        </h3>
        {likedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {likedProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 bg-white shadow-sm"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-36 object-cover rounded mb-3"
                />
                <h4 className="font-medium text-base">{product.name}</h4>
                <p className="text-sm text-gray-700">₦{product.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No liked products yet.</p>
        )}
      </section>

      {/* Order History */}
      <section>
        <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
          <ShoppingBag className="text-green-600" /> Order History
        </h3>
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Order #{order.id}</span>
                  <span
                    className={`text-sm rounded px-2 py-1 ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">Date: {order.date}</p>
                <ul className="text-sm mt-2 mb-2 text-gray-700 list-disc pl-4">
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.qty}× {item.name}
                    </li>
                  ))}
                </ul>
                <p className="text-sm font-medium text-right">
                  Total: ₦{order.total}
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
        message='Are you sure you want to sign out? Order one of our products to feel good today.'
      />
    </div>
  );
}
