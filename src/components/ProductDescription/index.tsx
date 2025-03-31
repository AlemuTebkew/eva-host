'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, CheckCircle, ChevronDown, SlidersHorizontal, ChevronDownIcon, BadgeCheckIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Supplier {
  name: string;
  price: number;
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
  const [visibleCount, setVisibleCount] = useState(3);
  const [sortOption, setSortOption] = useState("Lowest Price");

  const sortSuppliers = (suppliers: Supplier[], option: string) => {
    switch (option) {
      case "Lowest Price":
        return [...suppliers].sort((a, b) => a.price - b.price);
      case "Highest Price":
        return [...suppliers].sort((a, b) => b.price - a.price);
      case "Minimum Order":
        return [...suppliers].sort((a, b) => a.minOrder - b.minOrder);
      case "Best Discount":
        return [...suppliers].sort(
          (a, b) => (b.discount?.percent || 0) - (a.discount?.percent || 0)
        );
      default:
        return suppliers;
    }
  };

  const sortedSuppliers = sortSuppliers(suppliers, sortOption);
  const visibleSuppliers = sortedSuppliers.slice(0, visibleCount);

  // Find the best deal (lowest price)
  const bestSupplier = sortedSuppliers[0];

  return (
    <div className="max-w-lg w-full p-6 bg-white rounded-2xl shadow-md border">
      {/* Product Name */}
      <h2 className="text-xl font-semibold text-gray-900">{productName}</h2>

      {/* Best Offers & Controls */}
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm font-medium text-gray-700">Best Offers:</p>

        <div className="flex gap-2">
          {/* Sort Dropdown */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 text-sm">
                Sort: {sortOption} <ChevronDownIcon className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-2">
              {["Lowest Price", "Highest Price", "Minimum Order", "Best Discount"].map((option) => (
                <Button
                  key={option}
                  variant="ghost"
                  className={`w-full text-left ${sortOption === option ? "font-bold text-orange-600" : ""}`}
                  onClick={() => setSortOption(option)}
                >
                  {option}
                </Button>
              ))}
            </PopoverContent>
          </Popover>

          {/* Filter Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                <SlidersHorizontal className="w-4 h-4" /> Filter
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-sm p-6">
              <DialogHeader>
                <h3 className="text-lg font-semibold">Filter Suppliers</h3>
              </DialogHeader>
              {/* Filter options will be added here */}
              <p className="text-gray-500 text-sm">Filter options will go here...</p>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Supplier Offers */}
      <div className="mt-3 space-y-3">
        {visibleSuppliers.map((supplier, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border transition ${
              supplier === bestSupplier ? "border-orange-500 bg-orange-50" : "border-gray-200"
            }`}
          >
            <div className="font-medium text-gray-900 flex items-center">
              {supplier.name} <BadgeCheckIcon className="w-4 h-4 ml-1 text-blue-600" />
            </div>
            {/* <p className="font-medium text-gray-900">{supplier.name} <BadgeCheckIcon className="w-4 h-4 ml-1 text-blue-600" /></p> */}
            <p className="text-lg font-bold text-gray-800">{supplier.price} ETB / Ton</p>
            <p className="text-xs text-gray-500">Min Order: {supplier.minOrder} Ton</p>
            {supplier.discount && (
              <p className="text-xs text-green-600 font-semibold">
                Buy {supplier.discount.minQuantity}+ Tons & get {supplier.discount.percent}% OFF
              </p>
            )}
            <div className="mt-3 flex gap-2">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white w-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" /> Contact Supplier
              </Button>
              <Button variant="outline" className="flex items-center gap-2 w-full justify-center">
                <MessageCircle className="w-4 h-4" /> Chat
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Offers Button */}
      {visibleCount < suppliers.length && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setVisibleCount(suppliers.length)}
            className="flex items-center gap-2"
          >
            <ChevronDown className="w-4 h-4" /> Show More Offers
          </Button>
        </div>
      )}
    </div>
  );
}
