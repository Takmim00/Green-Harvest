import { useState } from "react";
import { ChevronRight, ChevronDown, Sparkles } from "lucide-react";

export default function CategoryMenu({
  categories,
  onCategoryClick,
  isMobile = false,
}) {
  const [active, setActive] = useState(null);
  const [openMobile, setOpenMobile] = useState(null);

  // ================= MOBILE =================
  if (isMobile) {
    return (
      <div className="bg-gray-50 rounded-xl overflow-hidden">
        {categories.map((cat) => {
          const hasChildren = cat.children?.length > 0;
          const isOpen = openMobile === cat.slug;

          return (
            <div key={cat.slug}>
              <button
                onClick={() =>
                  hasChildren
                    ? setOpenMobile(isOpen ? null : cat.slug)
                    : onCategoryClick(cat.slug)
                }
                className="w-full flex justify-between items-center px-5 py-3 bg-white border-b text-sm font-medium hover:bg-gray-50"
              >
                <span>{cat.name}</span>
                {hasChildren && (
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {hasChildren && isOpen && (
                <div className="bg-gray-100">
                  {renderChildren(cat.children, onCategoryClick, 1)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // ================= DESKTOP =================
  return (
    <div className="flex w-[650px] bg-white shadow-xl border rounded-lg overflow-hidden">
      {/* LEFT SIDE */}
      <div className="w-1/2 border-r bg-gray-50">
        {categories.map((cat) => {
          const Icon = cat.icon || Sparkles;
          const isActive = active?.slug === cat.slug;

          return (
            <button
              key={cat.slug}
              onMouseEnter={() => setActive(cat)}
              onClick={() =>
                !cat.children?.length && onCategoryClick(cat.slug)
              }
              className={`w-full flex items-center justify-between px-4 py-3 text-left text-sm transition
              ${
                isActive
                  ? "bg-white text-green-600 font-medium"
                  : "hover:bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={16} />
                <span>{cat.name}</span>
              </div>
              {cat.children?.length > 0 && (
                <ChevronRight size={14} />
              )}
            </button>
          );
        })}
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 p-4">
        {active?.children?.length ? (
          <div className="space-y-4">
            {active.children.map((child) => (
              <div key={child.slug}>
                <button
                  onClick={() => onCategoryClick(child.slug)}
                  className="font-semibold text-sm hover:text-green-600"
                >
                  {child.name}
                </button>

                {/* Third Level */}
                {child.children?.length > 0 && (
                  <div className="ml-4 mt-2 space-y-1">
                    {child.children.map((sub) => (
                      <button
                        key={sub.slug}
                        onClick={() => onCategoryClick(sub.slug)}
                        className="block text-sm text-gray-600 hover:text-green-600"
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-sm">
            Hover a category
          </div>
        )}
      </div>
    </div>
  );
}

// Recursive render for mobile
function renderChildren(children, onCategoryClick, level) {
  return children.map((child) => (
    <div key={child.slug}>
      <button
        onClick={() => onCategoryClick(child.slug)}
        className="block w-full text-left px-6 py-2 text-sm text-gray-700 hover:bg-gray-200"
        style={{ paddingLeft: `${level * 20}px` }}
      >
        {child.name}
      </button>

      {child.children?.length > 0 &&
        renderChildren(child.children, onCategoryClick, level + 1)}
    </div>
  ));
}
