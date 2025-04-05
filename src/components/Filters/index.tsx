import { useState } from 'react';

// Define types for the product filters
interface FilterProps {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  materials: string[];
  sizes: string[];
  ratings: number[];
  locations: string[]; // New field for locations
  handleFilterChange: (filters: any) => void;
}

const Filter = ({
  categories,
  brands,
  priceRange,
  materials,
  sizes,
  ratings,
  locations,
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
    <div className="filter-section p-6 bg-white rounded-lg max-w-xs w-full">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Filter By</h3>

      {/* Category Filter */}
      <div className="filter-category mb-6">
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          className="w-full p-3 mt-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
      <div className="filter-brand mb-6">
        <label className="block text-sm font-medium text-gray-700">Brand</label>
        <select
          className="w-full p-3 mt-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
      <div className="filter-price mb-6">
        <label className="block text-sm font-medium text-gray-700">Price Range (₣)</label>
        <input
          type="range"
          min={priceRange[0]}
          max={priceRange[1]}
          onChange={(e) =>
            handleInputChange('price', parseInt(e.target.value))
          }
          className="w-full mt-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>{priceRange[0]}</span>
          <span>{priceRange[1]}</span>
        </div>
      </div>

      {/* Material Type Filter */}
      <div className="filter-material mb-6">
        <label className="block text-sm font-medium text-gray-700">Material</label>
        <select
          className="w-full p-3 mt-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
      <div className="filter-size mb-6">
        <label className="block text-sm font-medium text-gray-700">Size</label>
        <select
          className="w-full p-3 mt-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
      <div className="filter-rating mb-6">
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <div className="flex gap-2 mt-2">
          {ratings.map((rating) => (
            <div key={rating} className="flex items-center">
              <input
                type="radio"
                id={`rating-${rating}`}
                name="rating"
                value={rating}
                onChange={() => handleInputChange('rating', rating)}
                className="w-4 h-4 text-pink-500"
              />
              <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-gray-700">
                {rating}★
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Location Filter (Proximity) */}
      <div className="filter-location mb-6">
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <select
          className="w-full p-3 mt-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500"
          onChange={(e) => handleInputChange('location', e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
