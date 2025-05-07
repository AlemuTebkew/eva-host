"use client";

import { useState } from "react";
import ProductBanner from "@/components/Banner";
import { FilterIcon } from "lucide-react";
import ProductList from "@/components/Product/ProductList";
import Filter from "@/components/Product/ProductFilter";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { useFilterProductsQuery } from "@/store/app-api";
import ProductListSkeleton from "../Skeleton/ProductListSkeleton";
import { FilterType, SortOption, SortValue } from "@/types/product";
import SortDropdown from "../Sort";
import { AnimatePresence, motion } from "framer-motion";

const sortOptions: SortOption[] = [
  {
    label: "Price: Low to High",
    value: {
      sortBy: "price",
      sortOrder: "ASC",
    },
  },
  {
    label: "Price: High to Low",
    value: {
      sortBy: "price",
      sortOrder: "DESC",
    },
  },
];

interface SearchPageProps {
  hideVendor?: boolean;
  bgWite?: boolean;
  supplierId?: string;
}

export default function SearchPage({ hideVendor, bgWite, supplierId }: SearchPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("keyword") || "";
  const categoryIdSearchQuery = searchParams.get("categoryId") || "";
  const subCategoryIdSearchQuery = searchParams.get("subCategoryId") || "";
  const minPriceSearchQuery = searchParams.get("minPrice") || "";
  const maxPriceSearchQuery = searchParams.get("maxPrice") || "";
  const sortByParam = searchParams.get("sortBy") || "";
  const sortOrderParam = searchParams.get("sortOrder") || "";
  const [selectedSort, setSelectedSort] = useState<SortValue | null>(
    sortByParam && sortOrderParam
      ? { sortBy: sortByParam, sortOrder: sortOrderParam }
      : null,
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryIdSearchQuery,
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(
    subCategoryIdSearchQuery,
  );
  const [minPrice, setMinPrice] = useState<string | null>(
    minPriceSearchQuery ?? null,
  );
  const [maxPrice, setMaxPrice] = useState<string | null>(
    maxPriceSearchQuery ?? null,
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const buildFilterParams = () => {
    const params: Record<string, string | number> = {};

    const keyword = searchParams.get("keyword");
    if (keyword) params.keyword = keyword;

    const categoryId = searchParams.get("categoryId");
    if (categoryId) params.categoryId = categoryId;

    const subCategoryId = searchParams.get("subCategoryId");
    if (subCategoryId) params.subCategoryId = subCategoryId;

    const minPrice = searchParams.get("minPrice");
    if (minPrice) params.minPrice = Number(minPrice);

    const maxPrice = searchParams.get("maxPrice");
    if (maxPrice) params.maxPrice = Number(maxPrice);

    const sortBy = searchParams.get("sortBy");
    if (sortBy) params.sortBy = sortBy;

    const sortOrder = searchParams.get("sortOrder");
    if (sortOrder) params.sortOrder = sortOrder;

    if (supplierId) params.vendorId = supplierId;
    params.page = currentPage;
    params.limit = 10;

    return params;
  };

  const { data, refetch, isLoading, isSuccess } = useFilterProductsQuery({
    params: buildFilterParams(),
  });

  const handleSortChange = (value: SortValue) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value.sortBy && value.sortOrder) {
      params.set("sortBy", value.sortBy);
      params.set("sortOrder", value.sortOrder);
    }
    router.push(`?${params.toString()}`);
    setSelectedSort(value);
    refetch();
  };

  const handleOnPageChange = (page: number) => {
    setCurrentPage(page);
    refetch();
  };

  const handleOnApplyFilter = (filters: FilterType) => {
    const params = new URLSearchParams(searchParams.toString());
    if (filters.category) {
      setSelectedCategory(filters.category);
      params.set("categoryId", filters.category);
    } else {
      params.delete("categoryId");
    }

    if (filters.subCategory) {
      setSelectedSubCategory(filters.subCategory);
      params.set("subCategoryId", filters.subCategory);
    } else {
      params.delete("subCategoryId");
    }

    if (filters.minPrice) {
      setMinPrice(filters.minPrice);
      params.set("minPrice", filters.minPrice.toString());
    } else {
      params.delete("minPrice");
    }

    if (filters.maxPrice) {
      setMaxPrice(filters.maxPrice);
      params.set("maxPrice", filters.maxPrice.toString());
    } else {
      params.delete("maxPrice");
    }

    // ✅ This updates the route without a full page reload
    router.push(`?${params.toString()}`);
    filters.category && setSelectedCategory(filters.category);
    filters.subCategory && setSelectedSubCategory(filters.subCategory);
    filters.minPrice && setMinPrice(filters.minPrice);
    filters.maxPrice && setMaxPrice(filters.maxPrice);
    refetch();
  };

  return (
    <main
      className={`mx-auto mt-2 max-w-c-1235 px-2 pb-8 lg:mt-4 lg:px-6 ${bgWite ? "bg-white" : "bg-[#F4F4F4]"}`}
    >
      {/* Banner */}
      <ProductBanner
        items={[
          {
            image:
              "/images/bottom-ads.png",
            link: "/products/1",
          },
          {
            image:
              "https://www.photomarketingwizard.com/wp-content/uploads/2018/02/ecommerce-product-photography-25-768x768.jpg",
            link: "/products/2",
          },
          {
            image:
              "https://www.peekage.com/blog/wp-content/uploads/2020/06/sephora-free-samples-1024x1024.jpg",
            link: "/products/3",
          },
        ]}
      />

      {/* Mobile Filter Button */}
      <div className="my-2 flex w-full items-center justify-end gap-2 pr-1 lg:hidden">
        <Button
          variant={"outline"}
          className=""
          onClick={() => setIsFilterOpen(true)}
        >
          <FilterIcon className="h-8 w-8 text-gray-700" />
        </Button>
        <SortDropdown
          sortOptions={sortOptions}
          selectedSort={selectedSort}
          onChange={handleSortChange}
        />
        {/* <Button variant={"outline"} className=''>
            <SortDesc className="w-6 h-6 text-gray-700" />
          </Button> */}
      </div>

      {/* Product List Section */}
      {isLoading && <ProductListSkeleton />}
      {isSuccess && data && (
        <div className="grid grid-cols-1 gap-6 lg:mt-8 lg:grid-cols-5">
          <div className="hidden lg:block lg:col-span-1">
            <Filter
              onApplyFilters={handleOnApplyFilter}
              onClose={setIsFilterOpen}
            />
          </div>
          <div className="col-span-3 flex flex-col">
            <div>
              <div className="mb-4 hidden items-center justify-between lg:flex">
                <p>{`Showing ${data.meta.total} products from global suppliers`}</p>

                <SortDropdown
                  sortOptions={sortOptions}
                  selectedSort={selectedSort}
                  onChange={handleSortChange}
                />
              </div>
              <ProductList
                products={data.data}
                metaData={data.meta}
                onPageChange={handleOnPageChange}
                hideVendor={hideVendor}
              />
            </div>
          </div>
        </div>
      )}
      {/* Mobile Filter Dialog */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            {/* Overlay background */}
            <motion.div
              className="fixed inset-0 z-50 bg-black bg-opacity-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)} // Close on click outside
            />

            {/* Filter panel */}
            <motion.div
              className="fixed bottom-0 right-0 top-0 z-50 mt-[150px] h-screen bg-white shadow-lg lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <Filter
                onApplyFilters={handleOnApplyFilter}
                onClose={setIsFilterOpen}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
