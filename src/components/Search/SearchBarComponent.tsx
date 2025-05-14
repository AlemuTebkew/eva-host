"use client";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-separator";
import { useRouter, useSearchParams } from "next/navigation";
import { useLazyGetSearchSuggestionQuery } from "@/store/app-api";
import { useTranslations } from "next-intl";

export default function SearchBar() {
  const t = useTranslations("search"); // Use the "search" namespace for translations
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const searchParams = useSearchParams();
  const searchParam = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(searchParam);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [GetSuggestions, { data }] = useLazyGetSearchSuggestionQuery();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileSearchOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e);
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

  interface SuggestionClickEvent extends React.MouseEvent<HTMLDivElement> {}

  function handleSuggestionClick(e: SuggestionClickEvent, suggestion: string) {
    e.stopPropagation(); // Prevent the click event from bubbling up to the container
    e.preventDefault(); // Prevent the default action of the click event
    setSearchQuery(suggestion);
    setIsInputFocused(false);

    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
  }

  return (
    <>
      {/* Desktop Search */}
      <div
        ref={containerRef}
        className="relative z-50 hidden w-full flex-col lg:flex"
      >
        <div className="relative z-20 flex max-w-[600px] items-center overflow-hidden  border bg-white">
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
            placeholder={t("placeholder")} // Use the translated placeholder
            className=" w-full rounded-md px-4 py-2 focus:outline-none"
          />
          <Button
            onClick={handleSearch}
            className="absolute right-0 top-0 h-full w-[100px] rounded-l-none bg-blue-800 hover:bg-blue-800"
            size="icon"
          >
            <Search className="h-4 w-4" />
            {t("search")} {/* Use the translated button text */}
          </Button>
        </div>

        {data && data.length > 0 && searchQuery.trim() && isInputFocused && (
          <div className="absolute left-0 top-full z-50 mt-1 max-h-64 w-full overflow-y-auto rounded-md border bg-white shadow-lg">
            <div className="border-b px-4 py-2">
              <p className="text-sm font-medium text-gray-600">Suggestions</p>
            </div>
            {data.map((suggestion, index) => (
              <div
                key={index}
                onMouseDown={(e) => {
                  handleSuggestionClick(e, suggestion);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Search Trigger */}
      <div
        className="relative flex w-full  items-center border bg-white px-4 py-2 lg:hidden"
        onClick={() => setIsMobileSearchOpen(true)}
      >
        <input
          type="text"
          value={searchQuery}
          placeholder={t("placeholder")}
          className=" w-full rounded-md px-4  focus:outline-none"
          readOnly
        />

        <Button
          onClick={handleSearch}
          className="absolute right-0 top-0 h-full w-[100px] rounded-l-none bg-blue-800 hover:bg-blue-800"
          size="icon"
        >
          <Search className="h-4 w-4" />
          {t("search")} {/* Use the translated button text */}
        </Button>
      </div>

      {/* Mobile Search Modal */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex h-screen w-screen flex-col bg-gray-100"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="px-2 pb-2 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex w-full flex-1 items-center rounded-full border bg-white px-4 py-2">
                  <Search size={20} className="mr-2 text-gray-500" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      GetSuggestions({ params: { keyword: e.target.value } });
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder={t("placeholder")}
                    className=" w-full rounded-md px-4  focus:outline-none"
                    autoFocus
                  />
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setIsMobileSearchOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>

            <Separator className="border-[1.2px]" />

            {data && data?.length > 0 && searchQuery.trim() !== "" && (
              <div className="px-4 pt-2">
                <div className="overflow-hidden rounded-lg border bg-white shadow-md">
                  <div className="border-b px-4 py-2">
                    <p className="text-sm font-medium text-gray-600">
                      Suggestions
                    </p>
                  </div>
                  {data.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-50"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        router.push(
                          `/search?keyword=${encodeURIComponent(suggestion)}`,
                        );
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
