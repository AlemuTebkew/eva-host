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
    <div className="bg-white py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">FEATURED SUPPLIERS</h2>
        <a href="#" className="text-primary font-semibold">
          VIEW SUPPLIER LIST
        </a>
      </div>
      <div className="flex flex-wrap justify-between">
        {suppliers.map((supplier, index) => (
          <div
            key={index}
            className="w-28 h-28 flex flex-col items-center justify-center bg-gray-100 rounded-xl shadow-md"
          >
            <supplier.Icon className="h-10 w-10 text-gray-700" />
            <span className="mt-2 text-sm font-semibold">{supplier.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
