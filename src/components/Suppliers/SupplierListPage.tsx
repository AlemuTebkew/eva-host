'use client';

import { useState } from 'react';
import { FilterIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
// import { useFilterSuppliersQuery } from '@/store/app-api';
import { AnimatePresence, motion } from 'framer-motion';
import { SortOption, SortValue } from '@/types/product';
import SupplierBanner from '@/components/Suppliers/SupplierBanner';
import SortDropdown from '@/components/Sort';
import SupplierListSkeleton from '@/components/Skeleton/SupplierListSkeleton';
import { Button } from '@/components/ui/button';
import SupplierFilters from '@/components/Suppliers/SupplierFilter';
import SupplierList from '@/components/Suppliers/SupplierList';
import { Supplier, SupplierFilterType } from '@/types/supplier';

const sortOptions: SortOption[] = [
  {
    label: "Rating: High to Low",
    value: {
      sortBy: "rating",
      sortOrder: "DESC",
    },
  },
  {
    label: "Rating: Low to High",
    value: {
      sortBy: "rating",
      sortOrder: "ASC",
    },
  },
];


export const sampleSuppliers: Supplier[] = [
  {
    id: "1",
    bio: "",
    companyTIN: "",
    licensePhoto: "",
    logo: "",
    status: "",
    companyName: "Addis Textiles",
    industry: "Textiles",
    location: "Addis Ababa",
    rating: 4.5,
    logoUrl: "https://example.com/logos/addis-textiles.png",
    description: "Leading supplier of traditional and modern textiles.",
    contactEmail: "info@addistextiles.com",
    phoneNumber: "+251911223344",
    website: "https://addistextiles.com",
    isVerified: true,
    totalProducts: "120",
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2024-03-10T09:30:00Z",
  },
  {
    id: "2",
    bio: "",
    companyTIN: "",
    licensePhoto: "",
    logo: "",
    status: "",
    companyName: "EthioAgro",
    industry: "Agriculture",
    location: "Bahir Dar",
    rating: 4.2,
    logoUrl: "https://example.com/logos/ethioagro.png",
    description: "Supplier of organic agricultural products and seeds.",
    contactEmail: "support@ethioagro.com",
    phoneNumber: "+251922334455",
    website: "https://ethioagro.com",
    isVerified: false,
    totalProducts: "87",
    createdAt: "2022-11-20T08:30:00Z",
    updatedAt: "2024-02-22T14:15:00Z",
  },
  {
    id: "3",
    bio: "",
    companyTIN: "",
    licensePhoto: "",
    logo: "",
    status: "",
    companyName: "Horizon Electronics",
    industry: "Electronics",
    location: "Hawassa",
    rating: 4.7,
    logoUrl: "https://example.com/logos/horizon-electronics.png",
    description: "Distributor of household and industrial electronics.",
    contactEmail: "sales@horizonelectronics.com",
    phoneNumber: "+251933445566",
    website: "https://horizonelectronics.com",
    isVerified: true,
    totalProducts: "230",
    createdAt: "2023-04-12T11:20:00Z",
    updatedAt: "2024-04-01T16:45:00Z",
  },
  {
    id: "4",
    bio: "",
    companyTIN: "",
    licensePhoto: "",
    logo: "",
    status: "",
    companyName: "GreenPack Ethiopia",
    industry: "Packaging",
    location: "Adama",
    rating: 4.0,
    logoUrl: "https://example.com/logos/greenpack.png",
    description: "Eco-friendly packaging supplier for food and retail.",
    contactEmail: "hello@greenpacket.com",
    phoneNumber: "+251944556677",
    website: "https://greenpacket.com",
    isVerified: false,
    totalProducts: "45",
    createdAt: "2022-07-18T09:10:00Z",
    updatedAt: "2024-01-05T12:00:00Z",
  }
];

export default function SupplierListPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQuery = searchParams.get('keyword') || '';
  const locationQuery = searchParams.get('location') || '';
  const sortByParam = searchParams.get('sortBy') || '';
  const sortOrderParam = searchParams.get('sortOrder') || '';

  const [selectedSort, setSelectedSort] = useState<SortValue | null>((sortByParam && sortOrderParam) ? { sortBy: sortByParam, sortOrder: sortOrderParam } : null);
  const [selectedLocation, setSelectedLocation] = useState<string>(locationQuery);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // const { data, refetch, isLoading, isSuccess } = useFilterSuppliersQuery({
  //   params: {
  //     keyword: searchQuery,
  //     ...(selectedLocation && { location: selectedLocation }),
  //     ...(sortByParam && { sortBy: sortByParam }),
  //     ...(sortOrderParam && { sortOrder: sortOrderParam }),
  //     page: currentPage,
  //     limit: 10,
  //   },
  // });

  const handleSortChange = (value: SortValue) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value.sortBy && value.sortOrder) {
      params.set("sortBy", value.sortBy);
      params.set("sortOrder", value.sortOrder);
    }
    router.push(`?${params.toString()}`);
    setSelectedSort(value);
    // refetch();
  };

  const handleOnPageChange = (page: number) => {
    setCurrentPage(page);
    // refetch();
  };

  const handleOnApplyFilter = (filters: SupplierFilterType) => {
    const params = new URLSearchParams(searchParams.toString());

    router.push(`?${params.toString()}`);
    // refetch();
  };

  return (
    <main className="max-w-c-1235 mx-auto px-2 pb-8 mt-2 lg:mt-4 lg:px-6 bg-[#F4F4F4] bg-white">
      <SupplierBanner 
      items={[
        {
          image: 'https://www.peekage.com/blog/wp-content/uploads/2020/06/sephora-free-samples-1024x1024.jpg',
          link: '/products/3'
        },
        {
          image: 'https://tse2.mm.bing.net/th?id=OIP.a-YDWw7IcFGxYeuz_1wUrgHaHa&pid=Api',
          link: '/products/1'
        },
        {
          image: 'https://www.photomarketingwizard.com/wp-content/uploads/2018/02/ecommerce-product-photography-25-768x768.jpg',
          link: '/products/2'
        }
      ]} 
      />

      <div className="flex justify-end items-center w-full pr-1 gap-2 lg:hidden my-2">
        <Button variant={"outline"} onClick={() => setIsFilterOpen(true)}>
          <FilterIcon className="w-8 h-8 text-gray-700" />
        </Button>
        <SortDropdown sortOptions={sortOptions} selectedSort={selectedSort} onChange={handleSortChange} />
      </div>

      {false && <SupplierListSkeleton />}

      {true && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:mt-8">
          <div className="hidden lg:block">
            <SupplierFilters onApplyFilters={handleOnApplyFilter} onClose={setIsFilterOpen} />
          </div>
          <div className="col-span-4 flex flex-col">
            <div className='hidden lg:flex justify-between items-center mb-4'>
              <p>{`Showing ${5} suppliers`}</p>
              <SortDropdown sortOptions={sortOptions} selectedSort={selectedSort} onChange={handleSortChange} />
            </div>
            <SupplierList suppliers={sampleSuppliers} metaData={{limit: 10, page:1, total:40}} onPageChange={handleOnPageChange} />
          </div>
        </div>
      )}

      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
            />

            <motion.div
              className="fixed right-0 top-0 bottom-0 bg-white z-50 h-screen shadow-lg lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <SupplierFilters onApplyFilters={handleOnApplyFilter} onClose={setIsFilterOpen} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
