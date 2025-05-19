"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-900 py-6 text-white sm:py-8 ">
      <div className="container mx-auto px-4">
        <div className="mb-6 grid gap-6 sm:mb-8 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="mb-3 text-base font-bold sm:mb-4 sm:text-lg">
              EVA ENGINEERING
            </h4>
            <p className="text-xs text-gray-300 sm:text-sm">
              Your one-stop marketplace for all construction and building
              materials.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-base font-bold sm:mb-4 sm:text-lg">
              Company
            </h4>
            <ul className="space-y-1 text-xs text-gray-300 sm:space-y-2 sm:text-sm">
              <li>
                <Link href="/legal/about-us" className="hover:text-white">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-base font-bold sm:mb-4 sm:text-lg">
              Quick Links
            </h4>
            <ul className="space-y-1 text-xs text-gray-300 sm:space-y-2 sm:text-sm">
              <li>
                <Link href="/search" className="hover:text-white">
                  Compare Products
                </Link>
              </li>
              <li>
                <Link href="/suppliers" className="hover:text-white">
                  Search Suppliers
                </Link>
              </li>
              <li>
                <Link href="/register-as-supplier" className="hover:text-white">
                  Become a Supplier
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-base font-bold sm:mb-4 sm:text-lg">
              Legal
            </h4>
            <ul className="space-y-1 text-xs text-gray-300 sm:space-y-2 sm:text-sm">
              <li>
                <Link href="/legal/cookies-policy" className="hover:text-white">
                  Cookies Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms-of-service"
                  className="hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-800 pt-4 text-center text-xs text-gray-300 sm:pt-6 sm:text-sm">
          <p>© 2025 Eva Engineering. All rights reserved.</p>
          <p>
            Powered by{" "}
            <Link
              href="https://www.pixeladdis.com"
              className="hover:text-white"
            >
              Pixel Addis
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
