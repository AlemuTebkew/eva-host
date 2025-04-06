import { useGetCategoriesQuery } from "@/store/app-api"
import { Category } from "@/types/category"
import { useState } from "react"
import Select from "react-select"
import { Button } from "../ui/button"
import { useSearchParams } from "next/navigation"

interface Option {
  label: string
  value: string
}

interface FilterProps {

  handleFilterChange: (filters: any) => void
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
}

export default function Filter({
  handleFilterChange,
}: FilterProps) {
  const searchParams = useSearchParams();
  const categoryIdSearchQuery = searchParams.get('categoryId') || '';
  const subCategoryIdSearchQuery = searchParams.get('subCategoryId') || '';
  const { data: categoriesData = [] } = useGetCategoriesQuery();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(categoryIdSearchQuery);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string | null>(subCategoryIdSearchQuery);
  const categoryOptions = categoriesData.map((category: Category) => ({
    label: category.name,
    value: category.id,
  }));
  
  const getSubCategoryOptions = (categoryId: string) => {
    const selectedCategory = categoriesData.find(cat => cat.id === categoryId);
    if (!selectedCategory) return [];
  
    return selectedCategory.subCategories.map(sub => ({
      label: sub.name,
      value: sub.id,
    }));
  };

  const [selectedFilters, setSelectedFilters] = useState<any>({
    category: null,
    subCategory: null,
    minPrice: "",
    maxPrice: "",
  })

  const handleInputChange = (filterType: string, value: any) => {
    const updatedFilters = { ...selectedFilters, [filterType]: value }
    setSelectedFilters(updatedFilters)
    handleFilterChange(updatedFilters)
  }


  return (
    <div className="p-6 bg-white rounded-lg max-w-xs w-full space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800">Filter By</h3>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <Select
            defaultValue={categoryOptions.find((option) => option.value === selectedCategoryId)}
            options={categoryOptions}
            isClearable
            // onChange={(option) => {
            //   handleInputChange("category", option?.value);
            //   setSelectedCategoryId(option?.value); // to later get subcategories
            // }}
        />
      </div>

      {/* SubCategory */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
        <Select
          defaultInputValue={getSubCategoryOptions(selectedCategoryId || "").find((option) => option.value === selectedSubCategoryId)?.label}
          options={getSubCategoryOptions(selectedCategoryId || "")}
          styles={customSelectStyles}
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
          onChange={(e) => handleInputChange("maxPrice", e.target.value)}
        />
      </div>

      <Button className="w-full flex items-center justify-center">
        Apply Filters
      </Button>
    </div>
  )
}
