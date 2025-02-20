"use client";
import { useGetCategoryQuery, useGetProductsQuery } from "@/store/app-api";
import { useState } from "react";

const PRODUCTS_PER_PAGE = 8;
const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "https://api.alenafrica.org";

interface Subcategory {
  id: number;
  name: string;
  description: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  subcategory: Subcategory[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  subcategory: Subcategory;
}

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<String | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch categories and products from the API
  const { data: categories = [] } = useGetCategoryQuery();
  const { data: products = [], isLoading, isError } = useGetProductsQuery();

  // Add "All" option to the categories
  // const ["ongoing","completed","uppcomming"] = [{ id: 0, name: "All", description: "All", subcategory: [] }, ...categories];

  // Filter products based on the selected category and subcategory
  const filteredProducts =  products;

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching projects</div>;

  return (
    <section className="bg-white py-14">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Our Projects</h2>
        <p className="text-lg text-gray-600 mt-2">Explore our diverse range of projects.</p>

        {/* Category Selection */}
        <div className="mt-6 flex justify-center space-x-4">
          {["ongoing","completed","upcoming"].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg transition duration-300 ${
                selectedCategory === category ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedSubcategory(null);
                setCurrentPage(1);
              }}
            >
              {category}
            </button>
          ))}
        </div>

     

        {/* Product Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
              onClick={() => openModal(product)}
            >
              <div className="flex justify-center">
                <img
                  src={`${BASE_URL}${product.image}`}
                  alt={product.name}
                   className="w-full h-48 object-cover rounded-md"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mt-4">{product.name}</h3>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center space-x-4">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-800">Page {currentPage} of {totalPages}</span>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Modal for displaying full product information */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={closeModal}
              >
                &times;
              </button>
            </div>
            <div className="flex justify-center">
              <img
                src={`${BASE_URL}${selectedProduct.image}`}
                alt={selectedProduct.name}
                className="w-64 h-64 object-cover rounded-md"
              />
            </div>
            <p className="text-gray-600 mt-2">Subcategory: {selectedProduct.subcategory.name}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;