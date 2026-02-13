import { Minus, Plus, X } from "lucide-react";
import { useCart } from "../../routes/provider/ShoppingProvider";
import { toast } from "react-toastify";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const subtotal = item.price * item.quantity;

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };
  const handleRemove = async () => {
    await removeFromCart(item.id); // make sure removeFromCart supports async
    toast(`${item.name} removed from cart`);
  };

  return (
    <div className="px-4 sm:px-6 py-5">
      {/* Desktop Layout */}
      <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
        {/* Product */}
        <div className="col-span-5 flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium text-gray-900 text-sm">{item.name}</span>
        </div>

        {/* Price */}
        <div className="col-span-2">
          <span className="text-gray-900">${item.price.toFixed(2)}</span>
        </div>

        {/* Quantity */}
        <div className="col-span-2">
          <div className=" inline-flex items-center border border-gray-300 rounded-full overflow-hidden p-0.5 sm:p-1">
            <button
              onClick={handleDecrement}
              className="px-2 sm:px-3 md:px-3 py-2 sm:py-3 bg-gray-200 transition text-gray-600 rounded-full cursor-pointer  hover:bg-gray-300 active:bg-gray-400 active:scale-95"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-medium text-gray-900">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="px-2 sm:px-3 md:px-3 py-2 sm:py-3 bg-gray-200 transition text-gray-600 rounded-full cursor-pointer  hover:bg-gray-300 active:bg-gray-400 active:scale-95"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Subtotal */}
        <div className="col-span-2">
          <span className="font-semibold text-gray-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {/* Remove */}
        <div className="col-span-1 flex justify-end">
          <button
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer active:text-red-700 active:scale-95"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden flex gap-4">
        <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-medium text-gray-900 text-sm">
              {item.name}
            </span>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-gray-400 hover:text-red-500 transition-colors   active:text-red-700 active:scale-95"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="inline-flex items-center border border-gray-200 rounded-full">
              <button
                onClick={handleDecrement}
                className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Minus size={12} />
              </button>
              <span className="w-6 text-center text-xs font-medium text-gray-900">
                {item.quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Plus size={12} />
              </button>
            </div>
            <span className="font-semibold text-gray-900">
              ${subtotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
