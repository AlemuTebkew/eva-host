"use client";

import { useEffect, useRef, useState } from "react";
import { SortDesc } from "lucide-react";
import { SortOption, SortValue } from "@/types/product";

interface SortDropdownProps {
  sortOptions: SortOption[];
  selectedSort: SortValue | null;
  onChange: (value: SortValue) => void;
}

export default function SortDropdown({
  sortOptions,
  selectedSort,
  onChange,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const isSelected = (option: SortOption) =>
    selectedSort?.sortBy === option.value.sortBy &&
    selectedSort?.sortOrder === option.value.sortOrder;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-max">
      <button
        onClick={toggleDropdown}
        className="text-sm text-gray-800 border border-gray-300 px-4 py-2 rounded-md flex items-center gap-2 hover:border-gray-400 focus:outline-none"
      >
        <SortDesc size={16}/>
        <span className="hidden lg:inline">
          Sort By:{" "}
          {sortOptions.find((option) => isSelected(option))?.label ?? "Select"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <ul className="py-2">
            {sortOptions.map((option) => (
              <li key={`${option.value.sortBy}-${option.value.sortOrder}`}>
                <label className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  <input
                    type="radio"
                    name="sort"
                    className="mr-2"
                    checked={isSelected(option)}
                    onChange={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                  />
                  {option.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
