import { Eye, Heart } from "lucide-react";
import { HiOutlineShoppingBag } from "react-icons/hi";

const SmallProductCard = ({
  product,
  isActive,
  onMouseEnter,
  showDiscount = false,
  onView,
}) => {
  if (!product) return null;

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-xs ${i < Math.floor(rating) ? "text-orange-400" : "text-gray-300"}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div
      className="flex items-center gap-3 cursor-pointer border border-gray-200 
    shadow-sm
    transition-all duration-300
    hover:border-[#00B307]
    hover:shadow-[0_0_0_2px_rgba(0,179,7,0.15),0_10px_20px_rgba(0,179,7,0.25)] p-2 rounded-lg"
      onMouseEnter={onMouseEnter}
    >
      {/* Product Image */}
      <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
        <img
          src={product.image?.[0] || "/placeholder.svg"}
          alt={product.name}
          className="max-w-full max-h-full object-contain p-1"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm text-gray-700 font-medium truncate">
          {product.name}
        </h4>
        <div className="mt-0.5">{renderStars(product.rating)}</div>
        {showDiscount && product.original_price ? (
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-sm font-semibold text-green-600">
              ${product.current_price?.toFixed(2)}
            </span>
            <span className="text-xs text-gray-400 line-through">
              ${product.original_price?.toFixed(2)}
            </span>
          </div>
        ) : null}
      </div>

      {/* Action Icons - Only show on active */}
      {isActive && (
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors">
            <HiOutlineShoppingBag size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // hover / parent conflict prevent
              onView?.(product);
            }}
            className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Eye size={14} />
          </button>
          <button className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Heart size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SmallProductCard;
