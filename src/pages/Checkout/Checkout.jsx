import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../routes/provider/ShoppingProvider";

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [shipToDifferent, setShipToDifferent] = useState(false);
console.log(cart);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    streetAddress: "",
    country: "",
    state: "",
    zipCode: "",
    email: "",
    phone: "",
    orderNotes: "",
  });

  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = () => {
    // Order placement logic
    console.log("Order placed:", { formData, paymentMethod, cart });
    alert("Order placed successfully!");
    clearCart();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}

      <div className="max-w-7xl mx-auto py-8 px-4 ">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section - Billing Information */}
          <div className="flex-1">
            {/* Billing Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-[#1A1A1A] mb-6">
                Billing Information
              </h2>

              <div className="space-y-4">
                {/* Row 1: First name, Last name, Company name */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-[#1A1A1A] mb-2">
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Your first name"
                      className="w-full px-4 py-3 border border-[#E6E6E6] rounded-md text-sm focus:outline-none focus:border-[#00B207] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#1A1A1A] mb-2">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Your last name"
                      className="w-full px-4 py-3 border border-[#E6E6E6] rounded-md text-sm focus:outline-none focus:border-[#00B207] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#1A1A1A] mb-2">
                      Company Name{" "}
                      <span className="text-[#808080]">(optional)</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Company name"
                      className="w-full px-4 py-3 border border-[#E6E6E6] rounded-md text-sm focus:outline-none focus:border-[#00B207] transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Street Address */}
                <div>
                  <label className="block text-sm text-[#1A1A1A] mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-[#E6E6E6] rounded-md text-sm focus:outline-none focus:border-[#00B207] transition-colors"
                  />
                </div>

                {/* Row 3: Country, States, Zip Code */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-[#1A1A1A] mb-2">
                      Country / Region
                    </label>
                    <div className="relative">
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#E6E6E6] rounded-md text-sm focus:outline-none focus:border-[#00B207] transition-colors appearance-none bg-white text-[#808080]"
                      >
                        <option value="">Select</option>
                        <option value="us">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="ca">Canada</option>
                        <option value="au">Australia</option>
                      </select>
                      <ChevronRight
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-[#808080] pointer-events-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[#1A1A1A] mb-2">
                      States
                    </label>
                    <div className="relative">
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#E6E6E6] rounded-md text-sm focus:outline-none focus:border-[#00B207] transition-colors appearance-none bg-white text-[#808080]"
                      >
                        <option value="">Selects</option>
                        <option value="ny">New York</option>
                        <option value="ca">California</option>
                        <option value="tx">Texas</option>
                        <option value="fl">Florida</option>
                      </select>
                      <ChevronRight
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-[#808080] pointer-events-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[#1A1A1A] mb-2">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="Zip Code"
                      className="w-full px-4 py-3 border border-[#E6E6E6] rounded-md text-sm focus:outline-none focus:border-[#00B207] transition-colors"
                    />
                  </div>
                </div>

                {/* Row 4: Email, Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#1A1A1A] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address"
                      className="w-full px-4 py-3 border border-[#E6E6E6] rounded-md text-sm focus:outline-none focus:border-[#00B207] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#1A1A1A] mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                      className="w-full px-4 py-3 border border-[#E6E6E6] rounded-md text-sm focus:outline-none focus:border-[#00B207] transition-colors"
                    />
                  </div>
                </div>

                {/* Ship to different address checkbox */}
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="shipToDifferent"
                    checked={shipToDifferent}
                    onChange={(e) => setShipToDifferent(e.target.checked)}
                    className="w-4 h-4 accent-[#00B207] cursor-pointer"
                  />
                  <label
                    htmlFor="shipToDifferent"
                    className="text-sm text-[#1A1A1A] cursor-pointer"
                  >
                    Ship to a different address
                  </label>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div>
              <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">
                Additional Info
              </h2>
              <div>
                <label className="block text-sm text-[#1A1A1A] mb-2">
                  Order Notes <span className="text-[#808080]">(Optional)</span>
                </label>
                <textarea
                  name="orderNotes"
                  value={formData.orderNotes}
                  onChange={handleInputChange}
                  placeholder="Notes about your order, e.g. special notes for delivery"
                  rows={4}
                  className="w-full px-4 py-3 border border-[#E6E6E6] rounded-md text-sm focus:outline-none focus:border-[#00B207] transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:w-100">
            <div className="border border-[#E6E6E6] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                Order Summery
              </h3>

              {/* Cart Items */}
              <div className="space-y-3 mb-4">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="text-sm text-[#1A1A1A]">
                            {item.name}{" "}
                            <span className="text-[#808080]">
                              x{item.quantity}
                            </span>
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-[#1A1A1A]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))
                ) : (
                  <>
                    {/* Default items when cart is empty - matching the design */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-2xl">🫑</span>
                        </div>
                        <p className="text-sm text-[#1A1A1A]">
                          Green Capsicum{" "}
                          <span className="text-[#808080]">x5</span>
                        </p>
                      </div>
                      <span className="text-sm font-medium text-[#1A1A1A]">
                        $70.00
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-2xl">🍅</span>
                        </div>
                        <p className="text-sm text-[#1A1A1A]">
                          Red Capsicum{" "}
                          <span className="text-[#808080]">x1</span>
                        </p>
                      </div>
                      <span className="text-sm font-medium text-[#1A1A1A]">
                        $14.00
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-[#E6E6E6] my-4"></div>

              {/* Subtotal, Shipping, Total */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#808080]">Subtotal:</span>
                  <span className="font-medium text-[#1A1A1A]">
                    ${cart.length > 0 ? subtotal.toFixed(2) : "84.00"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#808080]">Shipping:</span>
                  <span className="font-medium text-[#1A1A1A]">Free</span>
                </div>
                <div className="border-t border-[#E6E6E6] pt-3 flex justify-between">
                  <span className="text-[#808080]">Total:</span>
                  <span className="text-lg font-semibold text-[#1A1A1A]">
                    ${cart.length > 0 ? total.toFixed(2) : "84.00"}
                  </span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-6">
                <h4 className="text-base font-semibold text-[#1A1A1A] mb-3">
                  Payment Method
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 accent-[#00B207]"
                    />
                    <span className="text-sm text-[#1A1A1A]">
                      Cash on Delivery
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 accent-[#00B207]"
                    />
                    <span className="text-sm text-[#1A1A1A]">Paypal</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="amazon"
                      checked={paymentMethod === "amazon"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 accent-[#00B207]"
                    />
                    <span className="text-sm text-[#1A1A1A]">Amazon Pay</span>
                  </label>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full mt-6 py-4 bg-[#00B207] text-white rounded-full text-base font-semibold hover:bg-[#009206] transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
