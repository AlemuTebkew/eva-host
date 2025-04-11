import { useGetCategoriesQuery } from "@/store/app-api";
import { useState } from "react";
import Select from "react-select";
import { Button } from "../ui/button";

interface Option {
  label: string;
  value: string;
}

interface SupplierFilterProps {
  onApplyFilters: (filters: {
    category?: string;
    minRating?: string;
  }) => void;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const customSelectStyles = {
  control: (base: any) => ({
    ...base,
    padding: "6px 8px",
    borderRadius: "0.75rem",
    borderColor: "#FEC6D4",
    boxShadow: "none",
    "&:hover": { borderColor: "#FC2779" },
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#A1A1AA",
    fontSize: "0.875rem",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "#111827",
    fontWeight: 500,
  }),
};

export default function SupplierFilters({ onApplyFilters, onClose }: SupplierFilterProps) {
  const { data: categoriesData = [] } = useGetCategoriesQuery();

  const categoryOptions = categoriesData.map((category: any) => ({
    label: category.name,
    value: category.id,
  }));

  const ratingOptions: Option[] = [
    { label: "1 Star & up", value: "1" },
    { label: "2 Stars & up", value: "2" },
    { label: "3 Stars & up", value: "3" },
    { label: "4 Stars & up", value: "4" },
    { label: "5 Stars", value: "5" },
  ];

  const [selectedFilters, setSelectedFilters] = useState<any>({});

  const handleInputChange = (filterType: string, value: any) => {
    setSelectedFilters((prev: any) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      category: selectedFilters.category,
      minRating: selectedFilters.minRating,
    });
    onClose(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg max-w-xs w-full h-full space-y-6 border">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">Filter Suppliers</h3>
        <Button variant="ghost" className="lg:hidden" onClick={() => onClose(false)}>
          Cancel
        </Button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
        <Select
          options={categoryOptions}
          isClearable
          styles={customSelectStyles}
          onChange={(option) => handleInputChange("category", option?.value || "")}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
        <Select
          options={ratingOptions}
          isClearable
          styles={customSelectStyles}
          onChange={(option) => handleInputChange("minRating", option?.value || "")}
        />
      </div>

      <Button className="w-full flex items-center justify-center" onClick={handleApplyFilters}>
        Apply Filters
      </Button>
    </div>
  );
}
