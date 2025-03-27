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
    <div className="relative w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
      {/* Image Container */}
      <div
        ref={sliderRef}
        onMouseEnter={startAutoSlide} // Start auto-slide on hover if enabled
        onMouseLeave={stopAutoSlide}   // Stop auto-slide when leaving
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <div key={index} className="relative flex-shrink-0 w-full h-48">
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

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-100 text-gray-800 hover:bg-gray-300 rounded-full"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 text-gray-800 hover:bg-gray-300 rounded-full"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      {/* Pagination */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              index === currentIndex ? "bg-white scale-110" : "bg-gray-400"
            )}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-2 right-4 bg-gray-800 text-white px-2 py-1 text-xs rounded-lg">
        {currentIndex + 1} / {totalSlides}
      </div>
    </div>
  );
}