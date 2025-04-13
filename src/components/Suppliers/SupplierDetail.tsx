'use client'
import { Facebook, LocateIcon, Map, MapIcon, MapPin, MapPinCheck, MapPinCheckIcon, Send, TicketCheckIcon, TwitterIcon } from "lucide-react";
import SearchPage from "../Search/SearchPage";
import { useGetSupplierDetailQuery } from "@/store/app-api";
import SupplierListSkeleton from "../Skeleton/SupplierListSkeleton";



const SupplierDetail = ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const {data, isLoading, isSuccess} = useGetSupplierDetailQuery(slug)
  
  // Temporary data
  const supplierData = {
    name: "XYZ Supplier",
    region: "Addis Ababa",
    city: "Addis Ababa",
    subcity: "Bole",
    fullAddress: "Next to Bole International Airport",
    rating: 4.5,
    about: "We specialize in high-quality manufacturing of tech gadgets.",
    businessType: "Manufacturer",
    contactInfo: "+251 911 123 456",
    productCount: 50,
    products: [
      { id: 1, name: "Product A", price: "$10.00", imageUrl: "/path/to/product-a.jpg" },
      { id: 2, name: "Product B", price: "$20.00", imageUrl: "/path/to/product-b.jpg" },
      { id: 3, name: "Product C", price: "$15.00", imageUrl: "/path/to/product-c.jpg" },
      { id: 4, name: "Product D", price: "$30.00", imageUrl: "/path/to/product-d.jpg" },
    ],
  };

  return (
    <div className="bg-white border-t">
      {
        isLoading && <SupplierListSkeleton/>
      }
      {
        isSuccess && data && (
        <div className="max-w-c-1235 mx-auto space-y-4 p-6 bg-white">
          {/* Supplier Basic Information */}
          <div className="flex gap-4 lg:gap-2 items-center">
            <h2 className="text-xl lg:text-2xl font-bold">{data.companyName}</h2>
            {supplierData.rating && <p className=""> ⭐ {data.rating ?? "No rating yet"}</p>}
          </div>
          <div className="flex flex-col text-sm text-gray-600">
            <div className="space-y-1">
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <p className="text-gray-500">Region</p>
                  <p className="text-lg">{supplierData.region}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500">City</p>
                  <p className="text-lg">{supplierData.city}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500">Subcity</p>
                  <p className="text-lg">{supplierData.subcity}</p>
                </div>
              </div>
            </div>
          </div>

          {<p className="text-gray-600">{data.bio ?? "We specialize in high-quality manufacturing of tech gadgets."}</p>}
          {data.phoneNumber && <p className="tex-gray-600">Contact: <a href={`tel:${data.phoneNumber}`}>{data.phoneNumber}</a></p>}
          {data.email && <p className="text-gray-600">Email: <a href={`mailto:${data.email}`}>{data.email}</a></p>}
          
          {/* Optional: Contact Supplier button */}
          <div className="flex gap-2 py-2">
            <Facebook/>
            <Send/>
            <TwitterIcon/>
          </div>

          {/* Products Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Products</h3>
            <SearchPage hideVendor={true} bgWite={true}/>
            {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {supplierData.products.map((product) => (
                <div key={product.id} className="border p-4 rounded-lg space-y-2">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <h4 className="text-sm font-semibold">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.price}</p>
                </div>
              ))}
            </div> */}
          </div>
        </div>
        )
      }
    </div>
  );
};

export default SupplierDetail;