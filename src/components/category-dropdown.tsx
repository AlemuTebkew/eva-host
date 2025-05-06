"use client";

import { useState } from "react";
import Link from "next/link"; // THIS is the correct Link
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
import { getImageUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface SubCategory {
  id: string;
  name: string;
  image?: string;
}

interface Category {
  id: string;
  name: string;
  image: React.ReactNode;
  subCategories: SubCategory[];
}

interface CategoryDropdownProps {
  onClose?: () => void;
  categories: Category[];
}

export default function CategoryDropdown({
  onClose,
  categories,
}: CategoryDropdownProps) {
  const [hoveredCategory, setHoveredCategory] = useState(0);
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {/* Category list */}
      <div className="space-y-1">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={`flex cursor-pointer items-center rounded-md p-2 transition-colors duration-150 ${
              index === hoveredCategory ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
            onMouseEnter={() => setHoveredCategory(index)}
            onClick={() => {
              if (onClose) onClose();
              router.push(`/search?categoryId=${category.id}`);
            }}
          >
            <img
              src={getImageUrl(category?.image as string)}
              alt={category.name}
              className="mb-1 mr-3 h-6 w-6"
            />{" "}
            <span className="text-sm font-medium">{category.name}</span>
          </div>
        ))}
      </div>

      {/* Subcategory list */}
      <div className="space-y-1 md:border-l md:border-gray-200 md:pl-4">
        {categories[hoveredCategory]?.subCategories.map((subcategory) => (
          <Link
            key={subcategory.id}
            href={`/search?categoryId=${categories[hoveredCategory].id}&subCategoryId=${subcategory.id}`}
          >
            <div className="cursor-pointer rounded-md p-2 hover:bg-gray-50">
              <span className="text-sm">{subcategory.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
