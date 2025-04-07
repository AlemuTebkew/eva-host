import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex gap-2 items-center my-6 text-gray-700">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.href ? (
            <a href={item.href} className="font-medium hover:underline">
              {item.label}
            </a>
          ) : (
            <span className="font-medium cursor-pointer">{item.label}</span>
          )}
          {index < items.length - 1 && <ChevronRight className="w-4 h-4 mx-1" />}
        </div>
      ))}
    </nav>
  );
}
