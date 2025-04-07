"use client";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-separator";
import { useRouter, useSearchParams } from "next/navigation";
import { useLazyGetSearchSuggestionQuery } from "@/store/app-api";

export default function SearchBar() {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const searchParams = useSearchParams();
  const searchParam = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(searchParam);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [GetSuggestions, { data }] = useLazyGetSearchSuggestionQuery();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileSearchOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsInputFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Desktop Search */}
      <div ref={containerRef} className="relative hidden lg:flex flex-col w-full z-50">
        <div className="flex items-center border rounded-full overflow-hidden bg-white w-full relative z-20">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setTimeout(() => setIsInputFocused(false), 150)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              GetSuggestions({ params: { keyword: e.target.value } });
            }}
            onKeyDown={handleKeyDown}
            placeholder="What are you looking for?"
            className="px-4 py-2 w-full focus:outline-none"
          />
          <button onClick={handleSearch} className="bg-orange-500 px-4 py-2 text-white">
            <Search size={24} />
          </button>
        </div>

        {data && data.length > 0 && searchQuery.trim() && isInputFocused && (
          <div className="absolute top-full mt-1 left-0 w-full bg-white border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
            <div className="px-4 py-2 border-b">
              <p className="text-sm font-medium text-gray-600">Suggestions</p>
            </div>
            {data.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchQuery(suggestion);
                  router.push(`/search?keyword=${encodeURIComponent(suggestion)}`);
                  setIsInputFocused(false);
                  inputRef.current?.blur();
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Search Trigger */}
      <div
        className="lg:hidden flex items-center border rounded-full px-4 py-2 w-full bg-gray-100"
        onClick={() => setIsMobileSearchOpen(true)}
      >
        <Search size={20} className="text-gray-500 mr-2" />
        <input
          type="text"
          value={searchQuery}
          placeholder="What are you looking for?"
          className="w-full text-sm focus:outline-none bg-transparent truncate"
          readOnly
        />
      </div>

      {/* Mobile Search Modal */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-100 z-50 flex flex-col h-screen w-screen"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-2">
              <div className="flex justify-between items-center">
                <div className="flex-1 flex items-center border rounded-full px-4 py-2 w-full bg-white">
                  <Search size={20} className="text-gray-500 mr-2" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      GetSuggestions({ params: { keyword: e.target.value } });
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="What are you looking for?"
                    className="w-full text-sm focus:outline-none bg-transparent"
                    autoFocus
                  />
                </div>
                <Button variant="ghost" onClick={() => setIsMobileSearchOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>

            <Separator className="border border-[.2px]" />

            {data && data?.length > 0 && searchQuery.trim() !== "" && (
              <div className="px-4 pt-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden border">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-600">Suggestions</p>
                  </div>
                  {data.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-800"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        router.push(`/search?keyword=${encodeURIComponent(suggestion)}`);
                        setIsMobileSearchOpen(false);
                        inputRef.current?.blur();
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
