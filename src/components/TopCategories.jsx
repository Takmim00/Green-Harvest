import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useStaggeredAnimation } from "../hooks/useScrollAnimation";

const categories = [
  {
    id: 1,
    name: "Vegetables",
    count: 165,
    image: "/Vegetable.png",
  },
  {
    id: 2,
    name: "Fresh Fruit",
    count: 137,
    image: "/fruits 1.png",
  },
  {
    id: 3,
    name: "Fish",
    count: 34,
    image: "/fish 1.png",
  },
  {
    id: 4,
    name: "Meat",
    count: 165,
    image: "/meat 1.png",
  },
  {
    id: 5,
    name: "Water and Drinks",
    count: 48,
    image: "/soft-drink 1.png",
  },
  {
    id: 6,
    name: "Snacks",
    count: 59,
    image: "/snacks 1.png",
  },
];

const TopCategories = () => {
  const { containerRef, visibleItems } = useStaggeredAnimation(
    categories.length,
    100,
  );

  return (
    <section
      className="relative w-full bg-cover bg-center"
      style={{ backgroundImage: "url(/TOPBG.png)" }}
    >
      <div className="relative py-16 px-4 lg:max-w-7xl max-w-11/12 mx-auto">
        <img
          src="/Down.png"
          alt="leaf decoration"
          className="absolute -translate-x-1/2 -top-8 left-10 pointer-events-none select-none animate-bounce-slow"
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
              className={`group flex flex-col items-center p-6 rounded-lg border-2 cursor-pointer
                transition-all duration-300
                hover:-translate-y-2 hover:shadow-lg
                hover:border-green-500 hover:bg-green-50
                ${
                  visibleItems.has(index)
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                }
                border-gray-100 bg-white
              `}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="mb-3 transition-transform duration-300 group-hover:scale-110">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-12 h-12 object-contain"
                />
              </div>

              <h3 className="font-medium text-sm text-center text-gray-800 group-hover:text-green-700 transition-colors">
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
