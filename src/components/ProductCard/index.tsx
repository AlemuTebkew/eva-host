import { useState } from "react";
import { CheckCircle, PlusSquare, ChevronLeft, ChevronRight, Star, Badge, BadgeCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ProductCardProps {
  images: string[];
  productName: string;
  supplier: string;
  priceRange: string;
}

export default function ProductCard({ images, productName, supplier, priceRange }: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white p-4">
      {/* Image Slider */}
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        <Image src={images[currentImage]} alt="Product Image" layout="fill" objectFit="cover" />

        {/* Left Arrow */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-1 rounded-full opacity-75 hover:opacity-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-800 bg-white p-1 rounded-full opacity-75 hover:opacity-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentImage ? "bg-white" : "bg-gray-400"
              } cursor-pointer`}
            />
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-3">
        <h3 className="text-lg font-semibold">{productName}</h3>
        <div className="text-blue-600 font-medium flex items-center">
          {supplier} <BadgeCheckIcon className="w-4 h-4 ml-1 text-blue-600" />
        </div>
        <p className="text-gray-500 text-sm mt-1">Price: {priceRange}</p>
        <p className="text-red-600 font-bold">{priceRange} / Ton</p>
      </div>

      {/* Buttons */}
      <div className="mt-4 space-y-2">
        <Button className="w-full text-black bg-[#F1F2F4] border border-[#E9EAEC]">Contact Supplier</Button>
        <div className="flex items-center space-x-2 text-gray-600 cursor-pointer">
          <PlusSquare className="w-5 h-5" />
          <span>Add to Compare</span>
        </div>
      </div>
    </div>
  );
}