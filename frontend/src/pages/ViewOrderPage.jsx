/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useGeneralHooks, usePageHooks } from "../Hooks/useGeneralHooks";
import { Link, useParams } from "react-router-dom";
import { useProductStore } from "../Hooks/useProductStore";
import { useOrderHooks } from "../Hooks/useOrderHooks";
import { Container, Loader, Store } from "lucide-react";

const ViewOrderPage = () => {
  const { setCurrentPage } = usePageHooks();
  const { clearCart } = useProductStore();
  const { getOrderDetails, refresh_order } = useOrderHooks();

  const { formatDate, formatAmount } = useGeneralHooks();

  let { order_id } = useParams();

  // get query params
  const query = new URLSearchParams(window.location.search);
  const status = query.get("new");

  const [order, setOrder] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const get_order = async () => {
    setIsLoading(true);
    const _order = await getOrderDetails(order_id);
    setIsLoading(false);
    setOrder(_order);
  };

  useEffect(() => {
    if (order_id) get_order();
    else setOrder(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh_order, order_id]);

  useEffect(() => {
    setCurrentPage("Order Details");

    if (status === "true") {
      clearCart();
    }

    // scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [clearCart, getOrderDetails, order_id, setCurrentPage, status]);

  return (
    <div className="xs:px-1 xs:mx-5 relative mx-4 mb-32 max-w-[1200px] justify-center pt-5 sm:px-5 md:mx-auto">
      {/* Top bar */}
      <div className="hidden md:block">
        <div className="text-md mb-6 flex justify-between">
          <div className="flex gap-3">
            <Link to="/">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400">My Order</span>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8 text-2xl font-bold">Order Details</div>
      </div>

      {(order != null && (
        <div className="flex w-full flex-col gap-0 md:flex-row md:gap-14">
          <div className="w-full">
            <OrderSummary
              order={order}
              formatDate={formatDate}
              formatAmount={formatAmount}
            />

            <div className="block md:hidden">
              <div className="mb-4 mt-4 text-sm font-medium text-gray-700">
                PRODUCTS IN YOUR ORDER
              </div>

              <ProductDetails order={order} formatDate={formatDate} />
            </div>

            <div className="mb-4 mt-4 text-sm font-medium text-gray-700">
              PAYMENT INFORMATION
            </div>

            <PaymentDetails order={order} formatAmount={formatAmount} />

            <div className="mb-4 mt-4 text-sm font-medium text-gray-700">
              DELIVERY INFORMATION
            </div>

            <DeliveryDetails order={order} />
          </div>

          <div className="hidden w-full md:block">
            <div className="mb-4 text-sm font-medium text-gray-700">
              PRODUCTS IN YOUR ORDER
            </div>

            <ProductDetails order={order} formatDate={formatDate} />
          </div>
        </div>
      )) || (
        <div className="flex h-full w-full justify-center text-center">
          {(isLoading && (
            <div className="size-6 animate-spin">
              <Loader />
            </div>
          )) || <div>Order not Found</div>}{" "}
        </div>
      )}
    </div>
  );
};

// order summary
const OrderSummary = ({ order, formatDate, formatAmount }) => {
  return (
    <div className="w-full rounded-sm bg-gray-100 p-4">
      {/* Order ID */}
      <div className="text-md mb-2 font-semibold">
        Order ID<sup>o</sup> {order.orderId}
      </div>

      {/* status */}
      <div className="text-md text-gray-800">Status: {order.orderStatus}</div>

      {/* Quantity */}
      <div className="text-md text-gray-800">{order.totalQuantity} items</div>

      {/* date */}
      <div className="text-md text-gray-800">
        Placed on {formatDate(order.recordDate)}
      </div>

      {/* total */}
      <div className="text-md text-gray-800">
        Total: {formatAmount(order.totalCost)}
      </div>
    </div>
  );
};

// payment details
const PaymentDetails = ({ order, formatAmount }) => {
  const { toggle_makePaymentDialog } = useOrderHooks();
  return (
    <div className="w-full rounded-sm bg-gray-100 p-4">
      {/* payment method */}
      <div className="mb-2 border-b border-gray-200 pb-2">
        <div className="text-md font-semibold">Payment Method</div>
        <div className="text-sm text-gray-700">
          {(order.paymentMethod && order.paymentMethod) || "Bank Transfer"}
          {/* "Pay with Cards, Bank Transfer or USSD" */}
        </div>
      </div>

      {/* payment details */}
      <div className="mb-2 border-b border-gray-200 pb-2">
        <div className="text-md mb-1 font-semibold">Payment Details</div>
        <div className="flex flex-col gap-1 text-sm text-gray-700">
          <div className="">
            Products total: {formatAmount(order.orderCost)}
          </div>
          <div className="">
            Delivery Fees: {formatAmount(order.deliveryFee)}
          </div>
          <div className="font-semibold">
            Total cost: {formatAmount(order.totalCost)}
          </div>
        </div>
      </div>

      {/* payment status */}
      <div className="border-b border-gray-300 pb-1">
        <div className="text-md font-semibold">Payment Status</div>
        <div className="text-sm text-gray-700">
          {(order.paymentStatus === "Paid" && "COMPLETED") ||
            (order.paymentStatus === "Awaiting Confirmation" &&
              "Awaiting Confirmation") ||
            (!order.paymentStatus && (
              <div
                onClick={() => {
                  toggle_makePaymentDialog({ value: true, order: order });
                }}
                className="my-2 inline-flex cursor-pointer rounded-sm bg-orange-600 px-2 py-1 text-sm font-semibold text-gray-50 transition duration-300 hover:bg-orange-700"
              >
                Make Payment
              </div>
            )) ||
            "PENDING"}
          {/*  === 'Awaiting' */}
        </div>
      </div>
    </div>
  );
};

// delvery details
const DeliveryDetails = ({ order }) => {
  return (
    <div className="w-full rounded-sm bg-gray-100 p-4">
      {/* delivery method */}
      <div className="mb-2 border-b border-gray-200 pb-2">
        <div className="text-md font-semibold">Delivery Method</div>
        <div className="text-sm text-gray-600">{order.deliveryMethod}</div>
      </div>

      {/* Delivery address */}
      {(order.deliveryMethod === "Delivery" && (
        <div className="mb-2 border-b border-gray-200 pb-2">
          <div className="text-md font-semibold">Delivery Address</div>
          <div className="text-sm text-gray-500">
            Location: {order.location}
            <br />
            {order.customerAddress}
          </div>
        </div>
      )) ||
        (order.deliveryMethod === "Store Pickup" && (
          <div className="mb-2 border-b border-gray-200 pb-2">
            <div className="text-md font-semibold">Store address</div>

            <div className="text-sm text-gray-500">
              46 Beach Road(TOS Benson Road),<br></br>Opposite Ikorodu General
              Hospital,
              <br />
              Ikorodu, Lagos
            </div>

            <div className="mt-3 text-sm text-gray-900">Opening Hours:</div>
            <div className="text-sm text-gray-500">
              Mon-Fri 8am-7pm; Sat 10am-6pm
            </div>

            <div className="mt-2">
              <a
                href="http://google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500"
              >
                See Location
              </a>
            </div>
          </div>
        ))}

      {/* contact details */}
      <div className="mb-2 border-b border-gray-200 pb-2">
        <div className="text-md font-semibold">Contact Details</div>
        <div className="text-sm text-gray-600">
          Contact Phone: {order.customerPhone}
        </div>

        {order.customerEmail && (
          <div className="text-sm text-gray-600">
            Contact Email: {order.customerEmail}
          </div>
        )}
      </div>
    </div>
  );
};

// product summary
const ProductDetails = ({ order, formatDate }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full rounded-md bg-gray-100 py-3">
      {/* status */}
      <div className="mb-1 border-b border-gray-200 px-4 pb-1">
        <div
          className={`text-sm text-gray-200 ${order.orderStatus === "Delivered" ? "bg-green-700" : "bg-orange-600"} inline-flex rounded-sm px-2 py-1`}
        >
          {(order.orderStatus != "Delivered" && "Order placed") || "Delivered"}
        </div>

        <div className="mt-1 text-sm font-semibold text-gray-800">
          On{" "}
          {(order.deliveryDate &&
            order.orderStatus === "Delivered" &&
            formatDate(order.deliveryDate)) ||
            formatDate(order.recordDate)}
        </div>
      </div>

      {/* products */}
      <div className="mb-1 border-b border-gray-200 px-4 pb-2">
        <div className="text-md mb-1 font-semibold text-green-800">
          {order.totalQuantity} Products
        </div>
        {(!expanded && (
          <div>
            <Products key={0} product={order.products[0]} />
          </div>
        )) || (
          <div>
            {order.products.map((product, index) => (
              <Products key={index} product={product} />
            ))}
          </div>
        )}

        <div
          className="mt-2 flex cursor-pointer justify-center text-[14px] font-semibold text-orange-600 transition duration-300 hover:text-orange-700 hover:underline"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "View less" : "View all Products"}
        </div>
      </div>

      {/* summmary */}
      <div className="px-5 py-1 pt-2">
        <div className="flex items-center gap-3">
          <Container size={18} />
          <div className="text-sm text-gray-800">
            Store these products in the freezer{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

// products
const Products = ({ product }) => {
  const { id, name, image, price, quantity } = product;
  const total = price * quantity;
  return (
    <div key={id} className="flex w-full gap-4 border-b border-gray-200 py-3">
      {/* Product image */}
      <div className="w-[50px]">
        {(image && <img src={image} alt="Product" />) || <Store size={35} />}
      </div>

      {/* details */}
      <div className="flex w-full flex-col items-start">
        {/* name */}
        <div className="text-md transition-all duration-300 hover:text-green-700">
          {name}
        </div>

        {/* Item quantity */}
        <div className="text-sm text-gray-600">QTY: {quantity}</div>

        {/* Price */}
        <div className="text-start text-[15px] font-medium text-gray-800">
          ₦{total.toLocaleString()}.00
        </div>
      </div>
    </div>
  );
};

export default ViewOrderPage;
