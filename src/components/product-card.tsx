'use client'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";

interface ProductCardProps {
  name: string;
  price: number;
  vendorName?: string;
  priceRange: { min: number; max: number };
  image: string;
  id: string;
}

export default function ProductCard({
  name,
  priceRange,
  price,
  image,
  id,
  vendorName
}: ProductCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow h-full">
      {/* Image */}
      <div className="relative h-40 w-full">
        <Image
          src={getImageUrl(image) || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="mb-2 line-clamp-2 text-sm font-medium">{name}</h3>
        <div className="mb-2 text-md">{vendorName}</div>
        <div className="mb-4 text-lg font-bold">
          ETB{" "}
          {!priceRange
            ? price.toLocaleString()
            : priceRange.min.toLocaleString()}{" "}
          - {priceRange.max ? priceRange.max.toLocaleString() : ""}
        </div>

        {/* Button at Bottom */}
        <div className="mt-auto">
          <Button
            variant="outline"
            size="sm"
            className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
          >
            <Link href={`/products/${id}`}>Contact Supplier</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
