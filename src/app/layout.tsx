"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "next-themes";
import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";
import { Provider } from "react-redux";
import { store } from "@/store/app-store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html suppressHydrationWarning={true} className="!scroll-smooth" lang="en">
      <head />
      <body>
            <ThemeProvider
              attribute="class"
              enableSystem={false}
              defaultTheme="light"
            >
              <Provider store={store}>
                <Header />
                {children}
                {/* <Footer /> */}
              </Provider>
            </ThemeProvider>
      </body>
    </html>
  );
}