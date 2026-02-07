import { ChevronDown, Heart, Star, X } from "lucide-react";
import { useState } from "react";
import { BsChevronUp, BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { toast } from "react-toastify";

import Farmary from "../assets/Group 19.png";
import { useCart } from "../routes/provider/ShoppingProvider";
import { useWishlist } from "../routes/provider/WishlistProvider";

const ProductModal = ({ isOpen, product, loading, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product || !isOpen) return null;

  const discountPercent = Math.round(product.discount_percentage || 0);

  const images = product?.images?.map((img) => img.image) || [];

  const favorite = isInWishlist(product.slug);

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    addToCart({ ...product, image: images[selectedImage] }, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistClick = () => {
    toggleWishlist(product);

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (isInWishlist(product.slug)) {
      toast.warn(`${product.name} removed from wishlist!`);
    } else {
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-5xl p-4 md:p-8 relative overflow-y-auto max-h-[95vh] md:max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-500 hover:text-gray-800 z-10 bg-white rounded-full p-1 cursor-pointer"
        >
          <X size={20} className="md:w-6 md:h-6" />
        </button>
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : product ? (
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 md:gap-8">
            {/* LEFT: Gallery */}
            <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-3 md:gap-4">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-2 md:gap-3 md:w-24 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
                <button className="hidden md:block p-2 text-gray-600">
                  <BsChevronUp
                    size={18}
                    className="hover:bg-gray-300 rounded-full"
                  />
                </button>
                {images.map((img, index) => (
                  <button
                    key={img}
                    onClick={() => setSelectedImage(index)}
                    className={`w-14 h-14 md:w-20 md:h-20 rounded-lg border-2 overflow-hidden shrink-0 ${
                      selectedImage === index
                        ? "border-emerald-500"
                        : "border-gray-300 hover:border-emerald-400"
                    }`}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`product-${index}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
                <button className="hidden md:block p-2 text-gray-600">
                  <ChevronDown
                    size={18}
                    className="hover:bg-gray-300 rounded-full"
                  />
                </button>
              </div>

              {/* Main Image */}
              <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg h-48 md:h-auto md:min-h-80 lg:min-h-105">
                <img
                  src={images[selectedImage] || "/placeholder.svg"}
                  alt={`product-main-${selectedImage}`}
                  className="w-full h-full object-contain max-h-48 md:max-h-none"
                />
              </div>
            </div>

            {/* RIGHT: Info */}
            <div className="lg:col-span-5 space-y-3 md:space-y-5">
              {/* Title & Stock */}
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl md:text-3xl font-bold text-gray-900">
                  {product.name}
                </h2>
                <span className="bg-green-200 text-emerald-700 text-xs font-semibold px-2 md:px-3 py-1 rounded-md">
                  {product.stock_status}
                </span>
              </div>

              {/* Rating */}
              <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < Math.round(product.average_rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      } md:w-4 md:h-4`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.average_rating} Reviews
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-700">SKU: {product.sku}</span>
              </div>

              {/* Price */}
              <div>
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  {product.original_price && (
                    <span className="line-through text-gray-400 text-base md:text-lg">
                      ${product.original_price}
                    </span>
                  )}
                  <span className="text-2xl md:text-3xl text-green-600">
                    ${product.current_price}
                  </span>
                  <span className="bg-red-100 text-red-600 text-xs md:text-sm rounded-full px-2 py-1">
                    {discountPercent}% Off
                  </span>
                </div>
              </div>

              {/* Brand & Share */}
              <div className="border-t border-gray-200" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 font-medium text-sm md:text-base">
                    Brand:
                  </span>
                  <img src={Farmary} alt="brand" className="h-5 md:h-auto" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-700 font-medium text-sm md:text-base">
                    Share:
                  </span>
                  {[FaFacebookF, BsTwitterX, FaPinterestP, FaInstagram].map(
                    (Icon, idx) => (
                      <button
                        key={idx}
                        className="p-1.5 md:p-2 hover:bg-green-500 hover:text-white text-gray-500 rounded-full transition"
                      >
                        <Icon size={16} className="md:w-5 md:h-5" />
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3 md:line-clamp-none">
                {product.description}
              </p>

              {/* Quantity & Actions */}
              <div className="border-t border-gray-200 pt-2 md:pt-4 space-y-3 md:space-y-4">
                <div className="flex flex-wrap items-center gap-2 md:gap-4">
                  {/* Quantity */}
                  <div className="flex items-center border border-gray-300 rounded-full overflow-hidden p-0.5 md:p-1">
                    <button
                      onClick={decreaseQty}
                      className="px-3 md:px-4 py-1.5 md:py-2 text-gray-600 hover:bg-gray-100 rounded-full bg-gray-200 text-sm md:text-base"
                    >
                      −
                    </button>
                    <span className="px-3 md:px-5 py-1.5 md:py-2 font-semibold min-w-8 md:min-w-10 text-center text-sm md:text-base">
                      {quantity}
                    </span>
                    <button
                      onClick={increaseQty}
                      className="px-3 md:px-4 py-1.5 md:py-2 text-gray-600 hover:bg-gray-100 rounded-full bg-gray-200 text-sm md:text-base"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-900 text-white font-semibold py-2.5 md:py-3 px-4 rounded-full transition group text-sm md:text-base"
                  >
                    <span>Add to Cart</span>
                    <HiOutlineShoppingBag
                      size={18}
                      className="group-hover:translate-x-1 transition md:w-5 md:h-5"
                    />
                  </button>

                  {/* Wishlist */}
                  <button
                    onClick={handleWishlistClick}
                    className={`p-2.5 md:p-3 bg-[#bdf5c7] rounded-full transition ${
                      isAnimating ? "scale-125" : ""
                    }`}
                  >
                    <Heart
                      size={18}
                      className={`md:w-5 md:h-5 ${
                        favorite
                          ? "fill-red-500 text-red-500"
                          : "text-green-800"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Category & Tags */}
              <div className="border-t border-gray-200 pt-2 md:pt-4 space-y-1 md:space-y-2 text-xs md:text-sm">
                <div>
                  <span className="font-medium text-gray-800">Category:</span>{" "}
                  <span className="text-gray-600">{product.category}</span>
                </div>
                <div className="flex gap-2 items-start flex-wrap">
                  <span className="text-xs sm:text-sm font-medium text-gray-800">
                    Tag:
                  </span>
                  <div className="flex flex-wrap gap-1 items-center">
                    {product.additional_info?.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs sm:text-sm text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-red-500">Product not found.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
