import { useCallback, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useWishlist } from "../../routes/provider/WishlistProvider";
import ShareBar from "./ShareBar";
import WishlistItem from "./WishlistItem";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const [toast, setToast] = useState(null);

  const handleAddToCart = useCallback((product) => {
    setToast(`${product.name} added to cart!`);
    setTimeout(() => setToast(null), 3000);
  }, []);

  return (
    <div className=" py-8 sm:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">
          My Wishlist
        </h1>

        <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
          {wishlist.length > 0 ? (
            <div className="flex flex-col divide-y divide-gray-100">
              {/* Desktop Header */}
              <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 text-xs font-medium text-gray-400 uppercase tracking-wide">
                <div className="col-span-5">Product</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2">Stock</div>
                <div className="col-span-3 text-right">Actions</div>
              </div>

              {/* Wishlist Items */}
              {wishlist.map((item) => (
                <WishlistItem
                  key={item.id}
                  product={item}
                  onRemove={() => toggleWishlist(item)}
                  onAddToCart={handleAddToCart}
                />
              ))}

              {/* Share bar at bottom */}
              <div className="p-6">
                <ShareBar />
              </div>
            </div>
          ) : (
            <div className="py-20 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                ❤️
              </div>
              <h2 className="text-xl font-semibold text-gray-600">
                Your wishlist is empty
              </h2>
              <p className="text-gray-400 max-w-xs">
                Looks like you haven't added anything yet.
              </p>
            </div>
          )}
        </div>

        {toast && (
          <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-3">
            <FaCircleCheck className="text-green-500 text-lg" />
            <span>{toast}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
