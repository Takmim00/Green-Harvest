import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { Heart, Minus, Plus } from "lucide-react";
import { BsInstagram, BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaPinterestP, FaStar } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import DescriptionTabs from "./ProductDetails/DescriptionTabs";
import RelatedCard from "./ProductDetails/RelatedCard";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    fetch("/api/product.json")
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = data.find(
          (item) => String(item.id) === String(id),
        );
        setProduct(foundProduct);
      });
  }, [id]);

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }
  const discountPercent = product.original_price
    ? Math.round(
        ((product.original_price - product.current_price) /
          product.original_price) *
          100,
      )
    : 0;

  return (
    <div className="max-w-7xl mx-auto">
      
        {/* product info */}
        <div className="grid   md:grid-cols-2 gap-6 mt-6">
          <div className="prductSlider grid lg:grid-cols-5 gap-3">
            {/* thumd */}
            <div className="lg:col-span-1 col-span-5 max-w-[100vw] thumbnailSlider order-2 lg:order-1">
              <Swiper
                style={{ height: "450px" }}
                direction={"vertical"}
                breakpoints={{
                  0: {
                    direction: "horizontal",
                  },
                  700: {
                    direction: "vertical",
                  },
                }}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                {product?.image?.map((thumb) => (
                  <SwiperSlide key={thumb} className="p-2">
                    <img
                      className="max-w-21.25 block ms-auto rounded-sm opacity-70"
                      src={thumb}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="lg:col-span-4 max-w-[100vw] order-1 lg:order-2">
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                  height: "500px",
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                {product?.image?.map((main) => (
                  <SwiperSlide key={main}>
                    <img className="max-w-full lg:max-w-125" src={main} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="productInfo flex flex-col lg:space-y-2 sm:space-y-5 space-y-4">
            <div className="title flex items-center gap-3">
              <h2 className="font-semibold text-xl sm:text-2xl lg:text-[36px] leading-tight">
                {product?.name}
              </h2>
              <p className="px-3 py-1 rounded-sm bg-[#20b52633] text-xs sm:text-sm text-branding-success-dark">
                {product?.stock_status}
              </p>
            </div>
            {/* Rating and SKU */}
            <div className="flex items-center gap-2 sm:gap-4 text-sm">
              <div className="flex gap-0.5">
                {[...Array(Math.round(product?.rating || 0))].map((_, i) => (
                  <span key={i} className="text-orange-500">
                    <FaStar />
                  </span>
                ))}
                {[...Array(5 - Math.round(product?.rating || 0))].map(
                  (_, i) => (
                    <span key={i} className="text-gray-300">
                      <FaStar />
                    </span>
                  ),
                )}
              </div>
              <span className="text-sm text-gray-700">
                {product?.reviews_count} Review
              </span>
              <span className="hidden sm:inline text-gray-400">•</span>
              <span className="text-sm text-gray-700">SKU: {product?.sku}</span>
            </div>
            {/*Price  */}
            <div className="flex items-center gap-3">
                {product.original_price && (
                  <span className="line-through text-gray-400 text-lg">
                    ${product.original_price}
                  </span>
                )}
                <span className="text-3xl text-green-600">
                  ${product.current_price}
                </span>
                <span className="bg-red-100 text-red-600 text-sm rounded-full px-2 py-1">
                  {discountPercent}% Off
                </span>
              </div>

            <div className="border-t border-gray-200 my-4" />
            {/* Brand & Share */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium">Brand:</span>
                <div className="flex items-center gap-1">
                  <span className="text-lg">🌿</span>
                  <span className="text-gray-600 text-sm">
                    {product?.brand}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium">Share item:</span>
                <button className="p-2 hover:bg-green-500 hover:text-white text-gray-500 rounded-full transition">
                  <FaFacebook size={20} />
                </button>
                <button className="p-2 hover:bg-green-500 hover:text-white text-gray-500 rounded-full transition">
                  <BsTwitterX size={20} />
                </button>
                <button className="p-2 hover:bg-green-500 hover:text-white text-gray-500 rounded-full transition">
                  <FaPinterestP size={20} />
                </button>
                <button className="p-2 hover:bg-green-500 hover:text-white text-gray-500 rounded-full transition">
                  <BsInstagram size={20} />
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {product.description}
            </p>
            <div className="border-t border-gray-200" />
            {/* Quantity & Add to Cart */}
            <div className="flex gap-3 items-center pt-4 pb-2">
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden p-1">
                <button
                  onClick={decreaseQty}
                  className="px-4 py-3 bg-gray-200 transition text-gray-600 rounded-full"
                >
                  <Minus size={18} />
                </button>
                <span className="px-6 py-3 text-center min-w-15 font-medium text-gray-700">
                  {quantity}
                </span>
                <button
                  onClick={increaseQty}
                  className="px-4 py-3 bg-gray-200 transition text-gray-600 rounded-full"
                >
                  <Plus size={18} className="" />
                </button>
              </div>

              <button
                // onClick={handleAddToCart}
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
                    isFavorite ? "fill-red-500 text-red-500" : "text-green-600"
                  }
                />
              </button>
            </div>
            {/* Category & Tags */}
            <div className="pt-6 border-t border-gray-200 space-y-3">
              {/* Category */}
              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-sm font-medium text-gray-800">
                  Category:
                </span>
                <a href="#" className="text-sm text-gray-600 hover:underline">
                  Vegetables
                </a>
              </div>

              {/* Tags */}
              <div className="flex gap-2 items-start flex-wrap">
                <span className="text-sm font-medium text-gray-800">Tag:</span>
                <div className="flex flex-wrap gap-1 items-center">
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Vegetables
                  </a>
                  <span className="text-sm text-gray-400">•</span>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Healthy
                  </a>
                  <span className="text-sm text-gray-400">•</span>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Chinese
                  </a>
                  <span className="text-sm text-gray-400">•</span>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Cabbage
                  </a>
                  <span className="text-sm text-gray-400">•</span>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Green Cabbage
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      {/* Description Tabs Section */}
      <DescriptionTabs product={product} />

      <RelatedCard product={product} />
    </div>
  );
};

export default ProductDetails;
