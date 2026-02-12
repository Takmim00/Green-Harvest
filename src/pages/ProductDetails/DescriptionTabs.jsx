import axios from "axios";
import { Check } from "lucide-react";
import { useState } from "react";
import { GiLindenLeaf } from "react-icons/gi";
import { SlTag } from "react-icons/sl";
import { toast } from "react-toastify";
import ProductReviews from "./ProductReviews";
const tabs = [
  { id: "descriptions", label: "Descriptions" },
  { id: "additional", label: "Additional Information" },
  { id: "feedback", label: "Customer Feedback" },
];
// const Review = [
//   {
//     id: 1,
//     name: "Kristin Watson",
//     avatar: "https://i.pravatar.cc/150?u=kristin",
//     rating: 5,
//     date: "2 min ago",
//     comment: "Duis at ullamcorper nulla, eu dictum eros.",
//   },
//   {
//     id: 2,
//     name: "Jane Cooper",
//     avatar: "", // Test empty avatar for fallback
//     rating: 4,
//     date: "30 Apr, 2021",
//     comment:
//       'Keep the soil evenly moist for the healthiest growth. If the sun gets too hot, Chinese cabbage tends to "bolt" or go to seed; in long periods of heat, some kind of shade may be helpful. Watch out for snails, as they will harm the plants.',
//   },
//   {
//     id: 3,
//     name: "Jacob Jones",
//     avatar: "https://i.pravatar.cc/150?u=jacob",
//     rating: 5,
//     date: "2 min ago",
//     comment:
//       "Vivamus eget euismod magna. Nam sed lacinia nibh, et lacinia lacus.",
//   },
//   {
//     id: 4,
//     name: "Ralph Edwards",
//     avatar: "https://i.pravatar.cc/150?u=ralph",
//     rating: 5,
//     date: "2 min ago",
//     comment:
//       "200+ Canton Pak Choi Bok Choy Chinese Cabbage Seeds Heirloom Non-GMO Productive Brassica rapa VAR. chinensis, a.k.a. Canton's Choice, Bok Choi, from USA",
//   },
// ];
const DescriptionTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("descriptions");
  const [loading, setLoading] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(2);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reviews, setReviews] = useState(product?.reviews || []);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleSubmitReview = async () => {
    if (!rating || !comment.trim()) {
      toast.error("Please give rating and review");
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("access");

      const res = await axios.post(
        `https://green-harvest-backend-seven.vercel.app/api/products/${product.id}/reviews/create/`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res.data);

      toast.success("Review added successfully");

      // add new review to list
      setReviews((prev) => [res.data, ...prev]);

      // hide form
      setReviewSubmitted(true);
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error("Failed to add review");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoadMore = () => {
    setLoading(true);

    // simulate API delay (UX feel)
    setTimeout(() => {
      setVisibleReviews((prev) => prev + 6);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="singleProductInfo mt-6 sm:mt-8 md:mt-10 lg:mt-14">
      <div className="border-b border-gray-200 overflow-x-auto">
        <div className="button_grp flex sm:grid sm:grid-cols-3 w-full min-w-max sm:min-w-0 mx-auto items-center justify-start sm:justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 sm:pb-3 md:pb-4 px-3 sm:px-4 md:px-6 font-medium transition-colors text-[11px] sm:text-xs md:text-sm lg:text-base whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "border-b-2 border-emerald-500 text-emerald-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Description Content */}
      {activeTab === "descriptions" && (
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {/* Left Column - Description */}
            <div className="col-span-1 lg:col-span-7">
              <div className="space-y-3 sm:space-y-4">
                {(() => {
                  const description = product?.description || "";

                  // split by * and trim
                  const parts = description
                    .split("*")
                    .map((p) => p.trim())
                    .filter(Boolean);

                  // first part = normal paragraph text
                  const mainText = parts[0];

                  // rest = bullet points
                  const bullets = parts.slice(1);

                  return (
                    <>
                      {/* Main description paragraph */}
                      <p className="text-gray-600 text-[11px] sm:text-xs md:text-sm lg:text-base leading-relaxed">
                        {mainText ||
                          "No description available for this product."}
                      </p>

                      {/* Dynamic Checkmark List */}
                      {bullets.length > 0 && (
                        <ul className="space-y-1.5 sm:space-y-2 pt-1 sm:pt-2">
                          {bullets.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start sm:items-center gap-1.5 sm:gap-2 text-gray-700 text-[11px] sm:text-xs md:text-sm p-0.5 sm:p-1"
                            >
                              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white bg-green-600 rounded-full shrink-0 p-0.5 mt-0.5 sm:mt-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Right Column - Customer Image & Discount Cards */}
            <div className="col-span-1 lg:col-span-5 flex flex-col gap-3 sm:gap-4 md:gap-6">
              {/* Customer Image */}
              <div className="bg-gray-100 rounded-lg overflow-hidden h-32 sm:h-40 md:h-52 lg:h-64 flex items-center justify-center">
                <iframe
                  src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&loop=1"
                  title="Product video"
                  className="w-full h-full object-cover"
                ></iframe>
              </div>

              {/* Discount Cards */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 border border-gray-200 rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-5 bg-white">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 p-0.5 sm:p-1">
                  <div className="shrink-0">
                    <SlTag className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-500" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 leading-tight truncate">
                      60% Discount
                    </h3>
                    <p className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 mt-0.5 truncate">
                      Save your 64% money with us
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 p-0.5 sm:p-1">
                  <div className="shrink-0">
                    <GiLindenLeaf className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-500" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 leading-tight truncate">
                      100% Organic
                    </h3>
                    <p className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 mt-0.5 truncate">
                      100% Organic Vegetables
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "additional" && (
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {/* Left Column - Description */}
            <div className="col-span-1 lg:col-span-7">
              <ul className="space-y-2 sm:space-y-3 md:space-y-4">
                <li className="flex items-start gap-2 sm:gap-4 md:gap-6">
                  <span className="font-medium text-gray-800 min-w-16 sm:min-w-20 md:min-w-30 text-[11px] sm:text-xs md:text-sm lg:text-base">
                    Weight:
                  </span>
                  <span className="text-gray-500 text-[11px] sm:text-xs md:text-sm lg:text-base">
                    {product?.additional_info?.weight || "N/A"}
                  </span>
                </li>

                <li className="flex items-start gap-2 sm:gap-4 md:gap-6">
                  <span className="font-medium text-gray-800 min-w-16 sm:min-w-20 md:min-w-30 text-[11px] sm:text-xs md:text-sm lg:text-base">
                    Color:
                  </span>
                  <span className="text-gray-500 text-[11px] sm:text-xs md:text-sm lg:text-base">
                    {product?.additional_info?.color || "N/A"}
                  </span>
                </li>

                <li className="flex items-start gap-2 sm:gap-4 md:gap-6">
                  <span className="font-medium text-gray-800 min-w-16 sm:min-w-20 md:min-w-30 text-[11px] sm:text-xs md:text-sm lg:text-base">
                    Type:
                  </span>
                  <span className="text-gray-500 text-[11px] sm:text-xs md:text-sm lg:text-base">
                    {product?.additional_info?.type || "N/A"}
                  </span>
                </li>

                <li className="flex items-start gap-2 sm:gap-4 md:gap-6">
                  <span className="font-medium text-gray-800 min-w-16 sm:min-w-20 md:min-w-30 text-[11px] sm:text-xs md:text-sm lg:text-base">
                    Stock Count:
                  </span>
                  <span className="text-gray-500 text-[11px] sm:text-xs md:text-sm lg:text-base">
                    {product?.additional_info?.stock_count ?? "N/A"}
                  </span>
                </li>

                <li className="flex items-start gap-2 sm:gap-4 md:gap-6">
                  <span className="font-medium text-gray-800 min-w-16 sm:min-w-20 md:min-w-30 text-[11px] sm:text-xs md:text-sm lg:text-base">
                    Tags:
                  </span>
                  <span className="text-gray-500 text-[11px] sm:text-xs md:text-sm lg:text-base flex-1">
                    {product?.additional_info?.tags?.join(", ") || "N/A"}
                  </span>
                </li>
              </ul>
            </div>

            {/* Right Column - Customer Image & Discount Cards */}
            <div className="col-span-1 lg:col-span-5 flex flex-col gap-3 sm:gap-4 md:gap-6">
              {/* Customer Image */}
              <div className="bg-gray-100 rounded-lg overflow-hidden h-32 sm:h-40 md:h-52 lg:h-64 flex items-center justify-center">
                <iframe
                  src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&loop=1"
                  title="Product video"
                  className="w-full h-full object-cover"
                ></iframe>
              </div>

              {/* Discount Cards */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 border border-gray-200 rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-5 bg-white">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 p-0.5 sm:p-1">
                  <div className="shrink-0">
                    <SlTag className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-500" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 leading-tight truncate">
                      60% Discount
                    </h3>
                    <p className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 mt-0.5 truncate">
                      Save your 64% money with us
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 p-0.5 sm:p-1">
                  <div className="shrink-0">
                    <GiLindenLeaf className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-500" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 leading-tight truncate">
                      100% Organic
                    </h3>
                    <p className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 mt-0.5 truncate">
                      100% Organic Vegetables
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "feedback" && <ProductReviews productId={product.id} />}
    </div>
  );
};

export default DescriptionTabs;
