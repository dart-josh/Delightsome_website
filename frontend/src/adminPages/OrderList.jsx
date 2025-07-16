import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useOrderHooks } from "../Hooks/useOrderHooks";

export default function OrderList() {
  const { get_all_orders, all_orders: orders } = useOrderHooks();

  useEffect(() => {
    get_all_orders();
  }, [get_all_orders]);

  // Sort by date descending
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.recordDate) - new Date(a.recordDate),
  );

  return (
    <div className="xs:px-1 xs:mx-5 relative mx-4 mb-32 max-w-[1200px] justify-center pt-5 sm:px-5 md:mx-auto md:px-10">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Top bar */}
        <div className="block">
          <div className="text-md mb-6 flex justify-between">
            <div className="flex gap-3">
              <Link to={"/dashboard"}>Dashboard</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-400">Orders</span>
            </div>
          </div>
        </div>
        <h2 className="mb-6 text-2xl font-bold">📦 All Orders</h2>

        <div className="scrollbar mx-auto max-w-md overflow-hidden overflow-x-auto rounded-lg shadow ring-1 ring-gray-200 md:max-w-xl lg:max-w-2xl">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-left text-sm font-medium text-gray-600">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Total Cost</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-800">
              {sortedOrders.map((order, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 font-mono text-sm text-gray-900">
                    {order.orderId}
                  </td>
                  <td className="px-6 py-4">{order.customerName}</td>
                  <td className="px-6 py-4 font-semibold text-green-600">
                    ₦{Number(order.totalCost).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(order.recordDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/view-order/${order.orderId}?id=admin`}
                      className="inline-flex items-center gap-2 rounded bg-orange-600 px-3 py-1.5 text-sm text-white hover:bg-orange-700"
                    >
                      View <ArrowRight size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
              {sortedOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-gray-400"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
