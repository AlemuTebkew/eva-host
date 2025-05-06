"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X, User } from "lucide-react";
import { useGetCategoriesQuery } from "@/store/app-api";
import CategoryDropdown from "@/components/category-dropdown";
import MobileCategoryDropdown from "@/components/mobile-category-dropdown";
import SearchBar from "./Search/SearchBarComponent";

export default function Header() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);



  // fetch categories
  const { data: categories, isSuccess } = useGetCategoriesQuery();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-dropdown="category"]') && isCategoryOpen) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCategoryOpen]);

  // check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  // Check if a nav link is active
  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      {/* Mobile Header */}
      <div className="md:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-lg font-bold text-gray-800">
            EVA ENGINEERING
          </Link>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="border-t border-gray-200 px-4 py-2">
          {/* <div className="relative">
            <Input
              type="text"
              placeholder="what are you looking for?"
              className="w-full pl-4 pr-10"
            />
            <Button
              className="absolute right-0 top-0 h-full rounded-l-none bg-blue-600 hover:bg-blue-700"
              size="icon"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div> */}

          <SearchBar />

        </div>

        {/* Mobile Navigation */}
        <div className="flex border-t border-gray-200 py-2 items-center">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="flex items-center px-4 py-2 text-sm"
          >
            <svg
              className="mr-2 h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            All Category
            <svg
              className={`ml-2 h-4 w-4 transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <nav className="flex flex-1 justify-around">
            <Link
              href="/products"
              className={`border-b-2 pb-2 text-sm font-medium ${
                isActive("/products")
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-600"
              }`}
            >
              Products
            </Link>
            <Link
              href="/suppliers"
              className={`border-b-2 pb-2 text-sm font-medium ${
                isActive("/suppliers")
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-600"
              }`}
            >
              Suppliers
            </Link>
            <Link
              href="/services"
              className={`border-b-2 pb-2 text-sm font-medium ${
                isActive("/services")
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-600"
              }`}
            >
              Service
            </Link>
          </nav>
        </div>

        {/* Mobile Category Dropdown */}
        {isCategoryOpen && isSuccess && categories && (
          <div className="absolute left-0 right-0 z-50 border-b border-gray-200 bg-white shadow-lg">
            <MobileCategoryDropdown
              categories={categories}
              onClose={() => setIsCategoryOpen(false)}
            />
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 right-0 z-50 border-b border-gray-200 bg-white px-4 py-4 shadow-lg">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <select className="rounded-md border border-gray-300 px-2 py-1 text-sm">
                  <option>English</option>
                  <option>Amharic</option>
                </select>
                <div className="flex space-x-2">
                  <Button
                    className="bg-orange-500 hover:bg-orange-600"
                    size="sm"
                  >
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    size="sm"
                  >
                    Become Supplier
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">
                  Quick Links
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    About Us
                  </Link>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Contact
                  </Link>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Help Center
                  </Link>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Careers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4">
          {/* Top header bar */}
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="mr-6">
                <span className="text-lg font-bold text-gray-800">
                  EVA ENGINEERING
                </span>
              </Link>
            </div>

            <div className="hidden flex-1 items-center justify-center md:flex">
              {/* <Suspense> */}
                <SearchBar />
              {/* </Suspense> */}
            </div>
            {/* <div className="hidden flex-1 items-center justify-center md:flex">
              <div className="relative w-full max-w-md">
                <Input
                  type="text"
                  placeholder="what are you looking for?"
                  className="w-full pl-4 pr-10"
                />
                <Button
                  className="absolute right-0 top-0 h-full rounded-l-none bg-blue-600 hover:bg-blue-700"
                  size="icon"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div> */}

            <div className="flex items-center space-x-2">
              <div className="mr-2">
                <select className="rounded-md border border-gray-300 px-2 py-1 text-sm">
                  <option>English</option>
                  <option>Amharic</option>
                </select>
              </div>
              {isAuthenticated ? (
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Link href="/profile">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Link href="/login">Login</Link>
                </Button>
              )}
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <Link href="/register-as-supplier">Become Supplier</Link>
              </Button>
            </div>
          </div>

          {/* Navigation bar */}
          <div className="flex items-center border-t border-gray-200 py-2">
            <div className="relative" data-dropdown="category">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center rounded-md px-4 py-2 text-sm transition-colors hover:bg-gray-100"
              >
                <svg
                  className="mr-2 h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                All Category
                <svg
                  className={`ml-2 h-4 w-4 transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isCategoryOpen && isSuccess && categories && (
                <div className="absolute left-0 top-full z-50 mt-1 w-[600px] rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
                  <CategoryDropdown
                    categories={categories}
                    onClose={() => setIsCategoryOpen(false)}
                  />
                </div>
              )}
            </div>

            <nav className="ml-8 flex space-x-8">
              <Link
                href="/products"
                className={`border-b-2 pb-2 text-sm font-medium ${
                  isActive("/products")
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:border-blue-600 hover:text-blue-600"
                }`}
              >
                Products
              </Link>
              <Link
                href="/suppliers"
                className={`border-b-2 pb-2 text-sm font-medium ${
                  isActive("/suppliers")
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:border-blue-600 hover:text-blue-600"
                }`}
              >
                Suppliers
              </Link>
              <Link
                href="/services"
                className={`border-b-2 pb-2 text-sm font-medium ${
                  isActive("/services")
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:border-blue-600 hover:text-blue-600"
                }`}
              >
                Service
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
