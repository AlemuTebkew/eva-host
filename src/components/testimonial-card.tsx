import Image from "next/image";
import { Star } from "lucide-react";
import { Testimonial } from "@/types/testimonial";
import { getImageUrl } from "@/lib/utils";

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <div
      className="0.5s ease flex min-h-[300px] flex-col items-stretch justify-between rounded-lg border border-gray-200 bg-white bg-gradient-to-b from-blue-800 to-orange-500 p-6 text-white opacity-90
      shadow hover:translate-y-[-10px] hover:scale-105 hover:transform hover:opacity-100 hover:shadow-xl md:min-h-[350px]
      "
      style={{
        transition:
          "transform 0.3s ease, box-shadow 0.3s ease, opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <blockquote className="mb-4 leading-relaxed text-white italic font-bold">
        “{testimonial.description}”
      </blockquote>
      <div className="flex items-center">
        <div>
          <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={
                testimonial.photo
                  ? getImageUrl(testimonial.photo)
                  : "/placeholder.png"
              }
              alt="Customer"
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div>
          <p className="font-medium">{testimonial.name}</p>
          <p className="text-sm text-white">{testimonial.title}</p>
        </div>
      </div>
    </div>
  );
}
