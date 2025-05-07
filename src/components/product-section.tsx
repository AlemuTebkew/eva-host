'use client'
import Link from "next/link"
import type { Product } from "@/types/product"
import ProductCard from "@/components/product-card"

interface ProductSectionProps {
  title: string
  products: Product[]
  viewMoreLink: string
}

export default function ProductSection({ title, products, viewMoreLink }: ProductSectionProps) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
        <Link href={viewMoreLink} className="hidden md:flex items-center text-sm text-blue-600 hover:underline">
          See More <span className="ml-1">→</span>
        </Link>
      </div>
      <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            priceRange={product.priceRange}
            price={Number(product.price)}
            rating={product.rating}
            image={product.image}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-center md:hidden">
        <Link href={viewMoreLink} className="text-sm text-blue-600 hover:underline">
          See More →
        </Link>
      </div>
    </div>
  )
}
