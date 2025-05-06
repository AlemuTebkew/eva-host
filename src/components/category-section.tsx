import type { Category } from "@/types/category"
import CategoryCard from "@/components/category-card"

interface CategorySectionProps {
  categories: Category[]
}

export default function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-xl font-bold md:text-2xl">Top Categories</h2>
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
