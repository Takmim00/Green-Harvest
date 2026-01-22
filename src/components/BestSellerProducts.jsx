import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import SmallProductCard from "./SmallProductCard";

const BestSellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [activeListItemId, setActiveListItemId] = useState(2);
  const [favorites, setFavorites] = useState({});

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/product.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const getProductById = (id) => products.find((p) => p.id === id);

  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Product IDs for top row - Best Seller Cards
  const topRowProductIds = [1, 5, 6, 7, 16];

  // Product lists for bottom section
  const hotDealsProducts = [
    { id: 1, showDiscount: false },
    { id: 2, showDiscount: true },
    { id: 5, showDiscount: false },
  ];

  const bestSellerListProducts = [
    { id: 8, showDiscount: false },
    { id: 12, showDiscount: true },
    { id: 3, showDiscount: false },
  ];

  const topRatedProducts = [
    { id: 17, showDiscount: false },
    { id: 16, showDiscount: true },
    { id: 4, showDiscount: false },
  ];

  // Product List Section Component
  const ProductList = ({ title, items }) => (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-2">
        {items.map((item) => {
          const product = getProductById(item.id);
          return (
            <SmallProductCard
              key={item.id}
              product={product}
              isActive={activeListItemId === item.id}
              onMouseEnter={() => setActiveListItemId(item.id)}
              showDiscount={item.showDiscount}
              onView={(product) => {
                setSelectedProduct(product);
                setIsModalOpen(true);
              }}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="py-12 px-4 max-w-11/12 mx-auto">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 mb-12">
        <div className="flex justify-center md:justify-start">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Best Seller Products
          </h2>
        </div>
        <div className="flex justify-center md:justify-end">
          <Link
            to="/shop"
            className="flex items-center gap-1 text-green-600 hover:text-green-700 text-sm font-medium"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Top Row - Product Cards using shared ProductCard component */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
        {topRowProductIds.map((id) => {
          const product = getProductById(id);
          if (!product) return null;
          return (
            <ProductCard
              key={id}
              product={product}
              isFavorite={favorites[id]}
              onToggleFavorite={() => toggleFavorite(id)}
              onView={(product) => {
                setSelectedProduct(product);
                setIsModalOpen(true);
              }}
            />
          );
        })}
      </div>

      {/* Bottom Section - Lists and Promo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Hot Deals */}
        <ProductList title="Hot Deals" items={hotDealsProducts} />

        {/* Best Seller */}
        <ProductList title="Best Seller" items={bestSellerListProducts} />

        {/* Top Rated */}
        <ProductList title="Top Rated" items={topRatedProducts} />

        {/* Promotional Banner */}
        <div className="relative rounded-xl overflow-hidden bg-linear-to-b from-green-800 to-green-900 h-full min-h-70">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{
              backgroundImage: `url('/fresh-vegetables-basket.png')`,
            }}
          />

          {/* Overlay Content */}
          <div className="relative z-10 p-6 h-full flex flex-col justify-start">
            <span className="text-orange-400 text-xs font-medium uppercase tracking-wide">
              Hot Sale
            </span>
            <h3 className="text-white text-2xl font-bold mt-2 leading-tight">
              Save 37% on
              <br />
              Every Order
            </h3>
            <button className="mt-4 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors w-fit">
              Shop Now <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setSelectedProduct(null);
          setIsModalOpen(false);
        }}
      />
    </section>
  );
};

export default BestSellerProducts;
