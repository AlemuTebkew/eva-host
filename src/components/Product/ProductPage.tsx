'use client';

import { useState } from 'react';
import ProductBanner from '@/components/ProductBanner';
import { FilterIcon } from 'lucide-react';
import ProductList from '@/components/ProductList';
import Filter from '@/components/Filters';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import Breadcrumb from '../Breadcrumb';
import { useSearchQuery } from '@/store/app-api';
import { useSearchParams } from 'next/navigation';

export default function ProductPage() {
  const searchParams = useSearchParams();
  const categoryIdSearchQuery = searchParams.get('categoryId') || '';
  const subCategoryIdSearchQuery = searchParams.get('subCategoryId') || '';
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryIdSearchQuery);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(subCategoryIdSearchQuery);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data } = useSearchQuery({
    params: {
      keyword: "",
      ...(selectedCategory && { categoryId: selectedCategory }),
      ...(selectedSubCategory && { subCategoryId: selectedSubCategory }),
    },
  });

  const categories = ['Category 1', 'Category 2', 'Category 3'];

  const handleCategoryChange = (category: string) => {
    // setSelectedCategory(category);
    // setIsFilterOpen(false); // Close filter after selection on mobile
  };

  const filteredProducts = selectedCategory
    ? data?.filter((product) => product.category === selectedCategory)
    : data;

  return (
    <main className="max-w-c-1235 mx-auto pb-8 mt-4 px-6 bg-[#F4F4F4]">
      {/* Banner */}
      <ProductBanner
      items={[
        {
          image: 'https://tse2.mm.bing.net/th?id=OIP.a-YDWw7IcFGxYeuz_1wUrgHaHa&pid=Api',
          link: '/products/1'
        },
        {
          image: 'https://www.photomarketingwizard.com/wp-content/uploads/2018/02/ecommerce-product-photography-25-768x768.jpg',
          link: '/products/2'
        },
        {
          image: 'https://www.peekage.com/blog/wp-content/uploads/2020/06/sephora-free-samples-1024x1024.jpg',
          link: '/products/3'
        }
      ]} 
      />

      {/* Breadcrumbs */}
      <Breadcrumb
      items={[
        {
          label: 'Home',
          href: '/'
        },
        {
          label: 'Building Materials',
          href: '/products'
        },
        {
          label: 'Cement & Concrete',
          href: '/products/cement-concrete'
        }
      ]}
      />

      {/* Mobile Filter Button */}
      <div className="mb-4 flex justify-between items-center w-full border-b py-2 lg:hidden">
        <h1 className="text-lg font-semibold">All Products</h1>
        <button onClick={() => setIsFilterOpen(true)}>
          <FilterIcon className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <div className="text-center my-8">
        <p>
          <span className="font-semibold text-lg">(103)</span> products found
        </p>
      </div>

      {/* Product List Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:mt-8">
        {/* Sidebar Filter for Desktop */}
        <div className="hidden lg:block">
          <Filter
            // categories={categories}
            // subCategories={[]}
            handleFilterChange={handleCategoryChange}
          />
        </div>

        {/* Product Cards Section */}
        <div className="col-span-3">
          {data && (
            <ProductList products={data} filters={filteredProducts}/>
          )
          }
        </div>
      </div>

      {/* Mobile Filter Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="fixed bottom-0 w-screen h-screen py-6 bg-white overflow-y-auto">
          <DialogHeader className="flex justify-between items-center pb-4">
            
          </DialogHeader>
            <Filter
              // categories={categories}
              // subCategories={[]}
              handleFilterChange={handleCategoryChange}
            />
        </DialogContent>
      </Dialog>
    </main>
  );
}