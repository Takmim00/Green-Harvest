import { ChevronLeft, ChevronRight } from "lucide-react";
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

export default function Shops() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const productsPerPage = 12;

  useEffect(() => {
    fetch("/api/product.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    // Filter by price range
    result = result.filter(
      (p) =>
        p.current_price >= priceRange[0] && p.current_price <= priceRange[1],
    );

    // Filter by rating
    if (selectedRating > 0) {
      result = result.filter((p) => p.rating >= selectedRating);
    }

    // Filter by tags
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
    setCurrentPage(1);
  }, [selectedCategory, priceRange, selectedRating, selectedTags, products]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

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

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div
        className="bg-gray-50 py-4"
        style={{ backgroundImage: "url(/Breadcrumbs.png)" }}
      >
        <div className="max-w-11/12 mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-gray-400 hover:text-green-600 cursor-pointer">
              Home
            </span>
            <span>
              <ChevronRight />
            </span>
            <span className="text-gray-400 hover:text-green-600">Shop</span>
          </div>
        </div>
      </div>

      <div className="max-w-11/12 mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">
                All Categories
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
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
                        name="category"
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
              <h3 className="font-semibold text-lg text-gray-900 mb-4">
                Price
              </h3>
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
              <h3 className="font-semibold text-lg text-gray-900 mb-4">
                Rating
              </h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <label
                    key={rating}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="rating"
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
                <span className="text-orange-500 font-semibold text-3xl">
                  79%
                </span>
                <span className="text-green-700 font-semibold text-lg ml-1">
                  Discount
                </span>
                <p className="text-gray-600 text-sm mt-1">
                  on your first order
                </p>
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
                    onClick={() => handleViewProduct(product)}
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
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Sort & Filter Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
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

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={() => toggleFavorite(product.id)}
                  onView={handleViewProduct}
                />
              ))}
            </div>

            {/* Empty State */}
            {currentProducts.length === 0 && (
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
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
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
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
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
