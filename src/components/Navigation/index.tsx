'use client';
import { useEffect, useState } from "react";
import { User, Globe, Store, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "../Search/SearchBarComponent";
import MegaMenu from "./Navigation";
import CategoryNavigation from "./MobileCategoryNavigation";
import Link from "next/link";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <div className="w-full lg:shadow-md bg-white">

      {/* on scroll make this fixed to top */}
      
      <nav 
      className={`${
        isScrolled ? "fixed top-0 left-0 right-0 bg-white shadow-md transition-all duration-300 z-50" : "z-50 lg:border-b"
      }`}>
        <div className="w-full mx-auto flex items-center px-4 py-3 justify-between gap-4 lg:px-6 lg:gap-12 lg:max-w-c-1235 z-50">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link href="/">
              <h1 className="text-2xl font-bold text-orange-500 cursor-pointer">EVA</h1>
            </Link>
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
            <Link href={'/login'}>
              <button className="text-gray-700 hover:text-orange-500">
                <User size={24} />
              </button>
            </Link>
            <Button className="bg-orange-500 text-white px-8 py-1 rounded-full">
              Sign Up
            </Button>
          </div>
          
          <button className="text-gray-700 hover:text-orange-500 hover:border-orange-500 border rounded-full p-2 lg:hidden">
            <User size={24} />
          </button>
        </div>
      </nav>

      {isScrolled && <div className="h-[70px] lg:h-[76px]" />}

      <div className="hidden lg:block max-w-c-1235 mx-auto px-6">
        <MegaMenu/>
      </div>

      {/* Mobile Navigation */}
      <div className="w-full flex gap-3 lg:hidden py-2 bg-white border-t px-2 z-40">
        <button
          onClick={() => setOpenCategory(true)}
          className="flex items-center px-2 gap-1 py-2 text-md font-medium text-gray-800 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-all"
        >
          <LayoutGrid className="w-5 h-5 text-primary" />
          Categories
        </button>

        <button
          className="flex items-center justify-center gap-1 py-2 px-2 text-md font-medium text-gray-800 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-all"
        >
          <Store className="w-5 h-5 text-primary" />
          Suppliers
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