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
    <nav className="container mx-auto px-4 py-3">
      {/* Top Section: Logo, Menu Button, and Account */}
      <div className="flex items-center justify-between">
        {/* Left: Logo & Menu */}
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold">EVA</div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-gray-800 focus:outline-none"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Right: Account/Login */}
        <Button variant="default" size="sm">
          <User className="w-4 h-4 mr-1" /> Account
        </Button>
      </div>

      {/* Full-Width Search Bar on Mobile */}
      <div className="mt-3 lg:hidden flex items-center border rounded-md overflow-hidden w-full">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="px-4 py-2 w-full focus:outline-none"
        />
        <button className="bg-blue-700 px-4 py-2 text-white flex items-center">
          <Search className="w-4 h-4 mr-2" /> Search
        </button>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden lg:flex items-center justify-between mt-3">
        {/* Search Bar */}
        <div className="flex items-center border rounded-md overflow-hidden w-1/2">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="px-4 py-2 w-full focus:outline-none"
          />
          <button className="bg-blue-700 px-4 py-2 text-white flex items-center">
            <Search className="w-4 h-4 mr-2" /> Search
          </button>
        </div>

        {/* Language Selector & Buttons */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <Popover>
            <PopoverTrigger className="flex items-center cursor-pointer px-3 py-2 border rounded-md">
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
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden mt-3 bg-white shadow-md rounded-md p-4 flex flex-col space-y-3">
          {/* Language Selector */}
          <Popover>
            <PopoverTrigger className="flex items-center cursor-pointer px-3 py-2 border rounded-md w-full justify-between">
              {language} <ChevronDown className="w-4 h-4" />
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
          <Button variant="default" className="px-4 py-2 w-full">Login</Button>
          <Button variant="secondary" className="px-4 py-2 border border-black w-full">Become Supplier</Button>
        </div>
      )}
    </nav>
  );
}
