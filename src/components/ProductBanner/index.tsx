'use client'

import { ChevronLeft, ChevronRight, LineChart, Tag, ShieldCheck, Headphones } from "lucide-react";
import { useState } from "react";
import ImageSlider from "../ImageSlider/ImageSlider";

const slides = [
  {
    title: "Real-Time Construction Material Prices",
    description: "Compare prices and access verified product details for smarter decisions.",
  },
  {
    title: "Get the Best Deals on Materials",
    description: "Easily compare vendor prices and find the best offers in the market.",
  },
  {
    title: "Verified Suppliers at Your Fingertips",
    description: "Buy from trusted and quality-assured suppliers with confidence.",
  },
  {
    title: "Streamline Your Procurement Process",
    description: "Save time by sourcing materials efficiently with our user-friendly platform.",
  },
  {
    title: "Stay Updated with Market Trends",
    description: "Get insights on price fluctuations and industry trends to make informed purchases.",
  },
];

const features = [
  {
    icon: <LineChart size={32} />,
    title: "REAL-TIME PRICES",
    description: "Get the latest material prices updated daily.",
  },
  {
    icon: <Tag size={32} />,
    title: "PRICE COMPARISON",
    description: "Compare prices from multiple vendors instantly.",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "TRUSTED SUPPLIERS",
    description: "Find verified suppliers with quality materials.",
  },
  {
    icon: <Headphones size={32} />,
    title: "SEAMLESS EXPERIENCE",
    description: "Get accurate data for better decisions.",
  },
];

export default function ProductBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="contianer">
      <div className="w-full">
      <ImageSlider
      images={[
        'https://tse2.mm.bing.net/th?id=OIP.a-YDWw7IcFGxYeuz_1wUrgHaHa&pid=Api',
        'https://www.photomarketingwizard.com/wp-content/uploads/2018/02/ecommerce-product-photography-25-768x768.jpg',
        'https://www.peekage.com/blog/wp-content/uploads/2020/06/sephora-free-samples-1024x1024.jpg'
      ]}
      />
        
      </div>
      {/* Hero Slider */}
{/* 
      <div className="relative w-full bg-hero bg-cover bg-center text-white py-16 px-8 flex flex-col items-center justify-center text-center rounded-lg">
        <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow" onClick={prevSlide}>
          <ChevronLeft className="text-blue-700" />
        </button>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{slides[currentIndex].title}</h1>
          <p className="mt-4 text-lg">{slides[currentIndex].description}</p>
        </div>
        <div className="absolute bottom-8 left-4 flex gap-2 items-center">
          {
            slides.map((_, index) => (
              <div className={`rounded-full h-2 ${index=== currentIndex ? 'w-6 bg-white' : 'w-2 border-white border'}`}>
              </div>
            ))
          }
        </div>
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow" onClick={nextSlide}>
          <ChevronRight className="text-blue-700" />
        </button>
      </div> */}
    </div>
  );
}