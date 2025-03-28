import { BadgeCheckIcon, PlusSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageSlider from "../ImageSlider/ImageSlider";
import Link from "next/link";

interface ProductCardProps {
  images: string[];
  productName: string;
  supplier: string;
  priceRange: string;
}

export default function ProductCard({ images, productName, supplier, priceRange }: ProductCardProps) {

  return (
    <Link href={'/products/1'}>
      <div className="rounded-lg overflow-hidden shadow-lg bg-white p-4">
        {/* Image Slider */}
        <ImageSlider
        images={images}
        autoSlide={true}
        />
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
    </Link>
  );
}