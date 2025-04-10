'use client';

import Image from "next/image";
import { useState } from "react";

interface ProductImageSliderProps {
  images: string[];
}

const ProductImageSlider = ({ images }: ProductImageSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="w-1/2 aspect-square relative rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={images[activeIndex]}
          alt={`Product Image ${activeIndex + 1}`}
          fill
          className="object-contain"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-2 overflow-x-auto pb-1">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${
              index === activeIndex ? "border-black" : "border-transparent"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageSlider;
