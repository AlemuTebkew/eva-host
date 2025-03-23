import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export default function Navbar() {
  const [language, setLanguage] = useState("ENG");
  const languages = ["ENG", "AM"];

  return (
    <nav className="container flex items-center justify-between py-4">
      <div className="font-bold text-xl">EVA ENGINEERING</div>
      
      {/* Search Bar */}
      <div className="flex items-center border rounded-md overflow-hidden">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="px-4 py-2 w-80 focus:outline-none"
        />
        <button className="bg-blue-700 px-4 py-2 text-white flex items-center">
          <Search className="w-4 h-4 mr-2" /> Search
        </button>
      </div>

      {/* Language Dropdown, Login, and Supplier Button */}
      <div className="flex items-center space-x-4">
        {/* Language Dropdown */}
        <Popover>
          <PopoverTrigger className="flex items-center cursor-pointer">
            {language} <ChevronDown className="w-4 h-4 ml-1" />
          </PopoverTrigger>
          <PopoverContent className="bg-white p-2 rounded-md shadow-md w-32">
            {languages.map((lang) => (
              <div
                key={lang}
                onClick={() => setLanguage(lang)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {lang}
              </div>
            ))}
          </PopoverContent>
        </Popover>

        {/* Buttons */}
        <Button variant="default" className="px-4 py-2">Login</Button>
        <Button variant="secondary" className="px-4 py-2 border border-black">Become Supplier</Button>
      </div>
    </nav>
  );
}