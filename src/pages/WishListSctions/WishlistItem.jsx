import { useCart } from "../../routes/provider/ShoppingProvider";
import { X } from "lucide-react";

const WishlistItem = ({ product, onRemove, onAddToCart }) => {
  const { addToCart } = useCart();
  const isInStock = product.status === "In Stock";

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      current_price: product.currentPrice,
    });
    onAddToCart(product);
  };

  return (
    <div className="px-4 sm:px-6 py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Desktop Layout */}
      <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
        {/* Product Info */}
        <div className="col-span-5 flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium text-gray-900 text-sm">{product.name}</span>
        </div>

        {/* Price */}
        <div className="col-span-2">
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
        </div>

        {/* Status */}
        <div className="col-span-2">
          <span
            className={`px-3 py-1 rounded text-xs font-semibold ${
              isInStock
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.status}
          </span>
        </div>

        {/* Actions */}
        <div className="col-span-3 flex justify-end items-center gap-2">
          <button
            onClick={() => isInStock && handleAddToCart()}
            disabled={!isInStock}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
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
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden flex flex-col gap-3">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="font-medium text-gray-900 text-sm">{product.name}</span>
              <button
                onClick={() => onRemove(product.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="font-semibold text-gray-900 text-sm">
                ${product.currentPrice.toFixed(2)}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  isInStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {product.status}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => isInStock && handleAddToCart()}
          disabled={!isInStock}
          className={`w-full px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm mt-2 ${
            isInStock
              ? "bg-[#00B207] text-white hover:bg-[#009206] active:scale-95"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;
