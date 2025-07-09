/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { useProductStore } from "../Hooks/useProductStore.jsx";
import { usePageHooks } from "../Hooks/useGeneralHooks.jsx";
import { Link } from "react-router-dom";
import Select from "react-select";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import RelatedProducts from "../components/RelatedProducts.jsx";
import MetaWrap from "../utils/MetaWrap";

const DropReviewPage = ({path}) => {
  const { setCurrentPage } = usePageHooks();

  // Set current page
  useEffect(() => {
    setCurrentPage("Review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [setCurrentPage]);

  return (
    <MetaWrap path={path}>
    <div className="xs:px-1 xs:mx-5 relative mx-4 mb-32 max-w-[1200px] justify-center pt-5 sm:px-5 md:mx-auto">
      {/* Top bar */}
      <div className="hidden md:block">
        <div className="text-md mb-6 flex justify-between">
          <div className="flex gap-3">
            <Link to="/">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400">Review</span>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8 text-2xl font-bold">Review</div>
      </div>

      <div className="flex w-full flex-col justify-center gap-x-40 gap-y-12 lg:flex-row">
        <FormBox />

        {/* Related products */}
        <RelatedProducts additionalClasses={"max-w-full lg:w-[300px]"} />
      </div>
    </div>
    </MetaWrap>
  );
};

const FormBox = () => {
  const { productList } = useProductStore();

  const query = new URLSearchParams(window.location.search);
  const raw_product = query.get("product");
  let found_product = productList.find((p) => p.link === raw_product);
  const product = found_product ? found_product : null;

  const [reviewType, setReviewType] = useState(
    !product ? "general" : "product",
  );
  const [selectedProducts, setSelectedProducts] = useState(
    product ? product.name : "",
  );
  const [reviewText, setReviewText] = useState("");
  const [name, setName] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reviewText) {
      return toast.error("Enter a review text");
    }

    if (reviewType === "product" && !selectedProducts) {
      return toast.error("Select Product");
    }

    const reviewData = {
      reviewType,
      products: selectedProducts,
      reviewText,
      name: name ? name : undefined,
    };

    setIsLoading(true);
    try {
      const response = await axios.post("api/store/drop_review", reviewData);
      setIsLoading(false);
      if (response.status === 200) {
        toast.success("Order Sent", { toastId: "success_1" });

        setDone(true);
      } else {
        toast.error(response.message, { toastId: "error_1" });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    }
  };

  if (done) return <SuccesPage />;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-5 md:w-1/2"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="reviewType" className="">
          Review Type:
        </label>
        <select
          id="reviewType"
          value={reviewType}
          onChange={(e) => setReviewType(e.target.value)}
          className="w-full rounded-md border p-2"
        >
          <option value="general">General Review</option>
          <option value="product">Product Review</option>
        </select>
      </div>

      {reviewType === "product" && (
        <div className="flex flex-col gap-1">
          <label htmlFor="products">Select Product(s):</label>

          <Select
            defaultValue={[
              product && { label: product.name, value: product.name },
            ]}
            isMulti
            name="colors"
            options={productList.map((product) => ({
              label: product.name,
              value: product.name,
            }))}
            onChange={(choice) =>
              setSelectedProducts(choice.map((e) => e.value).join(","))
            }
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="reviewText">Review:</label>
        <textarea
          id="reviewText"
          value={reviewText}
          rows="8"
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full rounded-md border p-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="name">Name (optional):</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-3/5 rounded-md border p-2"
        />
      </div>

      <button
        className="mt-4 flex w-full justify-center rounded bg-green-700 p-3 font-semibold text-white transition duration-300 hover:bg-green-900"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader className="size-6 animate-spin"></Loader>
        ) : (
          "Drop review"
        )}
      </button>
    </form>
  );
};

const SuccesPage = () => {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center md:h-[30vh]">
      <div className="m-7 text-4xl font-extrabold">Review Sent</div>
      <div className="mb-5 text-center font-semibold">
        Thank you for leaving a review! Your feedback has been submitted and
        will be added to the relevant product.
      </div>
      <Link
        to={"/shop"}
        className="cursor-pointer rounded-md border border-gray-800 bg-gray-800 px-6 py-2 font-semibold text-white transition duration-300 hover:bg-transparent hover:text-black"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default DropReviewPage;
