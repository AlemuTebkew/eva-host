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
import {
  useFilterRelatedSuppliersQuery,
  useGetSupplierDetailQuery,
} from "@/store/app-api";
import SupplierListSkeleton from "../Skeleton/SupplierListSkeleton";
import { Suspense } from "react";
import SupplierCard from "../supplier-card";
import RateSupplier from "../rate-supplier";
import SupplierRatings from "../supplier-ratings";

const SupplierDetail = ({ params: { slug } }: { params: { slug: string } }) => {
  const { data, isLoading, isSuccess } = useGetSupplierDetailQuery(slug);

  const { data: suppliers = [], isLoading: isSuppliersLoading } =
    useFilterRelatedSuppliersQuery(slug);
  return (
    <div className="border-t bg-white">
      {isLoading && <SupplierListSkeleton />}
      {isSuccess && data && (
        <div className="mx-auto max-w-c-1235 space-y-6 bg-white p-6">
          {/* Supplier Basic Information */}
          <div className="flex flex-wrap justify-between gap-4 md:flex-nowrap">
            <div className="w-full rounded-lg border border-blue-800 bg-white p-6 shadow-md transition-shadow duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-lg md:w-auto">
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
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                <p className="mt-6 border-t pt-4 text-gray-700">{data.bio}</p>
              )}

              {/* Contact Information */}
              <div className="mt-6 space-y-4">
                {data.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-500">Contact:</p>
                    <a
                      href={`tel:${data.phoneNumber}`}
                      className="text-blue-600 transition-colors hover:text-blue-800 hover:underline"
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
                      className="text-blue-600 transition-colors hover:text-blue-800 hover:underline"
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
            <Suspense fallback={<div></div>}>
              <SearchPage
                hideVendor={true}
                bgWite={true}
                supplierId={data.id}
              />
            </Suspense>
          </div>

          {/* related vendors */}

          {isSuppliersLoading && <SupplierListSkeleton />}
          {!isSuppliersLoading && suppliers.length > 0 && (
            <div className="mt-6 space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Related Suppliers
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {suppliers.map((supplier) => (
                  <SupplierCard key={supplier.id} supplier={supplier} />
                ))}
              </div>
            </div>
          )}

          {/* Rate Supplier section */}

          <div className="w-full">
            <RateSupplier supplierId={data.id} />
          </div>

          <div>
            <SupplierRatings supplier={data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierDetail;
