import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import required modules
import { ChevronDown, ChevronUp, Heart, Minus, Plus } from "lucide-react";
import { BsInstagram, BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaPinterestP, FaStar } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";

import { toast } from "react-toastify";
import { useCart } from "../routes/provider/ShoppingProvider";
import { useWishlist } from "../routes/provider/WishlistProvider";
import { requireAuth } from "../utils/requireAuth";
import DescriptionTabs from "./ProductDetails/DescriptionTabs";
import RelatedCard from "./ProductDetails/RelatedCard";

const ProductDetails = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;

    requireAuth(() => {
      addToCart(product, quantity);

      toast.success(`${product.name} added to cart 🛒`);
    });
  };

  useEffect(() => {
    if (!slug) return;

    fetch(
      `https://green-harvest-backend-seven.vercel.app/api/products/${slug}/`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct({
          ...data,
          current_price: Number(data.current_price),
          original_price: Number(data.original_price),
          discount_percentage: Number(data.discount_percentage),
        });
      })
      .catch((err) => console.error("Product details error:", err));
  }, [slug]);

  useEffect(() => {
    if (product) {
      setActiveIndex(0);
      setQuantity(1);
      setIsFavorite(false);
    }
  }, [product]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  // Determine if product is in wishlist
  const favorite = product ? isInWishlist(product.slug) : false;

  // Handle wishlist click
  // const handleWishlistClick = () => {
  //   if (!product) return;

  //   requireAuth(() => {
  //     toggleWishlist(product);

  //     setIsAnimating(true);
  //     setTimeout(() => setIsAnimating(false), 300);

  //     if (isInWishlist(product.slug)) {
  //       toast.warn(`${product.name} removed from wishlist!`);
  //     } else {
  //       toast.success(`${product.name} added to wishlist!`);
  //     }
  //   });
  // };
  const handleWishlistClick = () => {
    if (!product || loading) return;

    requireAuth(() => {
      setLoading(true);

      const already = isInWishlist(product.slug);

      // 🔥 toast আগে
      if (already) {
        toast.warn(`${product.name} removed from wishlist!`);
      } else {
        toast.success(`${product.name} added to wishlist!`);
      }

      // animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);

      // async পরে
      toggleWishlist(product).finally(() => {
        setLoading(false);
      });
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }
  const discountPercent = Math.round(product.discount_percentage || 0);
  const images = product?.images?.map((img) => img.image) || [];

  const scrollUp = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const scrollDown = () => {
    if (!images.length) return;
    if (activeIndex < images.length - 1) setActiveIndex(activeIndex + 1);
  };
  return (
    <div className="px-4 lg:max-w-7xl max-w-11/12 mx-auto">
      {/* product info */}
      <div className="grid   md:grid-cols-2 gap-6 mt-6">
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-4">
          {/* Thumbnail column */}
          <div className="lg:col-span-1 order-2 lg:order-1 flex flex-col items-center gap-2">
            {/* Up arrow */}
            <button
              onClick={scrollUp}
              className="hidden lg:block p-1 rounded hover:bg-gray-100"
            >
              <ChevronUp size={18} />
            </button>
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-hidden">
              {images.map((img, index) => (
                <button
                  key={`${product.id}-${index}`}
                  onClick={() => setActiveIndex(index)}
                  className={`border rounded p-1 ${
                    activeIndex === index
                      ? "border-green-500"
                      : "border-gray-200"
                  }`}
                >
                  <img src={img} className="w-16 h-16 object-contain" alt="" />
                </button>
              ))}
            </div>
            {/* Down arrow */}
            <button
              onClick={scrollDown}
              className="hidden lg:block p-1 rounded hover:bg-gray-100"
            >
              <ChevronDown size={18} />
            </button>
          </div>
          {/* Main Image */}
          <div className="lg:col-span-4 order-1 lg:order-2 flex items-center justify-center rounded bg-white h-65 sm:h-90 lg:h-125">
            <img
              src={images[activeIndex] || "/placeholder.svg"}
              className="w-full h-full object-contain"
              alt=""
            />
          </div>
        </div>
        <div className="productInfo flex flex-col space-y-3 sm:space-y-4 lg:space-y-2">
          <div className="title flex flex-wrap items-center gap-2 sm:gap-3">
            <h2 className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-[36px] leading-tight">
              {product?.name}
            </h2>
            <p className="px-2 sm:px-3 py-1 rounded-sm bg-[#20b52633] text-[10px] sm:text-xs md:text-sm text-branding-success-dark whitespace-nowrap">
              {product?.stock_status}
            </p>
          </div>
          {/* Rating and SKU */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <div className="flex gap-0.5">
              {[...Array(Math.round(product?.average_rating || 0))].map(
                (_, i) => (
                  <span key={i} className="text-orange-500">
                    <FaStar className="w-3 h-3 sm:w-4 sm:h-4" />
                  </span>
                ),
              )}
              {[...Array(5 - Math.round(product?.average_rating || 0))].map(
                (_, i) => (
                  <span key={i} className="text-gray-300">
                    <FaStar className="w-3 h-3 sm:w-4 sm:h-4" />
                  </span>
                ),
              )}
            </div>
            <span className="text-xs sm:text-sm text-gray-700">
              {product?.reviews_count} Review
            </span>
            <span className="hidden sm:inline text-gray-400">•</span>
            <span className="text-xs sm:text-sm text-gray-700">
              SKU: {product?.sku}
            </span>
          </div>
          {/*Price  */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {product.original_price && (
              <span className="line-through text-gray-400 text-base sm:text-lg">
                ${product.original_price}
              </span>
            )}
            <span className="text-xl sm:text-2xl md:text-3xl text-green-600">
              ${product.current_price}
            </span>
            <span className="bg-red-100 text-red-600 text-xs sm:text-sm rounded-full px-2 py-0.5 sm:py-1">
              {discountPercent}% Off
            </span>
          </div>

          <div className="border-t border-gray-200 my-2 sm:my-4" />
          {/* Brand & Share */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium text-sm sm:text-base">
                Brand:
              </span>
              <div className="flex items-center gap-1">
                <span className="text-base sm:text-lg">🌿</span>
                <span className="text-gray-600 text-xs sm:text-sm">
                  {product?.brand}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-3 flex-wrap">
              <span className="text-gray-700 font-medium text-sm sm:text-base">
                Share item:
              </span>
              <div className="flex items-center gap-1 sm:gap-2">
                <button className="p-1.5 sm:p-2 hover:bg-green-500 hover:text-white text-gray-500 rounded-full transition">
                  <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button className="p-1.5 sm:p-2 hover:bg-green-500 hover:text-white text-gray-500 rounded-full transition">
                  <BsTwitterX className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button className="p-1.5 sm:p-2 hover:bg-green-500 hover:text-white text-gray-500 rounded-full transition">
                  <FaPinterestP className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button className="p-1.5 sm:p-2 hover:bg-green-500 hover:text-white text-gray-500 rounded-full transition">
                  <BsInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-3">
            {product.description}
          </p>
          <div className="border-t border-gray-200" />
          {/* Quantity & Add to Cart */}
          <div className="flex flex-wrap gap-2 sm:gap-3 items-center pt-3 sm:pt-4 pb-2">
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden p-0.5 sm:p-1">
              <button
                onClick={decreaseQty}
                className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 bg-gray-200 transition text-gray-600 rounded-full  hover:bg-gray-300 active:bg-gray-400 active:scale-95 cursor-pointer"
              >
                <Minus className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
              <span className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-center min-w-10  sm:min-w-10 md:min-w-15 font-medium text-gray-700 text-sm sm:text-base">
                {quantity}
              </span>
              <button
                onClick={increaseQty}
                className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 bg-gray-200 transition text-gray-600 rounded-full  hover:bg-gray-300 active:bg-gray-400 active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 min-w-35 sm:min-w-45 flex items-center justify-center gap-1 sm:gap-2 bg-green-500 hover:bg-green-900 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-full transition group text-sm sm:text-base cursor-pointer"
            >
              <span>Add to Cart</span>
              <HiOutlineShoppingBag className="w-5 h-5 sm:w-5.5 sm:h-5.5 group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={handleWishlistClick}
              disabled={loading}
              className={`p-2.5 sm:p-3 rounded-full transition shrink-0 bg-[#bdf5c7] cursor-pointer ${
                isAnimating ? "scale-125" : ""
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Heart
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  favorite ? "fill-red-500 text-red-500" : "text-green-600"
                }`}
              />
            </button>
          </div>
          {/* Category & Tags */}
          <div className="pt-4 sm:pt-6 border-t border-gray-200 space-y-2 sm:space-y-3">
            {/* Category */}
            <div className="flex gap-2 items-center flex-wrap">
              <span className="text-xs sm:text-sm font-medium text-gray-800">
                Category:
              </span>
              <a
                href="#"
                className="text-xs sm:text-sm text-gray-600 hover:underline"
              >
                {product.category}
              </a>
            </div>

            {/* Tags */}
            <div className="flex gap-2 items-start flex-wrap">
              <span className="text-xs sm:text-sm font-medium text-gray-800">
                Tag:
              </span>
              <div className="flex flex-wrap gap-1 items-center">
                {product.additional_info?.tags?.map((tag, i) => (
                  <span key={i} className="text-xs sm:text-sm text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Tabs Section */}
      <DescriptionTabs product={product} />

      <RelatedCard currentProduct={product} />
    </div>
  );
};

export default ProductDetails;
