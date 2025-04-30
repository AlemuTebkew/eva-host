import Image from "next/image"
import { Star } from "lucide-react"

export default function TestimonialCard() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
      <div className="mb-4 flex items-center text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="mb-4 text-gray-600">
        "Our company saved thousands last year, and we found reliable suppliers through Eva. The price comparison
        feature is invaluable for our procurement process."
      </p>
      <div className="flex items-center">
        <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Customer"
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="font-medium">John Smith</p>
          <p className="text-sm text-gray-600">Construction Manager</p>
        </div>
      </div>
    </div>
  )
}
