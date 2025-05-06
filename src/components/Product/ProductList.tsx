import { MetaData, Product } from '@/types/product';
import React from 'react';
import ProductCard from './ProductCard';
import GenericPagination from '../Pagination';

interface ProductListProps {
  products: Product[];
  metaData: MetaData;
  onPageChange: (page: number) => void;
  hideVendor?: boolean
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  metaData,
  onPageChange,
  hideVendor,
}) => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              otherSuppliersCount={4}
              hideVendor={hideVendor}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center text-center py-10 text-gray-500">
            <p className="text-lg font-medium">No products found</p>
            <span className="text-sm">Try adjusting your filters or search again.</span>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center">
        <GenericPagination
          currentPage={metaData.page}
          totalPages={metaData.totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </section>
  );
};

export default ProductList;