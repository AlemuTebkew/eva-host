import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer1";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navigation";
import SupplierCallToAction from "@/components/Suppliers/SupplierCallToAction";
import FeaturedSuppliers from "@/components/Suppliers/FeaturedSuppliers";
import Testimonials from "@/components/Testimonial";
import { Metadata } from "next";
import Header from "@/components/header";
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
 
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
  const t = useTranslations('navigation');

  return (
    <main className="max-w-c-1235 mx-auto">
      {/* <Navbar/> */}
      {/* <Header/> */}
      {/* <Hero />
      <FeaturedSuppliers/>
      <CallToAction/>
      <Testimonials/>
      <SupplierCallToAction/> */}
      {/* <Footer/> */}

      <div>
      <h1>{t('home')}</h1>
      <Link href="/about">{t('about')}</Link>
    </div>
    </main>
  );
}