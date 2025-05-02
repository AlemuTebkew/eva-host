import Footer from "@/components/Footer";
import Navbar from "@/components/Navigation";
import SupplierDetail from "@/components/Suppliers/SupplierDetail";
import { Suspense } from "react";


export default function SupplierDetailPage(props: {
  params: { slug: string };
}) {
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
        <SupplierDetail {...props} />
      </Suspense>
      {/* You can also show their products list here */}
      {/* <Footer/> */}
    </>
  );
}
