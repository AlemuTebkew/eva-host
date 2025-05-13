'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Supplier } from "@/types/supplier"
import SupplierCard from "@/components/supplier-card"

interface SupplierSectionProps {
  suppliers: Supplier[]
}

export default function SupplierSection({ suppliers }: SupplierSectionProps) {
  return (
    <section className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold md:text-2xl">Featured Suppliers</h2>
          <Link href="/suppliers" className="hidden md:flex items-center text-sm text-blue-600 hover:underline">
            Explore more Suppliers <span className="ml-1">→</span>
          </Link>
        </div>
        <div className="rounded-lg bg-blue-800 p-4 md:p-10 text-white">
          <div className="flex flex-col justify-between md:flex-row">
            <p className="mb-4 md:mb-0">Find the best suppliers for your construction needs</p>
            <Button className="bg-white text-blue-800 hover:bg-gray-100">

            <Link href="/suppliers" className="text-sm text-blue-600 hover:underline">
            Explore more Suppliers
          </Link>
            </Button>
          </div>
        </div>

        <div className="mt-6 md:mt-8 grid gap-4 md:gap-6 md:grid-cols-4 ">
          {suppliers && suppliers.length > 0 ? (
            suppliers.map((supplier) => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-500">
              No suppliers available at the moment
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center md:hidden">
          <Link href="/suppliers" className="text-sm text-blue-600 hover:underline">
            Explore more Suppliers →
          </Link>
        </div>
      </div>
    </section>
  )
}
