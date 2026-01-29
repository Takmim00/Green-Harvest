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
       "https://www.youtube.com/watch?v=1IszT_guI08"
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
      "https://upload.wikimedia.org/wikipedia/commons/5/53/Bowl_Of_Fresh_%2815445955%29.jpeg", // Peppers
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
