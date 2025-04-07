import { Skeleton } from "../ui/skeleton";

const ProductListSkeleton = ({ productCount = 8 }) => {
  return (
    <div className="grid grid-cols-5 pt-8">
      {/* Filter Panel - Hidden on Mobile */}
      <div className="p-4 hidden lg:block bg-white rounded-lg ">
        <div className="space-y-4">
          {/* Category Filters */}
          <div>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-5 w-3/4 mb-1" />
            <Skeleton className="h-5 w-3/4 mb-1" />
            <Skeleton className="h-5 w-3/4 mb-1" />
          </div>

          {/* Price Range Filter */}
          <div>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-5 w-3/4 mb-1" />
            <Skeleton className="h-5 w-3/4 mb-1" />
          </div>

          {/* Rating Filter */}
          <div>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-5 w-3/4 mb-1" />
            <Skeleton className="h-5 w-3/4 mb-1" />
          </div>
        </div>
      </div>

      {/* Main Product List */}
      <div className="w-full px-4 col-span-5 lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(productCount)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg p-4 flex flex-col">
            <Skeleton className="h-48 w-full mb-4 rounded" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListSkeleton;
