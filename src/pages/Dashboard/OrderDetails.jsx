'use client';

import React from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, CheckCircle, Truck, Package } from 'lucide-react';

const OrderDetails = () => {
  const { orderId } = useParams();

  const orderData = {
    id: orderId || '#738',
    date: '8 Sep, 2020',
    status: 'On the way',
    billingAddress: {
      name: 'Dianne Russell',
      address: '4140 Parker Rd. Allentown, New Mexico 31134',
      email: 'dianne.russell@gmail.com',
      phone: '(671) 555-0110'
    },
    shippingAddress: {
      name: 'Dianne Russell',
      address: '4140 Parker Rd. Allentown, New Mexico 31134',
      email: 'dianne.russell@gmail.com',
      phone: '(671) 555-0110'
    },
    items: [
      { id: 1, name: 'Red Capsicum', price: '$14.00', quantity: 45, total: '$75.00', image: '/farm-fresh-produce.png' },
      { id: 2, name: 'Green Capsicum', price: '$14.00', quantity: 42, total: '$28.00', image: '/organic-products.png' },
      { id: 3, name: 'Green Chili', price: '$29.70', quantity: 90, total: '$287.00', image: '/fresh-vegetables-basket.png' },
    ],
    subtotal: '$390.00',
    discount: '30%',
    shipping: 'Free',
    total: '$234.00',
    timeline: [
      { step: 'Order received', completed: true },
      { step: 'Processing', completed: true },
      { step: 'On the way', completed: true },
      { step: 'Delivered', completed: false }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/dashboard/order-history"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
          <p className="text-sm text-gray-600 mt-1">
            Order {orderData.id} • {orderData.date}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Order Status</h2>
        <div className="flex items-center justify-between">
          {orderData.timeline.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                item.completed ? 'bg-[#00B250]' : 'bg-gray-200'
              }`}>
                {item.completed ? (
                  <CheckCircle size={24} className="text-white" />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-gray-400" />
                )}
              </div>
              <p className="text-xs text-gray-600 text-center font-medium">{item.step}</p>
              {idx < orderData.timeline.length - 1 && (
                <div className={`absolute w-24 h-1 mt-4 ${
                  item.completed ? 'bg-[#00B250]' : 'bg-gray-300'
                }`} style={{ marginLeft: '60px' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Addresses */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Billing Address */}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">BILLING ADDRESS</p>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{orderData.billingAddress.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{orderData.billingAddress.address}</p>
                <div className="space-y-1">
                  <p className="text-sm text-gray-900">{orderData.billingAddress.email}</p>
                  <p className="text-sm text-gray-900">{orderData.billingAddress.phone}</p>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">SHIPPING ADDRESS</p>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{orderData.shippingAddress.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{orderData.shippingAddress.address}</p>
                <div className="space-y-1">
                  <p className="text-sm text-gray-900">{orderData.shippingAddress.email}</p>
                  <p className="text-sm text-gray-900">{orderData.shippingAddress.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Order Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">PRODUCT</th>
                    <th className="text-left py-4 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">PRICE</th>
                    <th className="text-left py-4 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">QUANTITY</th>
                    <th className="text-left py-4 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image || '/placeholder.svg'}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                          />
                          <span className="text-sm font-medium text-gray-900">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-3 text-sm font-medium text-gray-900">{item.price}</td>
                      <td className="py-4 px-3 text-sm text-gray-600">{item.quantity}</td>
                      <td className="py-4 px-3 text-sm font-medium text-gray-900">{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-8 h-fit">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900 font-medium">{orderData.subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Discount</span>
              <span className="text-gray-900 font-medium">{orderData.discount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-900 font-medium">{orderData.shipping}</span>
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-lg font-bold text-gray-900">{orderData.total}</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">ORDER STATUS</p>
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full">
              <Truck size={16} className="text-blue-600 mr-2" />
              <span className="text-sm font-semibold text-blue-600">{orderData.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
