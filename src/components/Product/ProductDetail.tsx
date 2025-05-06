import { ProductDetails, Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";

interface ProductDetailProps {
  product: ProductDetails;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  //
  // SAMPLE "OTHER RECOMMENDATIONS" DATA
  // If your API doesn't return a `recommendations` field,
  // this default will be used instead.
  //
  const sampleRecommendations: any[] = Array.from({ length: 3 }, (_, i) => ({
    id: `sample-${i + 1}`,
    name: `Sample Product ${i + 1}`,
    vendor: { id: "vendor-1", name: "Sample Vendor" },
    image: "https://via.placeholder.com/200x200?text=Sample+Img",
    priceRange: { min: 500, max: 1200 },
    price: "ETB 800",
    minOrderQuantity: "1",
    unit: product.unit,
  }));
  const recommendations = sampleRecommendations;

  //
  // PARSE DESCRIPTION INTO BULLETS
  //
  const descriptionLines = product.description
    ? product.description.split("\n").filter((l) => l.trim() !== "")
    : [
        "High quality carbon steel construction.",
        "Rust-resistant finish for longevity.",
        "Ideal for industrial and commercial use.",
      ];

  return (
    <div className="mx-auto max-w-7xl space-y-12 p-4">
      {/* ===================== */}
      {/* 1) TOP: IMAGES + INFO */}
      {/* ===================== */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* IMAGE SLIDER & THUMBNAILS */}
        <div className="flex flex-col-reverse gap-4 lg:flex-row lg:gap-8">
          {/* thumbnails */}
          <div className="flex max-h-[400px] gap-2 overflow-y-auto lg:flex-col">
            {product.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative h-16 w-16 overflow-hidden rounded-md border-2 ${
                  idx === activeIndex ? "border-black" : "border-transparent"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumb ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
          {/* main image */}
          <div className="relative h-80 w-full flex-1 overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.images?.[activeIndex] ?? "/placeholder.png"}
              alt={`Product ${activeIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* DETAILS */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-semibold">{product.name}</h1>

          {product.priceTiers && product.priceTiers.length > 0 ? (
            <div className="flex flex-wrap gap-8">
              {product.priceTiers.map((tier, i) => (
                <div className="flex flex-col gap-1" key={i}>
                  <span className="text-sm">{`${tier.minQty} ${product.unit}`}</span>
                  <span className="text-2xl font-bold">{`ETB ${tier.price}`}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-primary">
                {product.price}
              </span>
              <span className="text-sm text-gray-400">
                • Last updated: {product.priceUpdatedAt}
              </span>
            </div>
          )}

          <div className="text-sm text-gray-600">
            Min Order:{" "}
            <strong>{`${product.minOrderQuantity} ${product.unit}`}</strong>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
            <span>
              <strong>Condition:</strong> {product.condition ?? "Used"}
            </span>
            {product.attributes?.map((attr, i) => (
              <span key={i}>
                <strong>{attr.name}:</strong> {attr.value}
              </span>
            ))}
          </div>

          <Link
            href={`/suppliers/${product.vendor.id}`}
            className="flex w-full items-center justify-between gap-4 rounded border p-3"
          >
            <span
              className="truncate text-gray-700"
              title={product.vendor.name}
            >
              {product.vendor.name}
            </span>
            <Button size="sm" className="bg-primary text-white">
              Contact Supplier
            </Button>
          </Link>
        </div>
      </div>

      {/* ===================================== */}
      {/* 2) OTHER RECOMMENDATIONS SLIDER */}
      {/* ===================================== */}
      <div className="relative">
        <h2 className="mb-3 text-lg font-semibold">Other Recommendations</h2>
        <div
          className="
            scrollbar-hide
            -mx-4
            flex snap-x
            snap-mandatory  
            flex-nowrap  
            space-x-4
            px-4
            pb-4  
          "
        >
          {recommendations?.map((rec) => (
            <div key={rec.id} className="w-60 flex-shrink-0 snap-start">
              <ProductCard
                product={rec}
                otherSuppliersCount={0}
                hideVendor={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ======================= */}
      {/* 3) ABOUT THE PRODUCT */}
      {/* ======================= */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">About the Product</h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-gray-600">
          {descriptionLines.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </div>

      {/* ==================================== */}
      {/* 4) REPEAT PRICE + CONTACT SUPPLIER */}
      {/* ==================================== */}
      <div className="flex flex-col items-start justify-between gap-4 border-t pt-6 lg:flex-row lg:items-center">
        <div className="space-y-1">
          <span className="block text-2xl font-bold">{product.price}</span>
          <span className="text-sm text-gray-400">
            • Last updated: {product.priceUpdatedAt}
          </span>
        </div>
        <Link href={`/suppliers/${product.vendor.id}`}>
          <Button size={"sm"}>Contact Supplier</Button>
        </Link>
      </div>

      {/* ======================= */}
      {/* 5) ABOUT THE SUPPLIER */}
      {/* ======================= */}
      <div className="border-t pt-6">
        <h2 className="mb-3 text-lg font-semibold">About the Supplier</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={product.vendor.logo || "/placeholder.png"}
              alt={product.vendor.name?.charAt(0)}
              width={48}
              height={48}
              className="rounded-full bg-gray-200 object-cover"
            />
            <div>
              <p className="font-medium">{product.vendor.name}</p>
              <p className="text-sm text-gray-500">Industry type</p>
            </div>
          </div>
          <Link href={`/suppliers/${product.vendor.id}`}>
            <Button size="sm" variant="outline">
              View Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* ======================= */}
      {/* 6) BOTTOM BANNER */}
      {/* ======================= */}
      <div className="flex  gap-4">
        <div className="mt-12">
          <Image
            src="/images/right-ads.png"
            alt="Stronger Future"
            width={150}
            height={20}
            className="max-h-[300px] rounded-lg"
          />
        </div>
        <div className="mt-12">
          <Image
            src="/images/right-ads.png"
            alt="Stronger Future"
            width={150}
            height={20}
            className="max-h-[300px] rounded-lg"
          />
        </div>
        <div className="mt-12">
          <Image
            src="/images/right-ads.png"
            alt="Stronger Future"
            width={150}
            height={20}
            className="max-h-[300px] rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
