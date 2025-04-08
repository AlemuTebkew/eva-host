"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, X, Loader2, FolderX } from "lucide-react";
import { useGetCategoriesQuery } from "@/store/app-api";
import { Category } from "@/types/category";
import Image from "next/image";
import Link from "next/link";

interface MobileCategoryNavigationProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const icons = [
  "https://cdn-icons-png.flaticon.com/512/2903/2903951.png",
  "https://cdn-icons-png.flaticon.com/512/2965/2965567.png",
  "https://cdn-icons-png.flaticon.com/512/3045/3045801.png",
  "https://cdn-icons-png.flaticon.com/512/1375/1375211.png",
  "https://cdn-icons-png.flaticon.com/512/5284/5284351.png",
];

export default function MobileCategoryNavigation({ onClose }: MobileCategoryNavigationProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { data, isSuccess, isLoading } = useGetCategoriesQuery();

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Select first category by default
  useEffect(() => {
    if (isSuccess && data && data.length > 0) {
      setSelectedCategory(data[0]);
    }
  }, [isSuccess, data]);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed inset-0 w-screen h-screen bg-white z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">All categories</h2>
        <button onClick={() => onClose(false)} aria-label="Close">
          <X className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
          <Loader2 className="h-8 w-8 animate-spin mb-2" />
          <p className="text-sm font-medium">Loading categories...</p>
        </div>
      )}

      {/* No Category Found */}
      {isSuccess && data?.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-500 px-4 text-center">
          <FolderX className="h-10 w-10 mb-3" />
          <p className="text-sm font-medium">No categories found at the moment.</p>
        </div>
      )}

      {/* Main Categories */}
      {isSuccess && data?.length > 0 && (
        <>
          <div className="overflow-x-auto no-scrollbar border-b">
            <div className="flex gap-2 py-2 whitespace-nowrap px-2">
              {data.map((category, index) => (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex flex-col items-center justify-center min-w-[100px] px-2 py-1 cursor-pointer transition ${
                    selectedCategory?.id === category.id ? "border-b-2 border-black" : ""
                  }`}
                >
                  <Image
                    src={icons[index % icons.length] || ""}
                    alt={category.name}
                    width={24}
                    height={24}
                    className="mb-1"
                  />
                  <span className="text-xs">{category.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subcategories */}
          {selectedCategory && (
            <ScrollArea className="flex-1 p-4">
              {selectedCategory.subCategories.length > 0 ? (
                <div className="grid grid-cols-4 gap-4">
                  {selectedCategory.subCategories.map((sub, index) => (
                    <Link
                      key={sub.id}
                      href={`/search?categoryId=${selectedCategory.id}&subCategoryId=${sub.id}`}
                      onClick={() => onClose(false)}
                      className="text-center"
                    >
                      <Image
                        src={icons[index % icons.length] || ""}
                        alt={sub.name}
                        width={40}
                        height={40}
                        className="mx-auto rounded-md"
                      />
                      <p className="text-xs mt-2">{sub.name}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-10">
                  <FolderX className="h-6 w-6 mx-auto mb-2" />
                  <p className="text-sm">No subcategories available</p>
                </div>
              )}
            </ScrollArea>
          )}
        </>
      )}
    </motion.div>
  );
}