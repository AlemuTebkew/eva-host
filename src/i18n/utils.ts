import { Locale } from './config';
import enMessages from '@/messages/en.json';
import amMessages from '@/messages/am.json';
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextRequest } from 'next/server'
import { locales, defaultLocale } from './config'

const messages = {
  en: enMessages,
  am: amMessages,
} as const;

export function getTranslations(locale: Locale) {
  return messages[locale];
}

export function translate(key: string, locale: Locale) {
  const translations = getTranslations(locale);
  const keys = key.split('.');
  
  let value: any = translations;
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return the key if translation is not found
    }
  }
  
  return typeof value === 'string' ? value : key;
}

// Type-safe translation key helper
export type TranslationKey = keyof typeof enMessages;
export type NestedTranslationKey<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends object
        ? `${K & string}.${NestedTranslationKey<T[K]> & string}`
        : K;
    }[keyof T]
  : never;

export type ValidTranslationKey = NestedTranslationKey<typeof enMessages>;

// Get the preferred locale from the request headers
export function getLocale(request: NextRequest): Locale {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  
  try {
    return matchLocale(languages, locales, defaultLocale) as Locale
  } catch (error) {
    return defaultLocale
  }
}

// Get the dictionary for the given locale
export async function getDictionary(locale: Locale) {
  try {
    return (await import(`./dictionaries/${locale}.json`)).default
  } catch (error) {
    console.error(`Failed to load dictionary for locale: ${locale}`, error)
    // Fallback to default locale if current locale fails to load
    if (locale !== defaultLocale) {
      return (await import(`./dictionaries/${defaultLocale}.json`)).default
    }
    throw error
  }
}

// Check if the pathname has a locale
export function pathnameHasLocale(pathname: string): boolean {
  return locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
}

// Get the locale from the pathname
export function getLocaleFromPathname(pathname: string): Locale | null {
  const segments = pathname.split('/')
  const locale = segments[1]
  return locales.includes(locale as Locale) ? (locale as Locale) : null
}

// Remove the locale from the pathname
export function removeLocaleFromPathname(pathname: string): string {
  const locale = getLocaleFromPathname(pathname)
  if (!locale) return pathname
  return pathname.replace(`/${locale}`, '') || '/'
} 