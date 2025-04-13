import { Supplier } from "@/types/supplier";
import Link from "next/link";

interface SupplierCardProps {
  supplier: Supplier;
}

const SupplierCard = ({ supplier }: SupplierCardProps) => {
  return (
    <Link
      href={`/suppliers/${supplier.id}`}
      className="flex items-center gap-4 border rounded-lg p-4 transition bg-white"
    >
      {/* Optional image/logo placeholder */}
      <div className="w-16 h-16 bg-gray-100 rounded-full flex-shrink-0" />

      {/* Supplier Info */}
      <div className="flex flex-col justify-center">
        <div className="font-semibold text-lg">{supplier.companyName}</div>
        {/* {supplier.location && (
          <p className="text-sm text-gray-500">{supplier.location}</p>
        )} */}
        <div className="text-sm mt-1 text-gray-600">
          {supplier.rating ? `⭐ ${supplier.rating}/5` : "No ratings yet"} {" "}
        </div>
      </div>
    </Link>
  );
};

export default SupplierCard;
