import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Truck, Grid3X3, PaintBucket, Pipette, Wrench, Home, Zap, Shield } from "lucide-react"

interface CategoryCardProps {
  title: string
  image: string
  icon: string
  tags: string[]
}

export default function CategoryCard({ title, image, icon, tags }: CategoryCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "cement":
        return <Truck className="h-5 w-5 text-white" />
      case "tiles":
        return <Grid3X3 className="h-5 w-5 text-white" />
      case "paint":
        return <PaintBucket className="h-5 w-5 text-white" />
      case "pipes":
        return <Pipette className="h-5 w-5 text-white" />
      case "tools":
        return <Wrench className="h-5 w-5 text-white" />
      case "roofing":
        return <Home className="h-5 w-5 text-white" />
      case "electrical":
        return <Zap className="h-5 w-5 text-white" />
      case "safety":
        return <Shield className="h-5 w-5 text-white" />
      default:
        return <Truck className="h-5 w-5 text-white" />
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
      <div className="relative h-32 sm:h-40 w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/10">
          <div className="absolute left-3 top-3 flex items-center">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md bg-blue-600">
              {getIcon()}
            </div>
            <h3 className="ml-2 text-base sm:text-lg font-semibold text-white">{title}</h3>
          </div>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <div className="mb-3 sm:mb-4 flex flex-wrap gap-1 sm:gap-2">
          {tags.slice(0, 4).map((tag, index) => (
            <span key={index} className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
              {tag}
            </span>
          ))}
        </div>
        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-sm h-9">Explore</Button>
      </div>
    </div>
  )
}
