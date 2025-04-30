import { ProductDetails } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductDetailProps {
  product: ProductDetails
}

const images = [
  'https://www.peekage.com/blog/wp-content/uploads/2020/06/sephora-free-samples-1024x1024.jpg',
  'https://www.photomarketingwizard.com/wp-content/uploads/2018/02/ecommerce-product-photography-25-768x768.jpg',
  'https://tse2.mm.bing.net/th?id=OIP.a-YDWw7IcFGxYeuz_1wUrgHaHa&pid=Api',
]

const ProductDetail = ({product}: ProductDetailProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 lg:p-4 mx-auto">
      {/* Image section */}
      <div className="flex flex-col-reverse gap-4 lg:flex-row">
        {/* Thumbnails vertical */}
        <div className="flex lg:flex-col gap-2 overflow-y-auto max-h-[400px]">
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
      <div className="space-y-4 w-full">
        <h1 className="text-xl font-semibold leading-tight">{product.name}</h1>

        {
          product.priceTiers && product.priceTiers.length > 0 ? <div className="flex flex-wrap gap-8">
            {
              product.priceTiers.map((priceTier,index) => (
                <div className="flex flex-col gap-1" key={index}>
                  <p className="font-normal">{`${priceTier.minQty} ${product.unit}`}</p>
                  <p className="text-2xl font-semibold">{`ETB ${priceTier.price}`}</p>
                </div>
              ))
            }
          </div> :
          <div className="flex gap-2 items-center">
            <span className="text-2xl font-bold text-primary">{product.price}</span>
            <span className="text-gray-400 text-sm">{`• Last Price update on ${product.priceUpdatedAt}`}</span>
          </div>
        }

        <div className="text-sm text-gray-600">
          Minimum order quantity: <strong>{`${product.minOrderQuantity} ${product.unit}`}</strong>
        </div>

        <div className="text-sm text-gray-700 flex gap-2">
          <strong>Product Condition:</strong> {product.condition ?? "Used"}
          {
            product.attributes?.map((attribute, index) => (
              <span key={index}>
                <strong>{attribute.name}:</strong> {attribute.value}
              </span>
            ))
          }
        </div>

        <Link href={`/suppliers/${product.vendor.id}`} className="flex items-center w-full border p-2 rounded justify-between gap-8">
          <span className="truncate max-w-full text-gray-700" title={product.vendor.name}>
            {product.vendor.name}
          </span>
          <button className="bg-primary text-white px-2 py-1 rounded justify-self-end self-end">Contact Supplier</button>
        </Link>

        {product.otherVendors?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3">Other Suppliers</h2>
            <div className="flex flex-wrap gap-4">
              {product.otherVendors.map((otherVendor, index) => (
                <Link 
                href={`/products/${otherVendor.id}`}
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
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetail;