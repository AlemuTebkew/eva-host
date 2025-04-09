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
import { ChevronRight, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useGetCategoriesQuery } from "@/store/app-api";
import { Category } from "@/types/category";
import CategoryNavigation from "./CategoryNavigation";


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
        <NavigationMenuList className="flex gap-4">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-md flex gap-2">
              <LayoutGrid className="w-5 h-5 text-primary" />
              Categories
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              {
                data && data.length > 0 && (
                  <CategoryNavigation data={data} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
                )
              }
            </NavigationMenuContent>
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
            <NavigationMenuLink href="/register-as-supplier" className="cursor-pointer hover:text-primary">
              Become a Supplier
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
