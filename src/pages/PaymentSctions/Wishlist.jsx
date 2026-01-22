import React, { useState, useCallback } from "react";
import WishlistItem from "./WishlistItem";
import ShareBar from "./ShareBar";
import { FaCircleCheck } from "react-icons/fa6";

const INITIAL_WISHLIST = [
  {
    id: "1",
    name: "Green Capsicum",
    image:
      "https://images.unsplash.com/photo-1563513307168-a49653ef8e3e?q=80&w=200&h=200&auto=format&fit=crop",
    currentPrice: 14.99,
    originalPrice: 20.99,
    status: "In Stock",
  },
  {
    id: "2",
    name: "Chinese Cabbage",
    image:
      "https://images.unsplash.com/photo-1591586121040-2983ef4a340e?q=80&w=200&h=200&auto=format&fit=crop",
    currentPrice: 45.0,
    status: "In Stock",
  },
  {
    id: "3",
    name: "Fresh Sujapuri Mango",
    image:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=200&h=200&auto=format&fit=crop",
    currentPrice: 9.0,
    status: "Out of Stock",
  },
];

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);
  const [toast, setToast] = useState(null);

  const handleRemove = useCallback((id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleAddToCart = useCallback((product) => {
    setToast(`${product.name} added to cart!`);
    setTimeout(() => setToast(null), 3000);
  }, []);

  return (
    <div className="min-h-screen py-8 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">My Wishlist</h1>

        <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
          {wishlist.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-4 pl-4 sm:pl-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">
                      Price
                    </th>
                    <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                      Stock Status
                    </th>
                    <th className="py-4 pr-4 sm:pr-6 text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {wishlist.map((item) => (
                    <WishlistItem
                      key={item.id}
                      product={item}
                      onRemove={handleRemove}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </tbody>
              </table>
              <ShareBar />
            </div>
          ) : (
            <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                <i className="fa-solid fa-heart-crack text-2xl"></i>
              </div>
              <h2 className="text-xl font-semibold text-gray-600">
                Your wishlist is empty
              </h2>
              <p className="text-gray-400 max-w-xs mx-auto">
                Looks like you haven't added anything to your wishlist yet.
              </p>
              <button
                onClick={() => setWishlist(INITIAL_WISHLIST)}
                className="mt-4 px-6 py-2 bg-[#00B207] text-white rounded-full font-semibold hover:bg-[#009206] transition-colors"
              >
                Restore Items
              </button>
            </div>
          )}
        </div>

        {toast && (
          <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-bounce">
            <FaCircleCheck className="text-green-500 text-lg" />
            <span>{toast}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
