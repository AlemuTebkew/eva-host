import { useState } from "react";
import { Search, ShoppingCart, User, Globe, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import SearchBar from "../SearchBar/SearchBarComponent";
import MobileTabs from "../MobileTab";
import MegaMenu from "./Navigation";
import CategoryNavigation from "./MobileCategoryNavigation";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  return (
    <div className="w-full shadow-md bg-white">
      <nav className="w-full mx-auto flex items-center px-4 py-3 bg-white justify-between gap-4 lg:px-6 lg:gap-12 lg:max-w-c-1235">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-orange-500">EVA</h1>
          {/* Sidebar Toggle */}
        </div>

        {/* Search Bar */}
        <div className="flex-1 w-full">
          <SearchBar/>
        </div>

        {/* Right Side */}
        <div className="hidden flex items-center gap-6 lg:flex">
          <button className="text-gray-700 hover:text-orange-500">
            <Globe size={24} />
          </button>
          <button className="text-gray-700 hover:text-orange-500">
            <User size={24} />
          </button>
          <Button className="bg-orange-500 text-white px-8 py-1 rounded-full">
            Sign Up
          </Button>
        </div>
        
        <button className="text-gray-700 hover:text-orange-500 hover:border-orange-500 border rounded-full p-2 lg:hidden">
          <User size={24} />
        </button>
      </nav>

      <div className="hidden lg:block max-w-c-1235 mx-auto px-6">
        <MegaMenu/>
      </div>

      {/* Mobile Navigation */}
      <div className="w-full grid grid-cols-3 gap-2 lg:hidden px-4 py-2 bg-white shadow-md rounded-md">
        <button
          onClick={() => setOpenCategory(true)}
          className="text-center text-sm font-medium py-3 rounded-md bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition"
        >
          All Categories
        </button>
        <button className="text-center text-sm font-medium py-3 rounded-md bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition">
          Suppliers
        </button>
        <button className="text-center text-sm font-medium py-3 rounded-md bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition">
          Services
        </button>
      </div>


      {/* Mobile Category Navigation */}
      {
        openCategory && (
            <CategoryNavigation onClose={setOpenCategory}/>
        )
      }
    </div>
  );
}