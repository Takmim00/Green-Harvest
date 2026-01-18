import { useState } from "react";
import {
  X,
  ChevronDown,
  Star,
  ChevronDownSquareIcon,
  Heart,
} from "lucide-react";
import {
  FaFacebook,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa";
import { BsChevronUp, BsTwitterX } from "react-icons/bs";
import greenApple from "../assets/Product Image.png";
import Farmary from "../assets/Group 19.png";
import { HiOutlineShoppingBag } from "react-icons/hi";
const galleryImages = [
  {
    id: 1,
    image: greenApple,
    alt: "Chinese Cabbage - Main",
    brand: Farmary,
  },
  {
    id: 2,
    image: "/images/cabbage-thumb-1.jpg",
    alt: "Chinese Cabbage - Detail",
  },
  {
    id: 3,
    image: "/images/cabbage-thumb-2.jpg",
    alt: "Chinese Cabbage - Leaves",
  },
  {
    id: 4,
    image: "/images/cabbage-thumb-2.jpg",
    alt: "Chinese Cabbage - Side",
  },
];

const ProductModal = ({ product, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: galleryImages[selectedImage].image,
    };

    console.log("Added to cart:", cartItem);
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-5xl p-8 relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        {/* ===== PRODUCT CONTENT ===== */}
        <div className="grid grid-cols-12 gap-8">
          {/* LEFT : GALLERY */}
          <div className="col-span-12 lg:col-span-7 flex gap-4">
            <div className="flex flex-col gap-3 w-24">
              <button className="p-2 text-gray-600">
                <BsChevronUp
                  size={18}
                  className=" hover:bg-gray-300 rounded-full"
                />
              </button>
              {galleryImages.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg border-2 overflow-hidden ${
                    selectedImage === index
                      ? "border-emerald-500"
                      : "border-gray-300 hover:border-emerald-400"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
              <button className="p-2 text-gray-600">
                <ChevronDown
                  size={18}
                  className=" hover:bg-gray-300 rounded-full"
                />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center bg-white min-h-105">
              <img
                src={galleryImages[selectedImage].image}
                alt={galleryImages[selectedImage].alt}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* RIGHT : INFO */}
          <div className="col-span-12 lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h2>
              <span className="bg-green-200 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-md">
                In Stock
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} Reviews
              </span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-700">SKU: 2,51,594</span>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-center gap-3">
                {product.originalPrice && (
                  <span className="line-through text-gray-400 text-lg">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-3xl text-green-600">
                  ${product.price}
                </span>
                <span className="bg-red-100 text-red-600 text-sm rounded-full px-2 py-1">
                  64% Off
                </span>
              </div>
            </div>
            {/* Brand & Share */}
            <div className="border-t border-gray-200" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium">Brand:</span>
                <div className="flex items-center gap-1">
                  <span className="text-lg">
                    <img src={Farmary} alt="" />
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-700 font-medium">Share item:</span>
                <button className="p-2 hover:bg-green-500 hover:text-white text-gray-500 rounded-full transition">
                  <FaFacebookF size={20} />
                </button>
                <button className="p-2  hover:bg-green-500 hover:text-white text-gray-500 rounded-full transition">
                  <BsTwitterX size={20} />
                </button>
                <button className="p-2 hover:bg-green-500 hover:text-white text-gray-500 rounded-full transition">
                  <FaPinterestP size={20} />
                </button>
                <button className="p-2 hover:bg-green-500 hover:text-white text-gray-500 rounded-full transition">
                  <FaInstagram size={20} />
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos.
            </p>

            {/* Quantity & Add to Cart */}
            <div className="border-t border-gray-200" />
            <div className="pt-4 space-y-4">
              <div className="flex items-center gap-4">
                {/* Quantity Box */}
                <div className="flex items-center border border-gray-300 rounded-full overflow-hidden p-1">
                  <button
                    onClick={decreaseQty}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full bg-gray-200"
                  >
                    −
                  </button>
                  <span className="px-5 py-2 font-semibold min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQty}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full bg-gray-200"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-900 text-white font-semibold py-3 rounded-full transition group"
                >
                  <span>Add to Cart</span>
                  <HiOutlineShoppingBag
                    size={22}
                    className="group-hover:translate-x-1 transition"
                  />
                </button>

                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-3 bg-[#bdf5c7] rounded-full transition"
                >
                  <Heart
                    size={20}
                    className={
                      isFavorite
                        ? "fill-red-500 text-red-500"
                        : "text-green-800"
                    }
                  />
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="border-t border-gray-200" />
            <div className="pt-4 space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-800">Category:</span>{" "}
                <span className="text-gray-600">Vegetables</span>
              </div>
              <div>
                <span className="font-medium text-gray-800">Tags:</span>{" "}
                <span className="text-gray-600">
                  Healthy • Chinese • Cabbage
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
