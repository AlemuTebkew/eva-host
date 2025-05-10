"use client";
import Footer from "@/components/Footer1";
import Navbar from "@/components/Navigation";
import SupplierListPage from "@/components/Suppliers/SupplierListPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SuppliersList from "@/components/suppliers-list";
import Image from "next/image";
import { Suspense, useState, FormEvent } from "react";
import { useFilterSupplierQuery } from "@/store/app-api";
import GenericPagination from "@/components/Pagination";

function SupplierListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-lg bg-white p-4 shadow flex flex-col gap-4"
        >
          <div className="h-24 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-1/2" />
          <div className="h-3 bg-gray-100 rounded w-1/3" />
        </div>
      ))}
    </div>
  );
}

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",   // initial empty search
  });

  // this hook will refetch any time params changes
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useFilterSupplierQuery({ params });

  // safe fallback for pagination meta
  const meta = data?.meta ?? { page: 1, total: 0, totalPages: 1 };

  // on form submit, re-run the query with the new searchTerm
  function handleSearch(e: FormEvent) {
    e.preventDefault();
    setParams((prev) => ({
      ...prev,
      page: 1,                      // reset to first page
      search: searchTerm.trim() || "",    // send trimmed term, fallback to empty string
    }));
  }

  // when a new page is clicked, update params.page
  function onPageChange(page: number) {
    setParams((prev) => ({ ...prev, page }));
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/bg-new.jpg"
            alt="Background"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Compare Prices. Choose Smart. Build with Eva
            </h1>
            <p className="mb-8 text-lg">
              Explore materials. Connect with Suppliers and get the best deals.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Compare Price
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600">
                Browse Suppliers
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Suppliers Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-2xl font-bold md:text-3xl">
            Suppliers
          </h2>
          <p className="mb-8 text-center">
            Search suppliers by material or city
          </p>

          {/* — Search Form — */}
          <form
            onSubmit={handleSearch}
            className="mx-auto mb-12 max-w-md"
          >
            <div className="flex">
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.currentTarget.value)}
                placeholder="Search Suppliers"
                className="rounded-r-none border-r-0"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="rounded-l-none bg-orange-500 hover:bg-orange-600"
              >
                {isLoading ? "Searching…" : "Search"}
              </Button>
            </div>
          </form>

          {/* — Loading / Error / Empty States — */}
          {isLoading && <SupplierListSkeleton />}
          {isError && (
            <p className="text-center text-red-600">
              Error:{" "}
              {error instanceof Error 
                ? error.message 
                : "Failed to load suppliers."}
            </p>
          )}
          {isSuccess && data?.data.length === 0 && (
            <p className="text-center text-gray-500">
              No suppliers found for “{searchTerm}.”
            </p>
          )}

          {/* — Results — */}
          {isSuccess && data?.data.length > 0 && (
            <SuppliersList suppliers={data.data} />
          )}

          {/* — Pagination — */}
          {isSuccess && meta.totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <GenericPagination
                currentPage={meta.page}
                totalPages={meta.totalPages}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      {/* Uncomment the Footer if needed */}
      {/* <Footer /> */}
    </>
  );
}
