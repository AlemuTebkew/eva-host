import { TrendingUp, Tags, BarChart, FileDown } from "lucide-react";
import { Button } from "../ui/button";

export default function CallToAction() {
  const features = [
    {
      icon: TrendingUp,
      title: "Live Market Data",
      description: "Stay updated with accurate, real-time prices.",
    },
    {
      icon: Tags,
      title: "Compare Suppliers",
      description: "Find the best offers from multiple vendors.",
    },
    {
      icon: BarChart,
      title: "Track Price Trends",
      description: "Analyze past data to predict future pricing.",
    },
    {
      icon: FileDown,
      title: "Download Reports",
      description: "Get detailed insights for better business decisions.",
    },
  ];

  return (
    <div className="bg-blue-600 text-white p-10 rounded-2xl text-center">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
        COMPARE PRICES, MAKE SMARTER DECISIONS
      </h2>
      <p className="mt-2 text-base sm:text-lg max-w-2xl mx-auto">
        Discover how suppliers and buyers are leveraging our platform to make
        smarter business decisions.
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-6">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            <feature.icon className="h-12 w-12 text-white mb-3" />
            <h3 className="text-lg font-semibold text-center">{feature.title}</h3>
            <p className="text-sm text-gray-200 text-center line-clamp-2">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Call to Action Button */}
      <Button className="mt-8 px-6 py-3 text-lg font-semibold rounded-lg">
        Start Comparing
      </Button>
    </div>
  );
}