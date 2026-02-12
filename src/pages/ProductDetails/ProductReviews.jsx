import { Edit3, MoreVertical, Star, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const API_BASE = "https://green-harvest-backend-seven.vercel.app/api";

export default function ProductReviews({ productId }) {
  const token = localStorage.getItem("access");
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editId, setEditId] = useState(null);

  const [btnLoading, setBtnLoading] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(6);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  /* ---------------- FETCH REVIEWS ---------------- */
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/products/${productId}/reviews/`)
      .then((res) => res.json())
      .then((data) => {
        // Make sure data.results is array
        setReviews(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [productId]);
  const alreadyReviewed =
    token &&
    currentUser &&
    reviews.some((r) => r.user?.email === currentUser?.email);

  console.log(reviews);

  /* ---------------- CREATE / UPDATE ---------------- */
  const handleSubmit = async () => {
    if (!comment.trim()) return;
    setBtnLoading(true);

    const url = editId
      ? `${API_BASE}/products/${productId}/reviews/${editId}/`
      : `${API_BASE}/products/${productId}/reviews/create/`;
    const method = editId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, comment }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.detail || "Something went wrong");
        setBtnLoading(false);
        return;
      }

      // refetch reviews after submit
      if (editId) {
        toast.success("Review updated successfully");
      } else {
        toast.success("Review added successfully");
      }

      // refetch full review list
      const refreshed = await fetch(
        `${API_BASE}/products/${productId}/reviews/`,
      );
      const refreshedData = await refreshed.json();
      setReviews(refreshedData);

      setRating(5);
      setComment("");
      setEditId(null);
      setShowForm(false);
    } catch (err) {
      toast.error("Network error");
    } finally {
      setBtnLoading(false);
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${API_BASE}/products/${productId}/reviews/${id}/`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.ok) {
        toast.success("Review deleted");

        const refreshed = await fetch(
          `${API_BASE}/products/${productId}/reviews/`,
        );
        const refreshedData = await refreshed.json();
        setReviews(refreshedData);

        setShowForm(true);
      }
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  /* ---------------- LOAD MORE ---------------- */
  const handleLoadMore = () => {
    setLoadMoreLoading(true);
    setTimeout(() => {
      setVisibleReviews((prev) => prev + 10);
      setLoadMoreLoading(false);
    }, 700); // smooth UX
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin mx-auto"></div>
      </div>
    );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h3 className="text-2xl font-semibold py-4">Customer Reviews</h3>

      {/* ---------------- REVIEW FORM ---------------- */}
     
      {!token ? (
         <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800">Please login to write a review.</p>
        </div>
      ) : showForm && (!alreadyReviewed || editId) ? (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-4">
            {editId ? "Edit Your Review" : "Write a Review"}
          </h4>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setRating(s)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={28}
                      className={`${
                        s <= rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill={s <= rating ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                placeholder="Share your experience with this product..."
                rows={4}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSubmit}
                disabled={btnLoading || !comment.trim()}
                className="flex-1 bg-green-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {btnLoading
                  ? "Please wait..."
                  : editId
                    ? "Update Review"
                    : "Submit Review"}
              </button>
              {editId && (
                <button
                  onClick={() => {
                    setEditId(null);
                    setRating(5);
                    setComment("");
                  }}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      ) : alreadyReviewed && !editId ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            ✓ You have already submitted a review.
          </p>
        </div>
      ) : null}

      {/* ---------------- REVIEW LIST ---------------- */}
      <div className="space-y-4">
        {reviews.slice(0, visibleReviews).map((r) => {
          const isOwner =
            token && currentUser && r.user?.email === currentUser?.email;

          return (
            <div
              key={r.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm  transition-shadow hover:border-[#00B307] hover:shadow-[0_0_0_2px_rgba(0,179,7,0.15),0_10px_20px_rgba(0,179,7,0.25)] "
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex gap-3 flex-1 min-w-0">
                  <div className="shrink-0">
                    {r.user?.image ? (
                      <img
                        src={r.user.image}
                        alt={r.user.full_name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-linear-to-br from-gray-300 to-gray-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {r.user?.full_name}
                        </p>
                        <div className="flex gap-2 items-center mt-1">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                size={16}
                                className={
                                  s <= r.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }
                                fill={s <= r.rating ? "currentColor" : "none"}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            ({r.rating}.0)
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 shrink-0">
                        {r.created_at}
                      </span>
                    </div>

                    <p className="mt-3 text-gray-700 leading-relaxed">
                      {r.comment}
                    </p>
                  </div>
                </div>

                {isOwner && (
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === r.id ? null : r.id)
                      }
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openMenuId === r.id && (
                      <div
                        ref={menuRef}
                        className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                      >
                        <button
                          onClick={() => {
                            setEditId(r.id);
                            setRating(r.rating);
                            setComment(r.comment);
                            setShowForm(true);
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 transition-colors border-b border-gray-100"
                        >
                          <Edit3 size={16} /> Edit Review
                        </button>

                        <button
                          onClick={() => {
                            handleDelete(r.id);
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                        >
                          <Trash2 size={16} /> Delete Review
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------------- LOAD MORE BUTTON ---------------- */}
      {visibleReviews < reviews.length && (
        <div className="mt-4 sm:mt-6 md:mt-8 flex justify-center md:justify-start">
          <button
            onClick={handleLoadMore}
            disabled={loadMoreLoading || visibleReviews >= reviews.length}
            className={`px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 font-semibold text-[11px] sm:text-xs md:text-sm rounded-full transition-all duration-200 ${
              loadMoreLoading
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-[#EDFBEA] text-[#00B207] hover:bg-[#00B207] hover:text-white"
            }`}
          >
            {loadMoreLoading
              ? "Loading..."
              : visibleReviews >= reviews.length
                ? "No More Reviews"
                : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
