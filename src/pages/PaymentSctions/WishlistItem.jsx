const WishlistItem = ({ product, onRemove, onAddToCart }) => {
  const isInStock = product.status === "In Stock";

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="py-4 pl-4 sm:pl-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium text-gray-900 text-sm sm:text-base">
            {product.name}
          </span>
        </div>
      </td>

      {/* Price Column */}
      <td className="py-4 px-4 hidden md:table-cell">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">
            ${product.currentPrice.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-sm">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </td>

      <td className="py-4 px-4 hidden sm:table-cell">
        <span
          className={`px-3 py-1 rounded text-xs font-semibold ${
            isInStock
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {product.status}
        </span>
      </td>

      <td className="py-4 pr-4 sm:pr-6 text-right">
        <div className="flex items-center justify-end gap-2 sm:gap-4">
          
          <div className="flex flex-col items-end md:hidden mr-2">
            <span className="font-semibold text-gray-900 text-sm">
              ${product.currentPrice.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => isInStock && onAddToCart(product)}
            disabled={!isInStock}
            className={`px-4 sm:px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
              isInStock
                ? "bg-[#00B207] text-white hover:bg-[#009206] active:scale-95"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Add to Cart
          </button>

          <button
            onClick={() => onRemove(product.id)}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors"
            title="Remove from wishlist"
          >
            ✕
          </button>
        </div>
      </td>
    </tr>
  );
};

export default WishlistItem;
