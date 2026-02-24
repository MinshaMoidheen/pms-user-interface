"use client";

import React, { useState } from "react";
import { Star, MessageSquare, Send, User } from "lucide-react";
import {
  useGetReviewsQuery,
  useAddReviewMutation,
} from "@/store/services/reviewsApiSlice";
import { ReviewTargetType } from "@/types/reviews";
import { getUser } from "@/utility/Utils";
import { useRouter } from "next/navigation";

interface ReviewsSectionProps {
  targetId: string;
  targetType: ReviewTargetType;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  targetId,
  targetType,
}) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 5;

  const {
    data: reviewsData,
    isLoading,
    isError,
  } = useGetReviewsQuery({
    targetId,
    targetType,
    page,
    limit,
  });

  const [addReview, { isLoading: isAddingReview }] = useAddReviewMutation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  const user = getUser();
  const reviews = reviewsData?.data?.reviews || [];
  const stats = reviewsData?.data?.stats;
  const pagination = reviewsData?.data?.pagination;

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to write a review");
      return;
    }
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    try {
      await addReview({
        targetId,
        targetType,
        rating,
        comment,
      }).unwrap();
      setRating(0);
      setComment("");
    } catch (err) {
      console.error("Failed to add review:", err);
    }
  };

  return (
    <div className="space-y-12 py-12 border-t border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Review Summary */}
        <div className="w-full md:w-1/3 space-y-6">
          <h3 className="text-2xl font-bold text-[#1E293B]">Guest Reviews</h3>
          <div className="flex items-center gap-4">
            <span className="text-5xl font-black text-[#1E293B]">
              {stats?.averageRating || 0}
            </span>
            <div className="space-y-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < Math.round(stats?.averageRating || 0)
                        ? "fill-orange-400 text-orange-400"
                        : "text-gray-200"
                    }
                  />
                ))}
              </div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                Based on {stats?.reviewCount || 0} reviews
              </p>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((r) => {
              const count =
                stats?.breakdown?.[r as keyof typeof stats.breakdown] || 0;
              const percentage = stats?.reviewCount
                ? (count / stats.reviewCount) * 100
                : 0;
              return (
                <div key={r} className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-500 w-4">
                    {r}
                  </span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-400 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-500 w-8">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Review Form */}
        {user ? (
          <div className="w-full md:w-2/3 bg-gray-50 p-8 rounded-[32px] space-y-6">
            <h4 className="text-xl font-bold text-[#1E293B]">Write a Review</h4>
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                  Your Rating
                </p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform active:scale-95"
                    >
                      <Star
                        size={32}
                        className={
                          s <= (hoverRating || rating)
                            ? "fill-orange-400 text-orange-400"
                            : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                  Your Comment
                </p>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about your experience..."
                  className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400 min-h-[120px] transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isAddingReview || rating === 0}
                className="px-8 py-4 bg-[#FF5A3D] text-white rounded-full font-bold shadow-lg shadow-[#FF5A3D]/20 hover:bg-[#E54A2E] transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isAddingReview ? "Submitting..." : "Submit Review"}
                {!isAddingReview && <Send size={18} />}
              </button>
            </form>
          </div>
        ) : (
          <div className="w-full md:w-2/3 p-12 text-center bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
            <p className="text-gray-500 font-bold mb-4">
              Please login to share your experience
            </p>
            <button
              onClick={() => router.push("/login")}
              className="px-8 py-3 bg-[#1E293B] text-white rounded-full font-bold text-sm hover:bg-black transition-all"
            >
              Login to Review
            </button>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-8 mt-12">
        <h3 className="text-xl font-bold text-[#1E293B]">
          All Reviews ({stats?.reviewCount || 0})
        </h3>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.reviewer}
                className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <User size={20} className="text-gray-400" />
                    </div>
                    <div>
                      <h5 className="font-bold text-[#1E293B]">
                        Verified Guest
                      </h5>
                      <p className="text-xs text-gray-400 font-medium">
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={
                          i < rev.rating
                            ? "fill-orange-400 text-orange-400"
                            : "text-gray-200"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed font-medium">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-400 font-medium italic bg-gray-50 rounded-[32px]">
            No reviews yet for this property.
          </div>
        )}

        {pagination && pagination.page < pagination.totalPages && (
          <div className="flex justify-center pt-8">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-8 py-3 bg-white border border-gray-200 rounded-full font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm"
            >
              Load More Reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
