import React from "react";
import { Product } from "@/types/product";
import ImageSlider from "../ImageSlider/ImageSlider";
import Breadcrumb from "../Breadcrumb";
import ProductDescription from "../ProductDescription";
import ProductFeature from "../ProductFeatues";

const productDetail: Product = {
    id: "1",
    name: "Product One",
    price: 99.99,
    category: "Category 1",
    material: "Material A",
    rating: 4.5,
    available: true,
    image: ""
}

const ProductDetail = () => {

  return (
    <div className="container my-4">
       <Breadcrumb
          items={[
            {
              label: 'Home',
              href: '/'
            },
            {
              label: 'Building Materials',
              href: '/products'
            },
            {
              label: 'Cement & Concrete',
              href: '/products/cement-concrete'
            },
            {
              label: 'Dangote Cement',
              href: '/products/cement-concrete'
            }
          ]}
        />
        <div className="flex flex-col md:flex-row md:justify-between bg-white py-6 rounded-lg mx-auto mt-4">
          {/* Image Slider */}
          <div className="w-full md:w-1/2">
          <ImageSlider images={[
          "https://tse2.mm.bing.net/th?id=OIP.a-YDWw7IcFGxYeuz_1wUrgHaHa&pid=Api",
          "https://www.photomarketingwizard.com/wp-content/uploads/2018/02/ecommerce-product-photography-25-768x768.jpg",
          "https://www.peekage.com/blog/wp-content/uploads/2020/06/sephora-free-samples-1024x1024.jpg"]} 
          />
          </div>
          <ProductDescription
            productName="1500W 2000W 3000W Raycus Laser Cutting Machine"
            suppliers={[
              { name: "Supplier A", price: "1,900", availability: true, minOrder: 50, discount: { minQuantity: 100, percent: 10 } },
              { name: "Supplier B", price: "2,200", availability: true, minOrder: 20 },
              { name: "Supplier C", price: "3,600", availability: false, minOrder: 10 },
            ]}
          />

          
          {/* Product Info */}
          {/* <div className="w-full md:w-1/2 p-4">
            <h1 className="text-xl font-bold text-gray-900 mb-2">{productDetail.name}</h1>
            <p className="text-lg text-gray-600 line-through">ETB {productDetail.price + 200}</p>
            <p className="text-xl font-semibold text-gray-900">ETB {productDetail.price}</p>
            
            <div className="flex justify-between mt-4">
              <p className="text-gray-700 font-semibold">Availability:</p>
              <span className={`px-3 py-1 rounded text-white ${productDetail.available ? "bg-green-500" : "bg-red-500"}`}>
                {productDetail.available ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            
            <div className="flex justify-between mt-2">
              <p className="text-gray-700 font-semibold">Material:</p>
              <p className="text-gray-900">{productDetail.material}</p>
            </div>
            
            <div className="flex justify-between mt-2">
              <p className="text-gray-700 font-semibold">Category:</p>
              <p className="text-gray-900">{productDetail.category}</p>
            </div>

            <div className="mt-4 flex space-x-3">
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600">
                Contact Supplier
              </button>
              <button className="border border-gray-400 px-4 py-2 rounded-lg shadow hover:bg-gray-100">
                💬 Chat
              </button>
            </div>
          </div> */}
        </div>
        <ProductFeature
          about="This high-performance fiber laser cutting machine is designed for industrial use, providing precise and efficient metal cutting capabilities."
          features={[
            "High precision laser technology",
            "Energy-efficient operation",
            "Durable and long-lasting design",
            "Supports multiple metal types",
            "Fast cutting speed for high productivity"
          ]}
        />
    </div>
  );
};

export default ProductDetail