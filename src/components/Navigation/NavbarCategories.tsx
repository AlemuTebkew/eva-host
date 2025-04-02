import { Menu } from "lucide-react";

export default function NavbarCategories() {
  return (
    <div className="border-b">
      <div className="max-w-c-1235 mx-auto flex justify-between items-center px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 text-gray-700 hover:text-black">
            <Menu size={20} />
            <span>All categories</span>
          </button>
          <a href="#" className="text-gray-700 hover:text-black">Suppliers</a>
          <a href="#" className="text-gray-700 hover:text-black">Service</a>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          <a href="#" className="text-gray-700 hover:text-black">Help Center</a>
          <a href="#" className="text-gray-700 hover:text-black">Get the app</a>
          <a href="#" className="text-gray-700 hover:text-black">Become a supplier</a>
        </div>
      </div>
    </div>
  );
}
