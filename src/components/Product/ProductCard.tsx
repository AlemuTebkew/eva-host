"use client";
import { Button } from "@/components/ui/button";
import ImageSlider from "../ImageSlider/ImageSlider";
import Link from "next/link";
import { Product } from "@/types/product";
import { getImageUrl } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface ProductCardProps {
  product: Product;
  otherSuppliersCount: number;
  hideVendor?: boolean;
}

export default function ProductCard({
  product,
  otherSuppliersCount,
  hideVendor,
}: ProductCardProps) {
  const t = useTranslations("productSection.productCard"); // Use the "productCard" namespace for translations
  const imageUrls = product.images?.length
    ? product.images.map((img) => getImageUrl(img))
    : [];

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block bg-white rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
    >
      <div className="rounded-lg overflow-hidden">
        {/* IMAGE CONTAINER: fixed height + gray background */}
        <div className="w-full h-48 bg-gray-100 overflow-hidden">
          {imageUrls.length > 0 ? (
            <div className="transition-transform duration-300 group-hover:scale-105">
              <ImageSlider images={imageUrls} autoSlide={true} />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              {t("noImage")} {/* Translated "No Image" text */}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="px-4 py-3 flex flex-col gap-2">
          {!hideVendor && (
            <div className="flex items-center">
              <span
                className="truncate max-w-full text-blue-800 font-medium transition-colors duration-200 group-hover:text-blue-900"
                title={product.vendor.name}
              >
                {product.vendor.name}
              </span>
            </div>
          )}
          <h3
            className="truncate text-sm font-medium text-gray-800 max-w-full transition-colors duration-200 group-hover:text-gray-900"
            title={product.name}
          >
            {product.name}
          </h3>
          <p className="text-sm font-semibold text-gray-900">
            ETB{" "}
            {product.priceRange
              ? `${product.priceRange.min.toLocaleString()} - ${product.priceRange.max.toLocaleString()}`
              : product.price.toLocaleString()}
          </p>
          {product.minOrderQuantity && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <p>
                {t("minOrder")}:{" "}
                {parseInt(product.minOrderQuantity).toLocaleString()}{" "}
                {t("units")}
              </p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="px-4 pb-4">
          <Button
            className="w-full bg-gray-100 text-blue-800 rounded-lg text-center transition-all duration-200 hover:bg-gray-200 focus:ring-2 focus:ring-blue-800/20"
            size="sm"
          >
            {t("comparePrice")} {/* Translated "Compare Price" button */}
          </Button>
        </div>
      </div>
    </Link>
  );
}