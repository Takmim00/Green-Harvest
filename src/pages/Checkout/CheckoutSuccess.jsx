import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../routes/provider/ShoppingProvider";

const CheckoutSuccess = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sessionId = params.get("session_id");
  const orderId = params.get("order_id");
  const { clearCart } = useCart();

  useEffect(() => {
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center animate-fadeIn">
        <FaCheckCircle className="mx-auto text-green-500 text-6xl mb-6 animate-bounce" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-2">Thank you for your order.</p>
        <p className="text-gray-500 text-sm mb-6">
          Order ID: <span className="font-medium text-gray-700">{orderId}</span>
        </p>

        <Link
          to={`/dashboard/order/${orderId}`}
          className="inline-block w-full py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-colors"
        >
          Order Details
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
