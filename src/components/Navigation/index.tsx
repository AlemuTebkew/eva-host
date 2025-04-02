import { useState } from "react";
import { Search, ShoppingCart, User, Globe, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import NavbarCategories from "./NavbarCategories";
import SearchBar from "../SearchBar/SearchBarComponent";
import MobileTabs from "../MobileTab";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full">
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
        
        <button className="text-gray-700 hover:text-orange-500 hover:border-orange-500 border rounded-full p-2 lg:block">
          <User size={24} />
        </button>
      </nav>
      {/* <Separator className="border"/> */}
      <div className="hidden lg:block">
        <NavbarCategories/>
      </div>
      <div className="lg:hidden">
        <MobileTabs/>
      </div>
    </div>
  );
}