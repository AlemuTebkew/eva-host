import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Supplier } from "@/types/supplier";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";

export default function SuppliersList({
  suppliers,
}: {
  suppliers?: Supplier[];
}) {
  return (
    <div className=" grid grid-cols-1 gap-4 md:grid-cols-2">
      {suppliers?.map((supplier, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg border border-gray-200  shadow"
        >
          <div className="flex flex-wrap justify-between gap-4 p-4 md:flex-nowrap ">
            <div className="flex-1 md:col-span-1">
              <div className="flex items-start space-x-3">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 text-white">
                    {supplier?.logo ? (
                      <Image
                        src={
                          getImageUrl(supplier?.logo ?? "") ||
                          "/placeholder.svg"
                        }
                        alt={supplier.companyName}
                        width={20}
                        height={20}
                      />
                    ) : (
                      supplier.companyName?.charAt(0)
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">{supplier.companyName}</h3>
                  {/* <p className="mt-1 text-xs text-gray-800">{supplier.products}</p> */}

                  <Button className="mt-4 w-full bg-orange-500 hover:bg-orange-600">
                    <Link
                      href={`/suppliers/${supplier.id}`}
                      className="text-white"
                    >
                      View Profile
                    </Link>
                  </Button>

                  <div className="mt-4 space-y-1">
                    <div className="flex items-center text-xs text-gray-600">
                      <span className="mr-2">📧</span>
                      {supplier.email}
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <span className="mr-2">📱</span>
                      {supplier.phoneNumber}
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <span className="mr-2">📍</span>
                      {supplier.region?.name}, {supplier.city?.name},{" "}
                      {supplier.subCity?.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between px-4">
              <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-2">
                {supplier?.products?.map((product, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="overflow-hidden rounded-md border border-gray-200"
                  >
                    <Image
                      src={
                        getImageUrl(product?.image ?? "") || "/placeholder.svg"
                      }
                      alt={`Product ${imgIndex + 1}`}
                      width={50}
                      height={50}
                      className="max-h-[80px] w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
