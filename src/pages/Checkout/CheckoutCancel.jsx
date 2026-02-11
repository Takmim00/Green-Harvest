import { Link } from "react-router";

const CheckoutCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center border p-10 rounded-xl shadow-sm">
        <h1 className="text-2xl font-semibold text-red-600 mb-3">
          Payment Cancelled
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment was not completed. Don't worry — your cart items are
          still there.
        </p>

        <Link
          to="/shoppingCart"
          className="px-6 py-3 bg-[#00B207] text-white rounded-full font-medium hover:bg-[#009206]"
        >
          Back to Cart
        </Link>
      </div>
    </div>
  );
};

export default CheckoutCancel;
