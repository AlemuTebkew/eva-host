"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, User, UserCircle } from "lucide-react";
import { useGetCategoriesQuery } from "@/store/app-api";
import CategoryDropdown from "@/components/category-dropdown";
import MobileCategoryDropdown from "@/components/mobile-category-dropdown";
import SearchBar from "./Search/SearchBarComponent";
import LanguageSwitcher from "./language-switcher";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("header");
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
    const token = localStorage.getItem("token");
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
    <header className="sticky top-0 z-40 bg-white shadow">
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
          <SearchBar />
        </div>

        {/* Mobile Navigation */}
        <div className="z-40 flex items-center justify-between border-t border-gray-200 py-2">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="flex items-center px-4 text-sm"
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
            {t("allCategories")}
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

          <nav className="mt-1 flex flex-1 items-center justify-around">
            <Link
              href="/products"
              className={`border-b-2 pb-1 text-sm font-medium ${
                isActive("/products")
                  ? "border-blue-800 text-blue-800"
                  : "border-transparent text-gray-800 hover:text-blue-800"
              }`}
            >
              {t("products")}
            </Link>
            <Link
              href="/suppliers"
              className={`border-b-2 pb-1 text-sm font-medium ${
                isActive("/suppliers")
                  ? "border-blue-800 text-blue-800"
                  : "border-transparent text-gray-800 hover:text-blue-800"
              }`}
            >
              {t("suppliers")}
            </Link>
            <Link
              href="/services"
              className={`border-b-2 pb-1 text-sm font-medium ${
                isActive("/services")
                  ? "border-blue-800 text-blue-800"
                  : "border-transparent text-gray-800 hover:text-blue-800"
              }`}
            >
              {t("services")}
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
                <LanguageSwitcher />
                <div className="flex space-x-2">
                  {!isAuthenticated ? (
                    <Link href="/login">
                      <Button
                        className="bg-orange-500 hover:bg-orange-600"
                        size="sm"
                      >
                        {t("login")}
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/profile">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <UserCircle className="h-5 w-5" />
                        {t("profile")}
                      </Button>
                    </Link>
                  )}

                  <Link href="/register-as-supplier">
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      size="sm"
                    >
                      {t("becomeSupplier")}
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">
                  {t("quickLinks")}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/contact-us"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    {t("contactUs")}
                  </Link>
                  <Link
                    href="/help-center"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    {t("helpCenter")}
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

            <div className="flex items-center space-x-2">
              <LanguageSwitcher />
              {isAuthenticated ? (
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Link href="/profile">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Link href="/login">{t("login")}</Link>
                </Button>
              )}
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <Link href="/register-as-supplier">{t("becomeSupplier")}</Link>
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
                {t("allCategories")}
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
                {t("products")}
              </Link>
              <Link
                href="/suppliers"
                className={`border-b-2 pb-2 text-sm font-medium ${
                  isActive("/suppliers")
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:border-blue-600 hover:text-blue-600"
                }`}
              >
                {t("suppliers")}
              </Link>
              <Link
                href="/services"
                className={`border-b-2 pb-2 text-sm font-medium ${
                  isActive("/services")
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:border-blue-600 hover:text-blue-600"
                }`}
              >
                {t("services")}
              </Link>
              <Link
                href="/contact-us"
                className={`border-b-2 pb-2 text-sm font-medium ${
                  isActive("/contact-us")
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:border-blue-600 hover:text-blue-600"
                }`}
              >
                {t("contactUs")}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
