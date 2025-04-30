import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function SuppliersList() {
  // Sample supplier data
  const suppliers = Array(7).fill({
    name: "Yimobee Building & Construction Materials Supply",
    products: "Mineral Fiber Board Material Fiber Ceiling Boards, PVC Gypsum Board Ceiling, Gypsum Plaster",
    email: "info@yimobee.com",
    phone: "09351629451",
    location: "Ethiopia, Addis Ababa",
    verified: true,
    productImages: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
  })

  return (
    <div className="space-y-6">
      {suppliers.map((supplier, index) => (
        <div key={index} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div className="md:col-span-1">
              <div className="flex items-start space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-900 text-white">A</div>
                <div>
                  <h3 className="font-semibold">{supplier.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">Products</p>
                  <p className="mt-1 text-xs text-gray-800">{supplier.products}</p>

                  <Button className="mt-4 w-full bg-orange-500 hover:bg-orange-600">Contact Supplier</Button>

                  <div className="mt-4 space-y-1">
                    <div className="flex items-center text-xs text-gray-600">
                      <span className="mr-2">📧</span>
                      {supplier.email}
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <span className="mr-2">📱</span>
                      {supplier.phone}
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <span className="mr-2">📍</span>
                      {supplier.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col justify-between">
              <div className="flex items-center justify-end">
                {supplier.verified && (
                  <div className="flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-600">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Verified Supplier
                  </div>
                )}
                <div className="ml-2 rounded-full bg-green-50 px-3 py-1 text-xs text-green-600">PANIC CLEAR</div>
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                {supplier.productImages.map((image, imgIndex) => (
                  <div key={imgIndex} className="overflow-hidden rounded-md border border-gray-200">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Product ${imgIndex + 1}`}
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
