import React from "react";
import { Heart, Eye } from "lucide-react";
import { HiOutlineShoppingBag } from "react-icons/hi";
const ProductCard = ({ product, isFavorite, onToggleFavorite,onView }) => {
  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;
  return (
    <div className="bg-white shadow hover:shadow-md transition-shadow border border-gray-200">
      {/* Image Section */}
      <div className="relative h-48 rounded-t-lg overflow-hidden group">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Sale Badge */}
        {product.isSale && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            Sale {discountPercent}%
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onToggleFavorite}
            className="bg-white rounded-full p-2 hover:bg-gray-100"
            aria-label="Add to favorites"
          >
            <Heart
              size={18}
              className={`${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </button>
          <button
            onClick={() => onView(product)}
            className="bg-white rounded-full p-2 hover:bg-gray-100"
            aria-label="View details"
          >
            <Eye size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 text-sm">
          {product.name}
        </h3>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-lg ${i < Math.floor(product.rating) ? "text-orange-400" : "text-gray-300"}`}
              >
                ★
              </span>
            ))}
            <span className="text-xs text-gray-500 ml-1">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <button className=" w-12 h-12 bg-green-50 hover:bg-green-500 hover:text-white rounded-full flex items-center justify-center ">
            <HiOutlineShoppingBag size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
