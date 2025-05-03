import { Suspense } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import CategorySection from "@/components/category-section"
import SupplierSection from "@/components/supplier-section"
import ValueProposition from "@/components/value-proposition"
import ProductSection from "@/components/product-section"
import TestimonialSection from "@/components/testimonial-section"
import Newsletter from "@/components/newsletter"
import Loading from "@/app/loading"
import { getCategories, getSuppliers, getProducts, getPopularProducts, getTestimonials, getFeaturedSuppliers } from "@/lib/api"
import Link from "next/link"

export const revalidate = 60 // Revalidate this page every 60 seconds

async function CategoriesContainer() {
  const { data: categories } = await getCategories()

  console.log("Categories: ", categories);
  
  return <CategorySection categories={categories} />
}

async function SuppliersContainer() {
  const { data: suppliers } = await getFeaturedSuppliers(10)

  console.log("Suppliers: ", suppliers);
  
  return <SupplierSection suppliers={suppliers} />
}

async function FeaturedProductsContainer() {
  const { data: products } = await getProducts(5)
  console.log("Featured Products: ", products);
  return <ProductSection title="Featured Products and Services" products={products} viewMoreLink="/products" />
}

async function PopularProductsContainer() {
  const { data: products } = await getPopularProducts(5)
  console.log("Popular Products: ", products);
  return <ProductSection title="Most Popular Searched" products={products} viewMoreLink="/products/popular" />
}

async function TestimonialsContainer() {
  const { data: testimonials } = await getTestimonials()
  return <TestimonialSection testimonials={testimonials} />
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <Header /> */}

      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/bg-new.jpg"
            alt="Background"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-12 md:py-24">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-3xl font-bold md:text-5xl">Compare Prices. Choose Smart. Build with Eva</h1>
            <p className="mb-6 text-lg">Explore materials. Connect with Suppliers, and get the best deals</p>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button className="bg-blue-600 hover:bg-blue-700">Compare Price</Button>
              <Button className="bg-orange-500 hover:bg-orange-600"><Link href={'/suppliers'}>Browse Suppliers</Link></Button>
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
          <h2 className="mb-6 md:mb-8 text-xl font-bold md:text-2xl text-center">Why Eva?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <ValueProposition
              icon="compare"
              title="Compare prices you buy"
              description="Easily compare prices across multiple suppliers to ensure you get the best deals for your projects."
            />
            <ValueProposition
              icon="suppliers"
              title="Verified Suppliers"
              description="All suppliers on our platform are thoroughly vetted to ensure quality products and reliable service."
            />
            <ValueProposition
              icon="support"
              title="Professional Support"
              description="Our dedicated team is available to assist you with any questions or issues throughout your buying journey."
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
      {/* <Suspense fallback={<Loading />}>
        <TestimonialsContainer />
      </Suspense> */}

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  )
}
