"use client";

import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";
import "../styles/index.css";
import { Provider } from "react-redux";
import { store } from "@/store/app-store";
import Navbar from "@/components/Navigation";

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
                {/* <Header /> */}
                {/* <Navbar/> */}
                {children}
                {/* <Footer /> */}
              </Provider>
            </ThemeProvider>
      </body>
    </html>
  );
}