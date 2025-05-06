import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Truck, Grid3X3, PaintBucket, Pipette, Wrench, Home, Zap, Shield } from "lucide-react"
import { SubCategory } from "@/types/category"
import { getImageUrl } from "@/lib/utils"
import Link from "next/link"

interface CategoryCardProps {
  id: string
  title: string
  image?: string
  subCategories?:SubCategory[]
}

export default function CategoryCard({ title, image, subCategories,id }: CategoryCardProps) {
  const getIcon = (icon: string) => {
    const icons = [
      <Truck className="h-5 w-5 text-white" key="cement"/>,
      <Grid3X3 className="h-5 w-5 text-white" key="tiles"/>,
      <PaintBucket className="h-5 w-5 text-white" key="paint"/>,
      <Pipette className="h-5 w-5 text-white" key="pipes"/>,
      <Wrench className="h-5 w-5 text-white" key="tools"/>,
      <Home className="h-5 w-5 text-white" key="roofing"/>,
      <Zap className="h-5 w-5 text-white" key="electrical"/>,
      <Shield className="h-5 w-5 text-white" key="safety"/>,
    ];

    switch (icon) {
      case "cement":
        return <Truck className="h-5 w-5 text-white" key="cement"/>;
      case "tiles":
        return <Grid3X3 className="h-5 w-5 text-white" key="tiles"/>;
      case "paint":
        return <PaintBucket className="h-5 w-5 text-white" key="paint"/>;
      case "pipes":
        return <Pipette className="h-5 w-5 text-white" key="pipes"/>;
      case "tools":
        return <Wrench className="h-5 w-5 text-white" key="tools"/>;
      case "roofing":
        return <Home className="h-5 w-5 text-white" key="roofing"/>;
      case "electrical":
        return <Zap className="h-5 w-5 text-white" key="electrical"/>;
      case "safety":
        return <Shield className="h-5 w-5 text-white" key="safety"/>;
      default:
        // Randomly select an icon
        return icons[Math.floor(Math.random() * icons.length)];
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
      <div className="relative h-32 sm:h-40 w-full">
        <Image src={image ? getImageUrl(image) : "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/10">
          <div className="absolute left-3 top-3 flex items-center">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md bg-blue-600">
              {getIcon('')}
            </div>
            <h3 className="ml-2 text-base sm:text-lg font-semibold text-white">{title}</h3>
          </div>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <div className="mb-3 sm:mb-4 flex flex-wrap gap-1 sm:gap-2">
          {subCategories?.map((sub, index) => (
            <span key={index} className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
              {sub.name}
            </span>
          ))}
        </div>
        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-sm h-9">
          <Link href={`/search?categoryId=${id}`}>Explore</Link>
        </Button>
      </div>
    </div>
  )
}
