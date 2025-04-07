import { MetaData, Product } from '@/types/product';
import React from 'react';
import ProductCard from '../ProductCard';
import GenericPagination from '../Pagination';

interface ProductListProps {
  products: Product[];
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, metaData, onPageChange }) => {

  return (
    <section className="w-full lg:px-0">
      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              otherSuppliersCount={4}
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
      
      <GenericPagination
        currentPage={metaData.page}
        totalPages={metaData.totalPages}
        onPageChange={(page) => {onPageChange(page)}}
      />
    </section>
  );
};

export default ProductList;