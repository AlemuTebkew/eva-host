'use client'
import { Facebook, LocateIcon, Map, MapIcon, MapPin, MapPinCheck, MapPinCheckIcon, Send, TicketCheckIcon, TwitterIcon } from "lucide-react";
import SearchPage from "../Search/SearchPage";
import { useGetSupplierDetailQuery } from "@/store/app-api";
import SupplierListSkeleton from "../Skeleton/SupplierListSkeleton";
import { Suspense } from "react";



const SupplierDetail = ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const {data, isLoading, isSuccess} = useGetSupplierDetailQuery(slug)
  
  return (
    <div className="bg-white border-t">
      {isLoading && <SupplierListSkeleton />}
      {isSuccess && data && (
        <div className="max-w-c-1235 mx-auto space-y-6 p-6 bg-white">
          {/* Supplier Basic Information */}
          <div className="flex flex-col gap-4 lg:gap-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">{data.companyName}</h2>
            {data.rating && <p className="text-lg text-yellow-500">⭐ {data.rating ?? "No rating yet"}</p>}
          </div>
          <div className="flex flex-col text-base text-gray-700">
            <div className="space-y-2">
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <p className="text-gray-500 font-medium">Region</p>
                  <p className="text-lg font-semibold">{data.region?.name}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500 font-medium">City</p>
                  <p className="text-lg font-semibold">{data.city?.name}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500 font-medium">Subcity</p>
                  <p className="text-lg font-semibold">{data.subCity?.name}</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mt-4">{data.bio ?? ""}</p>
          {data.phoneNumber && <p className="text-gray-700 mt-2">Contact: <a href={`tel:${data.phoneNumber}`} className="text-blue-600 hover:underline">{data.phoneNumber}</a></p>}
          {data.email && <p className="text-gray-700 mt-2">Email: <a href={`mailto:${data.email}`} className="text-blue-600 hover:underline">{data.email}</a></p>}
          
      

          {/* Products Section */}
          <div className="space-y-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-800">Supplier Products</h3>
            <Suspense fallback={<div>Loading...</div>}>
              <SearchPage hideVendor={true} bgWite={true} supplierId={data.id} />
            </Suspense>
            
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
      )}
    </div>
  );
};

export default SupplierDetail;