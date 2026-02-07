import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();
const API = "https://green-harvest-backend-seven.vercel.app/api/wishlist";

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("access"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem("access"));
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // 🔹 Load wishlist
  useEffect(() => {
    if (!token) return;

    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        const formatted = (data.items || []).map((item) => ({
          wishlistId: item.id, // ✅ wishlist row id
          slug: item.product_slug,
          name: item.product_name,
          image:
            item.product_image?.image ||
            item.images?.[0]?.image ||
            "/placeholder.svg",
          price: Number(item.price),
          status:
            item.stock_status === "IN_STOCK" ? "In Stock" : "Out of Stock",
        }));
        console.log("Wishlist loaded:", formatted);

        setWishlist(formatted);
      } catch (err) {
        console.error("❌ Wishlist load error", err);
      } finally {
        setLoading(false); // 🔥 important
      }
    };

    fetchWishlist();
  }, [token]);
  const toggleWishlist = async (product) => {
    if (!token) return;

    const existingItem = wishlist.find((i) => i.slug === product.slug);

    try {
      if (existingItem) {
        // 🔴 REMOVE
        await fetch(`${API}/remove/?item_id=${existingItem.wishlistId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        setWishlist((prev) => prev.filter((i) => i.slug !== product.slug));
      } else {
        // 🟢 ADD
        const res = await fetch(`${API}/add/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ product_id: product.id }),
        });

        if (!res.ok) throw new Error("Add wishlist failed");

        const data = await res.json();

        setWishlist((prev) => [
          ...prev,
          {
            wishlistId: data.id,
            slug: data.product_slug,
            name: data.product_name,
            image: data.product_image?.image || "/placeholder.svg",
            currentPrice: Number(data.price),
            status:
              data.stock_status === "IN_STOCK" ? "In Stock" : "Out of Stock",
          },
        ]);
      }
    } catch (err) {
      console.error("❌ Wishlist toggle error", err);
    }
  };

  const isInWishlist = (slug) => wishlist.some((item) => item.slug === slug);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist , loading }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
