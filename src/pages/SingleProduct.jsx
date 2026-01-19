import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { FaStar } from "react-icons/fa";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* product info */}
      <div className="grid lg:grid-cols-2 mt-6">
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
              {product?.images.map((thumb) => (
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
              {product?.images.map((main) => (
                <SwiperSlide key={main}>
                  <img className="max-w-full lg:max-w-125" src={main} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="productInfo">
          <h2>{product?.title}</h2>
          <div className="rating flex text-xs text-gray-400">
            {[...Array(Math.round(product?.rating || 0))].map((_, i) => (
              <span key={i} className="text-orange-500">
                <FaStar />
              </span>
            ))}
            {[...Array(5 - Math.round(product?.rating || 0))].map((_, i) => (
              <span key={i}>
                <FaStar />
              </span>
            ))}
            <span>{product?.reviews.length} Review</span>
          </div>
          <p>SKU: {product?.sku}</p>

          <p className="text-zinc-900 text-base font-medim leading-normal">
            $
            {(
              product?.price -
              Math.round(product?.price * (product?.discountPercentage / 100))
            ).toFixed(2)}
            <del className="text-neutral-400 text-base">${product?.price}</del>
          </p>
          <p>{product?.discountPercentage}% off</p>
          <p>Brand: {product?.brand}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
