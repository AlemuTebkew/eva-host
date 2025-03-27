import { Twitter, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-black text-sm font-medium border-t border-gray-200">
      <div className="container mx-auto px-4 py-6">
        
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center">
          {/* Logo */}
          <div className="text-lg font-semibold">Eva Engineering</div>

          {/* Navigation Links */}
          <ul className="flex space-x-6">
            <li className="hover:text-gray-600 cursor-pointer">Market Reports</li>
            <li className="hover:text-gray-600 cursor-pointer">Price Comparison</li>
            <li className="hover:text-gray-600 cursor-pointer">Supplier Listings</li>
            <li className="hover:text-gray-600 cursor-pointer">Advertise with Us</li>
          </ul>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <Twitter className="w-5 h-5 cursor-pointer hover:text-gray-600" />
            <Facebook className="w-5 h-5 cursor-pointer hover:text-gray-600" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-gray-600" />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center text-center space-y-4">
          {/* Logo */}
          <div className="text-lg font-semibold">Eva Engineering</div>

          {/* Navigation Links */}
          <ul className="grid grid-cols-2 gap-4 text-gray-700">
            <li className="hover:text-gray-600 cursor-pointer">Market Reports</li>
            <li className="hover:text-gray-600 cursor-pointer">Price Comparison</li>
            <li className="hover:text-gray-600 cursor-pointer">Supplier Listings</li>
            <li className="hover:text-gray-600 cursor-pointer">Advertise with Us</li>
          </ul>

          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <Twitter className="w-5 h-5 cursor-pointer hover:text-gray-600" />
            <Facebook className="w-5 h-5 cursor-pointer hover:text-gray-600" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-gray-600" />
          </div>
        </div>

      </div>
    </footer>
  );
}
