/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";
import { useEffect, useRef } from "react";
import { usePageHooks } from "../Hooks/useGeneralHooks";
import { useOrderHooks } from "../Hooks/useOrderHooks";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import MetaWrap from "../utils/MetaWrap";

const TrackOrderPage = ({path}) => {
  const { setCurrentPage } = usePageHooks();

  // Set current page
  useEffect(() => {
    setCurrentPage("Track Order");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [setCurrentPage]);

  const navigate = useNavigate();

  const { track_order, isLoading } = useOrderHooks();

  const order_id_ref = useRef(null);

  return (
    <MetaWrap path={path}>
    <div className="xs:px-1 xs:mx-5 relative mx-4 mb-32 max-w-[1200px] justify-center pt-5 sm:px-5 md:mx-auto">
      {/* Top bar */}
      <div className="hidden md:block">
        <div className="text-md mb-6 flex justify-between">
          <div className="flex gap-3">
            <Link to="/">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400">Track Order</span>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8 text-2xl font-bold">Track Order</div>
      </div>

      <div className="flex w-full flex-col justify-center gap-x-40 gap-y-12 lg:flex-row">
        {/* track box */}
        <div>
          <div className="font-semibold mb-1 text-lg">Enter Order ID</div>
          <div className="text-gray-600 text-sm mb-8">
            To view the current status of your order, enter your order ID as it
            appears on the ticket.
          </div>

          <input
            ref={order_id_ref}
            type="text"
            name="order_id"
            id="order_id"
            className="w-full rounded-md border p-2"
          />

          {/* place order */}
          <button
            onClick={async () => {
              const order_id = order_id_ref.current.value;

              if (!order_id) {
                order_id_ref.current.focus();
                return toast.error("Enter Order ID", { toastId: "error_1" });
              }

              const res = await track_order(order_id);
              if (res) {
                navigate(`/view-order/${res.orderId}`);
              }
            }}
            disabled={isLoading}
            className="mt-6 flex w-full justify-center rounded-md bg-green-700 p-3 text-center font-bold text-white transition duration-300 ease-in-out hover:bg-green-800 md:w-1/2"
          >
            {isLoading ? (
              <Loader className="size-6 animate-spin"></Loader>
            ) : (
              "Track Order"
            )}
          </button>
        </div>

        {/* Related products */}
        <RelatedProducts additionalClasses={"max-w-full lg:w-[300px]"} />
      </div>
    </div>
    </MetaWrap>
  );
};

export default TrackOrderPage;
