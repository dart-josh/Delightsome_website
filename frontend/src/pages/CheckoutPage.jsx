/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePageHooks } from "../Hooks/useGeneralHooks";
import { useProductStore } from "../Hooks/useProductStore";
import { Loader, Minus, Plus } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useOrderHooks } from "../Hooks/useOrderHooks";
import MetaWrap from "../utils/MetaWrap";
import { fetch_image } from "../Hooks/serveruploader";
import { useAuthStore } from "../store/authStore";

const CheckoutPage = ({path}) => {
  const { setCurrentPage } = usePageHooks();
  const { cartProducts } = useProductStore();
  const { locationList } = useOrderHooks();
  const {user} = useAuthStore();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [total_qty, setTotal_qty] = useState(0);
  const [order_cost, setOrder_cost] = useState(0);

  const [total, setTotal] = useState(0);
  const [delivery_fee, setDelivery_fee] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [location, setLocation] = useState("");

  const f_name = useRef(null);
  const l_name = useRef(null);
  const address_1 = useRef(null);
  const address_2 = useRef(null);
  const city = useRef(null);
  const state = useRef(null);
  const phone = useRef(null);
  const email = useRef(null);
  const note = useRef(null);

  const save_order = async () => {
    if (!f_name.current.value) {
      f_name.current.focus();
      return toast.error("Enter First name", { id: "error_1" });
    }
    if (!l_name.current.value) {
      l_name.current.focus();
      return toast.error("Enter Last name", { id: "error_1" });
    }
    if (!deliveryMethod) {
      return toast.error("Select Delivery Method", { id: "error_1" });
    }
    if (deliveryMethod === "Delivery" && !location) {
      return toast.error("Select Location", { id: "error_1" });
    }
    if (deliveryMethod === "Delivery") {
      if (!address_1.current.value) {
        address_1.current.focus();
        return toast.error("Enter Street address", { id: "error_1" });
      }
      if (!city.current.value) {
        city.current.focus();
        return toast.error("Enter City", { id: "error_1" });
      }
      if (!state.current.value) {
        state.current.focus();
        return toast.error("Enter State", { id: "error_1" });
      }
    }
    if (!phone.current.value) {
      phone.current.focus();
      return toast.error("Enter Phone", { id: "error_1" });
    }
    if (phone.current.value.length < 10 || phone.current.value.length > 11) {
      phone.current.focus();
      return toast.error("Invalid Phone", { id: "error_1" });
    }

    const address =
      deliveryMethod === "Delivery"
        ? address_1.current.value +
          " " +
          address_2.current.value +
          "\n" +
          city.current.value +
          " " +
          state.current.value
        : "";

    const order = {
      products: cartProducts.map((product) => {
        return {
          name: product.name,
          price: product.price,
          quantity: product.qty,
        };
      }),
      orderCost: order_cost,
      deliveryFee: delivery_fee,
      totalCost: total,
      customerName: f_name.current.value + " " + l_name.current.value,
      customerPhone: phone.current.value,
      customerAddress: address,
      location: location,
      customerEmail: email.current.value,
      shortNote: note.current.value,
      deliveryMethod: deliveryMethod,
    };

    setIsLoading(true);
    try {
      const response = await axios.post("api/sales/save_order", order);
      setIsLoading(false);
      if (response.status === 200) {
        toast.success("Order Sent", { id: "success_1" });

        const order_id = response.data.order.orderId;

        // Go to order page
        navigate(`/view-order/${order_id}?new=true`);
      } else {
        toast.error(response.message, { id: "error_1" });
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error in save_order: ", error);
      toast.error("Error sending order", { id: "error_1" });
    }
  };

  // check cart
  useEffect(() => {
    if (cartProducts.length === 0) {
      navigate("/cart");
    }
  }, [cartProducts, navigate]);

  // set current page
  useEffect(() => {
    setCurrentPage("Checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [setCurrentPage, navigate]);

  // set delivery fee
  useEffect(() => {
    if (deliveryMethod !== "Delivery") {
      setLocation("");
    }

    if (location) {
      const loc = locationList.find((loc) => loc.location === location);
      setDelivery_fee(loc?.price ?? 1);
    } else setDelivery_fee(0);
  }, [deliveryMethod, location, locationList]);

  // prefill details
  useEffect(() => {
    if (user) {
      f_name.current.value = user.name.split(' ')[0] ?? '';
      l_name.current.value = user.name.split(' ')[1] ?? '';
      email.current.value = user.email;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MetaWrap path={path}>
      <div className="xs:px-1 xs:mx-5 relative mx-4 mb-32 max-w-[1200px] justify-center pt-5 sm:px-5 md:mx-auto">
        {/* Top bar */}
        <div className="hidden md:block">
          <div className="text-md mb-6 flex justify-between">
            <div className="flex gap-3">
              <Link to="/">Home</Link>
              <span className="text-gray-400">/</span>
              <Link to="/cart">Cart</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-400">Checkout</span>
            </div>
          </div>

          {/* Page Title */}
          <div className="mb-8 text-2xl font-bold">Checkout</div>
        </div>

        <div className="border-y py-3">
          Have A Coupon? {""}
          <span className="cursor-pointer text-green-600 transition duration-300 ease-in-out hover:underline">
            Click Here To Enter Your Code
          </span>
        </div>

        <div className="mt-10 flex w-full flex-col md:flex-row">
          <DeliveryDetails
            f_name={f_name}
            l_name={l_name}
            address_1={address_1}
            address_2={address_2}
            city={city}
            state={state}
            phone={phone}
            email={email}
            note={note}
            deliveryMethod={deliveryMethod}
            setDeliveryMethod={setDeliveryMethod}
            location={location}
            setLocation={setLocation}
            locationList={locationList}
          />
          <OrderDetails
            delivery_fee={delivery_fee}
            save_order={save_order}
            total_qty={total_qty}
            order_cost={order_cost}
            total={total}
            setTotal_qty={setTotal_qty}
            setOrder_cost={setOrder_cost}
            setTotal={setTotal}
            isLoading={isLoading}
          />
        </div>
      </div>
    </MetaWrap>
  );
};

const DeliveryDetails = ({
  f_name,
  l_name,
  address_1,
  address_2,
  city,
  state,
  phone,
  email,
  note,
  deliveryMethod,
  setDeliveryMethod,
  location,
  setLocation,
  locationList,
}) => {
  function changeDeliveryMethod(e) {
    setDeliveryMethod(e.target.value);
  }

  function changeLocation(e) {
    setLocation(e.target.value);
  }
  locationList.sort(function (a, b) {
  if (a.location < b.location) {
    return -1;
  }
  if (a.location > b.location) {
    return 1;
  }
  return 0;
});

  return (
    <div className="w-full pr-0 md:pr-7">
      <div className="mb-5 text-xl font-semibold">Delivery Details</div>
      <div className="flex flex-col gap-3">
        {/* name */}
        <div className="flex gap-3">
          <TextField
            inputRef={f_name}
            label={"First Name"}
            placeholder={"First Name"}
            id={"f_name"}
            required={true}
          />
          <TextField
            inputRef={l_name}
            label={"Last Name"}
            placeholder={"Last Name"}
            id={"l_name"}
            required={true}
          />
        </div>

        {/* delivery method */}
        <div>
          <div className="mb-1">
            <label htmlFor="delivery_method">
              Delivery Method <span className="text-red-700">*</span>
            </label>
          </div>
          <select
            className="w-full rounded-md border p-2"
            name="delivery_method"
            defaultValue="Select"
            onChange={changeDeliveryMethod}
            id="delivery_method"
            placeholder="Select"
          >
            <option value="">Select one</option>
            <option value="Delivery">Delivery</option>
            <option value="Store Pickup">Store Pickup</option>
          </select>
        </div>

        {/* location */}
        {deliveryMethod === "Delivery" && (
          <div>
            <div className="mb-1">
              <label htmlFor="location">
                Location <span className="text-red-700">*</span>
              </label>
            </div>
            <select
              className="w-full rounded-md border p-2"
              name="location"
              defaultValue="Select"
              onChange={changeLocation}
              id="location"
              placeholder="Select"
            >
              <option value="">Select one</option>
              {locationList.map((loc, index) => (
                <option key={index} value={loc.location}>
                  {loc.location}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* address */}
        {(deliveryMethod === "Delivery" && location && (
          <div className="flex flex-col gap-3">
            <TextField
              inputRef={address_1}
              label={"Address"}
              placeholder={"House number and street name"}
              id={"address"}
              required={true}
            />
            <TextField
              inputRef={address_2}
              placeholder={"Apartment, suite, unit, etc. (optional)"}
              id={"address_2"}
            />

            <TextField
              inputRef={city}
              label={"Town / City"}
              id={"city"}
              required={true}
            />
            <TextField
              inputRef={state}
              label={"State"}
              id={"state"}
              required={true}
            />
            <TextField
              label={"Country / Region"}
              id={"country"}
              required={true}
              readOnly={"Nigeria"}
            />
          </div>
        )) ||
          (deliveryMethod === "Store Pickup" && (
            <div>
              <div className="mb-1">
                <label className="text-sm font-semibold">Store address</label>
              </div>

              <div className="text-sm font-semibold text-gray-800">
                46 Beach Road(TOS Benson Road),<br></br>Opposite Ikorodu General
                Hospital,
                <br />
                Ikorodu, Lagos
              </div>
            </div>
          ))}

        <TextField
          inputRef={phone}
          label={"Phone"}
          id={"phone"}
          required={true}
        />
        <TextField inputRef={email} label={"Email address"} id={"email"} />

        <div className="mt-4 text-xl font-semibold">Additional information</div>

        <TextField
          inputRef={note}
          label={"Order notes (optional)"}
          placeholder={
            "Notes about your order, e.g. special notes for delivery"
          }
          id={"note"}
          height={4}
        />
      </div>
    </div>
  );
};

const OrderDetails = ({
  delivery_fee,
  save_order,
  total_qty,
  order_cost,
  total,
  setTotal_qty,
  setOrder_cost,
  setTotal,
  isLoading,
}) => {
  const { cartProducts, updateCart } = useProductStore();

  const increaseItemQty = (itemId) => {
    const item = cartProducts.find((item) => item.id === itemId);
    if (item) {
      item.qty += 1;
      updateCart(item);
    }
  };

  // decreaae quantity
  const decreaseItemQty = (itemId) => {
    const item = cartProducts.find((item) => item.id === itemId);
    if (item && item.qty > 1) {
      item.qty -= 1;
      updateCart(item);
    }
  };

  useEffect(() => {
    const qty = cartProducts.reduce((acc, item) => {
      return acc + item.qty;
    }, 0);

    const cost = cartProducts.reduce((acc, item) => {
      const total = item.price * item.qty;
      return acc + total;
    }, 0);

    const tot = cost + delivery_fee;

    setTotal_qty(qty);
    setOrder_cost(cost);
    setTotal(tot);
  }, [cartProducts, delivery_fee, setTotal, setOrder_cost, setTotal_qty]);

  return (
    <div className="w-full pl-0 pt-10 md:pl-7 md:pt-0">
      <div className="mb-5 text-xl font-semibold">Your Order</div>

      <div className="rounded-md bg-gray-100 p-5">
        {/* Header */}
        <div className="flex justify-between">
          <div className="text-lg font-medium">Product</div>
          <div className="text-lg font-medium">Subtotal</div>
        </div>

        {/* Items */}
        {cartProducts.map((item) => {
          const { id, name, image, price, qty } = item;
          const total = price * qty;
          return (
            <div
              key={id}
              className="flex w-full gap-4 border-b border-gray-300 py-3"
            >
              {/* Product image */}
              <div className="w-[70px]">
                <img src={fetch_image(image)} alt="Product Image" />
              </div>

              {/* details */}
              <div className="flex w-full items-start justify-between">
                <div className="flex min-w-[40%] flex-col gap-1">
                  <div className="transition-all duration-300 hover:text-green-700">
                    {name}
                  </div>

                  {/* Item quantity */}
                  <div className="flex h-9 w-full min-w-[90px] max-w-[110px] items-center rounded-md border border-gray-200 text-gray-700">
                    <button
                      onClick={() => decreaseItemQty(id)}
                      className="flex h-full min-w-[35px] items-center justify-center rounded-l-md transition-all duration-300 hover:bg-gray-200 hover:text-green-900"
                    >
                      <Minus size={15} />
                    </button>
                    <div className="flex h-full w-full items-center justify-center">
                      {qty}
                    </div>
                    <button
                      onClick={() => increaseItemQty(id)}
                      className="flex h-full min-w-[35px] items-center justify-center rounded-r-md transition-all duration-300 hover:bg-orange-400 hover:text-green-900"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-start text-[16px] font-semibold text-red-500">
                  ₦{total.toLocaleString()}.00
                </div>
              </div>
            </div>
          );
        })}

        {/* Order cost */}
        <div className="flex flex-col justify-between gap-1 border-b border-gray-300 py-3">
          <div className="flex justify-between">
            <div className="">Quantity</div>
            <div className="text-[16px] font-semibold text-red-500">
              {total_qty.toLocaleString()}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="">Order cost</div>
            <div className="text-[16px] font-semibold text-red-500">
              ₦{order_cost.toLocaleString()}.00
            </div>
          </div>
          <div className="flex justify-between">
            <div className="">Delivery fee</div>
            <div className="text-[16px] font-semibold text-red-500">
              ₦{delivery_fee.toLocaleString()}.00
            </div>
          </div>
        </div>

        {/* total */}
        <div className="flex justify-between border-gray-300 pt-3">
          <div className="">Total</div>
          <div className="text-[20px] font-bold text-red-500">
            ₦{total.toLocaleString()}.00
          </div>
        </div>
      </div>

      <div className="mt-5 text-sm">
        Your personal data will be used to process your order, support your
        experience throughout this website, and for other purposes described in
        our privacy policy.
      </div>

      {/* place order */}
      <button
        onClick={save_order}
        disabled={isLoading}
        className="mt-6 flex w-full justify-center rounded-md bg-green-700 p-3 text-center font-bold text-white transition duration-300 ease-in-out hover:bg-green-800 md:w-1/2"
      >
        {isLoading ? (
          <Loader className="size-6 animate-spin"></Loader>
        ) : (
          "Place Order"
        )}
      </button>
    </div>
  );
};

const TextField = ({
  inputRef,
  id,
  label,
  placeholder,
  required,
  type = "text",
  readOnly,
  height,
}) => {
  return (
    <div className="w-full">
      {label && (
        <div className="mb-1">
          <label htmlFor={id} className="text-sm font-semibold">
            {label} {required && <span className="text-red-700">*</span>}
          </label>
        </div>
      )}
      {readOnly ? (
        <div className="text-md mt-2 font-bold">{readOnly}</div>
      ) : height ? (
        <textarea
          ref={inputRef}
          type={type}
          id={id}
          placeholder={placeholder}
          className="w-full rounded-md border p-2"
        ></textarea>
      ) : (
        <input
          ref={inputRef}
          type={type}
          id={id}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-md border p-2"
        />
      )}
    </div>
  );
};

export default CheckoutPage;
