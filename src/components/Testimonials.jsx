"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
      name: "Robert Fox",
      role: "Customer",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
    {
      id: 2,
      text: "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
      name: "Dianne Russell",
      role: "Customer",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
    {
      id: 3,
      text: "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
      name: "Eleanor Pena",
      role: "Customer",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentSlide((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <section className="relative w-full  bg-[linear-gradient(180deg,#ffffff_0%,#f2f4f3_63%),rgba(32,181,38,0.1)] bg-cover bg-no-repeat py-16"
      style={{ backgroundImage: "url(/TestimonialBG.png)" }}>
      <div className="px-4 ">
        <div className="max-w-11/12 mx-auto">
          {/* Header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-green-500 text-sm font-medium tracking-wider uppercase">
                TESTIMONIAL
              </span>
              <h2 className="text-3xl font-semibold text-gray-900 mt-2">
                What Our Customer Says
              </h2>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm"
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <svg
                    width="36"
                    height="28"
                    viewBox="0 0 36 28"
                    fill="none"
                    className="text-green-100"
                  >
                    <path
                      d="M0 28V17.5C0 12.8333 1.16667 9 3.5 6C5.83333 3 9.33333 0.833333 14 -0.5L15.5 4C12.5 5 10.25 6.41667 8.75 8.25C7.25 10.0833 6.5 12.1667 6.5 14.5H14V28H0ZM22 28V17.5C22 12.8333 23.1667 9 25.5 6C27.8333 3 31.3333 0.833333 36 -0.5L37.5 4C34.5 5 32.25 6.41667 30.75 8.25C29.25 10.0833 28.5 12.1667 28.5 14.5H36V28H22Z"
                      fill="#20B526"
                      fillOpacity="0.2"
                    />
                  </svg>
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {testimonial.text}
                </p>

                {/* Customer Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {testimonial.name}
                      </h4>
                      <span className="text-sm text-gray-400">
                        {testimonial.role}
                      </span>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < testimonial.rating
                            ? "text-orange-400 fill-orange-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
