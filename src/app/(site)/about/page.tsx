import About from "@/components/About";
import Clients from "@/components/Clients";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eva Engineering | Expert Construction & Engineering Solutions",
  description: "Eva Engineering is a trusted construction and engineering company offering high-quality solutions across infrastructure, civil engineering, and sustainable building projects. We ensure reliability, innovation, and excellence in everything we do.",
  keywords: "construction engineering, high-quality solutions, infrastructure, civil engineering, sustainable building, project management, trusted company, innovation, excellence",
  // Open Graph Meta Tags for Social Media Sharing
  openGraph: {
    title: "Eva Engineering | Expert Construction & Engineering Solutions",
    description: "Delivering high-quality, sustainable construction and engineering solutions across industries. Partner with us for innovative, reliable, and ethical services.",
    images: ["/images/logo/logo.png"],  // Update with the path to a suitable image
    url: "https://evaengineering.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eva Engineering | Expert Construction & Engineering Solutions",
    description: "Trusted construction and engineering company delivering high-quality, sustainable solutions.",
    images: ["/images/logo/logo.png"],  // Update with the path to a suitable image
  },
};

const AboutPage = () => {
  return (
    <main>
      <About />
      <Clients />
    </main>
  );
};

export default AboutPage;
