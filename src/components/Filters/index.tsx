import { useGetCategoriesQuery } from "@/store/app-api";
import { Category } from "@/types/category";
import { useState, useEffect } from "react";
import Select from "react-select";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";

interface Option {
  label: string;
  value: string;
}

interface FilterProps {
  onApplyFilters: (filters: {
    category?: string;
    subCategory?: string;
    minPrice?: string;
    maxPrice?: string;
  }) => void;
  selectedCategory?: string;
  selectedSubCategory?: string;
  minPrice?: string;
  maxPrice?: string;
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

export default function Filter({ onApplyFilters }: FilterProps) {
  const searchParams = useSearchParams();
  const categoryIdSearchQuery = searchParams.get("categoryId") || "";
  const subCategoryIdSearchQuery = searchParams.get("subCategoryId") || "";
  const minPriceSearchQuery = searchParams.get("minPrice") || "";
  const maxPriceSearchQuery = searchParams.get("maxPrice") || "";
  const { data: categoriesData = [] } = useGetCategoriesQuery();
  
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(categoryIdSearchQuery);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string | null>(subCategoryIdSearchQuery);
  
  const categoryOptions = categoriesData.map((category: Category) => ({
    label: category.name,
    value: category.id,
  }));

  const getSubCategoryOptions = (categoryId: string) => {
    const selectedCategory = categoriesData.find((cat) => cat.id === categoryId);
    if (!selectedCategory) return [];

    return selectedCategory.subCategories.map((sub) => ({
      label: sub.name,
      value: sub.id,
    }));
  };

  const [selectedFilters, setSelectedFilters] = useState<any>({
    category: categoryIdSearchQuery || null,
    subCategory: subCategoryIdSearchQuery || null,
    minPrice: minPriceSearchQuery,
    maxPrice: maxPriceSearchQuery
  });

  useEffect(() => {
    // Update filters based on query params if they're changed externally
    setSelectedFilters({
      category: categoryIdSearchQuery || null,
      subCategory: subCategoryIdSearchQuery || null,
      minPrice: minPriceSearchQuery,
      maxPrice: maxPriceSearchQuery
    });
  }, [categoryIdSearchQuery, subCategoryIdSearchQuery]);

  const handleInputChange = (filterType: string, value: any) => {
    const updatedFilters = { ...selectedFilters, [filterType]: value };
    setSelectedFilters(updatedFilters);
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      category: selectedFilters.category,
      subCategory: selectedFilters.subCategory,
      minPrice: selectedFilters.minPrice,
      maxPrice: selectedFilters.maxPrice,
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg max-w-xs w-full h-full space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800">Filter By</h3>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <Select
          defaultValue={categoryOptions.find((option) => option.value === selectedCategoryId)}
          options={categoryOptions}
          isClearable
          onChange={(option) => {
            handleInputChange("category", option?.value);
            setSelectedCategoryId(option?.value ?? null); // to later get subcategories
          }}
        />
      </div>

      {/* SubCategory */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
        <Select
          defaultInputValue={getSubCategoryOptions(selectedCategoryId || "").find((option) => option.value === selectedSubCategoryId)?.label}
          options={getSubCategoryOptions(selectedCategoryId || "")}
          isClearable
          placeholder="Select sub-category"
          onChange={(option) => handleInputChange("subCategory", option?.value || "")}
        />
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
        <input
          type="number"
          className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="e.g. 100"
          value={selectedFilters.minPrice}
          min={0}
          max={selectedFilters.maxPrice}
          step="any"
          onChange={(e) => handleInputChange("minPrice", e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
        <input
          type="number"
          className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="e.g. 1000"
          value={selectedFilters.maxPrice}
          min={selectedFilters.minPrice ?? 0}
          onChange={(e) => handleInputChange("maxPrice", e.target.value)}
        />
      </div>

      <Button className="w-full flex items-center justify-center" onClick={handleApplyFilters}>
        Apply Filters
      </Button>
    </div>
  );
}