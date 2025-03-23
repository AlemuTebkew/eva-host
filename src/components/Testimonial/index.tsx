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
    <div className="text-center p-10">
      {/* Header Section */}
      <div className="flex items-center justify-center gap-3">
        <LineChart className="text-pink-500 w-8 h-8" />
        <h2 className="text-3xl font-bold text-gray-900">
          Real Businesses, Real Growth
        </h2>
      </div>
      <p className="text-gray-500 mt-2">
        Discover how suppliers and buyers are leveraging our data and platform to make smarter business decisions.
      </p>

      {/* Testimonial Cards */}
      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white shadow-lg p-6 rounded-xl w-80 text-left border border-gray-200"
          >
            <div className="flex items-center gap-3">
              {/* Lucide User Icon as Avatar */}
              <UserCircle className="w-12 h-12 text-gray-500" />

              <div>
                <h3 className="font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
            <p className="mt-4 text-gray-700">{testimonial.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
}