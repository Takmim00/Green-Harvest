import { useEffect, useState } from "react";
import greenApple from "../assets/Product Image.png";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "vegetable", label: "Vegetable" },
  { id: "fruit", label: "Fruit" },
  { id: "meat", label: "Meat & Fish" },
  { id: "view-all", label: "View All" },
];
const IntroducingProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Fetch
  useEffect(() => {
    fetch("/api/product.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Product fetch error:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts =
    selectedCategory === "all" || selectedCategory === "view-all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    );
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Loading products...
      </div>
    );
  }

  return (
    <div className="min-h-scree bg-[#EDF2EE]">
      {/* Header */}
      <div className="px-6">
        <h1 className="text-center text-4xl font-bold text-gray-900 mb-8">
          Introducing Our Products
        </h1>

        {/* Category Filter */}
        <div className="flex justify-center gap-6 flex-wrap">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`pb-2 font-medium transition-colors ${
                selectedCategory === category.id
                  ? "border-b-2 border-green-500 text-green-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {category.label}
              <span className="text-gray-300"> |</span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto py-20 px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={() => toggleFavorite(product.id)}
              onView={(product) => setSelectedProduct(product)}
            />
          ))}
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default IntroducingProducts;
