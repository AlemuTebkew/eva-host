interface SupplierDetailProps {
  name: string;
  location?: string;
  rating?: number;
  about?: string;
  productCount?: number;
}

const SupplierDetail = (supplierDetail: SupplierDetailProps) => {
  // Temporary data
  const supplierData = {
    name: "XYZ Supplier",
    region: "Addis Ababa",
    city: "Addis Ababa",
    subcity: "Bole",
    fullAddress: "Bole Subcity, Next to Bole International Airport",
    rating: 4.5,
    about: "We specialize in high-quality manufacturing of tech gadgets.",
    businessType: "Manufacturer",
    contactInfo: "+251 911 123 456",
    productCount: 50,
    products: [
      { id: 1, name: "Product A", price: "$10.00", imageUrl: "/path/to/product-a.jpg" },
      { id: 2, name: "Product B", price: "$20.00", imageUrl: "/path/to/product-b.jpg" },
      { id: 3, name: "Product C", price: "$15.00", imageUrl: "/path/to/product-c.jpg" },
      { id: 4, name: "Product D", price: "$30.00", imageUrl: "/path/to/product-d.jpg" },
    ],
  };

  return (
    <div className="max-w-c-1235 mx-auto space-y-6 p-6 border rounded-lg bg-white">
      {/* Supplier Basic Information */}
      <h2 className="text-xl font-semibold">{supplierData.name}</h2>
      <div className="text-sm text-gray-500">
        <p>📍 {supplierData.region}, {supplierData.city}, {supplierData.subcity}</p>
        <p>{supplierData.fullAddress}</p>
      </div>
      {supplierData.rating && <p className="text-sm">⭐ {supplierData.rating} / 5</p>}
      {supplierData.about && <p className="text-sm text-gray-600">{supplierData.about}</p>}
      {supplierData.businessType && <p className="text-sm text-gray-600">Business Type: {supplierData.businessType}</p>}
      {supplierData.contactInfo && <p className="text-sm text-gray-600">Contact: {supplierData.contactInfo}</p>}
      
      {/* Products Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Products</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {supplierData.products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg space-y-2">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-32 object-cover rounded-md"
              />
              <h4 className="text-sm font-semibold">{product.name}</h4>
              <p className="text-sm text-gray-600">{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Optional: Contact Supplier button */}
      <div className="pt-4">
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Contact Supplier
        </button>
      </div>
    </div>
  );
};

export default SupplierDetail;
