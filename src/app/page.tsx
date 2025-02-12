import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Service from "@/components/Service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eva Engineering | Leading Construction & Engineering Solutions",
  description: "Eva Engineering is a trusted construction and engineering company delivering high-quality, sustainable solutions across industries such as construction, infrastructure, and project management. We ensure reliability, innovation, and excellence in all our services.",
  keywords: "construction engineering, high-quality solutions, sustainable construction, infrastructure, project management, civil engineering, trusted company, innovation, excellence",
  // Open Graph Meta Tags for Social Media Sharing
  openGraph: {
    title: "Eva Engineering | Leading Construction & Engineering Solutions",
    description: "Delivering high-quality, sustainable solutions across construction and engineering industries. Partner with us for innovative, reliable, and ethical services.",
    images: ["/images/logo/logo.png"],  // Ensure this image is correct and exists
    url: "https://evaengineering.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eva Engineering | Leading Construction & Engineering Solutions",
    description: "Trusted construction and engineering company delivering high-quality, sustainable solutions.",
    images: ["/images/logo/logo.png"],  // Ensure this image is correct and exists
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Service />
      <Clients />
      <Contact />
    </main>
  );
}
