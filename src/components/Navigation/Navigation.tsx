"use client";

import { useEffect, useState } from "react";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useGetCategoriesQuery } from "@/store/app-api";
import { Category } from "@/types/category";


export default function MegaMenu() {
  const { data, isSuccess } = useGetCategoriesQuery()
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    if(isSuccess && data) {
      if(data.length > 0) {
        setSelectedCategory(data[0]);
      }
    }
  }, [isSuccess, data])
  return (
    <div className="w-full flex justify-between py-2 z-40">
      <NavigationMenu className="w-full flex justify-between z-40">
        <NavigationMenuList className="flex gap-8">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-md">All Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[30rem] flex h-96">
                {/* Main Categories */}
                <ScrollArea className="border-r">
                  {data?.map((category) => (
                    <Link href={`/products?category=${category.id}`} key={category.id}>
                      <div
                        key={category.id}
                        className="p-4 cursor-pointer hover:bg-gray-100 flex justify-between"
                        onMouseEnter={() => setSelectedCategory(category)}
                      >
                        {category.name}
                        <ChevronRight className="h-5 w-5" />
                      </div>
                    </Link>
                  ))}
                </ScrollArea>

                {/* Subcategories */}
                {selectedCategory && selectedCategory.subCategories.length > 0 && (
                  <ScrollArea className="p-4">
                    <div className="flex flex-col gap-2">
                      {selectedCategory.subCategories.map((sub) => (
                        <Link href={`/products?categoryId=${selectedCategory.id}&&subCategoryId=${sub.id}`} key={sub.id} className="p-4 cursor-pointer hover:bg-gray-100">
                          <h4 className="font-semibold text-gray-700 mb-2">{sub.name}</h4>
                        </Link>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className="cursor-pointer font-normal hover:text-primary">
              Service
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className="cursor-pointer font-normal hover:text-primary">
              Suppliers
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu className="w-full flex justify-between">
        <NavigationMenuList className="flex gap-8">
          <NavigationMenuItem>
            <NavigationMenuLink className="cursor-pointer hover:text-primary">
              Help Center
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className="cursor-pointer hover:text-primary">
              Get App
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className="cursor-pointer hover:text-primary">
              Become a Supplier
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
