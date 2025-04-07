import { BadgeCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageSlider from "../ImageSlider/ImageSlider";
import Link from "next/link";
import { Product } from "@/types/product";
import { url } from "inspector";

interface ProductCardProps {
  product: Product;
  otherSuppliersCount: number;
}

export default function ProductCard({ product, otherSuppliersCount }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="bg-white sm:p-2 rounded">
      <div className="rounded-lg overflow-hidden">
        {/* Image Slider */}
        <ImageSlider images={product.images.map((image)=> `http://13.60.253.93:5007/files/${image}`)} autoSlide={true} />

        {/* Product Details */}
        <div className="px-2 mt-3 flex flex-col gap-1">
          <h3 className="truncate text-sm font-medium text-gray-800 max-w-full" title={product.name}>
            {product.name}
          </h3>

          <p className="font-bold lg:text-lg">{product.priceRange? `${product.priceRange.min} - ${product.priceRange.max}` : product.price}</p>

          <div className="flex items-center underline">
            <span className="truncate max-w-full text-gray-700" title={product.vendor.name}>
              {product.vendor.name}
            </span>
          </div>
          <div>
            <p>Min Order : {product.minOrderQuantity}</p>
          </div>
          {otherSuppliersCount > 0 && (
            <p className="text-gray-600 text-sm">
              Available from <span className="font-semibold">{otherSuppliersCount}</span> other suppliers
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="w-full mt-4 mb-4 flex justify-center lg:mb-0">
          <Button className="text-black bg-[#F1F2F4] border border-[#E9EAEC]">
            Contact Suppliers
          </Button>
        </div>
      </div>
    </Link>
  );
}