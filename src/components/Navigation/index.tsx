"use client";
import { Suspense, useEffect, useState } from "react";
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
    <div className="w-full bg-white lg:shadow-md">
      {/* on scroll make this fixed to top */}

      <nav
        className={`${
          isScrolled
            ? "fixed left-0 right-0 top-0 z-50 bg-white shadow-md transition-all duration-300"
            : "z-50 lg:border-b"
        }`}
      >
        <div className="z-50 mx-auto flex w-full items-center justify-between gap-4 px-4 py-3 lg:max-w-c-1235 lg:gap-12 lg:px-6">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link href="/">
              <h1 className="cursor-pointer text-2xl font-bold text-orange-500">
                EVA
              </h1>
            </Link>
            {/* Sidebar Toggle */}
          </div>

          {/* Search Bar */}
          <div className="w-full flex-1">
            <Suspense>
              <SearchBar />
            </Suspense>
          </div>

          {/* Right Side */}
          <div className="flex hidden items-center gap-6 lg:flex">
            <button className="text-gray-700 hover:text-orange-500">
              <Globe size={24} />
            </button>
            <Link href={"/login"}>
              <button className="text-gray-700 hover:text-orange-500">
                <User size={24} />
              </button>
            </Link>
            <Button className="rounded-full bg-orange-500 px-8 py-1 text-white">
              Sign Up
            </Button>
          </div>

          <button className="rounded-full border p-2 text-gray-700 hover:border-orange-500 hover:text-orange-500 lg:hidden">
            <User size={24} />
          </button>
        </div>
      </nav>

      {isScrolled && <div className="h-[70px] lg:h-[76px]" />}

      <div className="mx-auto hidden max-w-c-1235 px-6 lg:block">
        <MegaMenu />
      </div>

      {/* Mobile Navigation */}
      <div className="z-40 flex w-full gap-3 border-t bg-white px-2 py-2 lg:hidden">
        <button
          onClick={() => setOpenCategory(true)}
          className="text-md flex items-center gap-1 rounded-lg px-2 py-2 font-medium text-gray-800 transition-all hover:bg-gray-100 active:bg-gray-200"
        >
          <LayoutGrid className="h-5 w-5 text-primary" />
          Categories
        </button>

        <button className="text-md flex items-center justify-center gap-1 rounded-lg px-2 py-2 font-medium text-gray-800 transition-all hover:bg-gray-100 active:bg-gray-200">
          <Store className="h-5 w-5 text-primary" />
          Suppliers
        </button>
      </div>

      {/* Mobile Category Navigation */}
      {openCategory && <CategoryNavigation onClose={setOpenCategory} />}
    </div>
  );
}
