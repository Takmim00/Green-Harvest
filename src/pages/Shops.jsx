import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

const categories = [
  { name: "Fresh Fruit", count: 134 },
  { name: "Vegetables", count: 150 },
  { name: "Cooking", count: 54 },
  { name: "Snacks", count: 47 },
  { name: "Beverages", count: 43 },
  { name: "Beauty & Health", count: 38 },
  { name: "Bread & Bakery", count: 15 },
];

const popularTags = [
  "Healthy",
  "Low fat",
  "Vegetarian",
  "Kid foods",
  "Vitamins",
  "Bread",
  "Meat",
  "Snacks",
  "Lunch",
  "Dinner",
  "Breakfast",
  "Fruit",
];
const PRODUCTS_PER_PAGE = 12;

export default function Shops() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(true);

  const [totalPages, setTotalPages] = useState(1);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    setLoading(true);

    fetch(
      `https://green-harvest-backend-seven.vercel.app/api/products/?page=${currentPage}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.results || []);
        setFilteredProducts(data.results || []);
        setTotalPages(Math.ceil(data.count / PRODUCTS_PER_PAGE));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [currentPage]);

  /* ================= FILTER ================= */
  useEffect(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    result = result.filter(
      (p) =>
        Number(p.current_price) >= priceRange[0] &&
        Number(p.current_price) <= priceRange[1],
    );

    if (selectedRating > 0) {
      result = result.filter(
        (p) => Number(p.average_rating || 0) >= selectedRating,
      );
    }

    if (selectedTags.length > 0) {
      result = result.filter((p) =>
        selectedTags.some((tag) =>
          p.additional_info?.tags?.some((t) =>
            t.toLowerCase().includes(tag.toLowerCase()),
          ),
        ),
      );
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, priceRange, selectedRating, selectedTags]);
  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        <div className="w-10 h-10 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }
  /* ================= HANDLERS ================= */
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleTagClick = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const saleProducts = products.filter((p) => p.isSale).slice(0, 3);

  // Count active filters
  const activeFilterCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (selectedRating > 0 ? 1 : 0) +
    selectedTags.length +
    (priceRange[1] < 50 ? 1 : 0);

  // Filter sidebar content component
  const FilterContent = ({ isMobile = false }) => (
    <>
      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">
          All Categories
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={isMobile ? "category-mobile" : "category"}
              checked={selectedCategory === "All"}
              onChange={() => setSelectedCategory("All")}
              className="w-4 h-4 accent-green-600"
            />
            <span className="text-sm text-gray-700">All</span>
          </label>
          {categories.map((cat) => (
            <label
              key={cat.name}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name={isMobile ? "category-mobile" : "category"}
                  checked={selectedCategory === cat.name}
                  onChange={() => setSelectedCategory(cat.name)}
                  className="w-4 h-4 accent-green-600"
                />
                <span className="text-sm text-gray-700">{cat.name}</span>
              </div>
              <span className="text-sm text-gray-400">({cat.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-6 border-t pt-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">Price</h3>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="50"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>Price: ${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6 border-t pt-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name={isMobile ? "rating-mobile" : "rating"}
                checked={selectedRating === rating}
                onChange={() => setSelectedRating(rating)}
                className="w-4 h-4 accent-green-600"
              />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < rating ? "text-orange-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-500">{rating}.0</span>
            </label>
          ))}
          <button
            onClick={() => setSelectedRating(0)}
            className="text-sm text-green-600 hover:underline"
          >
            Clear rating filter
          </button>
        </div>
      </div>

      {/* Popular Tags */}
      <div className="mb-6 border-t pt-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">
          Popular Tag
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                selectedTags.includes(tag)
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-600 border-gray-300 hover:border-green-600 hover:text-green-600"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Discount Banner */}
      <div className="mb-6 bg-green-50 rounded-xl p-5 relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-orange-500 font-semibold text-3xl">79%</span>
          <span className="text-green-700 font-semibold text-lg ml-1">
            Discount
          </span>
          <p className="text-gray-600 text-sm mt-1">on your first order</p>
          <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 flex items-center gap-1">
            Shop Now
            <span className="ml-1">→</span>
          </button>
        </div>
        <img
          src="/fresh-vegetables-basket.png"
          alt="Fresh vegetables"
          className="absolute right-0 bottom-0 w-28 h-28 object-contain"
        />
      </div>

      {/* Sale Products */}
      <div className="border-t pt-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">
          Sale Products
        </h3>
        <div className="space-y-4">
          {saleProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 cursor-pointer border border-gray-200 
              shadow-sm
              transition-all duration-300
              hover:border-[#00B307]
              hover:shadow-[0_0_0_2px_rgba(0,179,7,0.15),0_10px_20px_rgba(0,179,7,0.25)] p-2 rounded-lg"
              onClick={() => {
                handleViewProduct(product);
                if (isMobile) setIsFilterOpen(false);
              }}
            >
              <img
                src={product.image?.[0] || "/placeholder.svg"}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg bg-gray-100"
              />
              <div>
                <h4 className="text-sm font-medium text-gray-800">
                  {product.name}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 font-semibold text-sm">
                    ${product.current_price.toFixed(2)}
                  </span>
                  {product.original_price && (
                    <span className="text-gray-400 text-xs line-through">
                      ${product.original_price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Filter Drawer Overlay */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Mobile Filter Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isFilterOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg text-gray-900">Filters</h2>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-140px)] p-4">
          <FilterContent isMobile={true} />
        </div>
        {/* Mobile Filter Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          <div className="flex gap-3">
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedRating(0);
                setSelectedTags([]);
                setPriceRange([0, 50]);
              }}
              className="flex-1 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="flex-1 py-2.5 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <div className="lg:max-w-7xl max-w-11/12 mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block w-72 shrink-0">
            <FilterContent isMobile={false} />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Sort & Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal size={18} />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-green-600 text-white text-xs rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Latest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                </select>
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">
                  {filteredProducts.length}
                </span>{" "}
                Results Found
              </div>
            </div>

            {/* Active Filters Display - Mobile */}
            {activeFilterCount > 0 && (
              <div className="lg:hidden flex flex-wrap items-center gap-2 mb-4">
                {selectedCategory !== "All" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">
                    {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory("All")}
                      className="ml-1 hover:text-green-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {selectedRating > 0 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">
                    {selectedRating}+ Stars
                    <button
                      onClick={() => setSelectedRating(0)}
                      className="ml-1 hover:text-green-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {priceRange[1] < 50 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">
                    Under ${priceRange[1]}
                    <button
                      onClick={() => setPriceRange([0, 50])}
                      className="ml-1 hover:text-green-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full"
                  >
                    {tag}
                    <button
                      onClick={() => handleTagClick(tag)}
                      className="ml-1 hover:text-green-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedRating(0);
                    setSelectedTags([]);
                    setPriceRange([0, 50]);
                  }}
                  className="text-sm text-green-600 hover:text-green-700 hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onView={handleViewProduct}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No products found</p>
                <p className="text-gray-400 text-sm mt-2">
                  Try adjusting your filters
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() =>
                setCurrentPage((p) => Math.max(1, p - 1))
              }
              disabled={currentPage === 1}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                      currentPage === i + 1
                        ? "bg-green-600 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(totalPages, p + 1)
                )
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
          </main>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
