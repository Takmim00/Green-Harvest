import { ChevronRight, House } from "lucide-react";
import { Link, useLocation } from "react-router";

const routeNames = {
  shop: "Shop",
  blog: "Blog",
  about: "About Us",
  contact: "Contact Us",
  wishlist: "Wishlist",
  shoppingCart: "Cart",
  faq:"Faq"
};

export default function Breadcrumb() {
  const location = useLocation();


  if (location.pathname === "/") return null;

  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentPage =
    routeNames[pathParts[0]] ||
    pathParts[0]?.charAt(0).toUpperCase() + pathParts[0]?.slice(1);

  return (
    <div
      className="bg-gray-50 py-6 bg-cover"
      style={{ backgroundImage: "url(/Breadcrumbs.png)" }}
    >
      <div className="md:max-w-7xl w-11/12 mx-auto px-4">
        <div className="flex items-center gap-2 text-base text-gray-500">
          <Link to="/" className="hover:text-green-600">
             <House />
          </Link>

          <ChevronRight size={16} />

          <span className="text-green-600 font-medium">
            {currentPage}
          </span>
        </div>
      </div>
    </div>
  );
}
