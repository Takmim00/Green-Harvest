import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PriceRangeSlider from "../components/PriceRangeSlider";
import ProductCard from "../components/ProductCard";

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
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // URL → State (derived)
  const currentPage = Number(searchParams.get("page") || "1");
  const selectedCategory = searchParams.get("category") || ""; // "" = All
  const ordering = searchParams.get("ordering") || "";
  const minRating = Number(searchParams.get("min_rating") || "0");
  const minPrice = Number(searchParams.get("min_price") || "0");
  const maxPrice = Number(searchParams.get("max_price") || "50");

  const selectedTags = (searchParams.get("tags") || "")
    .split(",")
    .filter(Boolean);

  // Helper to update URL params cleanly
  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value == null || value === 0) {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    });

    if (!("page" in updates)) {
      next.set("page", "1");
    }

    setSearchParams(next, { replace: true });
  };

  // Fetch products when URL params change
  useEffect(() => {
    setLoading(true);

    fetch(
      `https://green-harvest-backend-seven.vercel.app/api/products/?${searchParams.toString()}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.results || []);
        setTotalPages(
          Math.max(1, Math.ceil((data.count || 0) / PRODUCTS_PER_PAGE)),
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [searchParams]);

  // Fetch categories (once)
  useEffect(() => {
    fetch("https://green-harvest-backend-seven.vercel.app/api/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data || []))
      .catch((err) => console.error("Categories fetch failed", err));
  }, []);

  const toggleTag = (tag) => {
    const nextTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    updateParams({ tags: nextTags.join(",") || "" });
  };

  const activeFilterCount =
    (selectedCategory ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (minPrice > 0 || maxPrice < 50 ? 1 : 0) +
    selectedTags.length;

  const saleProducts = useMemo(
    () => products.filter((p) => p.isSale).slice(0, 3),
    [products],
  );

  const handleClearAll = () => {
    const params = new URLSearchParams();
    params.set("page", "1");
    setSearchParams(params, { replace: true });
  };

  // ────────────────────────────────────────────────
  // Filter Sidebar / Drawer Content
  // ────────────────────────────────────────────────
  const FilterContent = ({ isMobile = false }) => (
    <>
      <button
        onClick={handleClearAll}
        className="w-full mb-4 py-2.5 border border-gray-300 rounded-lg
             text-sm font-medium text-gray-700
             hover:bg-gray-100 transition"
      >
        Clear Filters
      </button>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">
          All Categories
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={isMobile ? "cat-m" : "cat"}
              checked={!selectedCategory}
              onChange={() => updateParams({ category: "" })}
              className="w-4 h-4 accent-green-600"
            />
            <span className="text-sm text-gray-700">All</span>
          </label>

          {categories
            .filter((cat) => cat.product_count > 0)
            .map((cat) => (
              <label
                key={cat.id}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={isMobile ? "cat-m" : "cat"}
                    checked={selectedCategory === cat.slug}
                    onChange={() => updateParams({ category: cat.slug })}
                    className="w-4 h-4 accent-green-600"
                  />
                  <span className="text-sm text-gray-700">{cat.name}</span>
                </div>
                <span className="text-sm text-gray-400">
                  ({cat.product_count})
                </span>
              </label>
            ))}
        </div>
      </div>

      {/* Price Range (max only) */}
      {/* <div className="mb-6 border-t pt-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">Price</h3>
        <input
          type="range"
          min="0"
          max="50"
          step="1"
          value={maxPrice}
          onChange={(e) => updateParams({ max_price: e.target.value })}
          className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-green-600"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-3">
          <span>$0</span>
          <span>${maxPrice}</span>
        </div>
    </  div> */}
      {/* Price Range */}
      <div className="mb-6 border-t pt-6">
        <PriceRangeSlider
          minValue={0}
          maxValue={50}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinChange={(value) => updateParams({ min_price: value })}
          onMaxChange={(value) => updateParams({ max_price: value })}
        />
      </div>

      {/* Rating */}
      <div className="mb-6 border-t pt-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((r) => (
            <label key={r} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={isMobile ? "rate-m" : "rate"}
                checked={minRating === r}
                onChange={() => updateParams({ min_rating: r })}
                className="w-4 h-4 accent-green-600"
              />

              {/* Stars */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < r ? "text-orange-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Rating text */}
              <span className="text-sm text-gray-700">{r}+ Stars</span>
            </label>
          ))}

          <button
            onClick={() => updateParams({ min_rating: "" })}
            className="text-sm text-green-600 hover:underline mt-1 block"
          >
            Clear rating filter
          </button>
        </div>
      </div>

      {/* Popular Tags */}
      <div className="mb-6 border-t pt-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
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

      {/* Sale Products (small preview) */}
      <div className="border-t pt-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">
          Sale Products
        </h3>
        <div className="space-y-4">
          {saleProducts.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-3 p-2 border border-gray-200 rounded-lg hover:border-green-500 transition-all cursor-pointer"
            >
              <img
                src={p.image?.[0] || "/placeholder.svg"}
                alt={p.name}
                className="w-16 h-16 object-cover rounded bg-gray-50"
              />
              <div>
                <h4 className="text-sm font-medium text-gray-800 line-clamp-2">
                  {p.name}
                </h4>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600 font-semibold">
                    ${p.current_price?.toFixed(2) ?? "0.00"}
                  </span>
                  {p.original_price && (
                    <span className="text-gray-400 line-through text-xs">
                      ${p.original_price.toFixed(2)}
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
      {/* Mobile filter overlay */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Mobile filter drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 lg:hidden ${
          isFilterOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold text-lg">Filters</h2>
          <button onClick={() => setIsFilterOpen(false)}>
            <X size={22} className="text-gray-600" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-128px)]">
          <FilterContent isMobile />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white flex gap-3">
          <button
            onClick={handleClearAll}
            className="flex-1 py-2.5 border rounded-full text-sm font-medium hover:bg-gray-50"
          >
            Clear All
          </button>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="flex-1 py-2.5 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700"
          >
            Apply
          </button>
        </div>
      </div>

      <div className="px-4 lg:max-w-7xl max-w-11/12 mx-auto  py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <FilterContent />
          </aside>

          {/* Main content */}
          <main className="flex-1">
            {/* Top controls */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                <SlidersHorizontal size={18} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-green-600 text-white text-xs rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={ordering}
                  onChange={(e) => updateParams({ ordering: e.target.value })}
                  className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Default</option>
                  <option value="-created_at">Latest</option>
                  <option value="current_price">Price: Low → High</option>
                  <option value="-current_price">Price: High → Low</option>
                  <option value="-average_rating">Rating</option>
                  <option value="name">Name: A-Z</option>
                  <option value="-name">Name: Z-A</option>
                </select>
              </div>

              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">
                  {products.length}
                </span>{" "}
                Results
              </div>
            </div>

            {/* Active filters chips (mobile) */}
            {activeFilterCount > 0 && (
              <div className="lg:hidden flex flex-wrap gap-2 mb-5">
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                    {selectedCategory}
                    <button onClick={() => updateParams({ category: "" })}>
                      <X size={14} />
                    </button>
                  </span>
                )}

                {minRating > 0 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                    {minRating}+ ★
                    <button onClick={() => updateParams({ min_rating: "" })}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                {(minPrice > 0 || maxPrice < 50) && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                    ${minPrice} – ${maxPrice}
                    <button
                      onClick={() =>
                        updateParams({ min_price: "", max_price: "" })
                      }
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}

                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                  >
                    {tag}
                    <button onClick={() => toggleTag(tag)}>
                      <X size={14} />
                    </button>
                  </span>
                ))}

                <button
                  onClick={handleClearAll}
                  className="text-sm text-green-600 hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Products grid */}
            {loading ? (
              <div className="flex justify-center py-20 min-h-screen">
                <div className="w-10 h-10 border-4 border-t-green-600 border-gray-200 rounded-full animate-spin" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <p className="text-lg">No products found</p>
                <p className="mt-2">Try changing filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => updateParams({ page: currentPage - 1 })}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} />
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => updateParams({ page })}
                      className={`w-10 h-10 rounded-full text-sm font-medium ${
                        currentPage === page
                          ? "bg-green-600 text-white"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => updateParams({ page: currentPage + 1 })}
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
    </div>
  );
}
