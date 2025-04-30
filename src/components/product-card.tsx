import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface ProductCardProps {
  title: string;
  price: number;
  rating: number;
  image: string;
}

export default function ProductCard({
  title,
  price,
  rating,
  image,
}: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
      <div className="relative h-40 w-full">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 text-sm font-medium">{title}</h3>
        <div className="mb-2 flex items-center">
          <div className="flex items-center text-yellow-400">
            <Star className="mr-1 h-4 w-4 fill-current" />
            <span className="text-sm">{rating}</span>
          </div>
        </div>
        <div className="mb-4">
          <span className="text-lg font-bold">₹ {price.toLocaleString()}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
        >
          Contact Supplier
        </Button>
      </div>
    </div>
  );
}
