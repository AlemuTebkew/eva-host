import { BadgeCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageSlider from "../ImageSlider/ImageSlider";
import Link from "next/link";
import { Product } from "@/types/product";
import { url } from "inspector";
import { getImageUrl } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  otherSuppliersCount: number;
  hideVendor?: boolean
}

export default function ProductCard({ product, otherSuppliersCount, hideVendor }: ProductCardProps) {
  // map raw image ids → URLs
  const imageUrls = product.images?.length
    ? product.images.map((img) => getImageUrl(img))
    : [];

  return (
    <Link href={`/products/${product.id}`} className="bg-white sm:p-2 rounded">
      <div className="rounded-lg overflow-hidden">
        {/* IMAGE CONTAINER: fixed height + gray background */}
        <div className="w-full h-48 bg-gray-100">
          {imageUrls.length > 0 ? (
            <ImageSlider images={imageUrls} autoSlide={true} />
          ) : (
            // Placeholder when no images
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image Available
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="px-2 mt-3 flex flex-col gap-1">
          {!hideVendor && (
            <div className="flex items-center">
              <span
                className="truncate max-w-full text-blue-800"
                title={product.vendor.name}
              >
                {product.vendor.name}
              </span>
            </div>
          )}
          <h3
            className="truncate text-sm font-medium text-gray-800 max-w-full"
            title={product.name}
          >
            {product.name}
          </h3>
          <p className="text-sm">
            {product.priceRange
              ? `${product.priceRange.min} - ${product.priceRange.max}`
              : product.price}
          </p>
          {product.minOrderQuantity && (
            <div className="flex items-center gap-1 text-sm text-primary">
              <p>Min Order: {parseInt(product.minOrderQuantity).toFixed()}</p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="w-full mt-4 mb-4 flex justify-start ml-5 lg:mb-0">
          <Button
            className="text-blue-800 bg-[rgb(223,226,231)] rounded-lg py-1 text-xs pointer-events-none"
            size={"sm"}
          >
            Compare Price
          </Button>
        </div>
      </div>
    </Link>
  );
}