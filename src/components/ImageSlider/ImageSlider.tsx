"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Utility function for conditional classNames

interface ImageSliderProps {
  images: string[];
  imagesPerSlide?: number;
  autoSlide?: boolean;
  slideInterval?: number;
}

export default function ImageSlider({
  images,
  imagesPerSlide = 1,
  autoSlide = false,
  slideInterval = 1000,
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = Math.ceil(images.length / imagesPerSlide);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const startAutoSlide = useCallback(() => {
    if (!autoSlide) return; // Only works if auto-slide is enabled
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, slideInterval);
  }, [autoSlide, nextSlide, slideInterval]);

  // Stop auto-slide when hover ends
  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    return () => stopAutoSlide(); // Cleanup on unmount
  }, [stopAutoSlide]);

  return (
    <div className="relative z-0 mx-auto w-full cursor-pointer overflow-hidden rounded-lg bg-white">
      {/* Image Container */}
      <div
        ref={sliderRef}
        onMouseEnter={startAutoSlide} // Start auto-slide on hover if enabled
        onMouseLeave={stopAutoSlide} // Stop auto-slide when leaving
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <div key={index} className="relative h-48 w-full flex-shrink-0">
            <Image
              src={img}
              alt={`Slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
              loading="lazy"
              className="rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              "h-3 w-3 rounded-full transition-all",
              index === currentIndex ? "scale-110 bg-white" : "bg-gray-400",
            )}
          />
        ))}
      </div>
    </div>
  );
}
