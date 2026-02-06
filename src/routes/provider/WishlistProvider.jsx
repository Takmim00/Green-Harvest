import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();
const API = "https://green-harvest-backend-seven.vercel.app/api/wishlist";

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const token = localStorage.getItem("access");

  // 🔹 Load wishlist
  useEffect(() => {
    if (!token) return;

    const fetchWishlist = async () => {
      try {
        const res = await fetch(`${API}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        const formatted = (data.items || []).map((item) => ({
          wishlistId: item.id, // ✅ wishlist row id
          productId: item.product_id, // if needed, can use row id or add a separate product id if backend has it
          name: item.product_name,
          slug: item.product_slug,
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
      }
    };

    fetchWishlist();
  }, [token]);

  // 🔹 Toggle wishlist
  // const toggleWishlist = async (item) => {
  //   if (!token) return;

  //   const productId = item.id; // catalog id for adding
  //   const wishlistId = item.wishlistId; // only exists if already in wishlist

  //   try {
  //     if (wishlistId) {
  //       // Remove from wishlist
  //       await fetch(`${API}/remove/?item_id=${wishlistId}`, {
  //         method: "DELETE",
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       setWishlist(prev => prev.filter(i => i.wishlistId !== wishlistId));
  //     } else {
  //       // Add new wishlist item
  //       if (!productId) {
  //         console.error("❌ Missing product id, cannot add to wishlist", item);
  //         return;
  //       }

  //       const res = await fetch(`${API}/add/`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({ product_id: productId }),
  //       });

  //       if (!res.ok) throw new Error("Add wishlist failed");

  //       const data = await res.json();

  //       // Push newly added item into local state
  //       setWishlist(prev => [
  //         ...prev,
  //         {
  //           wishlistId: data.id, // use the returned wishlist id
  //           productId: data.id,  // same catalog product id
  //           name: data.product_name,
  //           slug: data.product_slug,
  //           image: data.product_image?.image || "/placeholder.svg",
  //           currentPrice: Number(data.price),
  //           status: data.stock_status === "IN_STOCK" ? "In Stock" : "Out of Stock",
  //         },
  //       ]);
  //     }
  //   } catch (err) {
  //     console.error("❌ Wishlist toggle error", err);
  //   }
  // };

  const toggleWishlist = async (product) => {
    if (!token) return;

    // Check if product is already in wishlist
    const existingItem = wishlist.find((i) => i.productId === product.id);

    try {
      if (existingItem) {
        // Remove wishlist
        await fetch(`${API}/remove/?item_id=${existingItem.wishlistId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        setWishlist((prev) => prev.filter((i) => i.productId !== product.id));
      } else {
        // Add wishlist
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
            wishlistId: data.id, // wishlist row id
            productId: product.id, // catalog product id
            name: data.product_name,
            slug: data.product_slug,
            image:
              data.product_image?.image || product.image || "/placeholder.svg",
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

  const isInWishlist = (productId) =>
    wishlist.some((item) => item.productId === productId);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
