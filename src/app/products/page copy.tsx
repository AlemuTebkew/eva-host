import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import CategoryCard from "@/components/category-card"
import SupplierCard from "@/components/supplier-card"
import ValueProposition from "@/components/value-proposition"
import ProductCard from "@/components/product-card"
import TestimonialCard from "@/components/testimonial-card"
import Newsletter from "@/components/newsletter"
// import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <Header /> */}

      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://via.placeholder.com/300x200"
            alt="Background"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-12 md:py-24">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-3xl font-bold md:text-5xl">Compare Prices. Choose Smart. Build with Eva</h1>
            <p className="mb-6 text-lg">Explore materials. Connect with Suppliers, and get the best deals</p>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button className="bg-blue-600 hover:bg-blue-700">Compare Price</Button>
              <Button className="bg-orange-500 hover:bg-orange-600">Browse Suppliers</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories */}
      <section className="bg-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-xl font-bold md:text-2xl">Top Categories</h2>
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <CategoryCard
              title="Cement and Aggregates"
              image="/placeholder.svg?height=200&width=300"
              icon="cement"
              tags={["PPC Cement", "OPC"]}
            />
            <CategoryCard
              title="Tiles and Flooring"
              image="/placeholder.svg?height=200&width=300"
              icon="tiles"
              tags={["Ceramic", "Porcelain"]}
            />
            <CategoryCard
              title="Paints and Coatings"
              image="/placeholder.svg?height=200&width=300"
              icon="paint"
              tags={["Emulsion", "Enamel"]}
            />
            <CategoryCard
              title="Pipes and Plumbing"
              image="/placeholder.svg?height=200&width=300"
              icon="pipes"
              tags={["uPVC", "HDPE (PE100)"]}
            />
            <CategoryCard
              title="Tools"
              image="/placeholder.svg?height=200&width=300"
              icon="tools"
              tags={["Hammers", "Drills"]}
            />
            <CategoryCard
              title="Roofing"
              image="/placeholder.svg?height=200&width=300"
              icon="roofing"
              tags={["Galvanized", "Tile Roof"]}
            />
            <CategoryCard
              title="Electrical"
              image="/placeholder.svg?height=200&width=300"
              icon="electrical"
              tags={["Wires", "Switches"]}
            />
            <CategoryCard
              title="Safety Equipment"
              image="/placeholder.svg?height=200&width=300"
              icon="safety"
              tags={["Helmets", "Gloves"]}
            />
          </div>
        </div>
      </section>

      {/* Featured Suppliers */}
      <section className="bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold md:text-2xl">Featured Suppliers</h2>
            <Link href="#" className="hidden md:flex items-center text-sm text-blue-600 hover:underline">
              Explore more Suppliers <span className="ml-1">→</span>
            </Link>
          </div>
          <div className="rounded-lg bg-blue-900 p-4 md:p-6 text-white">
            <div className="flex flex-col justify-between md:flex-row">
              <p className="mb-4 md:mb-0">Find the best suppliers for your construction needs</p>
              <Button className="bg-white text-blue-900 hover:bg-gray-100">Explore more Suppliers</Button>
            </div>
          </div>

          <div className="mt-6 md:mt-8 grid gap-4 md:gap-6 sm:grid-cols-2">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <SupplierCard key={i} />
              ))}
          </div>

          <div className="mt-6 flex justify-center md:hidden">
            <Link href="#" className="text-sm text-blue-600 hover:underline">
              Explore more Suppliers →
            </Link>
          </div>
        </div>
      </section>

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
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold md:text-2xl">Featured Products and Services</h2>
            <Link href="#" className="hidden md:flex items-center text-sm text-blue-600 hover:underline">
              See More <span className="ml-1">→</span>
            </Link>
          </div>
          <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <ProductCard
                  key={i}
                  title="Best Quality Construction Material"
                  price={449}
                  rating={4.5}
                  image="/placeholder.svg?height=150&width=200"
                />
              ))}
          </div>

          <div className="mt-6 flex justify-center md:hidden">
            <Link href="#" className="text-sm text-blue-600 hover:underline">
              See More →
            </Link>
          </div>

          <div className="mt-8 md:mt-12">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold md:text-xl">Most Popular Searched</h3>
              <Link href="#" className="hidden md:flex items-center text-sm text-blue-600 hover:underline">
                See More <span className="ml-1">→</span>
              </Link>
            </div>
            <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <ProductCard
                    key={i}
                    title="Premium Construction Equipment"
                    price={19999}
                    rating={4.8}
                    image="/placeholder.svg?height=150&width=200"
                  />
                ))}
            </div>

            <div className="mt-6 flex justify-center md:hidden">
              <Link href="#" className="text-sm text-blue-600 hover:underline">
                See More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 md:mb-8 text-xl font-bold md:text-2xl">What Our Customers says</h2>
          <div className="grid gap-4 md:gap-6 md:grid-cols-3">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <TestimonialCard key={i} />
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  )
}
