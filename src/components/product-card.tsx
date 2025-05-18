"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";
import { Heart, Share2, Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface ProductCardProps {
  name: string;
  price: number;
  vendorName?: string;
  priceRange: { min: number; max: number };
  image: string;
  id: string;
  rating?: number;
  isFeatured?: boolean;
  isPromoted?: boolean;
}

export default function ProductCard({
  name,
  priceRange,
  price,
  image,
  id,
  vendorName,
  rating = 0,
  isFeatured = false,
  isPromoted = false,
}: ProductCardProps) {
  const t = useTranslations("productSection.productCard"); // Use the "productCard" namespace for translations
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: name,
        text: t("shareText", { name }), // Translated share text
        url: window.location.origin + `/products/${id}`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg",
        isFeatured && "border-blue-800/20",
        isPromoted && "border-orange-500/20",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured/Promoted Badge */}
      {(isFeatured || isPromoted) && (
        <div
          className={cn(
            "absolute right-2 top-2 z-10 rounded-full px-3 py-1 text-xs font-medium text-white shadow-sm",
            isFeatured ? "bg-blue-800" : "bg-orange-500",
          )}
        >
          {isFeatured ? t("featured") : t("promoted")}
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={getImageUrl(image) || "/placeholder.svg"}
          alt={name}
          fill
          className={cn(
            "object-cover transition-transform duration-300",
            isHovered && "scale-110",
          )}
        />
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-4">
        {/* Vendor Name with Rating */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">
            {vendorName}
          </span>
          {rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-600">
                {rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Product Name */}
        <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-800">
          {name}
        </h3>

        {/* Price */}
        <div className="mb-4">
          <div className="text-lg font-bold text-gray-900">
            ETB{" "}
            {priceRange &&
            typeof priceRange.min === "number" &&
            typeof priceRange.max === "number"
              ? `${priceRange.min.toLocaleString()} - ${priceRange.max.toLocaleString()}`
              : typeof price === "number"
                ? price.toLocaleString()
                : ""}
          </div>
          {isPromoted && (
            <div className="mt-1 text-xs text-orange-500">
              {t("promotionPrice")}
            </div>
          )}
        </div>

        {/* Button */}
        <div className="mt-auto">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "w-full border-orange-500 text-orange-500 transition-all duration-200",
              "hover:bg-orange-500 hover:text-white",
              "focus:ring-2 focus:ring-orange-500/20",
            )}
          >
            <Link
              href={`/products/${id}`}
              className="flex items-center justify-center"
            >
              {t("contactSupplier")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
