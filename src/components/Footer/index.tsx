import { Twitter, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex justify-between items-center py-4 bg-white text-black text-sm font-medium border-t border-gray-200">
      {/* Logo as Text */}
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
        <Twitter className="w-4 h-4 cursor-pointer hover:text-gray-600" />
        <Facebook className="w-4 h-4 cursor-pointer hover:text-gray-600" />
        <Instagram className="w-4 h-4 cursor-pointer hover:text-gray-600" />
      </div>
    </footer>
  );
}
