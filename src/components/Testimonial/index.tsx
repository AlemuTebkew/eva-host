'use client'
import { UserCircle, LineChart } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Abebe",
      role: "Leading Construction Materials Provider",
      initials: "A",
      feedback:
        "With real-time market prices, we optimized our pricing and increased sales by 30% in three months.",
    },
    {
      name: "Kebede",
      role: "Project Manager In Real Estate Development",
      initials: "K",
      feedback:
        "Comparing supplier prices on this platform helped us cut costs by 20%, ensuring we always get the best deals.",
    },
    {
      name: "Hiwot",
      role: "Construction Equipment Distributor",
      initials: "H",
      feedback:
        "Since listing our products on the platform, inquiries from new clients have grown by 50%.",
    },
  ];

  return (
    <div className="text-center p-10 bg-gray-50">
      {/* Header Section */}
      <div className="flex items-center justify-center gap-3">
        <LineChart className="text-pink-500 w-8 h-8" />
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Real Businesses, Real Growth
        </h2>
      </div>
      <p className="text-gray-500 mt-2 max-w-xl mx-auto">
        Discover how suppliers and buyers are leveraging our platform to make smarter business decisions.
      </p>

      {/* Testimonial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white shadow-lg p-6 rounded-xl text-left border border-gray-200 max-w-sm mx-auto"
          >
            <div className="flex items-center gap-3">
              {/* Lucide User Icon as Avatar */}
              <UserCircle className="w-12 h-12 text-gray-400" />
              <div>
                <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
            <p className="mt-4 text-gray-700 line-clamp-3">{testimonial.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
}