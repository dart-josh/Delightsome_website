/* eslint-disable react/prop-types */
import { Star } from "lucide-react";

const ProductRatings = ({ rating, size= 16,  fillColor = 'fill-emerald-400', strokeColor = 'stroke-emerald-400' }) => {
  return (
    <div className="flex items-center gap-0.5">
      <Star
        size={size}
        className={
          rating > 0
            ? `${fillColor} ${strokeColor}`
            : "fill-gray-300 stroke-gray-300"
        }
      />
      <Star
        size={size}
        className={
          rating > 1
            ? `${fillColor} ${strokeColor}`
            : "fill-gray-300 stroke-gray-300"
        }
      />
      <Star
        size={size}
        className={
          rating > 2
            ? `${fillColor} ${strokeColor}`
            : "fill-gray-300 stroke-gray-300"
        }
      />
      <Star
        size={size}
        className={
          rating > 3
            ? `${fillColor} ${strokeColor}`
            : "fill-gray-300 stroke-gray-300"
        }
      />
      <Star
        size={size}
        className={
          rating > 4
            ? `${fillColor} ${strokeColor}`
            : "fill-gray-300 stroke-gray-300"
        }
      />
    </div>
  );
};

export default ProductRatings;
