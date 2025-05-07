'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const UserList: React.FC = () => {
  return (
    <div>
      <section className="relative bg-blue-900 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/bg-new.jpg"
            alt="Background"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Compare Prices. Choose Smart. Build with Eva
            </h1>
            <p className="mb-8 text-lg">
              Explore materials. Connect with Suppliers and get the best deals.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Compare Price
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600">
                Browse Suppliers
              </Button>
            </div>
          </div>
        </div>
      </section>
      <p style={{ marginTop: "20px", fontStyle: "italic" }}>Comming Soon</p>
    </div>
  );
};

export default UserList;
