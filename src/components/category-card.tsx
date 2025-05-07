"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Truck,
  Grid3X3,
  PaintBucket,
  Pipette,
  Wrench,
  Home,
  Zap,
  Shield,
} from "lucide-react";
import { SubCategory } from "@/types/category";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";

interface CategoryCardProps {
  id: string;
  title: string;
  image?: string;
  subCategories?: SubCategory[];
}

export default function CategoryCard({
  title,
  image,
  subCategories,
  id,
}: CategoryCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
      <div className="relative h-32 w-full sm:h-40">
        <Image
          src={image ? getImageUrl(image) : "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/10">
          <div className="absolute left-3 top-3">
            <h3 className="ml-2 text-base font-semibold text-white sm:text-lg">
              {title}
            </h3>
          </div>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <div className="mb-3 flex flex-wrap gap-1 sm:mb-4 sm:gap-2">
          {subCategories?.map((sub, index) => (
            <span
              key={index}
              className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600"
            >
              {sub.name}
            </span>
          ))}
        </div>
        <Link href={`/search?categoryId=${id}`}>
          <Button className="h-9 w-full bg-orange-500 text-sm hover:bg-orange-600">
            Explore
          </Button>
        </Link>
      </div>
    </div>
  );
}
