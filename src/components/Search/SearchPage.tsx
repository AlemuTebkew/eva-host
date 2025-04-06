'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FilterIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import Breadcrumb from '../Breadcrumb';
import ProductList from '@/components/ProductList';
import Filter from '@/components/Filters';
import { Product } from '@/types/product';
import { useSearchQuery } from '@/store/app-api';

export default function SearchResultPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const { data } = useSearchQuery({params: { keyword: searchQuery }});

  const categories = ['Category 1', 'Category 2', 'Category 3'];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setIsFilterOpen(false);
  };

  const filteredProducts = selectedCategory
    ? data?.filter(p => p.category === selectedCategory)
    : data;

  return (
    <main className="max-w-c-1235 mx-auto pb-8 mt-4 px-6">
      {/* Mobile Filter Button */}
      <div className="mb-4 flex justify-between items-center w-full border-b py-2 lg:hidden">
        <h1 className="text-lg font-semibold">Search Results</h1>
        <button onClick={() => setIsFilterOpen(true)}>
          <FilterIcon className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Product List Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filter for Desktop */}
        <div className="hidden lg:block">
          <Filter
            // categories={categories.map((category) => ({ label: category, value: category }))}
            // subCategories={[]}
            handleFilterChange={handleCategoryChange}
          />
        </div>

        {/* Products */}
        <div className="col-span-3">
          <div className=''>
            {/* Search Info */}
            <div className="mb-4">
              <p>
              {`Showing 1,000+ products from global suppliers for ${searchQuery}`}
              </p>
            </div>
            {
              data && (
                <ProductList products={data} filters={filteredProducts} />
              )
            }
          </div>
        </div>
      </div>

      {/* Mobile Filter Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="fixed bottom-0 w-screen h-screen py-6 bg-white overflow-y-auto">
          <DialogHeader className="flex justify-between items-center pb-4" />
            <Filter
              // categories={categories.map((category) => ({ label: category, value: category }))}
              // subCategories={[]}
              handleFilterChange={handleCategoryChange}
            />
        </DialogContent>
      </Dialog>
    </main>
  );
}