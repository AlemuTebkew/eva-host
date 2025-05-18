"use client";
import { rateSupplier } from "@/lib/api";
import React, { useState } from "react";

interface RateSupplierProps {
  supplierId: string;
  onSuccess?: () => void;
}

const RateSupplier: React.FC<RateSupplierProps> = ({
  supplierId,
  onSuccess,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const user = localStorage.getItem("user");
    const userId = user ? JSON.parse(user).id : null;
    // Check if user is logged in
    if (!userId) {
      setError("Please Login to rate vendor.");
      setLoading(false);
      return;
    }
    try {
      await rateSupplier(supplierId, rating, comment, userId);
      // Reset form after successful submission
      setRating(0);
      setComment("");
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit rating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
    >
      <h3 className="mb-1 text-lg font-semibold text-gray-800">
        Rate Supplier
      </h3>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Rating:
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              className={`rounded-full p-1 text-2xl transition-colors ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              } hover:scale-110 hover:text-yellow-500 focus:outline-none`}
              onClick={() => handleRatingChange(star)}
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div className="mt-1">
        <label
          htmlFor="comment"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Comment:
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={handleCommentChange}
          rows={2}
          className="w-full rounded-md border border-gray-300 p-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Write your feedback..."
        />
      </div>
      {error && <div className="mt-1 text-sm text-red-600">{error}</div>}
      <button
        type="submit"
        disabled={loading || rating === 0}
        className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white shadow transition hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default RateSupplier;
