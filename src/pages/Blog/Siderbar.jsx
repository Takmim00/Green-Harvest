import React from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

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

const GALLERY_IMAGES = [
  "https://picsum.photos/seed/fruit1/100/100",
  "https://picsum.photos/seed/fruit2/100/100",
  "https://picsum.photos/seed/veg1/100/100",
  "https://picsum.photos/seed/veg2/100/100",
  "https://picsum.photos/seed/bread/100/100",
  "https://picsum.photos/seed/cooking/100/100",
  "https://picsum.photos/seed/snack/100/100",
  "https://picsum.photos/seed/drink/100/100",
];

const RECENT_POSTS = [
  {
    id: "r1",
    title: "Curabitur porttitor orci eget neque accumsan.",
    date: "Apr 26, 2021",
    image: "https://picsum.photos/seed/recent1/150/150",
  },
  {
    id: "r2",
    title: "Donec mattis eros faucibus suscipit viverra.",
    date: "Apr 25, 2021",
    image: "https://picsum.photos/seed/recent2/150/150",
  },
  {
    id: "r3",
    title: "Quisque posuere tempus rutrum. Integer velit ex.",
    date: "Apr 25, 2021",
    image: "https://picsum.photos/seed/recent3/150/150",
  },
];

const Siderbar = ({onSearch,onCategorySelect}) => {
  return (
    <aside className="w-full md:w-[320px] space-y-10">
      {/* Filter Action (Matches Screenshot Filter Button) */}
      <div className="md:hidden">
        <button className="w-full bg-green-600 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 font-medium hover:bg-green-700 transition-colors shadow-lg shadow-green-200">
          <i className="fa-solid fa-sliders"></i>
          Filter
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full pl-10 pr-4 py-3.5 bg-white border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm text-sm"
        />
        <HiMiniMagnifyingGlass size={24} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
      </div>

      {/* Top Categories */}
      <section>
        <h3 className="text-[18px] font-bold text-gray-900 mb-5">
          Top Categories
        </h3>
        <div className="h-0.5 w-full bg-gray-100 mb-6 relative"/>
        <ul className="space-y-4">
          {CATEGORIES.map((cat) => (
            <li
              key={cat.id}
              onClick={() => onCategorySelect?.(cat.name)}
              className="flex justify-between items-center text-gray-500 hover:text-green-600 cursor-pointer transition-colors text-sm group"
            >
              <span className="group-hover:translate-x-1 transition-transform">
                {cat.name}
              </span>
              <span className="text-gray-300">({cat.count})</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Popular Tags */}
      <section>
        <h3 className="text-[18px] font-bold text-gray-900 mb-5">
          Popular Tag
        </h3>
        <div className="h-0.5 w-full bg-gray-100 mb-6 relative"/>
        <div className="flex flex-wrap gap-2">
          {POPULAR_TAGS.map((tag) => (
            <span
              key={tag.id}
              onClick={() => onCategorySelect?.(tag.name)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium cursor-pointer transition-all ${
                tag=== "Low Fat"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-green-600 hover:text-white"
              }`}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </section>

      {/* Our Gallery */}
      <section>
        <h3 className="text-[18px] font-bold text-gray-900 mb-5">
          Our Gallery
        </h3>
        <div className="h-0.5 w-full bg-gray-100 mb-6 relative"/>
        <div className="grid grid-cols-4 gap-2">
          {GALLERY_IMAGES.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="Gallery"
              className="w-full aspect-square object-cover rounded hover:opacity-80 transition-opacity cursor-pointer shadow-sm"
            />
          ))}
        </div>
      </section>

      {/* Recently Added */}
      <section>
        <h3 className="text-[18px] font-bold text-gray-900 mb-5">
          Recently Added
        </h3>
        <div className="h-0.5 w-full bg-gray-100 mb-6 relative"/>
        <div className="space-y-6">
          {RECENT_POSTS.map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-4 cursor-pointer group"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-17.5 h-15 object-cover rounded-md shrink-0 shadow-sm"
              />
              <div className="flex flex-col gap-1">
                <h4 className="text-[14px] font-medium text-gray-800 group-hover:text-green-600 transition-colors line-clamp-2 leading-tight">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 text-[12px] text-gray-400">
                  <i className="fa-regular fa-calendar text-green-600"></i>
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
};

export default Siderbar;
