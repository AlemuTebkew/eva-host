
import Footer from "@/components/Footer";
import ProductBanner from "@/components/ProductBanner";
import { ChevronRight } from "lucide-react";
import { Metadata } from "next";
import ProductList from "@/components/ProductList";
import { useState } from "react";
import Filter from "@/components/Filters";
import { Product } from "@/types/product";
import ProductPage from "@/components/Product/ProductPage";

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

export default function Home() {
 
  return (
    <ProductPage/>
  );
}
