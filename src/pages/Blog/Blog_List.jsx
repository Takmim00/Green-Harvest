import React, { useMemo, useState } from "react";
import Siderbar from "./Siderbar";
import BlogCard from "./BlogCard";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { GoChevronDown } from "react-icons/go";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const BLOG_POSTS = [
  {
    id: "1",
    title:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    excerpt:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    date: "18",
    month: "NOV",
    category: "Food",
    author: "Admin",
    comments: 65,
    image:
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=600&h=450&fit=crop", // Citrus
  },
  {
    id: "2",
    title:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    excerpt:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    date: "18",
    month: "NOV",
    category: "Food",
    author: "Admin",
    comments: 65,
    image:
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=450&fit=crop", // Lemon light bulb vibe
  },
  {
    id: "3",
    title:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    excerpt:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    date: "18",
    month: "NOV",
    category: "Food",
    author: "Admin",
    comments: 65,
    image:
      "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=600&h=450&fit=crop", // Veggies
  },
  {
    id: "4",
    title:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    excerpt:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    date: "18",
    month: "NOV",
    category: "Food",
    author: "Admin",
    comments: 65,
    image:
      "data:image/jpeg;base64,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",
  },
  {
    id: "5",
    title:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    excerpt:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    date: "18",
    month: "NOV",
    category: "Food",
    author: "Admin",
    comments: 65,
    image:
      "https://images.unsplash.com/photo-1519739021703-097560738d4f?w=600&h=450&fit=crop", // Peppers
  },
  {
    id: "6",
    title:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    excerpt:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    date: "18",
    month: "NOV",
    category: "Food",
    author: "Admin",
    comments: 65,
    image:
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=600&h=450&fit=crop", // Oranges branch
  },
  {
    id: "7",
    title:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    excerpt:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    date: "18",
    month: "NOV",
    category: "Food",
    author: "Admin",
    comments: 65,
    image:
      "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=600&h=450&fit=crop", // Orange fruit
  },
  {
    id: "8",
    title:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    excerpt:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    date: "18",
    month: "NOV",
    category: "Food",
    author: "Admin",
    comments: 65,
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&h=450&fit=crop", // Strawberry
  },
];

const Blog_List = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory
        ? post.category.toLowerCase() === selectedCategory.toLowerCase()
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen pb-20 bg-[#f9f9f9]">
      <div className="max-w-330 mx-auto px-4 md:px-6 pt-12 pb-6">
        {/* Top Controls Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <button
            onClick={() => setSelectedCategory(null)}
            className="hidden md:flex bg-[#00b207] text-white px-7 py-3 rounded-full items-center gap-2 font-semibold hover:bg-[#009a06] transition-colors shadow-lg shadow-green-100"
          >
            <span>Filter</span>
            <PiSlidersHorizontalLight size={24} />
          </button>

          <div className="flex md:flex-row items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="whitespace-nowrap">Sort by:</span>
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-200 rounded-md pl-4 pr-10 py-2.5 focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-700 min-w-35 shadow-sm">
                  <option>Latest</option>
                  <option>Oldest</option>
                  <option>Most Popular</option>
                </select>
                <GoChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={20}
                />
              </div>
            </div>
            <div className="text-sm text-gray-400">
              <span className="text-gray-900 font-bold">{BLOG_POSTS.length}</span> Results Found
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Column: Sidebar */}
          <Siderbar
            onSearch={setSearchQuery}
            onCategorySelect={(cat) => setSelectedCategory(cat)}
          />

          {/* Right Column: Blog Grid */}
          <div className="flex-1">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-10">
                {filteredPosts.map((post, idx) => (
                  <BlogCard key={post.id} post={post} hasVideo={idx === 3} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 shadow-sm">
                <i className="fa-solid fa-magnifying-glass text-4xl text-gray-100 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-600">
                  No results match your search
                </h3>
                <p className="text-gray-400 mt-2">
                  Try clarifying your terms or resetting filters
                </p>
              </div>
            )}

            {/* Pagination Component */}
            {filteredPosts.length > 0 && (
              <div className="mt-20 flex justify-center items-center gap-3">
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-300 border border-gray-200 hover:border-green-600 hover:text-green-600 transition-all bg-white shadow-sm">
                  <HiChevronLeft className="text-lg" size={20}/>
                </button>
                {[1, 2, 3, 4, 5].map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600 hover:bg-[#00b207] hover:text-white border border-transparent hover:border-gray-200 transition-all"
                  >
                    {p}
                  </button>
                ))}
                <span className="text-gray-400 px-1">...</span>
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600 hover:text-green-600 border border-transparent hover:border-gray-200 transition-all">
                  21
                </button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-300 border border-gray-200 hover:border-green-600 hover:text-green-600 transition-all bg-white shadow-sm">
                  <HiChevronRight className="text-lg" size={20}/>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog_List;
