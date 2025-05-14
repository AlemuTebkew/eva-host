import { Metadata } from "next";
import ProductDetail from "@/components/Product/ProductDetailPage";
import Footer from "@/components/Footer1";
import Navbar from "@/components/Navigation";
import SideAdsWrapper from "@/components/Auth/SideAdsWrapper";
import { Suspense } from "react";
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

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  return (
    <>
      {/* <Navbar/> */}
      <Suspense fallback={<div>Loading...</div>}>
        <SideAdsWrapper>
          <ProductDetail slug={slug} />
        </SideAdsWrapper>
      </Suspense>
      {/* <Footer/> */}
    </>
  );
}
