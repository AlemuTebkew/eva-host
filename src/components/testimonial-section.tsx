'use client'
import type { Testimonial } from "@/types/testimonial"
import TestimonialCard from "@/components/testimonial-card"

interface TestimonialSectionProps {
  testimonials: Testimonial[]
}

export default function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 md:mb-8 text-xl font-bold md:text-2xl">What Our Customers says</h2>
        <div className="grid gap-4 md:gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
