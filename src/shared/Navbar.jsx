import { useEffect, useState } from "react";

import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router";
import { useWishlist } from "../routes/provider/WishlistProvider";
import { useCart } from "../routes/provider/ShoppingProvider";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { wishlist } = useWishlist();
  const { cart, getCartTotal, getCartCount } = useCart();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="w-full">
      {/* Top Bar */}
      <div className="bg-gray-800 text-white text-xs py-2.5">
        <div className="lg:max-w-7xl max-w-11/12 md:max-w-7xl mx-auto  flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">
              📍 Store location: Lincoln: 344, Illinois, Chicago, USA
            </span>
          </div>
          <div className="flex items-center gap-4">
            <select className="bg-transparent cursor-pointer hover:text-gray-200">
              <option className="bg-gray-800">Eng</option>
              <option className="bg-gray-800">Esp</option>
            </select>
            <select className="bg-transparent cursor-pointer hover:text-gray-200">
              <option className="bg-gray-800">USD</option>
              <option className="bg-gray-800">EUR</option>
            </select>
            <Link to="/signIn" className="hover:text-gray-200">
              Sign in / Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="lg:max-w-7xl max-w-11/12 md:max-w-7xl mx-auto py-0 md:py-4">
          <div className="flex items-center justify-between gap-4 ">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <div className="md:text-2xl font-bold text-green-600 flex items-center gap-2">
                <span className="text-green-500">🍃</span> Ecobazar
              </div>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 md:max-w-md mx-4">
              <div className="flex w-full">
                <input
                  type="text"
                  placeholder="Search"
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="bg-green-600 text-white px-6 py-2.5 rounded-r-lg hover:bg-green-700">
                  <Search size={18} />
                </button>
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                to="/wishlist"
                className="p-2 hover:bg-gray-100 rounded-lg relative"
              >
                <Heart size={20} className="text-gray-700" />

                {/* 🔴 Badge */}
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link
                to="/shoppingCart"
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg relative"
              >
                <ShoppingCart size={20} className="text-gray-700" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#00B207] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {getCartCount()}
                  </span>
                )}
                <span className="text-sm font-semibold text-gray-700 hidden sm:inline">
                  ${getCartTotal().toFixed(2)}
                </span>
              </Link>
              <button
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden w-full my-1 px-2">
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Search"
                className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-green-600 text-white px-4 py-2 rounded-r-lg">
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="bg-gray-50 sticky top-16 md:top-24 z-30">
        <div className="lg:max-w-7xl max-w-11/12 md:max-w-7xl mx-auto ">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-between">
            {/* Left Side: Categories + Menu */}
            <div className="flex items-center">
              {/* Categories */}
              <div className="relative group">
                <button className="bg-green-600 text-white px-4 py-3 flex items-center gap-2 hover:bg-green-700">
                  <span>☰</span>
                  All Categories
                  <ChevronDown size={16} />
                </button>
              </div>

              {/* Menu */}
              <div className="flex items-center">
                {/* Home */}
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `px-4 py-3 transition
                          ${
                            isActive
                              ? "bg-green-50 text-green-600 font-semibold "
                              : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                          }`
                  }
                >
                  Home
                </NavLink>

                {/* Shop */}
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    `px-4 py-3 flex items-center gap-1 transition
                        ${
                          isActive
                            ? "bg-green-50 text-green-600 font-semibold "
                            : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                        }`
                  }
                >
                  Shop <ChevronDown size={16} />
                </NavLink>

                {/* Blog */}
                <NavLink
                  to="/blog"
                  className={({ isActive }) =>
                    `px-4 py-3 flex items-center gap-1 transition
                    ${
                      isActive
                        ? "bg-green-50 text-green-600 font-semibold "
                        : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                    }`
                  }
                >
                  Blog <ChevronDown size={16} />
                </NavLink>

                {/* About */}
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `px-4 py-3 transition
                      ${
                        isActive
                          ? "bg-green-50 text-green-600 font-semibold "
                          : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                      }`
                  }
                >
                  About Us
                </NavLink>

                {/* Contact */}
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `px-4 py-3 transition
                      ${
                        isActive
                          ? "bg-green-50 text-green-600 font-semibold "
                          : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                      }`
                  }
                >
                  Contact Us
                </NavLink>
              </div>
            </div>

            {/* Right Side: Contact Number */}
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <span>📞</span>
              <span className="text-sm">(319) 555-0114</span>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 flex flex-col gap-2">
              <button className="bg-green-600 text-white px-4 py-2 rounded">
                ☰ All Categories
              </button>

              {[
                { to: "/", label: "Home" },
                { to: "/shop", label: "Shop" },
                { to: "/blog", label: "Blog" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact Us" },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `px-4 py-3 ${
                      isActive
                        ? "bg-green-50 text-green-600 font-semibold"
                        : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
