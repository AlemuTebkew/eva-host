'use client'
import React from "react"
import type { Category } from "@/types/category"
import CategoryCard from "@/components/category-card"
import { useTranslations } from "next-intl"
interface CategorySectionProps {
  categories: Category[]
}

export default function CategorySection({ categories }: CategorySectionProps) {
  const t = useTranslations("category") // Use the "categories" namespace for translations
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-xl font-bold md:text-2xl">{t('topCategories')}</h2>
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              title={category.name}
              image={category.image}
              subCategories={category.subCategories}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
