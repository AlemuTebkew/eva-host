import { getImageUrl } from "@/lib/utils";
import { ProductDetails } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useGetRecommendedProductsQuery } from "@/store/app-api";
import ProductCard from "./ProductCard";

interface ProductDetailProps {
  product: ProductDetails;
}


const ProductDetail = ({ product }: ProductDetailProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: recommendedProducts, isLoading: isLoadingRecommendations } =
    useGetRecommendedProductsQuery(product.id);

  return (
    <div className="flex flex-col gap-10 mx-0">
      <div className="mx-auto flex w-full flex-col gap-6 lg:flex-row lg:p-4">
        {/* Image section */}
        <div className="flex flex-col-reverse gap-4">
          {/* Thumbnails vertical */}
          <div className="flex  max-h-[400px] gap-2 overflow-y-auto">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative h-16 w-16 overflow-hidden rounded-md border-2 ${
                  index === activeIndex ? "border-black" : "border-transparent"
                }`}
              >
                <Image
                  src={getImageUrl(img)}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
          {/* Main Image (smaller size) */}
          <div className="relative h-80 w-80 overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={getImageUrl(product.images[activeIndex])}
              alt={`Product Image ${activeIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full space-y-4">
          <h1 className="text-xl font-semibold leading-tight">
            {product.name}
          </h1>

          {product.priceTiers && product.priceTiers.length > 0 ? (
            <div className="flex flex-wrap gap-8">
              {product.priceTiers.map((priceTier, index) => (
                <div className="flex flex-col gap-1 bg-gray-200 border rounded-md p-3" key={index}>
                  <p className="font-normal">{`${priceTier.minQty} ${product.unit}`}</p>
                  <p className="text-2xl font-semibold">{`ETB ${priceTier.price}`}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">
                {product.price}
              </span>
              <span className="text-sm text-gray-400">{`• Last Price update on ${product.priceUpdatedAt}`}</span>
            </div>
          )}

          <div className="text-sm text-gray-600">
            Minimum order quantity:{" "}
            <strong>{`${product.minOrderQuantity} ${product.unit}`}</strong>
          </div>

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {product.condition && (
              <div>
                <strong>Product Condition:</strong> {product.condition}
              </div>
            )}
            {product.attributes?.map((attribute) => (
              <div key={attribute.name}>
                <strong>{attribute.name}:</strong> {attribute.value}
              </div>
            ))}
          </div>

          <Link
            href={`/suppliers/${product.vendor.id}`}
            className="flex w-full items-center justify-between gap-8 rounded border p-2"
          >
            <span
              className="max-w-full truncate text-gray-700"
              title={product.vendor.name}
            >
              {product.vendor.name}
            </span>
            <button className="self-end justify-self-end rounded bg-primary md:px-2 py-1 text-white">
              Contact Supplier
            </button>
          </Link>

          {product.otherVendors?.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-3 text-lg font-semibold">Other Suppliers</h2>
              <div className="flex flex-wrap gap-4">
                {product.otherVendors.map((otherVendor, index) => (
                  <Link
                    href={`/products/${otherVendor.id}`}
                    key={index}
                    className="flex w-64 flex-col rounded-lg border border-gray-200 px-4 py-2 shadow-sm transition duration-200 hover:shadow-md"
                  >
                    <p className="text-sm font-medium text-gray-800">
                      {otherVendor?.vendor?.name || "Unknown Vendor"}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      {otherVendor?.priceRange
                        ? `ETB ${otherVendor.priceRange.min} - ETB ${otherVendor.priceRange.max}`
                        : `ETB ${otherVendor.price || "N/A"}`}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Recommended Products */}
      <div className="w-full">
        <h2 className="mb-3 text-lg font-semibold">Related Products</h2>
        {isLoadingRecommendations ? (
          <p>Loading recommendations...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {recommendedProducts?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                otherSuppliersCount={0}
              />
            ))}
          </div>
        )}
      </div>

    {/* product description */}
      <div>
      <h2 className="mb-3 text-lg font-semibold">Descriptions</h2>
      {product.description}
      </div>
    </div>
  );
};

export default ProductDetail;
