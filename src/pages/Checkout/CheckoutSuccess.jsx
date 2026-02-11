import { useLocation } from "react-router-dom";

const CheckoutSuccess = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const sessionId = params.get("session_id");
  const orderId = params.get("order_id");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600 mb-2">Order ID: {orderId}</p>
        <p className="text-gray-600">Session: {sessionId}</p>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
