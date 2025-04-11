import Image from "next/image";
import { useState } from "react";

interface ProductDetailProps {
  title: string;
  images: string[];
  minOrderQty: number;
  description: string;
  condition: string;
  attributes?: { name: string; value: string }[];
  vendor: {
    id: string;
    name: string;
    rating: number | null;
  };
  price: string;
  priceUpdateDate: string
  otherVendors: {
    id: string,
    price?: string,
    priceRange?: {
      min: string,
      max: string
    },
    vendor: {
      id: string,
      name: string,

    }
  }[]
  samplePrice: number;
  variations: string[];
  rating: number;
  reviews: number;
  sold: number;
  brand: string;
  shippingNote?: string;
  priceTiers: {
    minQty: number,
    price: number
  }[]
}

const CustomProductDetail = ({
  title,
  images,
  price,
  samplePrice,
  minOrderQty,
  variations,
  rating,
  reviews,
  sold,
  brand,
  shippingNote,
  attributes,
  description,
  condition,
  vendor,
  priceUpdateDate,
  priceTiers,
  otherVendors
}: ProductDetailProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex gap-6 p-4 mx-auto">
      {/* Image section */}
      <div className="flex gap-4">
        {/* Thumbnails vertical */}
        <div className="flex flex-col gap-2 overflow-y-auto max-h-[400px]">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative w-16 h-16 rounded-md overflow-hidden border-2 ${
                index === activeIndex ? 'border-black' : 'border-transparent'
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
        {/* Main Image (smaller size) */}
        <div className="relative w-80 h-80 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={images[activeIndex]}
            alt={`Product Image ${activeIndex + 1}`}
            fill
            className="object-contain"
          />
        </div>
      </div>
      

      {/* Product Details */}
      <div className="space-y-4">
        <h1 className="text-xl font-semibold leading-tight">{title}</h1>

        <div className="flex items-center text-sm space-x-2">
          <span className="text-orange-500 font-semibold">{rating.toFixed(1)}</span>
          <span className="text-gray-600">({reviews} reviews)</span>
          <span className="text-gray-400">• {sold} sold</span>
        </div>

        {
          priceTiers && priceTiers.length > 0 ? <div className="flex flex-wrap gap-8">
            {
              priceTiers.map((priceTier) => (
                <div className="flex flex-col gap-1">
                  <p className="font-normal">{`${priceTier.minQty} Piece`}</p>
                  <p className="text-2xl font-semibold">{`ETB ${priceTier.price}`}</p>
                </div>
              ))
            }
          </div> :
          <div className="flex gap-2 items-center">
            <span className="text-2xl font-bold text-primary">{price}</span>
            <span className="text-gray-400 text-sm">{`• Last Price update on ${priceUpdateDate}`}</span>
          </div>
        }

        <div className="text-sm text-gray-600">
          Minimum order quantity: <strong>{minOrderQty} pieces</strong>
        </div>

        <div className="text-sm text-gray-700 flex gap-2">
          <strong>Product Condition:</strong> {condition ?? "Used"}
          {
            attributes?.map(attribute => (
              <><strong>{attribute.name}:</strong> {attribute.value}</>
            ))
          }
        </div>

        <div className="flex items-center w-full border p-2 rounded justify-between">
          <span className="truncate max-w-full text-gray-700" title={vendor.name}>
            {vendor.name}
          </span>
          <button className="bg-primary text-white p-2 rounded justify-self-end self-end">Contact Supplier</button>
        </div>

        {/* <button className="mt-4 bg-primary text-white px-4 py-2 rounded transition">
          Contact Supplier
        </button> */}
        {otherVendors?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3">Other Suppliers</h2>
            <div className="flex flex-wrap gap-4">
              {otherVendors.map((otherVendor, index) => (
                <div
                  key={index}
                  className="flex flex-col border border-gray-200 rounded-lg py-2 px-4 shadow-sm hover:shadow-md transition duration-200 w-64"
                >
                  <p className="text-sm font-medium text-gray-800">
                    {otherVendor?.vendor?.name || 'Unknown Vendor'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {otherVendor?.priceRange
                      ? `ETB ${otherVendor.priceRange.min} - ETB ${otherVendor.priceRange.max}`
                      : `ETB ${otherVendor.price || 'N/A'}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CustomProductDetail;