import { ArrowRight, MessageCircle, User } from "lucide-react";
import { useStaggeredAnimation } from "../hooks/useScrollAnimation";

const LatestNews = () => {
  const { containerRef, visibleItems } = useStaggeredAnimation(3, 150);

  const blogs = [
    {
      id: 1,
      image: "/latest1.png",
      day: "18",
      month: "NOV",
      category: "Food",
      author: "Admin",
      comments: 65,
      title:
        "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    },
    {
      id: 2,
      image: "/latest2.png",
      day: "23",
      month: "JAN",
      category: "Food",
      author: "Admin",
      comments: 65,
      title:
        "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    },
    {
      id: 3,
      image: "/latest3.png",
      day: "18",
      month: "NOV",
      category: "Food",
      author: "Admin",
      comments: 65,
      title:
        "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    },
  ];

  return (
    <section
      className="relative w-full  bg-[#edf2ee] bg-cover bg-top bg-no-repeat py-16"
      style={{ backgroundImage: "url(/LatestBG.png)" }}
    >
      <div className="px-4 lg:max-w-7xl max-w-11/12 mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-green-500 text-sm font-medium tracking-wider uppercase">
            BLOG
          </span>
          <h2 className="text-3xl font-semibold text-gray-900 mt-2">
            Latest News
          </h2>
        </div>

        {/* Blog Cards */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {blogs.map((blog, index) => (
            <div
              key={blog.id}
              className={`bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm 
                  transition-all duration-500
                  hover:shadow-lg hover:-translate-y-2
                  ${
                    visibleItems.has(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative  rounded-t-lg overflow-hidden group">
                <img
                  src={blog.image || "/placeholder.svg"}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                {/* Date Badge */}
                <div className="absolute bottom-4 left-4 bg-white rounded-md shadow-md px-3 py-2 text-center min-w-12.5">
                  <span className="block text-xl font-bold text-gray-900 leading-tight">
                    {blog.day}
                  </span>
                  <span className="block text-xs text-gray-500 uppercase">
                    {blog.month}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <span>{blog.category}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>By {blog.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={14} />
                    <span>{blog.comments} Comments</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-gray-800 font-medium leading-relaxed mb-4 line-clamp-2">
                  {blog.title}
                </h3>

                {/* Read More Link */}
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-green-500 font-medium hover:text-green-600 transition-colors"
                >
                  Read More
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
