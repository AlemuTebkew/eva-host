import Footer from "@/components/Footer1";
import Navbar from "@/components/Navigation";
import SupplierDetail from "@/components/Suppliers/SupplierDetail";
import { Suspense } from "react";

export default async function SupplierDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  return (
    <>
      {/* <Navbar /> */}
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            Loading...
          </div>
        }
      >
        <SupplierDetail params={{ slug }} />
      </Suspense>
      {/* You can also show their products list here */}
      {/* <Footer/> */}
    </>
  );
}
