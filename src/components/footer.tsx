import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-blue-900 py-6 sm:py-8 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-6 sm:mb-8 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="mb-3 sm:mb-4 text-base sm:text-lg font-bold">EVA ENGINEERING</h4>
            <p className="text-xs sm:text-sm text-gray-300">
              Your one-stop marketplace for all construction and building materials.
            </p>
          </div>
          <div>
            <h4 className="mb-3 sm:mb-4 text-base sm:text-lg font-bold">Company</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 sm:mb-4 text-base sm:text-lg font-bold">Support</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Safety Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Community
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 sm:mb-4 text-base sm:text-lg font-bold">Legal</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-white">
                  Cookies Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Dispute Resolution
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-800 pt-4 sm:pt-6 text-center text-xs sm:text-sm text-gray-300">
          <p>© 2025 Eva Engineering. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
