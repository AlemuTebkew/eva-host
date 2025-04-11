import Footer from "@/components/Footer";
import Navbar from "@/components/Navigation";
import SupplierDetail from "@/components/Suppliers/SupplierDetail";

const mockSupplier = {
  id: "1",
  name: "Shenzhen Kastar Timepieces",
  location: "China",
  rating: 4.5,
  about: "Leading manufacturer of affordable quartz watches. Trusted globally for over 10 years.",
  productCount: 120,
};

export default function SupplierDetailPage() {
  return (
    <>
      <Navbar/>
      <SupplierDetail {...mockSupplier} />
      {/* You can also show their products list here */}
      {/* <Footer/> */}
    </>
  );
}
