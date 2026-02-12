import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const API = "https://green-harvest-backend-seven.vercel.app/api/cart";


const mapToCartItem = (product, quantity = 1) => {
  const primaryImage = Array.isArray(product.images)
    ? product.images.find(img => img.is_primary)?.image || product.images[0]?.image
    : null;

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    image: primaryImage || "/placeholder.svg",
    price: Number(product.current_price ?? product.currentPrice ?? product.price ?? 0),
    quantity,
  };
};

export const ShoppingProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("access");
  const [loading, setLoading] = useState(true);
  // 🔹 Load cart from server on first render
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true); // start loading
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // console.log("🔄 Fetching cart from server...");

        const res = await fetch(`${API}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        // console.log("📦 Server cart response:", data);

        const items = data?.items || [];

        const formatted = items.map((item) => ({
          id: item.id,
          slug: item.product_slug,
          name: item.product_name || "Unnamed Product",
          image: item.product_image?.image?.trim()
            ? item.product_image.image
            : "/placeholder.svg",

          price: Number(item.price || 0),
          quantity: item.quantity,
        }));

        // console.log("✅ Formatted cart items:", formatted);
        setCart(formatted);
      } catch (err) {
        console.error("❌ Cart load error:", err);
      } finally {
        setLoading(false); // stop loading
      }
    };

    fetchCart();
  }, [token]);

  // 🔹 Add to cart
  const addToCart = async (product, quantity = 1) => {
    // console.log("🛒 Adding to cart:", { product, quantity });

    try {
      if (token) {
        const res = await fetch(`${API}/add/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            product_id: product.id,
            quantity,
          }),
        });

        const data = await res.json();
        // console.log("✅ Add to cart API response:", data);
      }
      console.log("🛒 Adding to cart:", product);
      console.log("Image field:", product.image, product.product_image?.image);

      setCart((prev) => {
        const existingItem = prev.find((item) => item.slug === product.slug);
        if (existingItem) {
          console.log("🔁 Increasing quantity for existing item");
          return prev.map((item) =>
            item.slug === product.slug
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }
        // console.log("🆕 Adding new item to local cart");
        return [mapToCartItem(product, quantity),...prev ];
      });
    } catch (err) {
      console.error("❌ Add to cart failed:", err);
    }
  };

  // 🔹 Remove single item
  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("access");

    try {
      if (token) {
        await fetch(`${API}/remove/?item_id=${productId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setCart((prev) => prev.filter((item) => item.id !== productId));
    } catch (err) {
      console.error("❌ Remove from cart failed:", err);
    }
  };

  // 🔹 Update quantity

  const updateQuantity = async (productId, quantity) => {
    const token = localStorage.getItem("access");
    if (quantity < 1) {
      return removeFromCart(productId);
    }

    try {
      if (token) {
        await fetch(`${API}/add/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ product_id: productId, quantity }),
        });
      }

      setCart((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      );
    } catch (err) {
      console.error("❌ Update quantity failed:", err);
    }
  };

  // 🔹 Clear entire cart
  const clearCart = async () => {
    console.log("🧹 Clearing entire cart...");

    try {
      if (token) {
        const res = await fetch(`${API}/clear/`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // console.log("✅ Clear cart API status:", res.status);
      }

      setCart([]);
    } catch (err) {
      console.error("❌ Clear cart failed:", err);
    }
  };

  // 🔹 Helpers
  const getCartTotal = () => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    // console.log("💰 Cart total:", total);
    return total;
  };

  const getCartCount = () => {
    const count = cart.reduce((c, item) => c + item.quantity, 0);
    // console.log("🔢 Cart count:", count);
    return count;
  };

  const isInCart = (id) => {
    const exists = cart.some((item) => item.id === id);
    // console.log("📌 Is in cart?", { id, exists });
    return exists;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        isInCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within ShoppingProvider");
  }

  return context;
};

