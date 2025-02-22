"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

const items = [
  // { 
  //   image: "/images/hero/5.jpg", 
  //   title: "Mining", 
  //   subtitle: "Providing high-quality raw materials and minerals to global markets while ensuring responsible resource management." 
  // },
  // { 
  //   image: "/images/hero/2.jpg", 
  //   title: "Medical Supply", 
  //   subtitle: "Delivering advanced medical technology and essential supplies to enhance healthcare services and improve patient care." 
  // },
  // { 
  //   image: "/images/hero/4.jpg", 
  //   title: "Farming", 
  //   subtitle: "Bringing premium farm produce to the world, supporting sustainable farming practices, and strengthening food systems." 
  // },
  // { 
  //   image: "/images/hero/3.jpg", 
  //   title: "Manufacturing", 
  //   subtitle: "Sourcing essential materials and distributing high-quality products to ensure a seamless and efficient trade network." 
  // },
  { 
    image: "/images/hero/2.jpg", 
    title: "Export Trade", 
    subtitle: "Our mission is to develop innovative, value, and trusted design solutions to support our Clients in making sound business decisions." 
  }
];


const Hero = () => {
  return (
    <section id="home" className="h-screen relative overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className} custom-dot"></span>`,
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="h-full"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <Image
                src={item.image}
                alt={`Slide ${index + 1} - ${item.title}`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black opacity-60"></div>
              <div className="container relative z-10 flex h-full items-center justify-center">
                <div className="max-w-[900px]">
                  <h1 className="mb-4 text-3xl font-semibold leading-relaxed text-white sm:text-4xl lg:text-4xl">
                    {item.subtitle}
                  </h1>
                  {/* <h2 className="mb-6 text-xl font-medium text-gray-300 sm:text-xl">
                    {item.subtitle}
                  </h2> */}
                  
                  <div className="flex justify-left gap-5">
                    <Link
                      href="/contact"
                      className="flex items-center gap-4 rounded-md bg-[#FF781E] px-7 py-[14px] text-base font-medium text-white shadow-xl transition hover:bg-white hover:text-dark"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles for Pagination */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          border: 2px solid #CB8E3C;
          background: transparent;
          opacity: 1;
          transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
          background: #CB8E3C;
          border: none;
        }
      `}</style>
    </section>
  );
};

export default Hero;
