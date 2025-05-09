"use client";

import { getImageUrl } from "@/lib/utils";
import { Category } from "@/types/category";
import {
  Truck,
  Grid3X3,
  PaintBucket,
  Pipette,
  Wrench,
  Home,
  Zap,
  Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface MobileCategoryDropdownProps {
  onClose?: () => void;
  categories?: Category[];
}

export default function MobileCategoryDropdown({
  onClose,
  categories,
}: MobileCategoryDropdownProps) {
  const router = useRouter();

  const handleNavigate = (href: string) => {
    router.push(href);
    if (onClose) onClose();
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto p-4">
      <div className="space-y-4">
        {categories?.map((category, index) => (
          <div key={index} className="pb-4">
            <button
              onClick={() => {
                router.push(`/search?categoryId=${category.id}`);
                onClose?.();
              }}
              className="mb-2 flex items-center"
            >
              <img
                src={getImageUrl(category.image as string)}
                alt={category.name}
                className="mb-1 mr-3 h-6 w-6"
              />
              <span className="text-sm font-medium">{category.name}</span>
            </button>
            <div className="space-y-2 pl-8">
              {category.subCategories?.map((subcategory) => (
                <button
                  key={subcategory.id}
                  onClick={() => {
                    router.push(`/search?categoryId=${category.id}&subCategoryId=${subcategory.id}`);
                    onClose?.();
                  }}
                  className="text-sm text-gray-600"
                >
                  {subcategory?.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
