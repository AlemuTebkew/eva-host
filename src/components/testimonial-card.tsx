import Image from "next/image"
import { Star } from "lucide-react"
import { Testimonial } from "@/types/testimonial"
import { getImageUrl } from "@/lib/utils"

export default function TestimonialCard({testimonial}: {testimonial: Testimonial}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
      <div className="mb-4 flex items-center text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="mb-4 text-gray-600">
      {testimonial.description}
      </p>
      <div className="flex items-center">
        <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={testimonial.photo ? getImageUrl(testimonial.photo) : '/placeholder.png'}
            alt="Customer"
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="font-medium">{testimonial.name}</p>
          <p className="text-sm text-gray-600">{testimonial.title}</p>
        </div>
      </div>
    </div>
  )
}
