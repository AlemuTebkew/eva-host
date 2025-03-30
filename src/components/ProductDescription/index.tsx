'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, CheckCircle } from "lucide-react";

interface Supplier {
  name: string;
  price: string;
  availability: boolean;
  minOrder: number;
  discount?: {
    minQuantity: number;
    percent: number;
  };
}

interface ProductDescriptionProps {
  productName: string;
  suppliers: Supplier[];
}

export default function ProductDescription({ productName, suppliers }: ProductDescriptionProps) {
  const [selectedSupplier, setSelectedSupplier] = useState(suppliers[0]);

  return (
    <div className="max-w-lg w-full p-6 bg-white rounded-2xl shadow-md border">
      {/* Product Name */}
      <h2 className="text-xl font-semibold text-gray-900">{productName}</h2>

      {/* Selected Supplier Price */}
      <p className="mt-2 text-2xl font-bold text-gray-800">{selectedSupplier.price} ETB</p>

      {/* Supplier Selection */}
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-700">Select a supplier:</p>
        <div className="mt-2 space-y-3">
          {suppliers.map((supplier, index) => (
            <label
              key={index}
              className={`flex items-center p-3 rounded-lg border transition ${
                selectedSupplier.name === supplier.name ? "border-orange-500 bg-orange-50" : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                name="supplier"
                value={supplier.name}
                checked={selectedSupplier.name === supplier.name}
                onChange={() => setSelectedSupplier(supplier)}
                className="w-5 h-5 text-orange-600 focus:ring-orange-500"
              />
              <div className="ml-3 flex-grow">
                <p className="font-medium text-gray-900">{supplier.name}</p>
                <p className="text-sm text-gray-600">{supplier.price} ETB</p>
              </div>
              {supplier.availability ? (
                <Badge variant="default">In Stock</Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Supplier Details */}
      <div className="mt-4 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Minimum Order</span>
          <span className="font-medium text-gray-900">{selectedSupplier.minOrder} Ton</span>
        </div>
        {selectedSupplier.discount && (
          <div className="mt-2 p-2 bg-green-100 text-green-700 rounded-lg">
            Order {selectedSupplier.discount.minQuantity}+ Tons and get{" "}
            <span className="font-semibold">{selectedSupplier.discount.percent}% OFF</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col md:flex-row gap-3">
        <Button className="bg-orange-600 hover:bg-orange-700 text-white w-full flex items-center justify-center">
          <CheckCircle className="w-5 h-5 mr-2" /> Contact Supplier
        </Button>
        <Button variant="outline" className="flex items-center gap-2 w-full justify-center">
          <MessageCircle className="w-5 h-5" /> Chat
        </Button>
      </div>
    </div>
  );
}
