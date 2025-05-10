import { useGetCategoriesQuery } from "@/store/app-api";
import { Category } from "@/types/category";
import { useState, useEffect, SetStateAction } from "react";
import Select from "react-select";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import AddressFilter from "./AddressFilter";

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
    region?: string;
    city?: string;
    subCity?: string;
    woreda?: string;
  }) => void;
  onClose: React.Dispatch<SetStateAction<boolean>>;
}


export default function Filter({ onApplyFilters, onClose }: FilterProps) {
  const searchParams = useSearchParams();
  const categoryIdSearchQuery = searchParams.get("categoryId") || "";
  const subCategoryIdSearchQuery = searchParams.get("subCategoryId") || "";
  const minPriceSearchQuery = searchParams.get("minPrice") || "";
  const maxPriceSearchQuery = searchParams.get("maxPrice") || "";
  const { data: categoriesData = [] } = useGetCategoriesQuery();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    categoryIdSearchQuery,
  );
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
    string | null
  >(subCategoryIdSearchQuery);

  const categoryOptions = categoriesData.map((category: Category) => ({
    label: category.name,
    value: category.id,
  }));

  const getSubCategoryOptions = (categoryId: string) => {
    const selectedCategory = categoriesData.find(
      (cat) => cat.id === categoryId,
    );
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
    maxPrice: maxPriceSearchQuery,
  });

  const [locationFilters, setLocationFilters] = useState({
    region: '',
    city: '',
    subCity: '',
    woreda: '',
  });

  useEffect(() => {
    // Update filters based on query params if they're changed externally
    setSelectedFilters({
      category: categoryIdSearchQuery || null,
      subCategory: subCategoryIdSearchQuery || null,
      minPrice: minPriceSearchQuery,
      maxPrice: maxPriceSearchQuery,
    });
  }, [
    categoryIdSearchQuery,
    subCategoryIdSearchQuery,
    minPriceSearchQuery,
    maxPriceSearchQuery,
  ]);

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
      region: locationFilters.region,
      city: locationFilters.city,
      subCity: locationFilters.subCity,
      woreda: locationFilters.woreda,
    });
    console.log('bbb',locationFilters)
    console.log('ccc',selectedFilters)
    onClose(false);
  };

  return (
    <div className="h-full w-full max-w-xs space-y-6 rounded-lg bg-white p-6 px-2 ">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Filter By</h3>
        <Button
          variant={"ghost"}
          className="lg:hidden"
          onClick={() => onClose(false)}
        >
          Cancel
        </Button>
      </div>

      {/* Category */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Category
        </label>
        <Select
          defaultValue={categoryOptions.find(
            (option) => option.value === selectedCategoryId,
          )}
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
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Sub Category
        </label>
        <Select
          defaultInputValue={
            getSubCategoryOptions(selectedCategoryId || "").find(
              (option) => option.value === selectedSubCategoryId,
            )?.label
          }
          options={getSubCategoryOptions(selectedCategoryId || "")}
          isClearable
          onChange={(option) =>
            handleInputChange("subCategory", option?.value || "")
          }
        />
      </div>

      {/* Price Range */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Min Price
        </label>
        <input
          type="number"
          className="w-full rounded-lg border bg-gray-50 p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="e.g. 100"
          value={selectedFilters.minPrice}
          min={0}
          max={selectedFilters.maxPrice}
          step="any"
          onChange={(e) => handleInputChange("minPrice", e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Max Price
        </label>
        <input
          type="number"
          className="w-full rounded-lg border bg-gray-50 p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="e.g. 1000"
          value={selectedFilters.maxPrice}
          min={selectedFilters.minPrice ?? 0}
          onChange={(e) => handleInputChange("maxPrice", e.target.value)}
        />
      </div>

      <AddressFilter
        onChange={(location) => setLocationFilters(location)}
      />

      <Button
        className="flex w-full items-center justify-center"
        onClick={handleApplyFilters}
      >
        Apply Filters
      </Button>
    </div>
  );
}
