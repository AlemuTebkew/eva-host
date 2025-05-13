"use client";
import type { Testimonial } from "@/types/testimonial";
import TestimonialCard from "@/components/testimonial-card";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialSection({
  testimonials,
}: TestimonialSectionProps) {
  const [current, setCurrent] = useState(0);

  // Calculate the indices to show
  const getVisibleTestimonials = () => {
    if (testimonials.length <= 4) return testimonials;
    // Show 3, centered on current
    const indices = [
      current,
      (current + 1) % testimonials.length,
      (current + 2) % testimonials.length,
      (current + 3) % testimonials.length,
    ];
    return indices.map((i) => testimonials[i]);
  };

  function prev() {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }
  function next() {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-xl font-bold md:mb-8 md:text-2xl px-5">
          What Our Customers Say
        </h2>
        <div className="relative flex items-center justify-between">
          {/* Bolder, larger arrows */}
          <button
            onClick={prev}
            className="absolute left-3 z-10 p-2 text-4xl font-extrabold text-gray-700 hover:text-blue-700"
            aria-label="Previous"
          >
            <ArrowLeft size={30} />
          </button>
          {/* Carousel */}
          <div className="mx-1 flex w-full flex-col items-center justify-start ps-5  md:flex-row md:gap-6">
            {/* On small screens, show only one; on md+, show 3 */}
            {testimonials.length <= 4 ? (
              testimonials.map((t, idx) => (
                <div key={t.id} className="flex-1">
                  <TestimonialCard testimonial={t} />
                </div>
              ))
            ) : (
              <>
                {/* On mobile, show only the current */}
                <div className="block w-full md:hidden">
                  <TestimonialCard testimonial={testimonials[current]} />
                </div>
                {/* On md+, show 3 */}
                <div className="hidden w-full gap-6 md:flex">
                  {getVisibleTestimonials().map((t, idx) => (
                    <div key={t.id} className="flex-1">
                      <TestimonialCard testimonial={t} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <button
            onClick={next}
            className="absolute right-0 z-10 p-2 text-4xl font-extrabold text-gray-700 hover:text-blue-700"
            aria-label="Next"
          >
            <ArrowRight size={30} />
          </button>
        </div>
        {/* Dots */}
        <div className="mt-4 flex justify-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`h-2 w-2 rounded-full ${idx === current ? "bg-blue-600" : "bg-gray-300"}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
