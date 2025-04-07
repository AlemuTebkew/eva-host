import { Metadata } from "next";
import ProductDetail from "@/components/Product/ProductDetail";

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

export default function ProductDetailPage() {
  return (
    <ProductDetail/>
  );
}
