'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDictionary } from '@/hooks/useDictionary';
import { Locale } from '@/i18n/config';

export default function Navigation() {
  const { lang } = useParams();
  const dict = useDictionary(lang as Locale);

  if (!dict) return null;

  return (
    <nav className="flex items-center gap-6">
      <Link 
        href={`/${lang}`}
        className="text-gray-600 hover:text-gray-900"
      >
        {dict.navigation.home}
      </Link>
      <Link 
        href={`/${lang}/products`}
        className="text-gray-600 hover:text-gray-900"
      >
        {dict.navigation.products}
      </Link>
      <Link 
        href={`/${lang}/about`}
        className="text-gray-600 hover:text-gray-900"
      >
        {dict.navigation.about}
      </Link>
      <Link 
        href={`/${lang}/contact`}
        className="text-gray-600 hover:text-gray-900"
      >
        {dict.navigation.contact}
      </Link>
    </nav>
  );
} 