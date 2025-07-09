/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { usePageHooks } from "../Hooks/useGeneralHooks";
import { Link } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";
import { Loader, PenBox, UserCircle2 } from "lucide-react";
import { useOrderHooks } from "../Hooks/useOrderHooks";
import MetaWrap from "../utils/MetaWrap";

const ReviewPage = ({path}) => {
  const { setCurrentPage } = usePageHooks();
  const { getReviews } = useOrderHooks();

  const [loadingReviews, setLoadingReviews] = useState(false);
  const [reviews, setReviews] = useState([]);

  const get_reviews = async (id) => {
    setLoadingReviews(true);
    const r = await getReviews(id);

    setReviews(r);
    setLoadingReviews(false);
  };

  // Set current page
  useEffect(() => {
    setCurrentPage("Reviews");
    get_reviews("all");
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
            <span className="text-gray-400">Reviews</span>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8 text-2xl font-bold">Reviews</div>
      </div>

      <div className="flex w-full flex-col justify-center gap-x-40 gap-y-12 lg:flex-row">
        {/* All reviews */}
        <div className="w-full">
          <div>
            <Link
              to={`/drop-review`}
              className="mb-10 flex items-center gap-2 rounded-[4px] border border-gray-400 bg-gray-200 px-4 py-[6px] text-[15px] text-gray-600 transition-all duration-300 hover:border-green-800 hover:bg-transparent hover:text-green-600"
            >
              <PenBox size={18} /> <span>Leave us a Review</span>
            </Link>
          </div>

          {(loadingReviews && (
            <div className="flex w-full justify-center">
              <Loader className="size-6 animate-spin" />
            </div>
          )) ||
            (reviews && reviews.length > 0 && (
              <div className="flex flex-col gap-3">
                {reviews.map((review, index) => (
                  <div key={index}>
                    <div className="flex gap-2 border-b border-gray-200 pb-3">
                      <UserCircle2 size={30} strokeWidth={1} />

                      <div className="w-full">
                        <div className="mb-2 font-semibold">{review.name}</div>

                        <div className="text-sm">{review.reviewText}</div>

                        {review.products !== "" && (
                          <div className="mt-2 text-sm italic">
                            <span className="font-semibold text-gray-600">
                              Products:
                            </span>{" "}
                            {review.products.replaceAll(",", ", ")}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )) || <p>There are no reviews yet.</p>}
        </div>

        {/* Related products */}
        <RelatedProducts additionalClasses={"max-w-full lg:w-[300px]"} />
      </div>
    </div>
    </MetaWrap>
  );
};

export default ReviewPage;
