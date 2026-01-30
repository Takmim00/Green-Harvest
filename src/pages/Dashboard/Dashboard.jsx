import React from 'react';
import { Link } from 'react-router';
import { Edit2 } from 'lucide-react';

const Dashboard = () => {
  const user = {
    name: 'Dianne Russell',
    role: 'Customer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    billingAddress: {
      name: 'Dianne Russell',
      address: '4140 Parker Rd. Allentown, New Mexico 31134',
      email: 'dianne.russell@gmail.com',
      phone: '(671) 555-0110'
    }
  };

  const recentOrders = [
    { id: '#738', date: '8 Sep, 2020', total: '$135.00', products: 5, status: 'Processing' },
    { id: '#703', date: '24 May, 2020', total: '$25.00', products: 1, status: 'on the way' },
    { id: '#130', date: '22 Oct, 2020', total: '$250.00', products: 4, status: 'Completed' },
    { id: '#561', date: '1 Feb, 2020', total: '$35.00', products: 1, status: 'Completed' },
    { id: '#536', date: '21 Sep, 2020', total: '$578.00', products: 13, status: 'Completed' },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'text-yellow-600 bg-yellow-50';
      case 'on the way':
        return 'text-blue-600 bg-blue-50';
      case 'completed':
        return 'text-[#00B250] bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* User Info */}
          <div className="flex flex-col items-center md:items-start shrink-0">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{user.role}</p>
            <Link
              to="/dashboard/settings"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-[#00B250] font-medium rounded-lg hover:bg-green-50 transition-colors"
            >
              <Edit2 size={16} />
              Edit Profile
            </Link>
          </div>

          {/* Billing Address */}
          <div className="flex-1">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">BILLING ADDRESS</p>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{user.billingAddress.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{user.billingAddress.address}</p>
            <div className="space-y-1 mb-4">
              <p className="text-sm text-gray-900 font-medium">{user.billingAddress.email}</p>
              <p className="text-sm text-gray-900 font-medium">{user.billingAddress.phone}</p>
            </div>
            <Link
              to="/dashboard/settings"
              className="text-sm text-[#00B250] font-semibold hover:underline"
            >
              Edit Address
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Order History */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Recent Order History</h3>
          <Link to="/dashboard/order-history" className="text-sm text-[#00B250] font-semibold hover:underline">
            View All
          </Link>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">ORDER ID</th>
                <th className="text-left py-4 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">DATE</th>
                <th className="text-left py-4 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">TOTAL</th>
                <th className="text-left py-4 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">STATUS</th>
                <th className="text-right py-4 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-3 text-sm font-semibold text-gray-900">{order.id}</td>
                  <td className="py-4 px-3 text-sm text-gray-600">{order.date}</td>
                  <td className="py-4 px-3 text-sm text-gray-900 font-medium">{order.total}</td>
                  <td className="py-4 px-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-3 text-right">
                    <Link to={`/dashboard/order/${order.id}`} className="text-sm text-[#00B250] font-semibold hover:underline">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {recentOrders.map((order, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-semibold text-gray-900">{order.id}</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{order.date}</p>
              <p className="text-sm text-gray-900 font-medium mb-3">{order.total}</p>
              <Link to={`/dashboard/order/${order.id}`} className="text-sm text-[#00B250] font-semibold hover:underline">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
