import { useCart } from "../../routes/provider/ShoppingProvider";
import { X } from "lucide-react";

const WishlistItem = ({ product, onRemove, onAddToCart }) => {
  const { addToCart } = useCart();
  console.log(product);

  // ✅ Normalize fields
  const name = product.name || product.product_name || "Unnamed Product";
  const image =
    product.image || product.product_image || "/placeholder.svg";
  const price = Number(
    product.currentPrice ?? product.price ?? 0
  );
  const status =
    product.status ||
    (product.stock_status === "IN_STOCK" ? "In Stock" : "Out of Stock");

  const isInStock = status === "In Stock";

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name,
      image,
      current_price: price,
    });
    onAddToCart({ name });
  };

  return (
    <div className="px-4 sm:px-6 py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      
      {/* Desktop */}
      <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
        <div className="col-span-5 flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
          <span className="font-medium text-gray-900 text-sm">
            {name}
          </span>
        </div>

        <div className="col-span-2">
          <span className="font-semibold text-gray-900">
            ${price.toFixed(2)}
          </span>
        </div>

        <div className="col-span-2">
          <span
            className={`px-3 py-1 rounded text-xs font-semibold ${
              isInStock
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>
        </div>

        <div className="col-span-3 flex justify-end gap-2">
          <button
            onClick={handleAddToCart}
            disabled={!isInStock}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              isInStock
                ? "bg-[#00B207] text-white hover:bg-[#009206]"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Add to Cart
          </button>

          <button
            onClick={onRemove}
            className="w-8 h-8 flex items-center justify-center rounded-full border text-gray-400 hover:text-red-500"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className="sm:hidden flex flex-col gap-3">
        <div className="flex gap-4">
          <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>

          <div className="flex-1">
            <div className="flex justify-between">
              <span className="font-medium text-sm">{name}</span>
              <button onClick={onRemove}>
                <X size={16} />
              </button>
            </div>

            <div className="flex justify-between mt-2">
              <span className="font-semibold">${price.toFixed(2)}</span>
              <span
                className={`px-2 py-0.5 rounded text-xs ${
                  isInStock
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {status}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!isInStock}
          className={`w-full py-2 rounded-full text-sm font-semibold ${
            isInStock
              ? "bg-[#00B207] text-white"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;
