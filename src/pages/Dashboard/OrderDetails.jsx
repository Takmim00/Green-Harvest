import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";



export default function OrderDetailsPage() {
  const { order_id } = useParams(); // get order_id from route param
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const token = localStorage.getItem("access");

        const res = await fetch(
          `https://green-harvest-backend-seven.vercel.app/api/orders/${order_id}/`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch order data");
        }

        const data = await res.json();
        setOrderData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [order_id]);

  // Billing & Shipping address mapping
  const billingAddress = orderData
    ? {
        name: `${orderData.first_name} ${orderData.last_name}`,
        address: `${orderData.street_address}, ${orderData.city}, ${orderData.country}, ${orderData.postcode}`,
        email: orderData.email,
        phone: orderData.phone_number,
      }
    : { name: "", address: "", email: "", phone: "" };

  const shippingAddress = orderData
    ? {
        name: `${orderData.first_name} ${orderData.last_name}`,
        address: `${orderData.street_address}, ${orderData.city}, ${orderData.country}, ${orderData.postcode}`,
        email: orderData.email,
        phone: orderData.phone_number,
      }
    : { name: "", address: "", email: "", phone: "" };

  if (loading)
    return (
      <div className="text-center py-8">
        <div className="w-8 h-8 border-4 border-t-green-600 border-gray-200 rounded-full animate-spin mx-auto" />
      </div>
    );
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;
  if (!orderData) return <p className="text-center py-8">No order found.</p>;

  // map API status to readable timeline
  const timelineSteps = [
    {
      step: "Order received",
      completed:
        orderData.status === "order_received" || orderData.status !== "pending",
    },
    {
      step: "Processing",
      completed: ["processing", "on_the_way", "delivered"].includes(
        orderData.status,
      ),
    },
    {
      step: "On the way",
      completed: ["on_the_way", "delivered"].includes(orderData.status),
    },
    { step: "Delivered", completed: orderData.status === "delivered" },
  ];

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
            <p className="text-sm text-gray-600 mt-1">
              {new Date(orderData.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}{" "}
              •{" "}
              {orderData.items?.reduce(
                (total, item) => total + item.quantity,
                0,
              )}{" "}
              {orderData.items?.length === 1 ? "item" : "items"}
            </p>
          </div>
          <Link to="/dashboard/order-history">
            <span className="text-green-600 font-semibold hover:text-green-700 cursor-pointer transition-colors">
              Back to List
            </span>
          </Link>
        </div>

        {/* Top Section - Addresses and Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 pb-8">
          {/* Billing Address */}
          <div className="border border-gray-200 rounded-lg p-6">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
              Billing Address
            </p>
            <div className="space-y-4">
              <p className="font-semibold text-gray-900 text-base">
                {billingAddress.name}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {billingAddress.address}
              </p>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                  Email
                </p>
                <p className="text-sm text-gray-900">{billingAddress.email}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                  Phone
                </p>
                <p className="text-sm text-gray-900">{billingAddress.phone}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="border border-gray-200 rounded-lg p-6">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
              Shipping Address
            </p>
            <div className="space-y-4">
              <p className="font-semibold text-gray-900 text-base">
                {shippingAddress.name}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {shippingAddress.address}
              </p>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                  Email
                </p>
                <p className="text-sm text-gray-900">{shippingAddress.email}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                  Phone
                </p>
                <p className="text-sm text-gray-900">{shippingAddress.phone}</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="space-y-5">
              <div className="flex justify-between items-start">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Order ID:
                </p>
                <p className="text-base font-bold text-gray-900">
                  {orderData.id}
                </p>
              </div>
              <div className="flex justify-between items-start">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Payment Method:
                </p>
                <p className="text-base font-bold text-gray-900">
                  {orderData.paymentMethod}
                </p>
              </div>
              <div className="border-t border-gray-200 pt-5">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-sm text-gray-600">Subtotal:</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {orderData.subtotal}
                  </p>
                </div>
                <div className="flex justify-between items-start mb-4">
                  <p className="text-sm text-gray-600">Discount</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {orderData.discount}
                  </p>
                </div>
                <div className="flex justify-between items-start mb-4">
                  <p className="text-sm text-gray-600">Shipping</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {orderData.shipping}
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between items-start">
                  <p className="text-base font-semibold text-gray-900">Total</p>
                  <p className="text-lg font-bold text-green-600">
                    {orderData.total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-8 pb-8">
          <div className="flex items-start justify-between relative">
            {/* Timeline line container */}
            <svg
              className="absolute top-5 left-0 w-full h-1 pointer-events-none"
              style={{ height: "4px" }}
            >
              <line
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                stroke="#16a34a"
                strokeWidth="4"
              />
              <line
                x1="50%"
                y1="0"
                x2="100%"
                y2="0"
                stroke="#d1d5db"
                strokeWidth="4"
              />
            </svg>

            {timelineSteps.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center flex-1 relative z-10"
              >
                {/* Circle */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white relative mb-4 ${
                    item.completed
                      ? "bg-green-600"
                      : "border-2 border-green-500 bg-white text-green-600"
                  }`}
                >
                  {item.completed ? (
                    <CheckCircle size={24} />
                  ) : (
                    <span className="text-sm font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>
                {/* Step label */}
                <p
                  className={`text-sm font-semibold text-center ${
                    item.completed ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {item.step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {orderData.items.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product_image || "/placeholder.svg"}
                        alt={item.product_name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <p className="font-medium text-gray-900">
                        {item.product_name}
                      </p>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-gray-900 font-medium">
                    {item.price}
                  </td>
                  <td className="py-5 px-6 text-gray-700">{item.quantity}</td>
                  <td className="py-5 px-6 text-gray-900 font-medium">
                    {item.subtotal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
