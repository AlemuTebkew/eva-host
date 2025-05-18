import { getSupplierRatings } from "@/lib/api";
import React, { useEffect, useState } from "react";

type SupplierRating = {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  customer: {
    id: string;
    fullName: string;
    email: string;
  };
};

const fetchSupplierRatings = async (id: string): Promise<SupplierRating[]> => {
  try {
    const res = await getSupplierRatings(id);
    // Assuming ApiResponse has a 'data' property containing the array
    return res.data as SupplierRating[];
  } catch (error) {
    throw new Error("Error fetching supplier ratings");
  }
};

const getRatingColor = (rating: number) => {
  if (rating >= 4.5) return "bg-green-100 border-green-400";
  if (rating >= 3) return "bg-yellow-100 border-yellow-400";
  return "bg-red-100 border-red-400";
};

const getAverage = (nums: number[]) =>
  nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;

type SupplierRatingsProps = {
  supplier: { id: string; rating: number };
};

const SupplierRatings: React.FC<SupplierRatingsProps> = ({ supplier }) => {
  const [ratings, setRatings] = useState<SupplierRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSupplierRatings(supplier.id)
      .then(setRatings)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [supplier.id]);

  if (loading) return <div className="p-8 text-gray-500">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  const avg = getAverage(ratings.map(r => r.rating));

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Supplier Ratings</h2>
      <div className="mb-6 text-lg font-semibold text-blue-700">
        Average Supplier Rating:{" "}
        <span className="text-yellow-500">{avg.toFixed(2)}</span> / 5
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {ratings.map((r) => (
          <div
            key={r.id}
            className={`border-2 rounded-xl shadow-sm transition-all duration-200 ${getRatingColor(
              r.rating
            )} hover:shadow-lg hover:-translate-y-1 hover:border-blue-500 cursor-pointer group`}
          >
            <div className="p-6 flex flex-col">
              <div className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {r.customer.fullName}
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-2xl font-bold text-yellow-500">
                  {r.rating.toFixed(1)}
                </span>
                <span className="text-gray-500">/ 5</span>
              </div>
              <div className="mt-1 text-sm text-gray-400">
                {new Date(r.createdAt).toLocaleDateString()}
              </div>
              <div className="mt-4 space-y-2">
                <div className="bg-white rounded p-2 border border-gray-100 shadow-sm hover:border-blue-200 transition">
                  <span className="text-gray-700">{r.comment}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierRatings;
