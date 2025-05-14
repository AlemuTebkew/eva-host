"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/drop-down-menu";
import { ChevronDown } from "lucide-react";

const languages = [
  { code: "en", name: "English" },
  { code: "am", name: "አማርኛ" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const currentLocale = params.locale as string;

  const handleLocaleChange = (newLocale: string) => {
    // Get the current path without the locale prefix
    const currentPath = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
    router.push(`/${newLocale}${currentPath}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="w-[120px] justify-between">
          {languages.find((lang) => lang.code === currentLocale)?.name || "English"}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLocaleChange(lang.code)}
            className={currentLocale === lang.code ? "bg-accent" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 