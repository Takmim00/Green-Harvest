import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import ProductCard from "./ProductCard";

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
    fetch("https://green-harvest-backend-seven.vercel.app/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.results);
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
        <div className="w-10 h-10 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin mx-auto"></div>
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

      <div className="px-4 lg:max-w-7xl max-w-11/12 mx-auto pb-16 ">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 mb-12">
          <div className="flex justify-center md:justify-start">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
              Featured Products
            </h1>
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

        {/* Products Grid */}
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {filteredProducts.slice(0, 5).map((product, index) => (
              <div
                key={product.id}
                className="animate-card is-visible"
                style={{
                  animationDelay: `${index * 100}ms`,
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <ProductCard
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={() => toggleFavorite(product.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroducingProducts;
