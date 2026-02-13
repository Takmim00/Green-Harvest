import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";

const WishlistContext = createContext();
const API = "https://green-harvest-backend-seven.vercel.app/api/wishlist";

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
const token = localStorage.getItem("access");

  const [wishlist, setWishlist] = useState([]);
  // const [token, setToken] = useState(localStorage.getItem("access"));

  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const handleStorage = () => {
  //     setToken(localStorage.getItem("access"));
  //   };

  //   window.addEventListener("storage", handleStorage);
  //   return () => window.removeEventListener("storage", handleStorage);
  // }, []);
  useEffect(() => {
    if (!user) {
      setWishlist([]);
      setLoading(false);
    }
  }, [user]);

  // 🔹 Load wishlist
  useEffect(() => {
    if (!token || !user) return;

    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Cart fetch failed");

        const data = await res.json();

        const formatted = (data.items || []).map((item) => ({
          wishlistId: item.id, // ✅ wishlist row
          productId: item.product_id,
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

        setWishlist(formatted);
      } catch (err) {
        console.error("❌ Wishlist load error", err);
      } finally {
        setLoading(false); // 🔥 important
      }
    };

    fetchWishlist();
  }, [token, user]);

  const toggleWishlist = async (product) => {
    if (!token) return;

    // ⭐ main fix
    const productId = product.id ?? product.productId;

    if (!productId) {
      console.error("❌ Missing productId:", product);
      return;
    }

    const existingItem = wishlist.find((i) => i.slug === product.slug);

    try {
      if (existingItem) {
        const res = await fetch(
          `${API}/remove/?item_id=${existingItem.wishlistId}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (!res.ok) throw new Error("Remove wishlist failed");
        setWishlist((prev) => prev.filter((i) => i.slug !== product.slug));
      } else {
        const res = await fetch(`${API}/add/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ product_id: productId }), // ⭐ fixed
        });

        if (!res.ok) throw new Error("Add wishlist failed");

        const data = await res.json();

        setWishlist((prev) => [
          {
            wishlistId: data.id,
            productId: productId, // ⭐ keep for future toggle
            slug: data.product_slug,
            name: data.product_name,
            image: data.product_image?.image || "/placeholder.svg",
            price: Number(data.price),
            status:
              data.stock_status === "IN_STOCK" ? "In Stock" : "Out of Stock",
          },
          ...prev,
        ]);
      }
    } catch (err) {
      console.error("❌ Wishlist toggle error", err);
    }
  };

  const isInWishlist = (slug) => wishlist.some((item) => item.slug === slug);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist, loading }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
