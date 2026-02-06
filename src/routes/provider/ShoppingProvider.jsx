import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const API = "https://green-harvest-backend-seven.vercel.app/api/cart";

// Mapper function
const mapToCartItem = (product, quantity = 1) => ({
  id: product.id,
  name: product.name,
  image: Array.isArray(product.image) ? product.image[0] : product.image || "",
  price: Number(product.current_price ?? product.currentPrice ?? 0),
  quantity: quantity,
});

export const ShoppingProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("access");

  // 🔹 Load cart from server on first render
  useEffect(() => {
    const fetchCart = async () => {
      if (!token) {
        console.log("🟡 No token found → skipping server cart load");
        return;
      }

      try {
        console.log("🔄 Fetching cart from server...");

        const res = await fetch(`${API}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("📦 Server cart response:", data);

        const items = data?.items || [];

        const formatted = items.map((item) => ({
          id: item.product?.id || item.id,
          name: item.product?.name || item.name,
          image: item.product?.image || "",
          price: Number(item.product?.current_price || item.price || 0),
          quantity: item.quantity,
        }));

        console.log("✅ Formatted cart items:", formatted);
        setCart(formatted);
      } catch (err) {
        console.error("❌ Cart load error:", err);
      }
    };

    fetchCart();
  }, [token]);

  // 🔹 Add to cart
  const addToCart = async (product, quantity = 1) => {
    console.log("🛒 Adding to cart:", { product, quantity });

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
        console.log("✅ Add to cart API response:", data);
      }

      setCart((prev) => {
        const existingItem = prev.find((item) => item.id === product.id);
        if (existingItem) {
          console.log("🔁 Increasing quantity for existing item");
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }

        console.log("🆕 Adding new item to local cart");
        return [...prev, mapToCartItem(product, quantity)];
      });
    } catch (err) {
      console.error("❌ Add to cart failed:", err);
    }
  };

  // 🔹 Remove single item
  const removeFromCart = async (productId) => {
    console.log("🗑 Removing item from cart:", productId);

    try {
      if (token) {
        const res = await fetch(`${API}/remove/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ product_id: productId }),
        });

        const data = await res.json();
        console.log("✅ Remove API response:", data);
      }

      setCart((prev) => prev.filter((item) => item.id !== productId));
    } catch (err) {
      console.error("❌ Remove from cart failed:", err);
    }
  };

  // 🔹 Update quantity
  const updateQuantity = async (productId, quantity) => {
    console.log("✏️ Updating quantity:", { productId, quantity });

    if (quantity < 1) {
      console.log("⚠️ Quantity < 1 → removing item instead");
      return removeFromCart(productId);
    }

    try {
      if (token) {
        const res = await fetch(`${API}/update/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            product_id: productId,
            quantity,
          }),
        });

        const data = await res.json();
        console.log("✅ Update quantity API response:", data);
      }

      setCart((prev) =>
        prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
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

        console.log("✅ Clear cart API status:", res.status);
      }

      setCart([]);
    } catch (err) {
      console.error("❌ Clear cart failed:", err);
    }
  };

  // 🔹 Helpers
  const getCartTotal = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    console.log("💰 Cart total:", total);
    return total;
  };

  const getCartCount = () => {
    const count = cart.reduce((c, item) => c + item.quantity, 0);
    console.log("🔢 Cart count:", count);
    return count;
  };

  const isInCart = (id) => {
    const exists = cart.some((item) => item.id === id);
    console.log("📌 Is in cart?", { id, exists });
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);