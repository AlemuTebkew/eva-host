import { Suspense } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import CategorySection from "@/components/category-section";
import SupplierSection from "@/components/supplier-section";
import ValueProposition from "@/components/value-proposition";
import ProductSection from "@/components/product-section";
import TestimonialSection from "@/components/testimonial-section";
import Newsletter from "@/components/newsletter";
import Loading from "@/app/[locale]/loading";
import {
  getCategories,
  getSuppliers,
  getProducts,
  getPopularProducts,
  getTestimonials,
  getFeaturedSuppliers,
} from "@/lib/api";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export const revalidate = 60; // Revalidate this page every 60 seconds

async function CategoriesContainer() {
  const { data: categories } = await getCategories();
  return <CategorySection categories={categories} />;
}

async function SuppliersContainer() {
  const { data: suppliers } = await getFeaturedSuppliers(10);
  return <SupplierSection suppliers={suppliers} />;
}

async function FeaturedProductsContainer() {
  const { data: products } = await getProducts(5);
  const t = await getTranslations("products"); // Use the "products" namespace for translations
  return (
    <ProductSection
      title={t("featuredProductsTitle")}
      products={products}
      viewMoreLink="/search"
    />
  );
}

async function PopularProductsContainer() {
  const { data: products } = await getPopularProducts(5);
  const t = await getTranslations("products"); // Use the "products" namespace for translations

  return (
    <ProductSection
      title={t("mostPopularTitle")}
      products={products}
      viewMoreLink="/search"
    />
  );
}

async function TestimonialsContainer() {
  const { data: testimonials } = await getTestimonials();
  return <TestimonialSection testimonials={testimonials} />;
}

export default function Home() {
  const t = useTranslations("products"); // Use the "products" namespace for translations

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/bg-new.jpg"
            alt={t("heroBackgroundAlt")} // Translate the alt text
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-12 md:py-18">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-3xl font-bold md:text-5xl">
              {t("heroTitle")}
            </h1>
            <p className="mb-6 text-lg">{t("heroDescription")}</p>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link href="/search">
                <Button className="bg-blue-800 hover:bg-orange-500">
                  {t("comparePriceButton")}
                </Button>
              </Link>
              <Link href="/suppliers">
                <Button className="bg-orange-500 hover:bg-blue-800">
                  {t("browseSuppliersButton")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories */}
      <Suspense fallback={<Loading />}>
        <CategoriesContainer />
      </Suspense>

      {/* Featured Suppliers */}
      <Suspense fallback={<Loading />}>
        <SuppliersContainer />
      </Suspense>

      {/* Why Eva */}
      <section className="bg-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-xl font-bold md:mb-8 md:text-2xl">
            {t("whyEvaTitle")}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <ValueProposition
              icon="compare"
              title={t("comparePricesTitle")}
              description={t("comparePricesDescription")}
            />
            <ValueProposition
              icon="suppliers"
              title={t("verifiedSuppliersTitle")}
              description={t("verifiedSuppliersDescription")}
            />
            <ValueProposition
              icon="support"
              title={t("professionalSupportTitle")}
              description={t("professionalSupportDescription")}
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Suspense fallback={<Loading />}>
            <FeaturedProductsContainer />
          </Suspense>

          <div className="mt-8 md:mt-12">
            <Suspense fallback={<Loading />}>
              <PopularProductsContainer />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Suspense fallback={<Loading />}>
        <TestimonialsContainer />
      </Suspense>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
