'use client';

import { useState } from 'react';
import ProductBanner from '@/components/ProductBanner';
import { FilterIcon, SortDesc } from 'lucide-react';
import ProductList from '@/components/ProductList';
import Filter from '@/components/Filters';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import { useFilterProductsQuery } from '@/store/app-api';
import { FilterType, SortOption, SortValue } from '@/types/product';
import SortDropdown from '../Sort';

const sortOptions: SortOption[] = [
  {
    label: "Price: Low to High",
    value: {
      sortBy: "price",
      sortOrder: "asc",
    },
  },
  {
    label: "Price: High to Low",
    value: {
      sortBy: "price",
      sortOrder: "desc",
    },
  },
]

export default function ProductPage() {
  const searchParams = useSearchParams();
  const categoryIdSearchQuery = searchParams.get('categoryId') || '';
  const subCategoryIdSearchQuery = searchParams.get('subCategoryId') || '';
  const sortByParam = searchParams.get('sortBy') || '';
  const sortOrderParam = searchParams.get('sortOrder') || '';
  const [selectedSort, setSelectedSort] = useState<SortValue | null>((sortByParam && sortOrderParam) ? { sortBy: sortByParam, sortOrder: sortOrderParam } : null);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryIdSearchQuery);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(subCategoryIdSearchQuery);
  const [minPrice, setMinPrice] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, refetch } = useFilterProductsQuery({
    params: {
      keyword: "",
      ...( selectedCategory && { categoryId: selectedCategory }),
      ...( selectedSubCategory && { subCategoryId: selectedSubCategory }),
      ...( minPrice && { minPrice: minPrice }),
      ...( maxPrice && { maxPrice: maxPrice }),
      page: currentPage,
      limit: 5
    },
  });

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSortChange = (value: SortValue) => {
    setSelectedSort(value);
    setIsOpen(false);
  };

  const handleOnPageChange = (page: number) => {
    setCurrentPage(page)
    refetch();
  }

  const handleOnApplyFilter = (filters: FilterType) => {
    filters.category && setSelectedCategory(filters.category)
    filters.subCategory && setSelectedSubCategory(filters.subCategory)
    filters.minPrice && setMinPrice(filters.minPrice)
    filters.maxPrice && setMaxPrice(filters.maxPrice)
    refetch()
  }
 
  return (
    <main className="max-w-c-1235 mx-auto px-2 pb-8 mt-2 lg:mt-4 lg:px-6 bg-[#F4F4F4]">
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
      
      <div className='hidden gap-8 mt-8 mb-4 lg:flex'>
        <p className='font-medium cursor-pointer'>Products</p>
        <p className='font-medium cursor-pointer'>Suppliers</p>
      </div>

      {/* Mobile Filter Button */}
      <div className="flex justify-end items-center w-full mt-6 mb-2 pr-1 gap-2 lg:hidden">
          <Button variant={"outline"} className=''>
            <FilterIcon className="w-8 h-8 text-gray-700" />
          </Button>
          <Button variant={"outline"} className=''>
            <SortDesc className="w-6 h-6 text-gray-700" />
          </Button>
      </div>

      {/* Product List Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Sidebar Filter for Desktop */}
        <div className="hidden lg:block">
          <Filter onApplyFilters={handleOnApplyFilter}/>
        </div>

        {/* Product Cards Section */}
        {/* <div className="col-span-4 flex flex-col">
          {data && (
            <div>
              <div className='hidden flex justify-between items-center mb-4 lg:flex'>
                <p>{`Showing ${data.meta.total} products from global suppliers`}</p>
                <SortDropdown selectedSort={selectedSort} />
                <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="text-sm text-gray-800 border border-gray-300 px-4 py-2 rounded-md flex items-center gap-2 hover:border-gray-400 focus:outline-none"
                >
                  <SortDesc size={16} className="text-gray-500" />
                  Sort By: {sortOptions.find((o) => o.value === selectedSort)?.label}
                </button>

                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <ul className="py-2">
                        {sortOptions.map((option) => (
                          <li key={option.value}>
                            <label
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="sort"
                                value={option.value}
                                checked={selectedSort === option.value}
                                onChange={() => handleSortChange(option.value)}
                                className="mr-2"
                              />
                              {option.label}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

              </div>
              <ProductList products={data.data} metaData={data.meta} onPageChange={handleOnPageChange}/>
            </div>
          )
          }
        </div> */}
        <SortDropdown sortOptions={sortOptions} selectedSort={selectedSort} onChange={handleSortChange}/>
      </div>

      {/* Mobile Filter Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="fixed bottom-0 w-screen h-screen py-6 bg-white overflow-y-auto">
          <DialogHeader className="flex justify-between items-center pb-4">
            
          </DialogHeader>
            <Filter onApplyFilters={handleOnApplyFilter}/>
        </DialogContent>
      </Dialog>
    </main>
  );
}