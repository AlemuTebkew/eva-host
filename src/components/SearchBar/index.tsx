"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SearchBar(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]); // Replace `any` with the appropriate type for your data
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const router = useRouter();

  // Handle search
  const handleSearch = async (query: string) => {
    // Implement search logic here
  };

  // Hide the menu when the input field loses focus
  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 300);
  };

  return (
    <div className="relative w-full">
      <div className="flex w-full gap-2">
        <div className="relative w-full">
          <Card className="flex items-center p-1 border border-input rounded-md shadow-sm">
            <Button variant="ghost" size="icon" className="p-2">
              <Search className="h-5 w-5" />
            </Button>
            <Input
              className="w-full ml-2 border-none"
              placeholder="What are you looking for?"
              onFocus={() => setIsFocused(true)}
              onBlur={handleBlur}
              onKeyUp={(event) => {
                const value = (event.target as HTMLInputElement).value;
                setSearchQuery(value);
                handleSearch(value);
              }}
            />
          </Card>
          {isFocused && (
            <div className="absolute w-full mt-2 bg-white rounded-md shadow-lg border border-input z-50">
              {searchQuery.length > 0 && (
                <ScrollArea className="max-h-48">
                  { results.length > 0 ? (
                    results.map((result) => (
                      <div
                        key={result.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => router.push(`/products/${result.id}`)}
                      >
                        {result.name}
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-gray-500">No results found</div>
                  )}
                </ScrollArea>
              )}
              {error && <div className="p-2 text-red-500">{error}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}