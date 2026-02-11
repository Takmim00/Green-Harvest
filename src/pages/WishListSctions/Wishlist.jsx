import { useCallback } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useWishlist } from "../../routes/provider/WishlistProvider";
import ShareBar from "./ShareBar";
import WishlistItem from "./WishlistItem";

const Wishlist = () => {
  const { wishlist, toggleWishlist, loading } = useWishlist();

  const handleAddToCart = useCallback((product) => {
    toast.success(`${product.name} added to cart!`);
  }, []);

  const handleRemove = useCallback((product) => {
    toast.warn(`${product.name} removed from wishlist!`);
  }, []);

  return (
    <div className=" py-8 sm:py-16 px-4 sm:px-6">
      <div className=" lg:max-w-7xl max-w-11/12 mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">My Wishlist</h1>

        <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
          {loading ? (
            <div className=" col-span-full flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin"></div>
            </div>
          ) : wishlist.length > 0 ? (
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
                  key={item.wishlistId}
                  product={item}
                  onRemove={() => {
                    toggleWishlist({ id: item.wishlistId, slug: item.slug });
                    handleRemove(item);
                  }}
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
      </div>
    </div>
  );
};

export default Wishlist;
