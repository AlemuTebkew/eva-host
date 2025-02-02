"use client";
import { useGetCategoryQuery, useGetProductsQuery } from "@/store/app-api";
import { useState } from "react";

const PRODUCTS_PER_PAGE = 8;

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any>(null); // Track selected product for modal

  // Fetch categories and products from the API
  const { data: categories = [] } = useGetCategoryQuery();
  const { data: products = [], isLoading, isError } = useGetProductsQuery();

  // Add "All" option to the categories
  const allCategories = [{ id: "all", name: "All" }, ...categories];

  // Filter products based on the selected category
  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((product) => product.category.name === selectedCategory);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (newPage:any) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Truncate long text
  const truncateText = (text:any, maxLength:any) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  // Open modal with product details
  const openModal = (product:any) => {
    setSelectedProduct(product);
  };

  // Close modal
  const closeModal = () => {
    setSelectedProduct(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products</div>;

  return (
    <section className="bg-white py-14">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Our Products</h2>
        <p className="text-lg text-gray-600 mt-2">Explore our diverse range of pharmaceutical and medical products.</p>

        <div className="mt-6 flex justify-center space-x-4">
          {allCategories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-lg transition duration-300 ${selectedCategory === category.name ? "bg-primary text-white" : "bg-gray-200 text-gray-800"}`}
              onClick={() => {
                setSelectedCategory(category.name);
                setCurrentPage(1); // Reset to first page when category changes
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedProducts.map((product, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
              onClick={() => openModal(product)}
            >
              <div className="flex justify-center">
                <img
                  src={`http://ec2-16-171-239-43.eu-north-1.compute.amazonaws.com:9000${product.image}`}
                  alt={product.name}
                  className="w-40 h-40 object-cover rounded-md" // Larger image size
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mt-4">{product.name}</h3>
              <p className="text-gray-600 mt-2 text-sm">
                {truncateText(product.description, 50)} {/* Truncate long text */}
              </p>
            </div>
          ))}
        </div>

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
                src={`http://ec2-16-171-239-43.eu-north-1.compute.amazonaws.com:9000${selectedProduct.image}`}
                alt={selectedProduct.name}
                className="w-64 h-64 object-cover rounded-md"
              />
            </div>
            <p className="text-gray-600 mt-4">{selectedProduct.description}</p>
            <p className="text-gray-800 font-semibold mt-4">Price: ${selectedProduct.price}</p>
            <p className="text-gray-600 mt-2">Category: {selectedProduct.category.name}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;