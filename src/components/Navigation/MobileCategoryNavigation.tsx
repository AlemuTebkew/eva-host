"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, X } from "lucide-react";
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
]
const categories = [
  {
    id: "1",
    name: "Makeup",
    icon: "https://cdn-icons-png.flaticon.com/512/2903/2903951.png",
    subCategories: [
      { id: "1-1", name: "Lipstick", image: "https://cdn-icons-png.flaticon.com/512/892/892458.png" },
      { id: "1-2", name: "Foundation", image: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png" },
      { id: "1-3", name: "Blush", image: "https://cdn-icons-png.flaticon.com/512/896/896497.png" },
      { id: "1-4", name: "Eyeshadow", image: "https://cdn-icons-png.flaticon.com/512/2903/2903929.png" },
    ],
  },
  {
    id: "2",
    name: "Skincare",
    icon: "https://cdn-icons-png.flaticon.com/512/2965/2965567.png",
    subCategories: [
      { id: "2-1", name: "Moisturizers", image: "https://cdn-icons-png.flaticon.com/512/7513/7513967.png" },
      { id: "2-2", name: "Serums", image: "https://cdn-icons-png.flaticon.com/512/3103/3103991.png" },
      { id: "2-3", name: "Face Wash", image: "https://cdn-icons-png.flaticon.com/512/9324/9324437.png" },
      { id: "2-4", name: "Sunscreen", image: "https://cdn-icons-png.flaticon.com/512/5034/5034082.png" },
    ],
  },
  {
    id: "3",
    name: "Haircare",
    icon: "https://cdn-icons-png.flaticon.com/512/3045/3045801.png",
    subCategories: [
      { id: "3-1", name: "Shampoo", image: "https://cdn-icons-png.flaticon.com/512/2965/2965563.png" },
      { id: "3-2", name: "Conditioner", image: "https://cdn-icons-png.flaticon.com/512/2437/2437850.png" },
      { id: "3-3", name: "Hair Oil", image: "https://cdn-icons-png.flaticon.com/512/4686/4686365.png" },
      { id: "3-4", name: "Hair Mask", image: "https://cdn-icons-png.flaticon.com/512/9430/9430328.png" },
    ],
  },
  {
    id: "4",
    name: "Fragrances",
    icon: "https://cdn-icons-png.flaticon.com/512/1375/1375211.png",
    subCategories: [
      { id: "4-1", name: "Perfume", image: "https://cdn-icons-png.flaticon.com/512/2601/2601806.png" },
      { id: "4-2", name: "Body Mist", image: "https://cdn-icons-png.flaticon.com/512/7776/7776845.png" },
    ],
  },
  {
    id: "5",
    name: "Tools & Brushes",
    icon: "https://cdn-icons-png.flaticon.com/512/5284/5284351.png",
    subCategories: [
      { id: "5-1", name: "Brush Sets", image: "https://cdn-icons-png.flaticon.com/512/1172/1172887.png" },
      { id: "5-2", name: "Sponges", image: "https://cdn-icons-png.flaticon.com/512/3823/3823389.png" },
    ],
  },
];


export default function MobileCategoryNavigation({ onClose }: MobileCategoryNavigationProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { data, isSuccess } = useGetCategoriesQuery();

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
      className="fixed inset-0 w-screen h-screen bg-white z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">All categories</h2>
         
        <button onClick={() => onClose(false)} aria-label="Close">
          <X className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Main Categories as Tabs */}
      {isSuccess && (
        <div className="overflow-x-auto no-scrollbar border-b">
          <div className="flex gap-2 py-2 whitespace-nowrap">
            {data.map((category, index) => (
              <div
                key={category.name}
                onClick={() => setSelectedCategory(category)}
                className={`flex flex-col items-center justify-center min-w-[100px] px-2 py-1 cursor-pointer ${
                  selectedCategory?.name === category.name ? "border-b-2 border-black" : ""
                }`}
              >
                <div className="text-center text-sm font-medium">
                  {category.name ? (
                    <Image src={icons[index]} alt={category.name} width={24} height={24} />
                  ) : (
                    <div className="w-6 h-6 bg-gray-300 rounded-full" />
                  )}
                </div>
                <span className="text-xs mt-1">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subcategory Grid */}
      {selectedCategory && (
        <ScrollArea className="flex-1 p-4">
          {selectedCategory.subCategories.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
              {selectedCategory.subCategories.map((sub, index) => (
                <Link href={`/search?categoryId=${selectedCategory.id}&subCategoryId=${sub.id}`} key={sub.id} onClick={() => onClose(false)}>
                  <div key={sub.name} className="text-center">
                    <Image
                      src={icons[index] ?? ""}
                      alt={sub.name}
                      width={40}
                      height={40}
                      className="mx-auto rounded-md"
                    />
                    <p className="text-xs mt-2">{sub.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No subcategories available</p>
          )}
          
        </ScrollArea>
      )}
    </motion.div>
  );
}
