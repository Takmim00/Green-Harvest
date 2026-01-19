import React from "react";
import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import ProductCard from "./ProductCard";
import greenApple from "../assets/Product Image.png";
import ProductModal from "./ProductModal";
const PRODUCTS = [
  {
    id: 1,
    name: "Green Apple",
    category: "fruit",
    price: 14.99,
    originalPrice: 20.99,
    rating: 4.5,
    image: greenApple,
    isSale: true,
  },
  {
    id: 2,
    name: "Sunripe Mango",
    category: "fruit",
    price: 14.99,
    rating: 4.2,
    image: "/mango-fruit.jpg",
  },
  {
    id: 3,
    name: "Red Tomatos",
    category: "vegetable",
    price: 14.99,
    rating: 4.3,
    image: "/red-tomatoes.jpg",
  },
  {
    id: 4,
    name: "Fresh Cauliflower",
    category: "vegetable",
    price: 14.99,
    rating: 4.4,
    image: "/cauliflower-vegetables.jpg",
  },
  {
    id: 5,
    name: "Green Lettuce",
    category: "vegetable",
    price: 14.99,
    rating: 4.1,
    image: "/lettuce-vegetables.jpg",
  },
  {
    id: 6,
    name: "Eggplant",
    category: "vegetable",
    price: 14.99,
    rating: 4.2,
    image: "/eggplant-vegetables.jpg",
  },
  {
    id: 7,
    name: "Green Chilli",
    category: "vegetable",
    price: 14.99,
    rating: 4.0,
    image: "/green-chilli-pepper.jpg",
  },
  {
    id: 8,
    name: "Eggplant Purple",
    category: "vegetable",
    price: 14.99,
    rating: 4.3,
    image: "/purple-eggplant.jpg",
  },
];

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "vegetable", label: "Vegetable" },
  { id: "fruit", label: "Fruit" },
  { id: "meat", label: "Meat & Fish" },
  { id: "view-all", label: "View All" },
];
const IntroducingProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const filteredProducts =
    selectedCategory === "all" || selectedCategory === "view-all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    );
  };

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
              onView={(product)=>setSelectedProduct(product)}
            />
          ))}
          <ProductModal product={selectedProduct} onClose={()=>setSelectedProduct(null)}/>
        </div>
      </div>
    </div>
  );
};

export default IntroducingProducts;
