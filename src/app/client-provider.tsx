"use client";

import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "@/store/app-store";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
}
