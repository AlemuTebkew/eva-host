// 'use client'

import Footer from "@/components/footer";
import { ThemeProvider } from "next-themes";
import "../styles/index.css";
import { Provider } from "react-redux";
import { store } from "@/store/app-store";
import Navbar from "@/components/Navigation";
import Header from "@/components/header";
import ClientProviders from "./client-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true} className="!scroll-smooth" lang="en">
      <head />
      <body>
        {/* <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
        > */}
          <ClientProviders >
            <Header />

            {/* <Header /> */}
            {/* <Navbar/> */}
            {children}

            <Footer />
          </ClientProviders>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
