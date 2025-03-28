"use client";

import { useState } from "react";
import { Search, ChevronDown, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export default function Navbar() {
  const [language, setLanguage] = useState("ENG");
  const [menuOpen, setMenuOpen] = useState(false);
  const languages = ["ENG", "AM"];

  return (
    <nav className="container mx-auto py-4 flex flex-col items-center">
      {/* Navbar Top Section */}
      <div className="w-full flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="text-2xl font-bold">EVA</div>

        {/* Desktop Navbar */}
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="flex flex-1 items-center border rounded overflow-hidden w-2/3">
            <input
              type="text"
              placeholder="Search for products..."
              className="px-4 py-2 w-full focus:outline-none"
            />
            <button className="bg-blue-700 px-4 py-2 text-white flex items-center">
              <Search className="w-4 h-4 mr-2" /> Search
            </button>
          </div>
        </div>

        {/* Right Section (Account & Buttons) */}
        <div className="hidden lg:flex items-center space-x-2">
          {/* Language Selector */}
          <Popover>
            <PopoverTrigger className="flex items-center cursor-pointer px-3 py-2 border rounded">
              {language} <ChevronDown className="w-4 h-4 ml-1" />
            </PopoverTrigger>
            <PopoverContent className="bg-white p-2 rounded-md shadow-md w-32">
              {languages.map((lang) => (
                <div
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-center"
                >
                  {lang}
                </div>
              ))}
            </PopoverContent>
          </Popover>

          {/* Account & Supplier Buttons */}
          <Button variant="default" className="px-5 py-2 rounded">
            <User className="w-4 h-4 mr-2" /> Account
          </Button>
          <Button variant="secondary" className="px-5 py-2 border border-black rounded">
            Become Supplier
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-gray-800 focus:outline-none">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Search Bar */}
      <div className="mt-4 lg:hidden flex items-center border rounded overflow-hidden w-full">
        <input
          type="text"
          placeholder="Search for products..."
          className="px-4 py-2 w-full focus:outline-none"
        />
        <button className="bg-blue-700 px-4 py-2 text-white flex">
          <Search className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden mt-4 bg-white shadow-md rounded-md p-4 flex flex-col items-center space-y-3 w-full">
          {/* Language Selector */}
          <Popover>
            <PopoverTrigger className="flex items-center cursor-pointer px-4 py-2 border rounded-full w-full justify-center">
              {language} <ChevronDown className="w-4 h-4 ml-2" />
            </PopoverTrigger>
            <PopoverContent className="bg-white p-2 rounded-md shadow-md w-32 text-center">
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
          <Button variant="default" className="px-5 py-2 w-full rounded-full">Login</Button>
          <Button variant="secondary" className="px-5 py-2 border border-black w-full rounded-full">Become Supplier</Button>
        </div>
      )}
    </nav>
  );
}
