"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, ChevronLeft, X } from "lucide-react";

type Subcategory = {
  name: string;
};

type Category = {
  name: string;
  subcategories: Subcategory[];
};

const categories: Category[] = [
  {
    name: "Building Materials",
    subcategories: [
      { name: "Cement & Concrete" },
      { name: "Bricks & Blocks" },
      { name: "Sand & Gravel" },
      { name: "Roofing Materials" },
      { name: "Insulation" },
    ],
  },
  {
    name: "Tools & Equipment",
    subcategories: [
      { name: "Power Tools" },
      { name: "Hand Tools" },
      { name: "Scaffolding & Ladders" },
      { name: "Measuring Instruments" },
      { name: "Safety Equipment" },
    ],
  },
];

interface MobileCategoryNavigationProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileCategoryNavigation({ onClose }: MobileCategoryNavigationProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

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
        <CategoryList onSelect={setSelectedCategory} />
      ) : (
        <SubcategoryList category={selectedCategory} />
      )}
    </motion.div>
  );
}

function CategoryList({ onSelect }: { onSelect: (category: Category) => void }) {
  return (
    <ScrollArea className="flex-1 overflow-y-auto">
      {categories.map((category) => (
        <div
          key={category.name}
          className="p-4 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
          onClick={() => onSelect(category)}
        >
          {category.name}
          <ChevronRight className="h-5 w-5" />
        </div>
      ))}
    </ScrollArea>
  );
}

function SubcategoryList({ category }: { category: Category }) {
  return (
    <ScrollArea className="flex-1 p-4 overflow-y-auto">
      {category.subcategories.length > 0 ? (
        category.subcategories.map((sub) => (
          <div key={sub.name} className="p-4 cursor-pointer hover:bg-gray-100">
            <h4 className="font-semibold text-gray-700">{sub.name}</h4>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No subcategories available</p>
      )}
    </ScrollArea>
  );
}
