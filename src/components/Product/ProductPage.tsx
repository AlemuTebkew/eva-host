'use client'

import Footer from "@/components/Footer";
import ProductBanner from "@/components/ProductBanner";
import { ChevronRight } from "lucide-react";
import { Metadata } from "next";
import ProductList from "@/components/ProductList";
import { useState } from "react";
import Filter from "@/components/Filters";
import { Product } from "@/types/product";

export const metadata: Metadata = {
  title: "Home Page",
  description: "Explore a variety of products.",
  keywords: "products, ecommerce, construction materials",
  openGraph: {
    title: "Home Page",
    description: "Explore a variety of products.",
  },
  twitter: {},
};

export default function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const categories = ["Category 1", "Category 2", "Category 3"];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Example product list
  const productList: Product[] = [
    {
      id: "1",
      name: "Product One",
      price: 99.99,
      image: "/images/product-1.jpg",
      category: "Category 1",
      material: "Material A",
      rating: 4.5,
      available: true,
    },
    {
      id: "2",
      name: "Product Two",
      price: 149.99,
      image: "/images/product-2.jpg",
      category: "Category 2",
      material: "Material B",
      rating: 4.0,
      available: true,
    },
    {
      id: "3",
      name: "Product Three",
      price: 79.99,
      image: "/images/product-3.jpg",
      category: "Category 3",
      material: "Material C",
      rating: 3.5,
      available: false,
    },
    {
      id: "4",
      name: "Product Four",
      price: 59.99,
      image: "/images/product-4.jpg",
      category: "Category 4",
      material: "Material D",
      rating: 4.7,
      available: true,
    },
    // Add more products as needed
  ];

  const filteredProducts = selectedCategory
    ? productList.filter((product) => product.name.includes(selectedCategory))
    : productList;

  return (
    <main className="container">
      <div className="flex gap-1 justify-start items-center mb-8">
        <h1>Home Page</h1>
        <ChevronRight className="w-4 h-4" />
        <h1>All Products</h1>
      </div>
      <div className="mt-8 mb-4">
        <h1>Trending Products</h1>
      </div>
      <ProductBanner />

      {/* Product List Section */}
      <div className="grid grid-cols-4 gap-8 mt-8">
        {/* Filter Section */}
        <div className="col-span-1">
          <Filter
            categories={categories}
            brands={[]}
            priceRange={[10, 1000]}
            materials={[]}
            sizes={[]}
            ratings={[]}
            handleFilterChange={handleCategoryChange}
          />
        </div>

        {/* Product Cards Section */}
        <div className="col-span-3">
          <ProductList products={productList}
          filters={filteredProducts}
           />
        </div>
      </div>

    </main>
  );
}
