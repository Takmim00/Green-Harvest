import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const [totalOrders, setTotalOrders] = useState(0);

  const totalPages = Math.ceil(totalOrders / ordersPerPage);

  // Replace this with your actual API endpoint
  const API = "https://green-harvest-backend-seven.vercel.app/api/orders";

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "text-yellow-600 bg-yellow-50";
      case "on the way":
        return "text-blue-600 bg-blue-50";
      case "completed":
        return "text-[#00B250] bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const fetchOrders = async (page = 1) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("access");

      const res = await axios.get(
        `${API}?page=${page}&limit=${ordersPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrders(res.data.results);
      setTotalOrders(res.data.count || res.data.results.length);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Order History</h2>

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
            {loading ? (
              <tr>
                <td colSpan={5} className="py-6 text-center">
                  <div className="w-8 h-8 border-4 border-t-green-600 border-gray-200 rounded-full animate-spin mx-auto" />
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-3 text-sm font-semibold text-gray-900">
                    {order.order_id}
                  </td>
                  <td className="py-4 px-3 text-sm text-gray-600">
                   {formatDate(order.created_at)}
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
                      to={`/dashboard/order/${order.order_id}`}
                      className="text-sm text-[#00B250] font-semibold hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {loading ? (
          Array.from({ length: ordersPerPage }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg p-4 animate-pulse h-28"
            />
          ))
        ) : orders.length === 0 ? (
          <p className="text-center py-6 text-gray-500">No orders found</p>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-semibold text-gray-900">
                  {order.order_id}
                </span>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{order.date}</p>
              <p className="text-sm text-gray-900 font-medium mb-3">
                {order.total} ({order.products}{" "}
                {order.products === 1 ? "Product" : "Products"})
              </p>
              <Link
                to={`/dashboard/order/${order.order_id}`}
                className="text-sm text-[#00B250] font-semibold hover:underline"
              >
                View Details
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-1 mt-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="p-2 rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Previous page"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              if (totalPages <= 5) return true;
              if (page === 1 || page === totalPages) return true;
              if (page >= currentPage - 1 && page <= currentPage + 1)
                return true;
              return false;
            })
            .map((page, idx, arr) => (
              <React.Fragment key={page}>
                {idx > 0 && arr[idx - 1] !== page - 1 && (
                  <span className="text-gray-400 px-2">...</span>
                )}
                <button
                  onClick={() => handlePageChange(page)}
                  className={`w-9 h-9 rounded-full text-sm font-semibold transition-all ${
                    currentPage === page
                      ? "bg-[#00B250] text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              </React.Fragment>
            ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="p-2 rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Next page"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default OrderHistory;
