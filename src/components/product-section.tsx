'use client';
import Link from 'next/link';
import type { Product } from '@/types/product';
import ProductCard from '@/components/product-card';
import { useTranslations } from 'next-intl';

interface ProductSectionProps {
  title: string;
  products: Product[];
  viewMoreLink: string;
}

export default function ProductSection({
  title,
  products,
  viewMoreLink,
}: ProductSectionProps) {
  const t = useTranslations('productSection'); // Use the "productSection" namespace for translations

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
        <Link
          href={viewMoreLink}
          className="hidden md:flex items-center text-sm text-blue-600 hover:underline"
        >
          {t('seeMore')} <span className="ml-1">→</span>
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
            vendorName={product.vendor?.name}
            image={product.image || (product.images && product.images[0])}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-center md:hidden">
        <Link
          href={viewMoreLink}
          className="text-sm text-blue-600 hover:underline"
        >
          {t('seeMore')} →
        </Link>
      </div>
    </div>
  );
}
