import { useEffect, useState, useRef } from "react";

import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  X,
  Apple,
  Carrot,
  ChefHat,
  Cookie,
  Coffee,
  Sparkles,
  Croissant,
} from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { useWishlist } from "../routes/provider/WishlistProvider";
import { useCart } from "../routes/provider/ShoppingProvider";

const categories = [
  { name: "Fresh Fruit", slug: "Fresh Fruit", icon: Apple, count: 134 },
  { name: "Vegetables", slug: "Vegetables", icon: Carrot, count: 150 },
  { name: "Cooking", slug: "Cooking", icon: ChefHat, count: 54 },
  { name: "Snacks", slug: "Snacks", icon: Cookie, count: 47 },
  { name: "Beverages", slug: "Beverages", icon: Coffee, count: 43 },
  { name: "Beauty & Health", slug: "Beauty & Health", icon: Sparkles, count: 38 },
  { name: "Bread & Bakery", slug: "Bread & Bakery", icon: Croissant, count: 15 },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const categoriesRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { wishlist } = useWishlist();
  const { cart, getCartTotal, getCartCount } = useCart();

  // Get current category from URL
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get("category");

  useEffect(() => {
    setIsMenuOpen(false);
    setIsMobileCategoriesOpen(false);
  }, [location.pathname, location.search]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setIsCategoriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (categorySlug) => {
    navigate(`/shop?category=${encodeURIComponent(categorySlug)}`);
    setIsCategoriesOpen(false);
    setIsMobileCategoriesOpen(false);
    setIsMenuOpen(false);
  };

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
              {/* Categories Dropdown */}
              <div 
                className="relative" 
                ref={categoriesRef}
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                <button 
                  className="bg-green-600 text-white px-4 py-3 flex items-center gap-2 hover:bg-green-700 transition-colors"
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                >
                  <span>☰</span>
                  All Categories
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {/* Desktop Dropdown */}
                <div 
                  className={`absolute top-full left-0 w-64 bg-white rounded-b-lg shadow-xl border border-gray-100 z-50 overflow-hidden transition-all duration-200 origin-top ${
                    isCategoriesOpen 
                      ? 'opacity-100 scale-y-100 translate-y-0' 
                      : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="py-2">
                    {categories.map((category, index) => {
                      const IconComponent = category.icon;
                      const isActive = currentCategory === category.slug;
                      return (
                        <button
                          key={category.slug}
                          onClick={() => handleCategoryClick(category.slug)}
                          className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-all duration-150 group/item ${
                            isActive 
                              ? 'bg-green-50 text-green-700 border-l-4 border-green-600' 
                              : 'text-gray-700 hover:bg-green-50 hover:text-green-600 border-l-4 border-transparent hover:border-green-400'
                          }`}
                          style={{ animationDelay: `${index * 30}ms` }}
                        >
                          <span className={`p-1.5 rounded-lg transition-colors ${
                            isActive ? 'bg-green-100' : 'bg-gray-100 group-hover/item:bg-green-100'
                          }`}>
                            <IconComponent size={18} className={isActive ? 'text-green-600' : 'text-gray-500 group-hover/item:text-green-600'} />
                          </span>
                          <span className="flex-1 font-medium text-sm">{category.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            isActive ? 'bg-green-200 text-green-800' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {category.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="border-t border-gray-100 p-3">
                    <Link 
                      to="/shop" 
                      className="block w-full text-center text-sm text-green-600 font-medium hover:text-green-700 transition-colors"
                    >
                      View All Products →
                    </Link>
                  </div>
                </div>
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
                  Shop 
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
                  Blog 
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
                {/* Faq */}
                <NavLink
                  to="/faq"
                  className={({ isActive }) =>
                    `px-4 py-3 transition
                      ${
                        isActive
                          ? "bg-green-50 text-green-600 font-semibold "
                          : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                      }`
                  }
                >
                  Faqs
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
              {/* Mobile Categories Accordion */}
              <div className="rounded-lg overflow-hidden">
                <button 
                  onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                  className="w-full bg-green-600 text-white px-4 py-3 flex items-center justify-between rounded-lg"
                >
                  <span className="flex items-center gap-2">
                    <span>☰</span>
                    All Categories
                  </span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform duration-200 ${isMobileCategoriesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {/* Mobile Categories List */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isMobileCategoriesOpen ? 'max-h-125 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="bg-gray-50 rounded-b-lg border border-t-0 border-gray-200">
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      const isActive = currentCategory === category.slug;
                      return (
                        <button
                          key={category.slug}
                          onClick={() => handleCategoryClick(category.slug)}
                          className={`w-full px-4 py-3 flex items-center gap-3 text-left border-b border-gray-100 last:border-b-0 transition-colors ${
                            isActive 
                              ? 'bg-green-50 text-green-700' 
                              : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                          }`}
                        >
                          <span className={`p-1.5 rounded-lg ${isActive ? 'bg-green-100' : 'bg-white'}`}>
                            <IconComponent size={16} className={isActive ? 'text-green-600' : 'text-gray-500'} />
                          </span>
                          <span className="flex-1 text-sm font-medium">{category.name}</span>
                          {isActive && (
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          )}
                        </button>
                      );
                    })}
                    <Link 
                      to="/shop" 
                      className="block w-full px-4 py-3 text-center text-sm text-green-600 font-medium hover:bg-green-50 transition-colors"
                    >
                      View All Products →
                    </Link>
                  </div>
                </div>
              </div>

              {[
                { to: "/", label: "Home" },
                { to: "/shop", label: "Shop" },
                { to: "/blog", label: "Blog" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact Us" },
                { to: "/faq", label: "Faqs" },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg ${
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
