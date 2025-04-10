import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailSkeleton = () => {
  return (
    <div className="w-full px-4 py-8 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery Skeleton */}
        <div className="space-y-4">
          <Skeleton className="w-full h-96 rounded-lg" />
          <div className="flex space-x-2">
            <Skeleton className="w-20 h-20 rounded-md" />
            <Skeleton className="w-20 h-20 rounded-md" />
            <Skeleton className="w-20 h-20 rounded-md" />
            <Skeleton className="w-20 h-20 rounded-md" />
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" /> {/* Product Title */}
          <Skeleton className="h-6 w-1/4" /> {/* Price */}
          <Skeleton className="h-5 w-1/2" /> {/* Brand / Category */}
          <Skeleton className="h-12 w-full" /> {/* Description Short */}
          <Skeleton className="h-40 w-full" /> {/* Full Description */}

          {/* Button Actions */}
          <div className="flex space-x-4 pt-4">
            <Skeleton className="h-10 w-1/2 rounded-md" />
            <Skeleton className="h-10 w-1/2 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
