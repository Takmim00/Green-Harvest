import { ChevronRight, House } from "lucide-react";
import { Link, useLocation } from "react-router";

const routeNames = {
  dashboard: "Dashboard",
  shop: "Shop",
  blog: "Blog",
  about: "About Us",
  contact: "Contact Us",
  wishlist: "Wishlist",
  "shopping-cart": "Shopping Cart",
  settings: "Settings",
  faq: "Faq",
};

export default function Breadcrumb() {
  const location = useLocation();

  if (location.pathname === "/") return null;

  const pathParts = location.pathname.split("/").filter(Boolean);

  return (
    <div
      className="bg-gray-50 py-6 bg-cover"
      style={{ backgroundImage: "url(/Breadcrumbs.png)" }}
    >
      <div className="lg:max-w-7xl max-w-11/12 mx-auto px-4">
        <div className="flex items-center gap-2 text-base text-gray-500">
          {/* Home */}
          <Link to="/" className="hover:text-green-600">
            <House />
          </Link>

          {pathParts.map((part, index) => {
            const path = "/" + pathParts.slice(0, index + 1).join("/");
            const name =
              routeNames[part] || part.charAt(0).toUpperCase() + part.slice(1);

            return (
              <div key={path} className="flex items-center gap-2">
                <ChevronRight size={16} />
                {index === pathParts.length - 1 ? (
                  <span className="text-green-600 font-medium">{name}</span>
                ) : (
                  <Link to={path} className="hover:text-green-600">
                    {name}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
