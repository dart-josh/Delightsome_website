import { Link } from "react-router-dom";
import { useProductStore } from "../Hooks/useProductStore";
import { useEffect, useState } from "react";
import { Delete, Minus, Plus } from "lucide-react";
import { usePageHooks } from "../Hooks/useGeneralHooks";

const CartPage = () => {
  const { cartProducts, updateCart, removeFromCart } = useProductStore();
  const {
    setCurrentPage
  } = usePageHooks();

  const [totalCartPrice, setTotalCartPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    for (let index = 0; index < cartProducts.length; index++) {
      const element = cartProducts[index];
      const amt = element.price * element.qty;
      total += amt;
    }
    setTotalCartPrice(total);
  }, [cartProducts]);

  const increaseItemQty = (itemId) => {
    const item = cartProducts.find((item) => item.id === itemId);
    if (item) {
      if (item.qty < 5) {
        item.qty += 1;
        updateCart(item);
      }
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

  // Set current page
  useEffect(() => {
    setCurrentPage('Cart');
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [setCurrentPage]);

  return (
    <div className="xs:px-1 xs:mx-5 relative mx-4 max-w-[1200px] justify-center pt-5 sm:px-5 md:mx-auto mb-32">
      {/* Top bar */}
      <div className="hidden md:block">
        <div className="text-md mb-6 flex justify-between">
          <div className="flex gap-3">
            <Link to="/">Home</Link>
            <span className='text-gray-400'>/</span>
            <span className='text-gray-400'>Cart</span>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8 text-2xl font-bold">Cart</div>
      </div>

      <div className="flex w-full flex-col gap-y-12 gap-x-20 lg:flex-row">
        <div className="w-full">
          {/* Cart items */}
          {cartProducts && cartProducts.length > 0 && <div className="w-full md:border-t mb-3">
            {cartProducts.map((item) => {
              const { id, name, image, price, qty, link } = item;
              const total = price * qty;
              return (
                <div key={id} className="flex w-full gap-4 border-b py-4">
                  {/* Product image */}
                  <Link
                    to={`/product/${link}`}
                    className="w-[130px] md:w-[70px]"
                  >
                    <img
                      src={image}
                      alt="Product Image"
                      // className="h-full object-cover"
                      // width={60}
                      // height={0}
                    />
                  </Link>

                  {/* large screen */}
                  <div className="hidden w-full items-center justify-between gap-3 md:flex">
                    <div className="min-w-[40%]">
                      <Link
                        to={`/product/${link}`}
                        className="transition-all duration-300 hover:text-green-700"
                      >
                        {name}
                      </Link>
                    </div>

                    <div className="flex min-w-[30%] items-center justify-between gap-5">
                      {/* Price */}
                      <div className="text-[15px] font-semibold text-red-500 text-end">
                        ₦{price.toLocaleString()}.00
                      </div>

                      {/* Item quantity */}
                      <div className="flex h-10 w-full min-w-[120px] max-w-[130px] items-center rounded-md border border-gray-200 text-gray-700">
                        <button
                          onClick={() => decreaseItemQty(id)}
                          className="flex h-full min-w-[40px] items-center justify-center rounded-l-md transition-all duration-300 hover:bg-gray-200 hover:text-green-900"
                        >
                          <Minus size={15} />
                        </button>
                        <div className="flex h-full w-full items-center justify-center">
                          {qty}
                        </div>
                        <button
                          onClick={() => increaseItemQty(id)}
                          className="flex h-full min-w-[40px] items-center justify-center rounded-r-md transition-all duration-300 hover:bg-orange-400 hover:text-green-900"
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-[15px] font-semibold text-red-500 text-start">
                        ₦{total.toLocaleString()}.00
                      </div>
                    </div>

                    <Delete
                      className="cursor-pointer"
                      onClick={() => removeFromCart(id)}
                    />
                  </div>

                  {/* mobile device */}
                  <div className="flex w-full flex-col gap-2 md:hidden">
                    <div className="">
                      <Link
                        to={`/product/${link}`}
                        className="transition-all duration-300 hover:text-green-700"
                      >
                        {name}
                      </Link>
                    </div>

                    <div className="flex items-center justify-between gap-5">
                      <div className="flex flex-col gap-1">
                        {/* Price */}
                        <div className="text-[15px] font-semibold text-red-500">
                          ₦{price.toLocaleString()}.00
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Item quantity */}
                          <div className="flex h-10 w-full min-w-[120px] max-w-[130px] items-center rounded-md border border-gray-200 text-gray-700">
                            <button
                              onClick={() => decreaseItemQty(id)}
                              className="flex h-full min-w-[40px] items-center justify-center rounded-l-md transition-all duration-300 hover:bg-gray-200 hover:text-green-900"
                            >
                              <Minus size={15} />
                            </button>
                            <div className="flex h-full w-full items-center justify-center">
                              {qty}
                            </div>
                            <button
                              onClick={() => increaseItemQty(id)}
                              className="flex h-full min-w-[40px] items-center justify-center rounded-r-md transition-all duration-300 hover:bg-orange-400 hover:text-green-900"
                            >
                              <Plus size={15} />
                            </button>
                          </div>

                          <Delete
                            className="cursor-pointer"
                            onClick={() => removeFromCart(id)}
                          />
                        </div>
                      </div>

                      {/* Price */}
                      <div className="hidden xs:flex text-md font-bold text-red-500">
                        ₦{total.toLocaleString()}.00
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div> || <div className="px-5 py-5 flex w-full justify-center border-b mb-3">
          No Items in Cart</div>}

          <Link
            to={`/shop`}
            className="text-green-700 transition-all duration-300 hover:text-green-900"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Cart info */}
        <div className="min-w-full lg:min-w-[330px]">
          <div className="mb-4 rounded-lg bg-gray-100 px-6 py-4 text-black">
            <div className="text-md mb-4 font-semibold">Cart Totals</div>

            <div className="mb-5 flex items-center justify-between border-b border-gray-300 pb-2">
              <div> Subtotal</div>
              <div className="text-red-600">
                ₦{totalCartPrice.toLocaleString()}.00
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Total</div>
              <div className="text-xl font-bold text-red-600">
                ₦{totalCartPrice.toLocaleString()}.00
              </div>
            </div>
          </div>

          {/* checkout button */}
          <Link to={ (cartProducts && cartProducts.length > 0) ? '/checkout' : ''} className="flex w-full justify-center rounded-lg bg-green-700 px-6 py-3 font-bold text-white">
            Proceed to checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
