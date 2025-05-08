// 'use client'

import Footer from "@/components/footer";
import { ThemeProvider } from "next-themes";
import "../styles/index.css";
import { Provider } from "react-redux";
import { store } from "@/store/app-store";
import Navbar from "@/components/Navigation";
import Header from "@/components/header";
import ClientProviders from "./client-provider";

// add inter font
import { Inter } from "next/font/google";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true} className={`!scroll-smooth ${inter.className}`} lang="en">
      <head />
      <body>
        {/* <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
        > */}
          <ClientProviders >
            <Suspense fallback={<div>Loading...</div>}>
              <Header />
            </Suspense>

            {children}

            <Suspense fallback={<div>Loading...</div>}>
              <Footer />
            </Suspense>
          </ClientProviders>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
