import { Home, ChevronRight } from "lucide-react";
import React from "react";
import BreadcrumbsPng from "../../../public/Breadcrumbs.png";
const Breadcrumbs = () => {
  return (
    <div className="">
      <div className="relative h-[120px] overflow-hidden flex items-center">
        {/* Background Texture & Images */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${BreadcrumbsPng})`,
          }}
        ></div>

        <div className="mx-auto w-full px-4 md:px-10 relative z-20">
          <nav className="flex items-center gap-2 text-[14px] font-medium">
            {/* Home Icon */}
            <a
              href="/"
              className="text-[#999999] hover:text-green-500 transition-colors"
            >
              <Home size={20} strokeWidth={1.5} />
            </a>

            <span className="text-[#999999] mx-1">
              <ChevronRight size={14} />
            </span>

            {/* Category */}
            <a
              href="#"
              className="text-[#999999] hover:text-green-500 transition-colors"
            >
              Category
            </a>

            <span className="text-[#999999] mx-1">
              <ChevronRight size={14} />
            </span>

            {/* Sub-category */}
            <a
              href="#"
              className="text-[#999999] hover:text-green-500 transition-colors"
            >
              Vegetables
            </a>

            <span className="text-[#999999] mx-1">
              <ChevronRight size={14} />
            </span>

            {/* Current Page */}
            <a
              href="#"
              className="text-[#999999] hover:text-green-500 transition-colors"
            >
              Chinese Cabbage
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
