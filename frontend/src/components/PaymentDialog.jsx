import { useEffect, useState } from "react";
import { useOrderHooks } from "../Hooks/useOrderHooks";
import { useGeneralHooks } from "../Hooks/useGeneralHooks";
import { Info, Loader } from "lucide-react";
import toast from "react-hot-toast";

const PaymentDialog = () => {
  const {
    toggle_makePaymentDialog,
    makePaymentDialog,
    onPaymentComplete,
    order,
  } = useOrderHooks();

  const { formatAmount } = useGeneralHooks();

  const [isOpen, setIsOpen] = useState(makePaymentDialog);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!order) {
      return toggle_makePaymentDialog({ value: false });
    }

    if (makePaymentDialog) {
      setIsOpen(true);
    }
  }, [makePaymentDialog, order, toggle_makePaymentDialog]);

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const closeDialog = async () => {
    setIsOpen(false);
    await delay(500);
    toggle_makePaymentDialog({ value: false });
  };

  if (!order) return null;

  return (
    <div
      className={`min-w-screen fixed inset-0 z-[80] flex min-h-screen items-center justify-center ${makePaymentDialog ? "block" : "hidden"}`}
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>

      <div
        className={`xs:w-[80%] relative flex h-[65%] w-[85%] max-w-[450px] justify-center overflow-y-hidden rounded-lg bg-white transition-all duration-500 ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-10"}`}
      >
        <div className="scrollbar flex h-full w-full flex-col items-center gap-4 overflow-y-auto px-5 pb-20 pt-4">
          <div className="">
            <h2 className="text-xl font-bold">Make Payment</h2>
          </div>

          {/* payment details */}
          <div className="mb-2 w-full rounded-lg bg-gray-200 px-4 py-3">
            <div className="text-md mb-1 font-semibold">Payment Details</div>
            <div className="flex flex-col gap-6 text-sm text-gray-700">
              <div className="">
                <div className="flex items-center gap-2 font-semibold">
                  <div className="">Bank name:</div>
                  <div className="text-[16px]">Guaranty Trust Bank (GTB)</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-semibold">Account No:</div>
                  <div className="text-lg font-bold">0235410851</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-semibold">Account Name:</div>
                  <div className="text-lg font-bold">DHI/Fitness and wellness centre</div>
                </div>
              </div>

              <div className="flex flex-col items-center font-semibold">
                <div>Amount to be paid:</div>{" "}
                <div className="text-lg font-bold">
                  {formatAmount(order.totalCost)}
                </div>
              </div>
            </div>
          </div>

          {/* info */}
          <div className="flex items-center justify-center gap-2 text-[13px] text-gray-700">
            <div>
              <Info size={22} />
            </div>
            <div>
              Make a transfer of the above amount to the account details above.
              Once completed click the payment complete button below
            </div>
          </div>

          <div className="flex w-full flex-col gap-2">
            <div className="flex justify-center text-sm font-semibold text-gray-700">
              UPLOAD PROOF OF PAYMENT
            </div>

            {/* Upload screenshot */}
            <input type="file" name="ss" id="ss" />
          </div>
        </div>

        <div className="absolute bottom-0 w-full">
          <div className="flex w-full items-center">
            <button
              className="flex h-12 w-full cursor-pointer items-center justify-center bg-orange-700 p-4 font-semibold text-white transition duration-300 hover:bg-orange-800"
              onClick={closeDialog}
            >
              Close
            </button>
            <button
              disabled={isLoading}
              className="flex h-12 w-full cursor-pointer items-center justify-center bg-green-700 p-4 font-semibold text-white transition duration-300 hover:bg-green-800"
              onClick={async () => {
                setIsLoading(true);
                const res = await onPaymentComplete(order.orderId);
                setIsLoading(false);
                if (res) {
                  closeDialog();
                  toast.success(res);
                }
              }}
            >
              {isLoading ? (
                <Loader className="size-6 animate-spin"></Loader>
              ) : (
                "Payment Sent"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDialog;
