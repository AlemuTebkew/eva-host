import { useState } from 'react';

// Define types for the product filters
interface FilterProps {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  materials: string[];
  sizes: string[];
  ratings: number[];
  handleFilterChange: (filters: any) => void;
}

const Filter = ({
  categories,
  brands,
  priceRange,
  materials,
  sizes,
  ratings,
  handleFilterChange,
}: FilterProps) => {
  const [selectedFilters, setSelectedFilters] = useState<any>({});

  // Handle the changes in filter inputs
  const handleInputChange = (filterType: string, value: any) => {
    const newFilters = { ...selectedFilters, [filterType]: value };
    setSelectedFilters(newFilters);
    handleFilterChange(newFilters);
  };

  return (
    <div className="filter-section p-4 border rounded-lg ">
      <h3 className="text-xl font-semibold mb-4">Filter By</h3>

      {/* Category Filter */}
      <div className="filter-category mt-4">
        <label className="block text-sm font-medium">Category</label>
        <select
          className="w-full p-2 mt-2 border rounded"
          onChange={(e) => handleInputChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Brand Filter */}
      <div className="filter-brand mt-4">
        <label className="block text-sm font-medium">Brand</label>
        <select
          className="w-full p-2 mt-2 border rounded"
          onChange={(e) => handleInputChange('brand', e.target.value)}
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="filter-price mt-4">
        <label className="block text-sm font-medium">Price Range (₣)</label>
        <input
          type="range"
          min={priceRange[0]}
          max={priceRange[1]}
          onChange={(e) =>
            handleInputChange('price', parseInt(e.target.value))
          }
          className="w-full mt-2"
        />
        <div className="flex justify-between text-sm">
          <span>{priceRange[0]}</span>
          <span>{priceRange[1]}</span>
        </div>
      </div>

      {/* Material Type Filter */}
      <div className="filter-material mt-4">
        <label className="block text-sm font-medium">Material</label>
        <select
          className="w-full p-2 mt-2 border rounded"
          onChange={(e) => handleInputChange('material', e.target.value)}
        >
          <option value="">All Materials</option>
          {materials.map((material) => (
            <option key={material} value={material}>
              {material}
            </option>
          ))}
        </select>
      </div>

      {/* Size Filter */}
      <div className="filter-size mt-4">
        <label className="block text-sm font-medium">Size</label>
        <select
          className="w-full p-2 mt-2 border rounded"
          onChange={(e) => handleInputChange('size', e.target.value)}
        >
          <option value="">All Sizes</option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Rating Filter */}
      <div className="filter-rating mt-4">
        <label className="block text-sm font-medium">Rating</label>
        <div className="flex gap-2 mt-2">
          {ratings.map((rating) => (
            <div key={rating} className="flex items-center">
              <input
                type="radio"
                id={`rating-${rating}`}
                name="rating"
                value={rating}
                onChange={() => handleInputChange('rating', rating)}
              />
              <label htmlFor={`rating-${rating}`} className="ml-2 text-sm">
                {rating}★
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Checkbox Filters (for multiple selections, e.g., availability or eco-friendly) */}
      <div className="filter-checkbox mt-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="eco-friendly"
            onChange={(e) => handleInputChange('ecoFriendly', e.target.checked)}
          />
          <label htmlFor="eco-friendly" className="ml-2 text-sm">
            Eco-friendly Materials
          </label>
        </div>
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="in-stock"
            onChange={(e) => handleInputChange('inStock', e.target.checked)}
          />
          <label htmlFor="in-stock" className="ml-2 text-sm">
            In Stock Only
          </label>
        </div>
      </div>

      {/* Availability Filter (for checkbox with multiple options) */}
      <div className="filter-availability mt-4">
        <label className="block text-sm font-medium">Availability</label>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            id="available-now"
            onChange={(e) => handleInputChange('availableNow', e.target.checked)}
          />
          <label htmlFor="available-now" className="text-sm">
            Available Now
          </label>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            id="preorder"
            onChange={(e) => handleInputChange('preorder', e.target.checked)}
          />
          <label htmlFor="preorder" className="text-sm">
            Pre-order Available
          </label>
        </div>
      </div>

      {/* Color Filter */}
      <div className="filter-color mt-4">
        <label className="block text-sm font-medium">Color</label>
        <div className="flex gap-2 mt-2">
          <input
            type="checkbox"
            id="color-red"
            onChange={(e) => handleInputChange('color', e.target.checked)}
          />
          <label htmlFor="color-red" className="ml-2 text-sm">
            Red
          </label>
        </div>
        <div className="flex gap-2 mt-2">
          <input
            type="checkbox"
            id="color-blue"
            onChange={(e) => handleInputChange('color', e.target.checked)}
          />
          <label htmlFor="color-blue" className="ml-2 text-sm">
            Blue
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
