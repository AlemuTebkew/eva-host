import { Product } from '@/types/product';
import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import PaginationControls from '../Pagination';

interface ProductListProps {
  products: Product[];
  filters: any;
}

const ITEMS_PER_PAGE = 10;

const ProductList: React.FC<ProductListProps> = ({ products, filters }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...products];

      if (filters.category) {
        filtered = filtered.filter(product => product.category === filters.category);
      }


      if (filters.price) {
        filtered = filtered.filter(product => product.price <= filters.price);
      }

      setCurrentPage(1); // Reset to page 1 when filters change
      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [filters, products]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="w-full lg:px-0">
      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-3 lg:gap-8">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              images={[
                'https://tse2.mm.bing.net/th?id=OIP.a-YDWw7IcFGxYeuz_1wUrgHaHa&pid=Api',
                'https://www.photomarketingwizard.com/wp-content/uploads/2018/02/ecommerce-product-photography-25-768x768.jpg',
                'https://www.peekage.com/blog/wp-content/uploads/2020/06/sephora-free-samples-1024x1024.jpg'
              ]}
              productName={product.name}
              supplier={product.vendor.name}
              priceRange={product.price.toString()}
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
      {3 > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </section>
  );
};

export default ProductList;