import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useStaggeredAnimation } from "../hooks/useScrollAnimation";


const categories = [
  {
    id: 1,
    name: "Vegetables",
    count: 165,
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <rect
          x="8"
          y="20"
          width="48"
          height="32"
          rx="4"
          fill="#FEF3C7"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        <circle cx="20" cy="14" r="6" fill="#EF4444" />
        <circle cx="32" cy="10" r="5" fill="#22C55E" />
        <circle cx="44" cy="14" r="6" fill="#F97316" />
        <rect x="18" y="28" width="8" height="16" rx="2" fill="#F97316" />
        <circle cx="38" cy="36" r="6" fill="#EF4444" />
      </svg>
    ),
  },
  {
    id: 2,
    name: "Fresh Fruit",
    count: 137,
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <ellipse cx="32" cy="38" rx="20" ry="18" fill="#FEF3C7" />
        <ellipse cx="24" cy="36" rx="8" ry="10" fill="#FBBF24" />
        <ellipse cx="40" cy="36" rx="8" ry="10" fill="#F97316" />
        <path d="M32 20 Q28 12 32 8 Q36 12 32 20" fill="#22C55E" />
      </svg>
    ),
  },
  {
    id: 3,
    name: "Fish",
    count: 34,
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <ellipse cx="32" cy="32" rx="22" ry="14" fill="#93C5FD" />
        <polygon points="54,32 64,24 64,40" fill="#60A5FA" />
        <circle cx="18" cy="30" r="3" fill="#1E3A8A" />
        <path
          d="M26 36 Q32 40 40 36"
          stroke="#1E3A8A"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
  },
  {
    id: 4,
    name: "Meat",
    count: 165,
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <ellipse cx="32" cy="36" rx="18" ry="12" fill="#FECACA" />
        <ellipse cx="32" cy="36" rx="10" ry="6" fill="#EF4444" />
        <circle
          cx="24"
          cy="20"
          r="8"
          fill="#FEE2E2"
          stroke="#FECACA"
          strokeWidth="2"
        />
        <circle
          cx="40"
          cy="20"
          r="8"
          fill="#FEE2E2"
          stroke="#FECACA"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: 5,
    name: "Water and Drinks",
    count: 48,
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <rect
          x="20"
          y="16"
          width="10"
          height="40"
          rx="2"
          fill="#FEF3C7"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        <rect
          x="34"
          y="12"
          width="12"
          height="44"
          rx="2"
          fill="#DCFCE7"
          stroke="#22C55E"
          strokeWidth="2"
        />
        <rect x="22" y="24" width="6" height="8" fill="#F59E0B" />
        <rect x="36" y="20" width="8" height="10" fill="#22C55E" />
      </svg>
    ),
  },
  {
    id: 6,
    name: "Snacks",
    count: 59,
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <rect
          x="12"
          y="20"
          width="16"
          height="36"
          rx="2"
          fill="#FEF3C7"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        <rect
          x="36"
          y="16"
          width="16"
          height="40"
          rx="2"
          fill="#DCFCE7"
          stroke="#22C55E"
          strokeWidth="2"
        />
        <rect x="14" y="24" width="12" height="6" fill="#EF4444" />
        <rect x="38" y="20" width="12" height="6" fill="#3B82F6" />
      </svg>
    ),
  },
];

const TopCategories = () => {
  const [activeCategory, setActiveCategory] = useState(1);
  const { containerRef, visibleItems } = useStaggeredAnimation(categories.length, 100);

  return (
    <section
      className="relative w-full bg-cover bg-center"
      style={{ backgroundImage: "url(/TOPBG.png)" }}
    >
      <div className="relative py-16 px-4 lg:max-w-7xl max-w-11/12 mx-auto">
        <img
          src="/Down.png"
          alt="leaf decoration"
          className="absolute -translate-x-1/2 -top-8 left-10 pointer-events-none select-none"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 mb-12">
          <div className="flex justify-center md:justify-start">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              Shop by Top Categories
            </h2>
          </div>
          <div className="flex justify-center md:justify-end">
            <Link
              to="/shop"
              className="text-green-600 hover:text-green-700 flex items-center gap-2"
            >
              View All <ArrowRight />
            </Link>
          </div>
        </div>

        <div 
          ref={containerRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex flex-col items-center p-6 rounded-lg border-2 cursor-pointer
                transition-all duration-500
                hover:-translate-y-2 hover:shadow-lg
                ${visibleItems.has(index) 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
                }
                ${activeCategory === category.id
                  ? "border-green-500 bg-green-50 shadow-md"
                  : "border-gray-100 bg-white hover:border-green-200"
                }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="mb-3 transition-transform duration-300 group-hover:scale-110">
                {category.icon}
              </div>
              <h3
                className={`font-medium text-sm text-center ${
                  activeCategory === category.id
                    ? "text-green-700"
                    : "text-gray-800"
                }`}
              >
                {category.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {category.count} Products
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
