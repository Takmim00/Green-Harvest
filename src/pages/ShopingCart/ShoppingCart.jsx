import { useState } from "react";
import { Link } from "react-router";

import { useCart } from "../../routes/provider/ShoppingProvider";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";

const ShoppingCart = () => {
  const { cart, getCartTotal, loading } = useCart();
  const [couponCode, setCouponCode] = useState("");

  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      // Coupon logic can be implemented here
      console.log("Applying coupon:", couponCode);
    }
  };

  return (
    <div className=" py-8 sm:py-12 px-4 sm:px-6">
      <div className=" lg:max-w-7xl max-w-11/12 mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
          My Shopping Cart
        </h1>

        {loading ? (
          <div className=" col-span-full flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin"></div>
          </div>
        ) : cart.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Cart Items Section */}
            <div className="flex-1">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Table Header */}
                <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2">Quantity</div>
                  <div className="col-span-2">Subtotal</div>
                  <div className="col-span-1"></div>
                </div>

                {/* Cart Items */}
                <div className="divide-y divide-gray-100">
                  {cart.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
                <Link
                  to="/shop"
                  className="px-6 py-3 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors text-center"
                >
                  Return to shop
                </Link>
                <button className="px-6 py-3 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Update Cart
                </button>
              </div>

              {/* Coupon Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Coupon Code
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-8 py-3 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
                  >
                    Apply Coupon
                  </button>
                </div>
              </div>
            </div>

            {/* Cart Total Sidebar */}
            <CartTotal subtotal={subtotal} shipping={shipping} total={total} />
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 py-20 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-2xl">
              🛒
            </div>
            <h2 className="text-xl font-semibold text-gray-600">
              Your cart is empty
            </h2>
            <p className="text-gray-400 max-w-xs">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/shop"
              className="mt-4 px-8 py-3 bg-[#00B207] text-white rounded-full text-sm font-semibold hover:bg-[#009206] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
