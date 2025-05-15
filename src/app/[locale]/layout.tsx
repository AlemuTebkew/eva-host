import { hasLocale, NextIntlClientProvider } from "next-intl";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ClientProviders from "./client-provider";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import {routing} from '@/i18n/routing';
import '@/app/globals.css'; // 👈 this brings in Tailwind styles

const inter = Inter({ subsets: ["latin"] });

// export async function generateStaticParams() {
//   return locales.map((lang) => ({ lang }));
// }

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
 
  return (
    <html
      suppressHydrationWarning={true}
      className={`!scroll-smooth ${inter.className}`}
      lang={locale}
    >
      <head />
      <body>
        <ClientProviders>
          <NextIntlClientProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <Header />
            </Suspense>

            {children}

            <Suspense fallback={<div>Loading...</div>}>
              <Footer />
            </Suspense>
          </NextIntlClientProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
