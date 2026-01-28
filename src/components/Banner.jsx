import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const slides = [
  {
    id: 1,
    title: "Fresh & Healthy",
    subtitle: "Organic Food",
    description: "Free shipping on all your order. we deliver, you enjoy",
    discount: "OFF",
    discountPercent: 70,

    image: "/fresh-vegetables-basket.png",
  },
  {
    id: 2,
    title: "Premium Quality",
    subtitle: "Eco Products",
    description: "Sustainable products for a healthier lifestyle and planet",
    discount: "OFF",
    discountPercent: 50,

    image: "/organic-products.png",
  },
  {
    id: 3,
    title: "Farm Fresh",
    subtitle: "Daily Harvest",
    description: "Picked fresh daily from local farms. Quality guaranteed.",
    discount: "OFF",
    discountPercent: 65,

    image: "/farm-fresh-produce.png",
  },
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 5000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section
      className="relative w-full h-[80vh] bg-cover bg-[#EDF2EE]
"
      style={{ backgroundImage: "url(/BG.png)" }}
    >
      <div className="absolute inset-0 bg-white/40"></div>

      <div className="relative lg:max-w-7xl max-w-11/12 mx-auto px-6 h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full  md:gap-20 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <div className="h-65 md:h-105 flex items-center justify-center">
              <img src={slide.image} className="h-full w-auto object-contain" />
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6 min-h-65">
            <span className="font-segoe-script text-green-600 font-semibold">
              WELCOME TO SHOPERY
            </span>

            <div className="space-y-4">
              <h1 className="text-3xl md:text-6xl  font-semibold text-gray-900">
                {slide.title}
              </h1>
              <h2 className="text-3xl md:text-6xl  font-semibold text-gray-900">
                {slide.subtitle}
              </h2>
            </div>

            <p className="text-sm md:text-base text-gray-600 max-w-sm">
              {slide.description}
            </p>

            <Link
              to="/shop"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full inline-flex  justify-center items-center gap-2"
            >
              Shop now <ArrowRight />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute  left-4 md:left-16 top-1/2 -translate-y-1/2 rounded-full border border-[#DAE6DA] p-2 hover:bg-green-600 hover:border-green-600
             transition-all duration-300 group"
      >
        <ArrowLeft size={25} className="text-gray-600 group-hover:text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-16 top-1/2 -translate-y-1/2 rounded-full border border-[#DAE6DA] p-2 hover:bg-green-600 hover:border-green-600
             transition-all duration-300 group"
      >
        <ArrowRight
          size={25}
          className="text-gray-600 group-hover:text-white"
        />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-green-600 w-8" : "bg-gray-400 w-2"
            }`}
          />
        ))}
      </div>
      {/* Bottom Leaf Image */}
      <img
        src="/Top.png"
        alt="leaf decoration"
        className="
    absolute
    -translate-x-1/2
   -bottom-15
   right-0
    pointer-events-none
    select-none
  "
      />
    </section>
  );
}
