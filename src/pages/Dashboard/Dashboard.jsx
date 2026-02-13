import { Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
const API = "https://green-harvest-backend-seven.vercel.app/api/auth/users/me/";
const Dashboard = () => {
  // const user = {
  //   name: 'Dianne Russell',
  //   role: 'Customer',
  //   avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
  //   billingAddress: {
  //     name: 'Dianne Russell',
  //     address: '4140 Parker Rd. Allentown, New Mexico 31134',
  //     email: 'dianne.russell@gmail.com',
  //     phone: '(671) 555-0110'
  //   }
  // };
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // 🔹 Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access");

        const res = await fetch(API, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("User fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await fetch(
          "https://green-harvest-backend-seven.vercel.app/api/orders/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();

        // map backend data to your frontend structure
        const mappedOrders = data.results.map((order) => ({
          id: order.order_id || order.id,
          date: new Date(order.created_at).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          total: order.total,
          products:
            order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0,
          status: order.status,
        }));

        setRecentOrders(mappedOrders);
      } catch (err) {
        console.error("Orders fetch error:", err);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "text-yellow-600 bg-yellow-50";
      case "on the way":
        return "text-blue-600 bg-blue-50";
      case "completed":
        return "text-[00B250] bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };
  const isProfileComplete =
  user?.first_name &&
  user?.last_name&&
  user?.phone &&
  user?.street_address;

  if (loading) {
    return (
      <div className="flex justify-center py-20 min-h-screen">
        <div className="w-10 h-10 border-4 border-t-green-600 border-gray-200 rounded-full animate-spin" />
      </div>
    );
  }

  // 🔹 If not logged in
  if (!user?.email) {
    return <p className="p-6 text-red-500">User not logged in</p>;
  }

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      {!isProfileComplete  && (
        <div className=" p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800 font-medium">
            Your profile is incomplete. Please update your information.
          </p>
          <Link
            to="/dashboard/settings"
            className="inline-block mt-2 text-sm font-semibold text-[#00B250] hover:underline"
          >
            Complete Profile
          </Link>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* User Info */}
          <div className="flex flex-col items-center md:items-start shrink-0">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
              <img
                src={user.image || "/placeholder.svg"}
                alt={user.first_name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              {user.first_name || user.last_name
                ? `${user.first_name} ${user.last_name}`
                : "Your Name"}
            </h2>
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
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">
              BILLING ADDRESS
            </p>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {user.first_name || user.last_name
                ? `${user.first_name} ${user.last_name}`
                : "Your Name"}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {user.street_address
                ? `${user.street_address}, ${user.city}, ${user.country} - ${user.postcode}`
                : "No address added yet"}
            </p>
            <div className="space-y-1 mb-4">
              <p className="text-sm text-gray-900 font-medium">{user.email}</p>
              <p className="text-sm text-gray-900 font-medium">
                {user.phone || "No phone number added"}
              </p>
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
          <h3 className="text-xl font-bold text-gray-900">
            Recent Order History
          </h3>
          <Link
            to="/dashboard/order-history"
            className="text-sm text-[#00B250] font-semibold hover:underline"
          >
            View All
          </Link>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ORDER ID
                </th>
                <th className="text-left py-4 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  DATE
                </th>
                <th className="text-left py-4 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  TOTAL
                </th>
                <th className="text-left py-4 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="text-right py-4 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>
              {ordersLoading && (
                <tr>
                  <td colSpan={5} className="py-6 text-center">
                    <div className="w-8 h-8 border-4 border-t-green-600 border-gray-200 rounded-full animate-spin mx-auto" />
                  </td>
                </tr>
              )}

              {!ordersLoading && recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}

              {!ordersLoading &&
                recentOrders.length > 0 &&
                recentOrders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-3 text-sm font-semibold text-gray-900">
                      {order.id}
                    </td>
                    <td className="py-4 px-3 text-sm text-gray-600">
                      {order.date}
                    </td>
                    <td className="py-4 px-3 text-sm text-gray-900 font-medium">
                      {order.total}
                    </td>
                    <td className="py-4 px-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-right">
                      <Link
                        to={`/dashboard/order/${order.id}`}
                        className="text-sm text-[#00B250] font-semibold hover:underline"
                      >
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
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-semibold text-gray-900">
                  {order.id}
                </span>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{order.date}</p>
              <p className="text-sm text-gray-900 font-medium mb-3">
                {order.total}
              </p>
              <Link
                to={`/dashboard/order/${order.id}`}
                className="text-sm text-[#00B250] font-semibold hover:underline"
              >
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
