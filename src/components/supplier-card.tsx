import Image from "next/image"
import { CheckCircle } from "lucide-react"

export default function SupplierCard() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 sm:p-4 shadow">
      <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base sm:text-lg font-semibold">Sunshine Building & Construction Materials Supply</h3>
        <div className="flex items-center text-blue-600 mt-1 sm:mt-0">
          <CheckCircle className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-xs">Verified Supplier</span>
        </div>
      </div>
      <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">Building Materials, Heavy Tools, Safety Equipment</p>
      <div className="grid grid-cols-3 gap-2">
        <div className="overflow-hidden rounded-md">
          <Image
            src="/placeholder.svg?height=80&width=100"
            alt="Building Materials"
            width={100}
            height={80}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="overflow-hidden rounded-md">
          <Image
            src="/placeholder.svg?height=80&width=100"
            alt="Heavy Tools"
            width={100}
            height={80}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="overflow-hidden rounded-md">
          <Image
            src="/placeholder.svg?height=80&width=100"
            alt="Safety Equipment"
            width={100}
            height={80}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
        <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">Building Materials</span>
        <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">Heavy Tools</span>
        <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">Safety Equipment</span>
      </div>
    </div>
  )
}
