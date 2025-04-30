import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SuppliersList from "@/components/suppliers-list";
import Header from "@/components/header";
// import Footer from "@/components/footer";

export default function SuppliersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <Header /> */}

      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=500&width=1920"
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

      {/* Suppliers Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-2xl font-bold md:text-3xl">
            Suppliers
          </h2>
          <p className="mb-8 text-center">
            Search Suppliers by materials or City
          </p>

          <div className="mx-auto mb-12 max-w-md">
            <div className="flex">
              <Input
                type="text"
                placeholder="Search Suppliers"
                className="rounded-r-none border-r-0"
              />
              <Button className="rounded-l-none bg-orange-500 hover:bg-orange-600">
                Search
              </Button>
            </div>
          </div>

          <SuppliersList />

          <div className="mt-8 flex justify-center">
            <Button className="bg-blue-900 hover:bg-blue-800">Show more</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}
