import Footer from "@/components/Footer";
import Navbar from "@/components/Navigation";
import SupplierDetail from "@/components/Suppliers/SupplierDetail";
import { Suspense } from "react";

const mockSupplier = {
  id: "1",
  name: "Shenzhen Kastar Timepieces",
  location: "China",
  rating: 4.5,
  about:
    "Leading manufacturer of affordable quartz watches. Trusted globally for over 10 years.",
  productCount: 120,
};

export default function SupplierDetailPage(props: {
  params: { slug: string };
}) {
  return (
    <>
      <Navbar />
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
