'use client'
import { useState } from "react";
import { Search } from "lucide-react";

const searchOptions = ["Products", "Suppliers", "Services"];

export default function SearchBar() {
  const [selectedOption, setSelectedOption] = useState("Products");

  return (
    <div className="w-full pl-2 flex flex-row-reverse items-center border rounded-full overflow-hidden bg-white lg:flex-row">
      {/* Selection Dropdown */}
      <select
        className="hidden px-4 py-2 bg-gray-100 border-r focus:outline-none lg:block"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {searchOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Search Input */}
      <input
        type="text"
        placeholder={`What are you looking for?`}
        className="px-2 lg:px-4 py-2 w-full focus:outline-none"
      />

      {/* Search Button */}
      <button className="hidden bg-orange-500 px-4 py-2 text-white lg:block">
        <Search size={24}/>
      </button>
      <Search size={24} className="lg:hidden text-gray-500"/>
    </div>
  );
}
