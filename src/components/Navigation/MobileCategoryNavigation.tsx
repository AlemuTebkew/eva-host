"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { useGetCategoriesQuery } from "@/store/app-api";
import { Category } from "@/types/category";

interface MobileCategoryNavigationProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileCategoryNavigation({ onClose }: MobileCategoryNavigationProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { data, isSuccess } = useGetCategoriesQuery();

  // Prevent scrolling when the component is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed inset-0 w-screen h-screen bg-white z-50 flex flex-col shadow-lg"
    >
      {/* Header with Back & Close Buttons */}
      <div className="flex justify-between items-center p-4 border-b">
        {selectedCategory ? (
          <button
            className="flex items-center gap-2 text-blue-600"
            onClick={() => setSelectedCategory(null)}
          >
            <ChevronLeft className="h-5 w-5" /> Back
          </button>
        ) : (
          <h2 className="text-lg font-semibold">Categories</h2>
        )}
        <button onClick={() => onClose(false)} aria-label="Close">
          <X className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Category or Subcategory View */}
      {!selectedCategory ? (
        <ScrollArea className="flex-1 overflow-y-auto">
          {data?.map((category) => (
            <div
              key={category.name}
              className="p-4 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
              onClick={() => setSelectedCategory(category)}
            >
              {category.name}
              <ChevronRight className="h-5 w-5" />
            </div>
          ))}
        </ScrollArea>
      ) : (
        <ScrollArea className="flex-1 p-4 overflow-y-auto">
          {selectedCategory?.subCategories.length > 0 ? (
            selectedCategory.subCategories.map((sub) => (
              <div key={sub.name} className="p-4 cursor-pointer hover:bg-gray-100">
                <h4 className="font-semibold text-gray-700">{sub.name}</h4>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No subcategories available</p>
          )}
        </ScrollArea>
      )}
    </motion.div>
  );
}