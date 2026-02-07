import { Eye, Heart } from "lucide-react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useNavigate } from "react-router";
import { useWishlist } from "../routes/provider/WishlistProvider";
import { toast } from "react-toastify";
import { useState } from "react";
import { useProductModal } from "../routes/provider/ProductModalProvider";

const ProductCard = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
    const { openProductModal } = useProductModal();
const [isAnimating, setIsAnimating] = useState(false);
  const favorite = isInWishlist(product.slug);
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

 const handleWishlistClick = (product) => {
    toggleWishlist(product);

    // ✅ trigger heart animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300); // animation lasts 300ms

    if (isInWishlist(product.slug)) {
      toast.warn(`${product.name} removed from wishlist!`);
    } else {
      toast.success(`${product.name} added to wishlist!`);
    }
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 hover:border-[#00B307] hover:shadow-[0_0_0_2px_rgba(0,179,7,0.15),0_10px_20px_rgba(0,179,7,0.25)] hover:-translate-y-2">
      
      {/* Image */}
      <div className="relative aspect-square rounded-t-lg overflow-hidden group">
        <img
          src={primaryImage}
          alt={product.name}
          className="w-full h-full object-cover rounded-t-2xl"
        />

        {product.discount_percentage && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            Sale {Number(product.discount_percentage).toFixed(0)}%
          </div>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-100 md:opacity-0 group-hover:opacity-100">
          <button
            onClick={() => handleWishlistClick(product)}
             className={`bg-white rounded-full p-2 transform transition-transform duration-300 cursor-pointer ${
              isAnimating ? "scale-125" : ""
            }`} 
          >
            <Heart
              size={18}
              className={
                favorite ? "fill-red-500 text-red-500" : "text-gray-600"
              }
            />
          </button>

          <button
            // onClick={() => onView(product.slug)}
            onClick={() => openProductModal(product.slug)}
            className="bg-white rounded-full p-2 cursor-pointer"
          >
            <Eye size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-center justify-between p-4">
        <div>
          <h3 className="font-semibold text-[#4d4d4d] mb-2 text-base line-clamp-2 min-h-12">
            {product.name}
          </h3>

          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-gray-900">
              ${Number(product.current_price).toFixed(2)}
            </span>
            {product.original_price && (
              <span className="text-base text-gray-400 line-through">
                ${Number(product.original_price).toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-lg ${
                  i < Math.floor(product.average_rating || 0)
                    ? "text-orange-400"
                    : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
            <span className="text-xs text-gray-500 ml-1">
              {(product.average_rating || 0).toFixed(1)}
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate(`/product/${product.slug}`)}
          className="w-12 h-12 bg-green-50 hover:bg-green-500 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12 cursor-pointer"
        >
          <HiOutlineShoppingBag size={22} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
