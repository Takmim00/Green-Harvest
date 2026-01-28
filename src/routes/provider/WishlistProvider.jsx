import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

// Mapper function
const mapToWishlistItem = (product) => ({
  id: product.id,
  name: product.name,
  image: Array.isArray(product.image) ? product.image[0] : product.image || "",
  currentPrice: Number(product.current_price ?? 0),
  originalPrice: product.original_price !== undefined ? Number(product.original_price) : null,
  status: product.stock_status ?? "Out of Stock",
});

export const WishlistProvider = ({ children }) => {
  // 1️⃣ Load initial state from localStorage
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  // 2️⃣ Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    const mappedProduct = mapToWishlistItem(product);

    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === mappedProduct.id);
      if (exists) {
        return prev.filter((item) => item.id !== mappedProduct.id);
      }
      return [...prev, mappedProduct];
    });
  };

  const isInWishlist = (id) =>
    wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
