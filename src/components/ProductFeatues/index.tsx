interface ProductFeatureProps {
  about: string;
  features: string[];
}

export default function ProductFeature({ about, features }: ProductFeatureProps) {
  return (
    <div className="mt-6">
      {/* About the Product */}
      <div>
        <h3 className="text-xl font-semibold">About the Product</h3>
        <p className="text-gray-700 mt-2">{about}</p>
      </div>

      {/* Features */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Key Features</h3>
        <ul className="list-disc pl-5 text-gray-700">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
