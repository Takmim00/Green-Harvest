import { ShoppingCart, X } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "../../routes/provider/ShoppingProvider";
import { useWishlist } from "../../routes/provider/WishlistProvider";

const DashboardWishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  if (wishlist?.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">My Wishlist</h2>
        <div className="text-center py-12">
          <p className="text-gray-500 mb-6">Your wishlist is empty</p>
          <Link
            to="/shop"
            className="inline-block px-6 py-3 bg-[#00B250] text-white font-semibold rounded-full hover:bg-[#009a42] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">My Wishlist</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                PRODUCT
              </th>
              <th className="text-left py-4 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                PRICE
              </th>
              <th className="text-left py-4 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                STOCK STATUS
              </th>
              <th className="text-right py-4 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-3">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {item.name}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-3 text-sm font-medium text-gray-900">
                  ${item.currentPrice?.toFixed(2)}
                </td>
                <td className="py-4 px-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-[#00B250] bg-green-50">
                    In Stock
                  </span>
                </td>
                <td className="py-4 px-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#00B250] text-white text-sm font-semibold rounded-full hover:bg-[#009a42] transition-colors"
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove from wishlist"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {wishlist.map((item) => {
          const isInStock = item.status === "In Stock";

          return (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* Image */}
                <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Name + Remove */}
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {item.name}
                    </h4>
                    <button
                      onClick={() => toggleWishlist(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Price + Status */}
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-semibold text-gray-900 text-sm">
                      ${item.currentPrice?.toFixed(2)}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        isInStock
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status || "In Stock"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Add to cart */}
              <button
                onClick={() => isInStock && handleAddToCart(item)}
                disabled={!isInStock}
                className={`w-full mt-3 px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
                  isInStock
                    ? "bg-[#00B250] text-white hover:bg-[#009a42] active:scale-95"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardWishlist;
