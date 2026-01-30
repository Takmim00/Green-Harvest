import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";

const OrderHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const allOrders = [
    {
      id: "3933",
      date: "4 April, 2021",
      total: "$135.00",
      products: 5,
      status: "Processing",
    },
    {
      id: "5765",
      date: "27 Mar, 2021",
      total: "$25.00",
      products: 1,
      status: "on the way",
    },
    {
      id: "5028",
      date: "20 Mar, 2021",
      total: "$250.00",
      products: 4,
      status: "Completed",
    },
    {
      id: "4600",
      date: "19 Mar, 2021",
      total: "$35.00",
      products: 1,
      status: "Completed",
    },
    {
      id: "4152",
      date: "18 Mar, 2021",
      total: "$578.00",
      products: 13,
      status: "Completed",
    },
    {
      id: "8811",
      date: "10 Mar, 2021",
      total: "$345.00",
      products: 7,
      status: "Completed",
    },
    {
      id: "3536",
      date: "5 Mar, 2021",
      total: "$560.00",
      products: 2,
      status: "Completed",
    },
    {
      id: "1374",
      date: "27 Feb, 2021",
      total: "$560.00",
      products: 2,
      status: "Completed",
    },
    {
      id: "7791",
      date: "25 Feb, 2021",
      total: "$560.00",
      products: 2,
      status: "Completed",
    },
    {
      id: "4848",
      date: "24 Feb, 2021",
      total: "$23.00",
      products: 1,
      status: "Completed",
    },
    {
      id: "5765",
      date: "20 Feb, 2021",
      total: "$23.00",
      products: 1,
      status: "Completed",
    },
    {
      id: "1577",
      date: "12 Oct, 2020",
      total: "$23.00",
      products: 1,
      status: "Completed",
    },
    {
      id: "2341",
      date: "5 Oct, 2020",
      total: "$145.00",
      products: 3,
      status: "Completed",
    },
    {
      id: "8823",
      date: "28 Sep, 2020",
      total: "$89.00",
      products: 2,
      status: "Completed",
    },
    {
      id: "9912",
      date: "15 Sep, 2020",
      total: "$210.00",
      products: 5,
      status: "Completed",
    },
    {
      id: "7734",
      date: "10 Sep, 2020",
      total: "$67.00",
      products: 1,
      status: "Completed",
    },
    {
      id: "6655",
      date: "5 Sep, 2020",
      total: "$320.00",
      products: 8,
      status: "Completed",
    },
    {
      id: "4432",
      date: "1 Sep, 2020",
      total: "$45.00",
      products: 1,
      status: "Completed",
    },
  ];

  const totalPages = Math.ceil(allOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentOrders = allOrders.slice(startIndex, startIndex + ordersPerPage);

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
            {currentOrders.map((order, index) => (
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
                  {order.total} ({order.products}{" "}
                  {order.products === 1 ? "Product" : "Products"})
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
        {currentOrders.map((order, index) => (
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
              {order.total} ({order.products}{" "}
              {order.products === 1 ? "Product" : "Products"})
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

      {/* Pagination */}
      <div className="flex items-center justify-center gap-1 mt-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
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
          disabled={currentPage === totalPages}
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
