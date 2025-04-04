"use client";

import { useState } from "react";
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

// Define types
type Subcategory = {
  name: string;
};

type Category = {
  name: string;
  subcategories: Subcategory[];
};

// Category Data
const categories = [
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
  {
    name: "Plumbing & Sanitary",
    subcategories: [
      { name: "Pipes & Fittings" },
      { name: "Water Heaters" },
      { name: "Sanitary Ware" },
      { name: "Faucets & Valves" },
      { name: "Drainage Systems" },
    ],
  },
  {
    name: "Electrical & Lighting",
    subcategories: [
      { name: "Wires & Cables" },
      { name: "Switches & Sockets" },
      { name: "Circuit Breakers" },
      { name: "LED & Industrial Lighting" },
      { name: "Solar Panels" },
    ],
  },
  {
    name: "Doors & Windows",
    subcategories: [
      { name: "Wooden Doors" },
      { name: "Metal Doors" },
      { name: "UPVC Windows" },
      { name: "Glass Panels" },
      { name: "Door Locks & Handles" },
    ],
  },
  {
    name: "Flooring & Wall Finishes",
    subcategories: [
      { name: "Tiles & Marble" },
      { name: "Wood Flooring" },
      { name: "Paints & Coatings" },
      { name: "Wallpapers" },
      { name: "Cladding & Panels" },
    ],
  },
  {
    name: "HVAC & Ventilation",
    subcategories: [
      { name: "Air Conditioners" },
      { name: "Ventilation Fans" },
      { name: "Heating Systems" },
      { name: "Ducting & Insulation" },
      { name: "Thermostats" },
    ],
  },
  {
    name: "Steel & Metal Works",
    subcategories: [
      { name: "Structural Steel" },
      { name: "Aluminum Products" },
      { name: "Metal Roofing" },
      { name: "Iron Rods & Beams" },
      { name: "Welding Supplies" },
    ],
  },
  {
    name: "Construction Chemicals",
    subcategories: [
      { name: "Adhesives & Sealants" },
      { name: "Waterproofing Solutions" },
      { name: "Concrete Additives" },
      { name: "Paint Chemicals" },
      { name: "Grouts & Tile Fixers" },
    ],
  },
  {
    name: "Interior & Exterior Finishing",
    subcategories: [
      { name: "Ceiling Systems" },
      { name: "Decorative Moldings" },
      { name: "Acoustic Panels" },
      { name: "Outdoor Decking" },
      { name: "Artificial Grass" },
    ],
  },
];


export default function MegaMenu() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  return (
    <div className="w-full flex justify-between py-2">
      <NavigationMenu className="w-full flex justify-between">
        <NavigationMenuList className="flex gap-8">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-md">All Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[30rem] flex h-96">
                {/* Main Categories */}
                <ScrollArea className="border-r">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="p-4 cursor-pointer hover:bg-gray-100 flex justify-between"
                      onMouseEnter={() => setSelectedCategory(category)}
                    >
                      {category.name}
                      <ChevronRight className="h-5 w-5" />
                    </div>
                  ))}
                </ScrollArea>

                {/* Subcategories */}
                {selectedCategory && selectedCategory.subcategories.length > 0 && (
                  <ScrollArea className="p-4">
                    <div className="flex flex-col gap-2">
                      {selectedCategory.subcategories.map((sub) => (
                        <Link href={'/products'} key={sub.name} className="p-4 cursor-pointer hover:bg-gray-100">
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
