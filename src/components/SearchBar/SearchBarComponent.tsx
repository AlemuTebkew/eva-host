"use client";
import { useState } from "react";
import { Search, ChevronLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-separator";

const searchOptions = ["Products", "Suppliers", "Services"];

export default function SearchBar() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* Desktop Search Bar */}
      <div className="hidden lg:flex items-center border rounded-full overflow-hidden bg-white w-full">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="px-4 py-2 w-full focus:outline-none"
        />

        {/* Search Button */}
        <button className="bg-orange-500 px-4 py-2 text-white">
          <Search size={24} />
        </button>
      </div>

      {/* Mobile Search Bar */}
      <div
        className="lg:hidden flex items-center border rounded-full px-4 py-2 w-full bg-gray-100"
        onClick={() => setIsMobileSearchOpen(true)}
      >
        <Search size={20} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="What are you looking for?"
          className="w-full text-sm focus:outline-none bg-transparent truncate"
          readOnly
        />
      </div>

      {/* Mobile Full-Screen Search */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-100 z-50 flex flex-col h-screen w-screen"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* Header with Back Button */}
            <div className=" px-2 pt-2 pb-2">
              <div className="flex justify-between items-center">
                <div
                  className="lg:hidden flex-1 flex items-center border rounded-full px-4 py-2 w-full bg-gray-100"
                  onClick={() => setIsMobileSearchOpen(true)}
                >
                  <Search size={20} className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="w-full text-sm focus:outline-none bg-transparent truncate"
                  />
                </div>
                <Button variant={"ghost"} className="" onClick={() => setIsMobileSearchOpen(false)}>Cancel</Button>
              </div>
            </div>
            <Separator className="border border-[.2px]"/>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}