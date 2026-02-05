import { useEffect, useRef, useState } from "react";

import {
  Apple,
  ArrowRight,
  Carrot,
  ChefHat,
  ChevronDown,
  ChevronRight,
  Coffee,
  Cookie,
  Croissant,
  Heart,
  Leaf,
  Menu,
  Package,
  Phone,
  Search,
  Settings,
  ShoppingCart,
  Sparkles,
  User,
  X,
} from "lucide-react";

import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { useCart } from "../routes/provider/ShoppingProvider";
import { useWishlist } from "../routes/provider/WishlistProvider";

const categories = [
  { name: "Fresh Fruit", slug: "Fresh Fruit", icon: Apple, count: 134 },
  { name: "Vegetables", slug: "Vegetables", icon: Carrot, count: 150 },
  { name: "Cooking", slug: "Cooking", icon: ChefHat, count: 54 },
  { name: "Snacks", slug: "Snacks", icon: Cookie, count: 47 },
  { name: "Beverages", slug: "Beverages", icon: Coffee, count: 43 },
  {
    name: "Beauty & Health",
    slug: "Beauty & Health",
    icon: Sparkles,
    count: 38,
  },
  {
    name: "Bread & Bakery",
    slug: "Bread & Bakery",
    icon: Croissant,
    count: 15,
  },
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
  // Main Navbar States
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartPreviewOpen, setIsCartPreviewOpen] = useState(false);

  // Refs
  const userMenuRef = useRef(null);
  const cartPreviewRef = useRef(null);

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
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target)
      ) {
        setIsCategoriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }

      if (
        cartPreviewRef.current &&
        !cartPreviewRef.current.contains(e.target)
      ) {
        setIsCartPreviewOpen(false);
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
  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <nav className="w-full">
      {/* Top Bar */}
      <div className="bg-gray-800 text-white text-xs py-2.5">
        <div className=" w-11/12 md:max-w-7xl mx-auto  flex justify-between items-center">
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
            <Link to="/signIn" className="hover:text-gray-200 sm:hidden">
              Sign in / Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}

      <div className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="md:max-w-7xl w-11/12 mx-auto  py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="shrink-0 flex items-center gap-2">
              <div className="w-40 h-10  rounded-full flex items-center justify-center">
                {/* <Leaf size={22} className="text-white" /> */}
                <img src="/green12.png" alt=""  />
              </div>
              {/* <div>
                <div className="text-xl font-bold text-green-700">GreenHarvest</div>
                <div className="text-[10px] text-gray-950 font-medium -mt-1">
                  ORGANIC GROCERY
                </div>
              </div> */}
            </Link>

            {/* Search Bar (No Category) */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-xl"
            >
              <div
                className={`flex w-full rounded-full border-2 transition-all ${
                  isSearchFocused
                    ? "border-green-500 shadow-lg shadow-green-100"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search for products, brands and more..."
                  className="flex-1 px-5 py-2.5 focus:outline-none text-sm rounded-l-full"
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2.5 rounded-r-full hover:bg-green-700 transition-colors"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>

            {/* Right Section */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* User Account */}
              <div className="hidden md:block relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
                >
                  <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                    <User size={18} className="text-gray-600" />
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-[10px] text-gray-500">
                      Hello, Sign in
                    </div>
                    <div className="text-sm font-medium text-gray-900 flex items-center gap-1">
                      Account
                      <ChevronDown
                        size={12}
                        className={`transition-transform ${
                          isUserMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                    <Link
                      to="/signIn"
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50"
                    >
                      <User size={16} />
                      <span className="text-sm">Sign In</span>
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50"
                    >
                      <ArrowRight size={16} />
                      <span className="text-sm">Create Account</span>
                    </Link>
                    <div className="border-t my-2" />
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50"
                    >
                      <Package size={16} />
                      <span className="text-sm">My Orders</span>
                    </Link>
                    <Link
                      to="/dashboard/settings"
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50"
                    >
                      <Settings size={16} />
                      <span className="text-sm">Settings</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 hover:bg-gray-100 rounded-lg"
              >
                <Heart size={22} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
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

              {/* Mobile Menu */}
              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="md:hidden mt-3">
            <div className="flex w-full rounded-full border border-gray-200 overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 pl-4 min-w-0 py-2.5 focus:outline-none text-sm"
              />
              <button className="bg-green-600 text-white px-4">
                <Search size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="bg-gray-50 sticky top-16 md:top-24 z-30">
        <div className="w-11/12 md:max-w-7xl mx-auto ">
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
                  className="flex items-center gap-2 bg-green-600 text-white px-5 py-3.5 font-medium hover:bg-green-700 transition-colors"
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                >
                  <Menu size={18} />
                  <span>All Categories</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${isCategoriesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Desktop Dropdown */}
                <div
                  className={`absolute top-full left-0 w-64 bg-white rounded-b-lg shadow-xl border border-gray-100 z-50 overflow-hidden transition-all duration-200 origin-top ${
                    isCategoriesOpen
                      ? "opacity-100 scale-y-100 translate-y-0"
                      : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className=" py-3 border-r border-gray-100">
                    <div className="px-4 pb-2 mb-2 border-b border-gray-100">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Shop by Category
                      </span>
                    </div>
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      const isActive = currentCategory === category.slug;
                      return (
                        <button
                          key={category.slug}
                          onClick={() => handleCategoryClick(category.slug)}
                          className={`w-full px-4 py-2.5 flex items-center gap-3 text-left transition-all group ${
                            isActive
                              ? "bg-green-50 text-green-700"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span
                            className={`p-2 rounded-lg ${category.bgColor}`}
                          >
                            <IconComponent
                              size={16}
                              className={category.color}
                            />
                          </span>
                          <span className="flex-1 font-medium text-sm">
                            {category.name}
                          </span>
                          <ChevronRight
                            size={14}
                            className="text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all"
                          />
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
            <div className="md:hidden fixed inset-0 top-35 bg-white z-40 overflow-y-auto">
              <div className="p-4">
                {/* Mobile Categories Accordion */}
                <div className="py-4">
                  <button
                    onClick={() =>
                      setIsMobileCategoriesOpen(!isMobileCategoriesOpen)
                    }
                    className="w-full flex items-center justify-between p-4 bg-green-600 text-white rounded-xl font-medium"
                  >
                    <span className="flex items-center gap-2">
                      <Menu size={18} />
                      All Categories
                    </span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${isMobileCategoriesOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isMobileCategoriesOpen
                        ? "max-h-125 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="mt-2 bg-gray-50 rounded-xl overflow-hidden">
                      {categories.map((category) => {
                        const IconComponent = category.icon;
                        const isActive = currentCategory === category.slug;
                        return (
                          <button
                            key={category.slug}
                            onClick={() => handleCategoryClick(category.slug)}
                            className={`w-full px-4 py-3 flex items-center gap-3 text-left border-b border-gray-100 last:border-b-0 ${
                              isActive
                                ? "bg-green-50 text-green-700"
                                : "text-gray-700 hover:bg-green-50"
                            }`}
                          >
                            <span
                              className={`p-2 rounded-lg ${category.bgColor}`}
                            >
                              <IconComponent
                                size={16}
                                className={category.color}
                              />
                            </span>
                            <span className="flex-1 font-medium text-sm">
                              {category.name}
                            </span>
                            <span className="text-xs text-gray-400">
                              {category.count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Mobile Navigation Links */}
                <div className="space-y-1">
                  {[
                    { to: "/", label: "Home" },
                    { to: "/shop", label: "Shop" },
                    { to: "/blog", label: "Blog" },
                    { to: "/about", label: "About Us" },
                    { to: "/contact", label: "Contact" },
                    { to: "/faq", label: "FAQs" },
                  ].map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? "bg-green-50 text-green-600 font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>

                {/* Mobile Account Links */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Account
                  </div>
                  <div className="space-y-1">
                    <Link
                      to="/signIn"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50"
                    >
                      <User size={18} />
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50"
                    >
                      <ArrowRight size={18} />
                      Create Account
                    </Link>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50"
                    >
                      <Package size={18} />
                      My Orders
                    </Link>
                  </div>
                </div>

                {/* Mobile Support */}
                <div className="mt-6 p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <Phone size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">
                        24/7 Customer Support
                      </div>
                      <div className="font-bold text-green-600 text-lg">
                        (319) 555-0114
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
