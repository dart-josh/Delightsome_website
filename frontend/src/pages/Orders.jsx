import toast from "react-hot-toast";
import { formatDate } from "../utils/date";
import { Copy, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import { usePageHooks } from "../Hooks/useGeneralHooks";

const Orders = () => {
  const { user } = useAuthStore();
  const {setCurrentPage} = usePageHooks()

  useEffect(() => {
    setCurrentPage('My Orders');
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [setCurrentPage]);

  const sortedOrders = user?.orders ? [...user.orders].sort(
    (a, b) => new Date(b.recordDate) - new Date(a.recordDate),
  ) : [];

  return (
    <div className="mx-auto max-w-5xl space-y-10 p-6 py-5 md:py-16">
      {/* Order History */}
      <section>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <ShoppingBag className="text-green-600" /> Order History
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
                    ₦{order.totalCost.toLocaleString()}
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No orders yet.</p>
        )}
      </section>
    </div>
  );
};

export default Orders;
