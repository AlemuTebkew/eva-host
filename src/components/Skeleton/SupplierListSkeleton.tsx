import { Skeleton } from '@/components/ui/skeleton';

export default function SupplierListSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-5 pt-8">
      {/* Filter Panel - Hidden on Mobile */}
      <div className="hidden lg:p-4 lg:block bg-white rounded-lg">
        <div className="space-y-4">
          {/* Industry Filters */}
          <div>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-5 w-3/4 mb-1" />
            <Skeleton className="h-5 w-3/4 mb-1" />
            <Skeleton className="h-5 w-3/4 mb-1" />
          </div>

          {/* Location Filter */}
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

      {/* Main Supplier List */}
      <div className="w-full col-span-5 lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:px-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-4 flex flex-col">
            <Skeleton className="h-32 w-full mb-4 rounded" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
