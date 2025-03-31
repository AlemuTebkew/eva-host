import { Product } from '@/types/product';
import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';

interface ProductListProps {
  products: Product[];
  filters: any;
}

const ProductList: React.FC<ProductListProps> = ({ products, filters }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...products];

      // Apply Category Filter
      if (filters.category) {
        filtered = filtered.filter((product) => product.category === filters.category);
      }

      // Apply Material Filter
      if (filters.material) {
        filtered = filtered.filter((product) => product.material === filters.material);
      }

      // Apply Price Range Filter
      if (filters.price) {
        filtered = filtered.filter((product) => product.price <= filters.price);
      }

      // Apply Rating Filter
      if (filters.rating) {
        filtered = filtered.filter((product) => product.rating >= filters.rating);
      }

      // Apply Stock Availability Filter
      if (filters.inStock) {
        filtered = filtered.filter((product) => product.available);
      }

      // Apply Eco-Friendly Filter
      if (filters.ecoFriendly) {
        filtered = filtered.filter((product) => product.material === 'Eco-friendly'); // This can be adjusted based on how you define eco-friendly products
      }

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [filters, products]);

  return (
    <div className="product-list grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-8">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard
          key={product.id}
          images={[
            'https://tse2.mm.bing.net/th?id=OIP.a-YDWw7IcFGxYeuz_1wUrgHaHa&pid=Api',
            'https://www.photomarketingwizard.com/wp-content/uploads/2018/02/ecommerce-product-photography-25-768x768.jpg',
            'https://www.peekage.com/blog/wp-content/uploads/2020/06/sephora-free-samples-1024x1024.jpg'
          ]}
          productName='Premium-Grade Portland Cement'
          supplier='Nexus Industrial Supplies'
          priceRange='1900 - 3600'
          otherSuppliersCount={4}
           />
        ))
      ) : (
        <p className="col-span-full text-center text-lg text-gray-500">
          No products found.
        </p>
      )}
    </div>
  );
};

export default ProductList;
