'use client';

import { useState } from 'react';
import Footer from '@/components/Footer';
import ProductBanner from '@/components/ProductBanner';
import { ChevronRight, FilterIcon, X } from 'lucide-react';
import ProductList from '@/components/ProductList';
import Filter from '@/components/Filters';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Product } from '@/types/product';

export default function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['Category 1', 'Category 2', 'Category 3'];

  const handleCategoryChange = (category: string) => {
    // setSelectedCategory(category);
    // setIsFilterOpen(false); // Close filter after selection on mobile
  };

  // Example product list
  const productList: Product[] = [
    { id: '1', name: 'Product One', price: 99.99, image: '/images/product-1.jpg', category: 'Category 1', material: 'Material A', rating: 4.5, available: true },
    { id: '2', name: 'Product Two', price: 149.99, image: '/images/product-2.jpg', category: 'Category 2', material: 'Material B', rating: 4.0, available: true },
    { id: '3', name: 'Product Three', price: 79.99, image: '/images/product-3.jpg', category: 'Category 3', material: 'Material C', rating: 3.5, available: false },
    { id: '4', name: 'Product Four', price: 59.99, image: '/images/product-4.jpg', category: 'Category 4', material: 'Material D', rating: 4.7, available: true },
  ];

  const filteredProducts = selectedCategory
    ? productList.filter((product) => product.category === selectedCategory)
    : productList;

  return (
    <main className="container pb-8">
      {/* Breadcrumbs */}
      <div className="flex gap-2 items-center mb-6 text-gray-700 text-sm">
        <h1 className="font-medium">Home</h1>
        <ChevronRight className="w-4 h-4" />
        <h1 className="font-medium">All Products</h1>
      </div>

      {/* Banner */}
      <ProductBanner />

      {/* Mobile Filter Button */}
      <div className="my-4 flex justify-between items-center w-full border-b py-2 lg:hidden">
        <h1 className="text-lg font-semibold">All Products</h1>
        <button onClick={() => setIsFilterOpen(true)}>
          <FilterIcon className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Product List Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:mt-8">
        {/* Sidebar Filter for Desktop */}
        <div className="hidden lg:block">
          <Filter
            categories={categories}
            brands={[]}
            priceRange={[10, 1000]}
            materials={[]}
            sizes={[]}
            ratings={[]}
            handleFilterChange={handleCategoryChange}
          />
        </div>

        {/* Product Cards Section */}
        <div className="col-span-3">
          <ProductList products={filteredProducts} filters={filteredProducts}/>
        </div>
      </div>

      {/* Mobile Filter Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="fixed bottom-0 w-screen h-screen py-6 bg-white overflow-y-auto">
          <DialogHeader className="flex justify-between items-center pb-4">
            
          </DialogHeader>
          <Filter
            categories={categories}
            brands={[]}
            priceRange={[10, 1000]}
            materials={[]}
            sizes={[]}
            ratings={[]}
            handleFilterChange={handleCategoryChange}
          />
        </DialogContent>
      </Dialog>
    </main>
  );
}