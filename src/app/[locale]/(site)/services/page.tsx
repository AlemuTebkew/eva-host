"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const ComingSoonPage: React.FC = () => {
  const t = useTranslations("services");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/bg-new.jpg"
            alt="Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        {/* Main Content */}
        <div className="container relative z-10 mx-auto px-4 py-24">
          <div className="flex flex-col items-center text-center">
            {/* Coming Soon Badge */}
            <div className="mb-8 rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white">
              {t("comingSoon")}
            </div>

            {/* Title and Description */}
            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
              {t("title")}
            </h1>
            <p className="mb-12 max-w-2xl text-lg text-gray-200">
              {t("description")}
            </p>

            {/* Features Grid */}
            <div className="mb-12 grid gap-8 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-lg bg-white/10 p-6 backdrop-blur-sm"
                >
                  <div className="mb-4 text-3xl text-blue-400">
                    {t(`features.${item}.icon`)}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    {t(`features.${item}.title`)}
                  </h3>
                  <p className="text-gray-300">
                    {t(`features.${item}.description`)}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
             
              <Link href="/products">
                <Button
                  variant="outline"
                  className="border-2 border-white px-8 py-6 text-lg text-black hover:bg-white/10"
                >
                  {t("exploreProducts")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComingSoonPage;
