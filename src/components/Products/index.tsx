"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { Product } from "@/types/product";
import { useGetProductsWithPriceQuery } from "@/store/app-api";


const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCities, setSelectedCities] = useState<{ [key: number]: string }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 6;

  // Fetch products from the API
  const { data, isLoading, isError } = useGetProductsWithPriceQuery({ search: searchTerm, limit: productsPerPage, page: currentPage });

  if (isLoading) return <p className="text-center text-gray-500">Loading products...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load products.</p>;

  const products: Product[] = data?.data || [];
  const totalPages = Math.ceil((data?.total || 0) / productsPerPage);

  // Handle city selection per product
  const handleCityChange = (productId: number, city: string) => {
    setSelectedCities((prev) => ({
      ...prev,
      [productId]: city,
    }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center text-pink-600 mb-8">Discover Our Products</h1>
      <p className="text-center text-gray-500 mb-4">Find the best beauty products curated just for you.</p>

      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-6 border border-pink-400 focus:ring-pink-500"
      />

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => {
            const selectedCity = selectedCities[product.id] || "";
            const cityPrice = product.prices.find((p) => p.city === selectedCity);

            return (
              <Card key={product.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <Image src={`http://localhost:5006${product.image}`} alt={product.name} width={300} height={300} className="w-full h-48 object-cover rounded-t-md" />
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* City Selection per Product */}
                  <select
                    value={selectedCity}
                    onChange={(e) => handleCityChange(product.id, e.target.value)}
                    className="p-2 border border-pink-400 rounded-md w-full mb-3 focus:ring-pink-500"
                  >
                    <option value="">Select City</option>
                    {product.prices.map((p) => (
                      <option key={p.city} value={p.city}>
                        {p.city}
                      </option>
                    ))}
                  </select>

                  {/* Price Display */}
                  <p className="text-gray-600">
                    Price:{" "}
                    <span className="font-semibold text-pink-500">
                      {cityPrice ? `$${cityPrice.price}` : "Select a city"}
                    </span>
                  </p>

                  {/* View Details Button */}
                  <Button onClick={() => setSelectedProduct(product)} className="mt-4 w-full bg-pink-500 hover:bg-pink-600">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <p className="text-gray-500 text-center col-span-full">No products found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
              />
            </PaginationItem>

            {Array(totalPages)
              .fill(0)
              .map((_, page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === page + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page + 1);
                    }}
                  >
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <Dialog open={Boolean(selectedProduct)} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-pink-600">{selectedProduct.name}</DialogTitle>
              <DialogDescription>{selectedProduct.description}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProductsPage;
