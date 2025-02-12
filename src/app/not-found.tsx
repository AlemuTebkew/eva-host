import NotFound from "@/components/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Eva Engineering",
  description: "Oops! The page you're looking for doesn't exist. Return to the homepage or explore other services.",
  keywords: "404 error, page not found, Eva Engineering, website error, construction services",
  openGraph: {
    title: "404 - Page Not Found | Eva Engineering",
    description: "Oops! The page you're looking for doesn't exist. Return to the homepage or explore other services.",
    images: ["/images/logo/logo.png"],  // Ensure this image is correct and exists
    url: "https://evaengineering.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "404 - Page Not Found | Eva Engineering",
    description: "Oops! The page you're looking for doesn't exist. Return to the homepage or explore other services.",
    images: ["/images/logo/logo.png"],  // Ensure this image is correct and exists
  },
};

const ErrorPage = () => {
  return (
    <>
      <NotFound />
    </>
  );
};

export default ErrorPage;
