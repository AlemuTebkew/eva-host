import { Metadata } from "next";
import ProductDetail from "@/components/Product/ProductDetailPage";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navigation";

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

export default function ProductDetailPage(props: { params: { slug: string } }) {
  return (
    <>
      <Navbar/>
      <ProductDetail {...props}/>
      {/* <Footer/> */}
    </>
  );
}
