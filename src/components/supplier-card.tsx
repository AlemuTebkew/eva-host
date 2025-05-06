import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Supplier } from "@/types/supplier";
import { getImageUrl, getUrl } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";

export default function SupplierCard({ supplier }: { supplier: Supplier }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow sm:p-4">
      <div className="mb-3 flex flex-col sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold sm:text-lg">
          {supplier.companyName}
        </h3>
        <div className="mt-1 flex items-center text-blue-600 sm:mt-0">
          <CheckCircle className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-xs">Verified Supplier</span>
        </div>
      </div>
      <p>{supplier?.categories?.map((cat) => cat.name).join(", ")}</p>
      <div className="mb-3 text-xs text-gray-600 sm:mb-4 sm:text-sm">
        {supplier.region?.name}, {supplier.city?.name},{" "}
        {supplier.subCity?.name}
      </div>
      <div className="m-2 p-3">
        <Button className="h-9 w-full bg-orange-500 text-sm hover:bg-orange-600 ">
          <Link href={`/suppliers/${supplier.id}`}>  Contact Supplier</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {/* <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2"> */}
        {supplier.categories?.map((cat) => (
          <div key={cat.name} className="flex flex-col items-center">
            <Image
              src={cat.image ? getImageUrl(cat.image) : "/placeholder.svg"}
              alt={cat.name}
              width={40}
              height={40}
              className="h-10 w-10 object-cover"
            />
            <div className="text-xs text-gray-600">{cat.name}</div>
          </div>
        ))}
        {/* </div> */}
      </div>
    </div>
  );
}
