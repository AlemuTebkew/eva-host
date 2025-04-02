import CallToAction from "@/components/CallToAction";
import FeaturedSuppliers from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SupplierCallToAction from "@/components/SupplierCallToAction";
import Testimonials from "@/components/Testimonial";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "",
  description: "",
  keywords: "",
  // Open Graph Meta Tags for Social Media Sharing
  openGraph: {
    title: "",
    description: "",
    // images: ["/images/logo/logo.png"],  // Ensure this image is correct and exists
    // url: "https://evaengineering.com",
    // type: "website",
  },
  twitter: {
    // card: "summary_large_image",
    // title: "Eva Engineering | Leading Construction & Engineering Solutions",
    // description: "Trusted construction and engineering company delivering high-quality, sustainable solutions.",
    // images: ["/images/logo/logo.png"],  // Ensure this image is correct and exists
  },
};

export default function Home() {
  return (
    <main className="max-w-c-1235 mx-auto">
      <Hero />
      <FeaturedSuppliers/>
      <CallToAction/>
      <Testimonials/>
      <SupplierCallToAction/>
    </main>
  );
}