'use client';
import React from "react";
import ImageSlider from "../ImageSlider/ImageSlider";
import Breadcrumb from "../Breadcrumb";
import ProductDescription from "../ProductDescription";
import { useParams } from "next/navigation";
import { useGetProductDetailQuery } from "@/store/app-api";
import { HtmlRenderer } from "../HtmlRenderer";
import ProductListSkeleton from "../Skeleton/ProductListSkeleton";
import ProductDetailSkeleton from "../Skeleton/ProductDetailSkeleton";
import ProductImageSlider from "../ImageSlider/CustomImageSlider";
import CustomProductDetail from "./CustomProductDetail";

const productHtmlFromCKEditor = `<p className="text-sm"><strong>📝 About the Product:</strong> High-strength, fast-setting cement for heavy-duty construction. Ideal for bridges, skyscrapers, and large infrastructure. Low heat hydration for mass concrete applications like dams and flyovers. Manufactured under strict quality control, meeting international standards.</p>
                
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
                </table>`

const ProductDetail = () => {
  const {slug} = useParams()
  const {data, isLoading, isSuccess} = useGetProductDetailQuery(slug as string)
  return (
    <div className="max-w-c-1235 mx-auto mt-2 lg:mt-4 px-6 bg-white">
      {
        false && (
          <ProductDetailSkeleton/>
        )
      }
      {
        true && (
          <div className="flex py-8">
            <CustomProductDetail
            images={[
              'https://www.peekage.com/blog/wp-content/uploads/2020/06/sephora-free-samples-1024x1024.jpg',
              'https://www.photomarketingwizard.com/wp-content/uploads/2018/02/ecommerce-product-photography-25-768x768.jpg',
              'https://tse2.mm.bing.net/th?id=OIP.a-YDWw7IcFGxYeuz_1wUrgHaHa&pid=Api',

            ]}
            title="Fashion Men's Stainless Steel Design Watch for Men Luxury Custom Logo Wristwatch Relogio Masculinos De Luxo Watches"
            brand="Some brand"
            price={data?.price ?? ""}
            minOrderQty={5}
            samplePrice={50}
            rating={4.5}
            reviews={100}
            sold={500}
            variations={['Color', 'Size']}
            description={data?.description ?? ""}
            condition={data?.condition ?? ""}
            attributes={data?.attributes ?? [
              {
                name: "Ram",
                value: "4GB"
              },
              {
                name: "CPU",
                value: "i5"
              }
          ]}
            priceUpdateDate={data?.priceUpdatedAt ?? ""}
            vendor={data?.vendor ?? {
              id: "3",
              name: "Y Construction Material Supplier",
              rating: 5
            }}
            priceTiers={[
              {
                minQty: 5,
                price: 500
              },
              {
                minQty: 10,
                price: 800
              }
            ]}
            otherVendors={[
              {
                id: "1",
                price: "",
                priceRange: {
                  min: "1000",
                  max: "2000"
                },
                vendor: {
                  id: "9",
                  name: "X Supplier"
                }
              },
              {
                id: "1",
                price: "",
                priceRange: {
                  min: "1000",
                  max: "2000"
                },
                vendor: {
                  id: "9",
                  name: "X Supplier"
                }
              },
              {
                id: "1",
                price: "",
                priceRange: {
                  min: "1000",
                  max: "2000"
                },
                vendor: {
                  id: "9",
                  name: "X Supplier"
                }
              }
            ]}
            />
          </div>
        )
      }
    </div>
  );
};

export default ProductDetail