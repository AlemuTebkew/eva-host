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
              label: 'Portland  Cement',
              href: '/products/portland -concrete'
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
          {/* Product Description */}  
         <div className="p-4 bg-white rounded-lg space-y-4 mt-4">
            <h2 className="text-lg font-semibold text-indigo-600">🔥 High-Performance Portland Cement (Grade 53)</h2>
            
            <p className="text-sm"><strong>📝 About the Product:</strong> High-strength, fast-setting cement for heavy-duty construction. Ideal for bridges, skyscrapers, and large infrastructure. Low heat hydration for mass concrete applications like dams and flyovers. Manufactured under strict quality control, meeting international standards.</p>
            
            <h3 className="text-md font-semibold text-indigo-600">🌟 Key Features & Benefits</h3>
            <ul className="list-disc list-inside text-sm space-y-2">
              <li><strong>✔ High Strength:</strong> 53 MPa in 28 days for demanding projects.</li>
              <li><strong>✔ Rapid Setting:</strong> Initial setting in 30 minutes.</li>
              <li><strong>✔ Low Heat Hydration:</strong> Reduces thermal cracks.</li>
              <li><strong>✔ Excellent Workability:</strong> Easy to mix, apply, and finish.</li>
              <li><strong>✔ Chemical Resistance:</strong> Protects against sulfates & chlorides.</li>
              <li><strong>✔ Eco-Friendly:</strong> Low carbon footprint.</li>
              <li><strong>✔ Long-Lasting:</strong> Superior durability and water resistance.</li>
              <li><strong>✔ Uniform Particle Size:</strong> Reduces porosity and cracks.</li>
            </ul>

            <h3 className="text-md font-semibold text-indigo-600">📌 Ideal Applications</h3>
            <ul className="list-disc list-inside text-sm space-y-2">
              <li>Bridges, flyovers, and expressways</li>
              <li>High-rise buildings & skyscrapers</li>
              <li>Dams, tunnels & mass concrete</li>
              <li>Residential & commercial buildings</li>
              <li>Precast components</li>
              <li>Roads & pavements</li>
              <li>Marine & industrial structures</li>
            </ul>

            <h3 className="text-md font-semibold text-indigo-600">📊 Technical Specifications</h3>
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left">Property</th>
                  <th className="px-3 py-2 text-left">Value</th>
                  <th className="px-3 py-2 text-left">Standard Compliance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-3 py-2">Compressive Strength (28 days)</td>
                  <td className="px-3 py-2">53 MPa</td>
                  <td className="px-3 py-2">IS 12269:2013, ASTM C150</td>
                </tr>
                <tr className="border-t">
                  <td className="px-3 py-2">Initial Setting Time</td>
                  <td className="px-3 py-2">30 - 45 minutes</td>
                  <td className="px-3 py-2">IS 4031 (Part 5)</td>
                </tr>
                <tr className="border-t">
                  <td className="px-3 py-2">Final Setting Time</td>
                  <td className="px-3 py-2">≤ 600 minutes</td>
                  <td className="px-3 py-2">IS 4031 (Part 5)</td>
                </tr>
                <tr className="border-t">
                  <td className="px-3 py-2">Fineness (m²/kg)</td>
                  <td className="px-3 py-2">≥ 225</td>
                  <td className="px-3 py-2">IS 4031 (Part 2)</td>
                </tr>
                <tr className="border-t">
                  <td className="px-3 py-2">Sulphate Resistance</td>
                  <td className="px-3 py-2">High</td>
                  <td className="px-3 py-2">ASTM C1012</td>
                </tr>
                <tr className="border-t">
                  <td className="px-3 py-2">Chloride Content</td>
                  <td className="px-3 py-2">≤ 0.1%</td>
                  <td className="px-3 py-2">BS EN 197-1</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
          <ProductDescription
            productName='HP Intel Core i7 11th Gen 14" FHD Laptop'
            suppliers={[
              { name: "Nexus Industrial Supplies", price: 1900, minOrder: 50, discount: { minQuantity: 100, percent: 10 } },
              { name: "Supplier B", price: 2200, minOrder: 20 },
              { name: "Supplier C", price: 3600, minOrder: 10, discount: { minQuantity: 50, percent: 5 } },
              { name: "Supplier D", price: 2500, minOrder: 30 },
              { name: "Supplier E", price: 2700, minOrder: 15 },
            ]}
          />
        </div>
    </div>
  );
};

export default ProductDetail