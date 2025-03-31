interface ProductFeatureProps {
  title?: string; // Optional: Custom title for the about section
  about?: string; // Description of the product
  features?: string[]; // List of features
  featureTitle?: string; // Optional: Custom title for the features section
  listStyle?: "disc" | "decimal" | "none"; // List style
}

export default function ProductFeature({
  title = "About the Product",
  about,
  features = [],
  featureTitle = "Key Features",
  listStyle = "disc",
}: ProductFeatureProps) {
  return (
    <div className="mt-6 p-4 border rounded-lg bg-white shadow-sm">
      {/* About Section */}
      {about && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-700 mt-2">{about}</p>
        </div>
      )}

      {/* Features Section */}
      {features.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900">{featureTitle}</h3>
          <ul className={`pl-5 text-gray-700 ${listStyle === "none" ? "" : `list-${listStyle}`}`}>
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
