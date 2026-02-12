import { Edit3, Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
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
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Customer Reviews</h3>

      {/* ---------------- REVIEW FORM ---------------- */}
      {/* {token && showForm && (!alreadyReviewed || editId)  ? (
        <div className="border rounded-xl p-4 space-y-3">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                onClick={() => setRating(s)}
                className={`cursor-pointer ${s <= rating ? "text-yellow-400" : "text-gray-300"}`}
                fill={s <= rating ? "currentColor" : "none"}
              />
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded-lg p-2"
            placeholder="Write your review..."
          />

          <button
            onClick={handleSubmit}
            disabled={btnLoading}
            className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-60"
          >
            {btnLoading
              ? "Please wait..."
              : editId
                ? "Update Review"
                : "Submit Review"}
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-500">Please login to write a review.</p>
      )} */}
      {!token ? (
        <p className="text-sm text-gray-500">Please login to write a review.</p>
      ) : showForm && (!alreadyReviewed || editId) ? (
        <div className="border rounded-xl p-4 space-y-3">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                onClick={() => setRating(s)}
                className={`cursor-pointer ${
                  s <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
                fill={s <= rating ? "currentColor" : "none"}
              />
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded-lg p-2"
            placeholder="Write your review..."
          />

          <button
            onClick={handleSubmit}
            disabled={btnLoading}
            className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-60"
          >
            {btnLoading
              ? "Please wait..."
              : editId
                ? "Update Review"
                : "Submit Review"}
          </button>
        </div>
      ) : alreadyReviewed && !editId ? (
        <p className="text-sm text-gray-500">
          You have already submitted a review.
        </p>
      ) : null}

      {/* ---------------- REVIEW LIST ---------------- */}
      <div className="space-y-4">
        {reviews.slice(0, visibleReviews).map((r) => {
          const isOwner =
            token && currentUser && r.user?.email === currentUser?.email;

          return (
            <div key={r.id} className="border rounded-xl p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    {r.user?.image ? (
                      <img
                        src={r.user.image}
                        alt={r.user.full_name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-300" />
                    )}

                    <div>
                      <p className="font-medium text-sm">{r.user?.full_name}</p>
                      <p className="text-xs text-gray-500">{r.created_at}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        className={
                          s <= r.rating ? "text-yellow-400" : "text-gray-300"
                        }
                        fill={s <= r.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                </div>

                {isOwner && (
                  <div className="flex gap-3 text-sm">
                    <button
                      onClick={() => {
                        setEditId(r.id);
                        setRating(r.rating);
                        setComment(r.comment);
                        setShowForm(true);
                      }}
                      className="text-blue-600 flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 size={14} /> Edit
                    </button>

                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-red-600 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>

              <p className="mt-3 text-gray-700">{r.comment}</p>
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
