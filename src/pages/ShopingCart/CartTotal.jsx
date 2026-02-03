import { Link } from "react-router";

const CartTotal = ({ subtotal, shipping, total }) => {
  return (
    <div className="lg:w-80 shrink-0">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-5">Cart Total</h3>

        <div className="space-y-4">
          {/* Subtotal */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-100">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium text-gray-900">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-100">
            <span className="text-gray-600">Shipping:</span>
            <span className="font-medium text-gray-900">
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-2">
            <span className="font-semibold text-gray-900">Total:</span>
            <span className="font-bold text-lg text-gray-900">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        <Link
          to="/checkout"
          className="mt-6 w-full block text-center py-4 bg-[#00B207] text-white rounded-full font-semibold hover:bg-[#009206] transition-colors"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
};

export default CartTotal;
