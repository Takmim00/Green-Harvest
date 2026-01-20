import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
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
    <div className="relative overflow-hidden">
      {/* Left Decorative Fruit Image */}
      <img
        src="/Group 6.png"
        alt="Fruit Decoration"
        className="
    hidden lg:block
    absolute
    -left-20
    top-1/2
    -translate-y-1/2 
    opacity-80
    pointer-events-none
  "
      />

      <div className="max-w-11/12 mx-auto pb-10 ">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 mb-4">
          <div className="flex justify-center md:justify-start">
            <h1 className="text-4xl font-bold text-gray-900">
              Featured Products
            </h1>
          </div>

          <div className="flex justify-center md:justify-end">
            <button className="text-green-600 hover:text-green-700 flex items-center gap-2">
              View All <ArrowRight />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {filteredProducts.slice(0, 5).map((product) => (
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
    </div>
  );
};

export default IntroducingProducts;
