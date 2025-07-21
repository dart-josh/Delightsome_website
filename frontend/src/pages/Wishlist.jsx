import { Heart } from "lucide-react";
import { useProductStore } from "../Hooks/useProductStore";
import { fetch_image } from "../Hooks/serveruploader";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { usePageHooks } from "../Hooks/useGeneralHooks";

const Wishlist = () => {
  const { likedProducts, getLikedProductFromProduct } = useProductStore();
  const likes = getLikedProductFromProduct(likedProducts);

   const {setCurrentPage} = usePageHooks();
  
    useEffect(() => {
      setCurrentPage('Wishlist');
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [setCurrentPage]);

  return (
    <div className="mx-auto max-w-5xl space-y-10 p-6 py-5 md:py-16">
      {/* Liked Products */}
      <section>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Heart className="text-pink-500" /> Liked Products
        </h3>
        {likes && likes.length > 0 ? (
          <div className="flex flex-wrap gap-4 sm:gap-10">
            {likes.map((product, idx) => (
              <Link
                to={`/product/${product.link}`}
                key={idx}
                className="min-w-[180px] rounded-lg border bg-white p-4 shadow-sm sm:w-[200px]"
              >
                <img
                  src={fetch_image(product.images[0])}
                  alt={product.name}
                  className="mb-3 h-36 w-full rounded object-cover"
                />
                <h4 className="text-base font-medium">{product.name}</h4>
                <p className="text-sm text-gray-700">
                  ₦{product.price.toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No liked products yet.</p>
        )}
      </section>
    </div>
  );
};

export default Wishlist;
