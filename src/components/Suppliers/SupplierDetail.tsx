"use client";
import {
  Facebook,
  LocateIcon,
  Map,
  MapIcon,
  MapPin,
  MapPinCheck,
  MapPinCheckIcon,
  Send,
  TicketCheckIcon,
  TwitterIcon,
} from "lucide-react";
import SearchPage from "../Search/SearchPage";
import { useGetSupplierDetailQuery } from "@/store/app-api";
import SupplierListSkeleton from "../Skeleton/SupplierListSkeleton";
import { Suspense } from "react";

const SupplierDetail = ({ params: { slug } }: { params: { slug: string } }) => {
  const { data, isLoading, isSuccess } = useGetSupplierDetailQuery(slug);

  return (
    <div className="border-t bg-white">
      {isLoading && <SupplierListSkeleton />}
      {isSuccess && data && (
        <div className="mx-auto max-w-c-1235 space-y-6 bg-white p-6">
          {/* Supplier Basic Information */}
          <div className="flex justify-between gap-4 flex-wrap md:flex-nowrap">
            <div className="w-full md:w-auto p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-blue-800 hover:bg-gray-50 hover:scale-105">
              {/* Supplier Name and Rating */}
              <div className="flex flex-col gap-4 lg:gap-2">
                <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                  {data.companyName}
                </h2>
                {data.rating ? (
                  <p className="flex items-center gap-1 text-lg text-yellow-500">
                    ⭐ {data.rating}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">No rating yet</p>
                )}
              </div>

              {/* Location Details */}
              <div className="mt-4 flex flex-col gap-4 text-base text-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-start">
                    <p className="font-medium text-gray-500">Region</p>
                    <p className="text-lg font-semibold">
                      {data.region?.name || "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="font-medium text-gray-500">City</p>
                    <p className="text-lg font-semibold">
                      {data.city?.name || "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="font-medium text-gray-500">Subcity</p>
                    <p className="text-lg font-semibold">
                      {data.subCity?.name || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              {data.bio && (
                <p className="mt-6 text-gray-700 border-t pt-4">{data.bio}</p>
              )}

              {/* Contact Information */}
              <div className="mt-6 space-y-4">
                {data.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-500">Contact:</p>
                    <a
                      href={`tel:${data.phoneNumber}`}
                      className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
                    >
                      {data.phoneNumber}
                    </a>
                  </div>
                )}
                {data.email && (
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-500">Email:</p>
                    <a
                      href={`mailto:${data.email}`}
                      className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
                    >
                      {data.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
            {/* show map for location of vendor */}
            <div className="w-full md:flex-1">
              <div className="h-[300px] w-full overflow-hidden rounded-lg">
                <iframe
                  src={`https://maps.google.com/maps?q=${data.latitude || 9.03},${data.longitude || 38.74}&z=15&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="mt-6 space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Supplier Products
            </h3>
            <Suspense fallback={<div>Loading...</div>}>
              <SearchPage
                hideVendor={true}
                bgWite={true}
                supplierId={data.id}
              />
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
