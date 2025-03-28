import { Shirt, ShoppingBag, Store, Tag, Gem, Handshake } from "lucide-react";

export default function FeaturedSuppliers() {
  const suppliers = [
    { name: "ZARA", Icon: Shirt },
    { name: "D&G", Icon: ShoppingBag },
    { name: "H&M", Icon: Store },
    { name: "CHANEL", Icon: Tag },
    { name: "PRADA", Icon: Gem },
    { name: "BIBA", Icon: Handshake },
  ];

  return (
    <div className="bg-white py-8 px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-center sm:text-left">
          FEATURED SUPPLIERS
        </h2>
        <a href="#" className="text-primary font-semibold hover:underline">
          VIEW SUPPLIER LIST
        </a>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
        {suppliers.map((supplier, index) => (
          <div
            key={index}
            className="w-32 h-32 flex flex-col items-center justify-center bg-gray-100 rounded-xl shadow-md transition-transform hover:scale-105 hover:shadow-lg"
          >
            <supplier.Icon className="h-12 w-12 text-gray-700" />
            <span className="mt-3 text-sm font-semibold">{supplier.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
