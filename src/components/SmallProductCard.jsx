import { Eye, Heart } from "lucide-react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useWishlist } from "../routes/provider/WishlistProvider";
import { useNavigate } from "react-router";


const SmallProductCard = ({
  product,
  isActive,
  onMouseEnter,
  showDiscount = false,
  onView,
}) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  if (!product) return null;

  const favorite = isInWishlist(product.id);

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
  const getProductImage = (images) => {
  if (Array.isArray(images)) {
    return (
      images.find(img => img.is_primary)?.image ||
      images[0]?.image
    );
  }

  if (images && typeof images === "object") {
    return images.image;
  }

  return "/placeholder.svg";
};

 const primaryImage = getProductImage(product.images);

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
          src={primaryImage}
          alt={product.name}
          className="max-w-full max-h-full object-contain p-1"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm text-gray-700 font-medium truncate">
          {product.name}
        </h4>
        <div className="mt-0.5">{renderStars(product.average_rating)}</div>
        {showDiscount && product.original_price ? (
          <div className="flex items-center gap-2 mt-0.5">
             <span className="font-bold text-base text-gray-900">
              ${Number(product.current_price).toFixed(2)}
            </span>
            {product.original_price && (
              <span className="text-base text-gray-400 line-through">
                ${Number(product.original_price).toFixed(2)}
              </span>
            )}
          </div>
        ) : null}
      </div>

      {/* Action Icons - Only show on active */}
      {isActive && (
        <div className="flex items-center gap-1">
          {/* Add to Cart Button */}
          <button
          onClick={() => navigate(`/product/${product.id}`)}
           className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors">
            <HiOutlineShoppingBag size={14} />
          </button>

          {/* View Details / Modal Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent parent hover conflict
              onView?.(product);
            }}
            className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Eye size={14} />
          </button>

          {/* Wishlist Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
              ${favorite ? "bg-red-500 text-white hover:bg-red-600" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"}`}
          >
            <Heart size={14} className={favorite ? "fill-white" : ""} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SmallProductCard;
