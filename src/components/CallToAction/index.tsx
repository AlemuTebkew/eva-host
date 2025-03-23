import { TrendingUp, Tags, BarChart, FileDown } from "lucide-react";
import { Button } from "../ui/button";

export default function CallToAction() {
  const features = [
    {
      icon: TrendingUp,
      title: "Live Market Data",
      description: "Stay Updated With Accurate, Real-Time Prices.",
    },
    {
      icon: Tags,
      title: "Compare Suppliers",
      description: "Find The Best Offers From Multiple Vendors.",
    },
    {
      icon: BarChart,
      title: "Track Price Trends",
      description: "Analyze Past Data To Predict Future Pricing.",
    },
    {
      icon: FileDown,
      title: "Download Reports",
      description: "Get Detailed Insights For Better Business Decisions.",
    },
  ];

  return (
    <div className="bg-blue-600 text-white p-10 rounded-2xl text-center">
      <h2 className="text-2xl font-bold">COMPARE PRICES, MAKE SMARTER DECISIONS</h2>
      <p className="mt-2 text-lg">
        Discover How Suppliers And Buyers Are Leveraging Our Data And Platform To Make
        Smarter Business Decisions.
      </p>

      <div className="flex flex-wrap justify-center gap-8 mt-6">
        {features.map((feature, index) => (
          <div key={index} className="w-48 flex flex-col items-center">
            <feature.icon className="h-12 w-12 text-white mb-3" />
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
      <Button variant="default" className="mt-10 px-6 py-3 text-lg font-semibold rounded-lg">Start Comparing</Button>
    </div>
  );
}
