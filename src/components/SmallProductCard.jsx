import { Eye, Heart } from "lucide-react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useWishlist } from "../routes/provider/WishlistProvider";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useState } from "react";
import { useProductModal } from "../routes/provider/ProductModalProvider";
import { requireAuth } from "../utils/requireAuth";

const SmallProductCard = ({
  product,
  isActive,
  onMouseEnter,
  showDiscount = false,
}) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { openProductModal } = useProductModal();
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  if (!product) return null;

  const favorite = isInWishlist(product.slug);

  const getProductImage = (images) => {
    if (Array.isArray(images)) {
      return (
        images.find((img) => img.is_primary)?.image || images[0]?.image
      );
    }
    if (images && typeof images === "object") return images.image;
    return "/placeholder.svg";
  };

  const primaryImage = getProductImage(product.images);

  // ✅ Wishlist (login required)
  const handleWishlistClick = (e) => {
    e.stopPropagation();

    requireAuth(() => {
      toggleWishlist(product);

      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);

      if (isInWishlist(product.slug)) {
        toast.warn(`${product.name} removed from wishlist!`);
      } else {
        toast.success(`${product.name} added to wishlist!`);
      }
    });
  };

  return (
    <div
      className="flex items-center gap-3 cursor-pointer border border-gray-200 shadow-sm
      transition-all duration-300 hover:border-[#00B307]
      hover:shadow-[0_0_0_2px_rgba(0,179,7,0.15),0_10px_20px_rgba(0,179,7,0.25)]
      p-2 rounded-lg"
      onMouseEnter={onMouseEnter}
      onClick={() => navigate(`/product/${product.slug}`)}
    >
      {/* Image */}
      <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
        <img
          src={primaryImage}
          alt={product.name}
          className="max-w-full max-h-full object-contain p-1"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm text-gray-700 font-medium truncate">
          {product.name}
        </h4>

        <div className="flex gap-0.5 text-xs">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={
                i < Math.floor(product.average_rating || 0)
                  ? "text-orange-400"
                  : "text-gray-300"
              }
            >
              ★
            </span>
          ))}
        </div>

        {showDiscount && (
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-bold text-sm text-gray-900">
              ${Number(product.current_price).toFixed(2)}
            </span>
            {product.original_price && (
              <span className="text-sm text-gray-400 line-through">
                ${Number(product.original_price).toFixed(2)}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      {isActive && (
        <div className="flex items-center gap-1">
          {/* Add to Cart (redirect) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.slug}`);
            }}
            className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600"
          >
            <HiOutlineShoppingBag size={14} />
          </button>

          {/* Quick View Modal */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              openProductModal(product.slug);
            }}
            className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 flex items-center justify-center"
          >
            <Eye size={14} />
          </button>

          {/* Wishlist */}
          <button
            onClick={handleWishlistClick}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
              isAnimating ? "scale-125" : ""
            } ${
              favorite
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Heart size={14} className={favorite ? "fill-white" : ""} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SmallProductCard;
