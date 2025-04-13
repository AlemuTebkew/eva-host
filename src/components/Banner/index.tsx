"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BannerProps {
  items: { image: string; link: string }[];
  autoSlide?: boolean;
  slideInterval?: number;
}

export default function Banner({
  items,
  autoSlide = false,
  slideInterval = 3000,
}: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = items.length;
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
    if (!autoSlide) return;
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, slideInterval);
  }, [autoSlide, nextSlide, slideInterval]);

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    return () => stopAutoSlide(); // Cleanup on unmount
  }, [stopAutoSlide]);

  return (
    <div className="relative w-full mx-auto bg-white rounded-lg overflow-hidden">
      {/* Image Container with Link */}
      <div
        onMouseEnter={startAutoSlide}
        onMouseLeave={stopAutoSlide}
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <Link key={index} href={item.link} className="relative flex-shrink-0 w-full h-48 block">
            <Image
              src={item.image}
              alt={`Slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
              loading="lazy"
              className="rounded-lg"
            />
          </Link>
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
        {items.map((_, index) => (
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
    </div>
  );
}
