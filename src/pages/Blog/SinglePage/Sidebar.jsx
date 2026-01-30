import { Search } from "lucide-react";
import React from "react";
import { CiCalendar } from "react-icons/ci";
const CATEGORIES = [
  { id: "1", name: "Fresh Fruit", count: 111 },
  { id: "2", name: "Vegetables", count: 350 },
  { id: "3", name: "Cooking", count: 110 },
  { id: "4", name: "Snacks", count: 41 },
  { id: "5", name: "Beverages", count: 43 },
  { id: "6", name: "Beauty & Health", count: 36 },
  { id: "7", name: "Bread & Bakery", count: 11 },
];

const POPULAR_TAGS = [
  { id: "1", name: "Healthy" },
  { id: "2", name: "Low Fat" },
  { id: "3", name: "Vegetarian" },
  { id: "4", name: "Bread" },
  { id: "5", name: "Kid Foods" },
  { id: "6", name: "Vitamins" },
  { id: "7", name: "Snacks" },
  { id: "8", name: "Tiffin" },
  { id: "9", name: "Meat" },
  { id: "10", name: "Launch" },
  { id: "11", name: "Dinner" },
];

const Sidebar = ({ onSearch, post }) => {
  return (
    <div>
      <aside className="w-full lg:w-80 space-y-8">
        {/* Search Section */}
        <div className="relative group">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-3 px-4 pl-12 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            onChange={(e) => onSearch(e.target.value)}
          />
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors"
            size={20}
          />
        </div>

        {/* Top Categories */}
        <section>
          <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-100">
            Top Categories
          </h3>
          <ul className="space-y-4">
            {CATEGORIES.map((cat) => (
              <li
                key={cat.name}
                className="flex justify-between items-center group cursor-pointer"
              >
                <span className="text-gray-600 group-hover:text-green-600 transition-colors">
                  {cat.name}
                </span>
                <span className="text-gray-400 group-hover:text-green-600 transition-colors">
                  ({cat.count})
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Popular Tags */}
        <section>
          <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-100">
            Popular Tag
          </h3>
          <div className="flex flex-wrap gap-2">
            {POPULAR_TAGS.map((tag) => (
              <button
                key={tag.id}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                  tag
                    ? "hover:bg-green-600 hover:text-white bg-gray-100"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </section>
        {/* Our Gallery */}
        <section>
          <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-100">
            Our Gallery
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {post.map((item) => (
              <div
                key={item.id}
                className="aspect-square overflow-hidden rounded-md cursor-pointer group"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>
            ))}
          </div>
        </section>
        {/* Recently Added Section */}
        <section>
          <h3 className="text-lg font-bold mb-6 border-b border-gray-100 pb-2">
            Recently Added
          </h3>
          <div className="space-y-6">
            {post.map((posts) => (
              <div key={posts.id} className="flex gap-4 group cursor-pointer">
                <div className="shrink-0 w-20 h-16 overflow-hidden rounded-lg">
                  <img
                    src={posts.image}
                    alt={posts.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mb-1 group-hover:text-blue-600 transition">
                    {posts.title}
                  </h4>
                  <div className="flex items-center text-xs text-gray-400">
                    <CiCalendar className="mr-1" size={16} />
                    {posts.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
};

export default Sidebar;
