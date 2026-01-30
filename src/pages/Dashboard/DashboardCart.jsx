"use client";

import { Minus, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../routes/provider/ShoppingProvider";

const DashboardCart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h2>
        <div className="text-center py-12">
          <p className="text-gray-500 mb-6">Your cart is empty</p>
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
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h2>

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
                  QUANTITY
                </th>
                <th className="text-left py-4 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  SUBTOTAL
                </th>
                <th className="text-right py-4 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
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
                    ${item.price?.toFixed(2)}
                  </td>
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg w-fit">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                        className="p-1.5 text-gray-600 hover:text-gray-900 transition-colors"
                        title="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1.5 text-gray-600 hover:text-gray-900 transition-colors"
                        title="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-3 text-sm font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="py-4 px-3 text-right">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove from cart"
                    >
                      <X size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {cart.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start gap-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {item.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove from cart"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    ${item.price?.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 border border-gray-300 rounded-lg w-fit mb-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
                      title="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
                      title="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-semibold text-gray-900">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping:</span>
            <span className="font-semibold text-[#00B250]">Free</span>
          </div>
          <div className="border-t border-gray-200 pt-4 flex justify-between">
            <span className="text-lg font-bold text-gray-900">Total:</span>
            <span className="text-lg font-bold text-gray-900">
              ${total.toFixed(2)}
            </span>
          </div>
          <Link
            to="/checkout"
            className="mt-6 w-full block text-center px-6 py-3 bg-[#00B250] text-white font-semibold rounded-full hover:bg-[#009a42] transition-colors"
          >
            Proceed to Checkout
          </Link>
          <Link
            to="/shop"
            className="w-full block text-center px-6 py-3 border-2 border-gray-300 text-gray-900 font-semibold rounded-full hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardCart;
