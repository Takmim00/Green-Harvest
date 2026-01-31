import { Check, Star } from "lucide-react";
import React, { useState } from "react";
import { GiLindenLeaf } from "react-icons/gi";
import { SlTag } from "react-icons/sl";

const tabs = [
  { id: "descriptions", label: "Descriptions" },
  { id: "additional", label: "Additional Information" },
  { id: "feedback", label: "Customer Feedback" },
];
const Review = [
  {
    id: 1,
    name: "Kristin Watson",
    avatar: "https://i.pravatar.cc/150?u=kristin",
    rating: 5,
    date: "2 min ago",
    comment: "Duis at ullamcorper nulla, eu dictum eros.",
  },
  {
    id: 2,
    name: "Jane Cooper",
    avatar: "", // Test empty avatar for fallback
    rating: 4,
    date: "30 Apr, 2021",
    comment:
      'Keep the soil evenly moist for the healthiest growth. If the sun gets too hot, Chinese cabbage tends to "bolt" or go to seed; in long periods of heat, some kind of shade may be helpful. Watch out for snails, as they will harm the plants.',
  },
  {
    id: 3,
    name: "Jacob Jones",
    avatar: "https://i.pravatar.cc/150?u=jacob",
    rating: 5,
    date: "2 min ago",
    comment:
      "Vivamus eget euismod magna. Nam sed lacinia nibh, et lacinia lacus.",
  },
  {
    id: 4,
    name: "Ralph Edwards",
    avatar: "https://i.pravatar.cc/150?u=ralph",
    rating: 5,
    date: "2 min ago",
    comment:
      "200+ Canton Pak Choi Bok Choy Chinese Cabbage Seeds Heirloom Non-GMO Productive Brassica rapa VAR. chinensis, a.k.a. Canton's Choice, Bok Choi, from USA",
  },
];
const DescriptionTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("descriptions");
  const [loading, setLoading] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(2);
  const handleLoadMore = () => {
    setLoading(true);

    // simulate API call with timeout
    setTimeout(() => {
      setVisibleReviews((prev) => prev + 2); // পরবর্তী 2টা review দেখাবে
      setLoading(false);
    }, 1000); // 1 second loading simulation
  };

  return (
    <div className="singleProductInfo mt-6 sm:mt-8 md:mt-10 lg:mt-14">
      <div className="border-b border-gray-200 overflow-x-auto">
        <div className="button_grp flex sm:grid sm:grid-cols-3 w-full min-w-max sm:min-w-0 mx-auto items-center justify-start sm:justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 sm:pb-3 md:pb-4 px-3 sm:px-4 md:px-6 font-medium transition-colors text-[11px] sm:text-xs md:text-sm lg:text-base whitespace-nowrap ${
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
                <p className="text-gray-600 text-[11px] sm:text-xs md:text-sm lg:text-base leading-relaxed">
                  Sed commodo odium sit et porta tursi purus lorem tristis. Dui
                  curabitur semper justo eros vel odio vivamusse pellentesque
                  semper ornare fringilla. Nulla nisl volutpat vel faucibus id.
                  Sed vitae lacus nam lorem leo risus eget a eleifend. Fusce nec
                  ornare nisi feugiat nec in condimentum nisl cras pellentesque
                  tristique. Integer a lectus finibus mauris diam semper
                  scelerique sit dignissim.
                </p>
                <p className="text-gray-600 text-[11px] sm:text-xs md:text-sm lg:text-base leading-relaxed">
                  Pellentesque felis eros ac leo euisque consequat id felis
                  mollis. Sed id fringilla nibh. Suspisse fringilla mi et velit
                  fringilla pellentesque diam euisque nulla eros. Fusce eleifend
                  congue semper semper dumpere felis pellentesque in molestie
                  vel in nibh augue semper venenatis urna turpis ridiculus
                  imperdiet nec tincidunt vel.
                </p>

                {/* Checkmark List */}
                <ul className="space-y-1.5 sm:space-y-2 pt-1 sm:pt-2">
                  {[
                    "100 g of fresh leaves provides",
                    "Adequate source of antioxidants aleriatim",
                    "Unique low-calorie weight loss features",
                    "Fresh complete color and bright potassium",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start sm:items-center gap-1.5 sm:gap-2 text-gray-700 text-[11px] sm:text-xs md:text-sm p-0.5 sm:p-1"
                    >
                      <Check
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white bg-green-600 rounded-full shrink-0 p-0.5 mt-0.5 sm:mt-0"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-700">
                  Cras et diam maximus, accumsan sapien et, sollicitudin velit.
                  Nulla blandit eros non turpis lobortis iaculis at ut
                  massa.{" "}
                </p>
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
                    {product?.dimensions?.width}
                  </span>
                </li>

                <li className="flex items-start gap-2 sm:gap-4 md:gap-6">
                  <span className="font-medium text-gray-800 min-w-16 sm:min-w-20 md:min-w-30 text-[11px] sm:text-xs md:text-sm lg:text-base">
                    color:
                  </span>
                  <span className="text-gray-500 text-[11px] sm:text-xs md:text-sm lg:text-base">7–10 days</span>
                </li>

                <li className="flex items-start gap-2 sm:gap-4 md:gap-6">
                  <span className="font-medium text-gray-800 min-w-16 sm:min-w-20 md:min-w-30 text-[11px] sm:text-xs md:text-sm lg:text-base">
                    Type:
                  </span>
                  <span className="text-gray-500 text-[11px] sm:text-xs md:text-sm lg:text-base">
                    Keep refrigerated
                  </span>
                </li>

                <li className="flex items-start gap-2 sm:gap-4 md:gap-6">
                  <span className="font-medium text-gray-800 min-w-16 sm:min-w-20 md:min-w-30 text-[11px] sm:text-xs md:text-sm lg:text-base">
                    Stock Status:
                  </span>
                  <span className="text-gray-500 text-[11px] sm:text-xs md:text-sm lg:text-base">
                    {product?.availabilityStatus}
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-4 md:gap-6">
                  <span className="font-medium text-gray-800 min-w-16 sm:min-w-20 md:min-w-30 text-[11px] sm:text-xs md:text-sm lg:text-base">
                    Tags:
                  </span>
                  <span className="text-gray-500 text-[11px] sm:text-xs md:text-sm lg:text-base flex-1">
                    {product?.tags?.[0]} ,{" "}
                    <span className="text-black underline">
                      {product?.tags?.[1]}{" "}
                    </span>
                    , Cabbage, Green, Cabbage,
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

      {activeTab === "feedback" && (
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {/* Left Column - Reviews */}
            <div className="col-span-1 lg:col-span-7">
              {product?.reviews?.slice(0, visibleReviews).map((review, index) => (
                <div
                  key={index}
                  className="py-3 sm:py-4 md:py-6 border-b border-gray-200 last:border-0"
                >
                  <div className="flex items-start justify-between gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <img
                        src={
                          review.avatar ||
                          `https://ui-avatars.com/api/?name=${review?.name || "/placeholder.svg"}`
                        }
                        alt={review?.name || "Reviewer"}
                        className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full object-cover shrink-0"
                      />

                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 text-[11px] sm:text-xs md:text-sm truncate">
                          {review?.reviewerName}
                        </h4>

                        <div className="flex gap-0.5 mt-0.5 sm:mt-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 ${
                                i < review?.rating
                                  ? "text-orange-400"
                                  : "text-gray-200"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>

                    <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-400 shrink-0">{review?.date}</span>
                  </div>

                  <p className="mt-2 sm:mt-3 md:mt-4 text-[11px] sm:text-xs md:text-sm text-gray-500 leading-relaxed">{review?.comment}</p>
                </div>
              ))}

              <div className="mt-4 sm:mt-6 md:mt-8 flex justify-center md:justify-start">
                <button
                  onClick={handleLoadMore}
                  disabled={loading || visibleReviews >= Review.length}
                  className={`px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 font-semibold text-[11px] sm:text-xs md:text-sm rounded-full transition-all duration-200 ${
                    loading
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-[#EDFBEA] text-[#00B207] hover:bg-[#00B207] hover:text-white"
                  }`}
                >
                  {loading
                    ? "Loading..."
                    : visibleReviews >= Review.length
                      ? "No More Reviews"
                      : "Load More"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionTabs;
