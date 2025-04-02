"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "next-themes";
import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";
import { Provider } from "react-redux";
import { store } from "@/store/app-store";
import Nav from "@/components/Nav/Nav";
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
                {/* <Nav
                categories={[
                  {
                    id: "1",
                    name: "Building Materials",
                    description: "Essential materials for construction projects.",
                    subCategories: [
                      {
                        id: "1-1",
                        name: "Cement & Concrete",
                        subSubCategories: [
                          { id: "1-1-1", name: "Portland Cement" },
                          { id: "1-1-2", name: "Ready-Mix Concrete" },
                          { id: "1-1-3", name: "Concrete Blocks" },
                        ],
                      },
                      {
                        id: "1-2",
                        name: "Bricks & Blocks",
                        subSubCategories: [
                          { id: "1-2-1", name: "Clay Bricks" },
                          { id: "1-2-2", name: "Concrete Bricks" },
                          { id: "1-2-3", name: "AAC Blocks" },
                        ],
                      },
                    ],
                  },
                  {
                    id: "2",
                    name: "Steel & Metal",
                    description: "Structural steel and metal components.",
                    subCategories: [
                      {
                        id: "2-1",
                        name: "Steel Bars",
                        subSubCategories: [
                          { id: "2-1-1", name: "Rebar" },
                          { id: "2-1-2", name: "Hollow Sections" },
                          { id: "2-1-3", name: "I-Beams" },
                        ],
                      },
                      {
                        id: "2-2",
                        name: "Metal Sheets",
                        subSubCategories: [
                          { id: "2-2-1", name: "Galvanized Sheets" },
                          { id: "2-2-2", name: "Aluminum Panels" },
                          { id: "2-2-3", name: "Corrugated Sheets" },
                        ],
                      },
                    ],
                  },
                  {
                    id: "3",
                    name: "Electrical & Plumbing",
                    description: "Electrical and plumbing materials for buildings.",
                    subCategories: [
                      {
                        id: "3-1",
                        name: "Electrical Supplies",
                        subSubCategories: [
                          { id: "3-1-1", name: "Wires & Cables" },
                          { id: "3-1-2", name: "Switches & Sockets" },
                          { id: "3-1-3", name: "Circuit Breakers" },
                        ],
                      },
                      {
                        id: "3-2",
                        name: "Plumbing Materials",
                        subSubCategories: [
                          { id: "3-2-1", name: "PVC Pipes" },
                          { id: "3-2-2", name: "Water Tanks" },
                          { id: "3-2-3", name: "Fittings & Valves" },
                        ],
                      },
                    ],
                  },
                  {
                    id: "4",
                    name: "Tools & Equipment",
                    description: "Hand tools and machinery for construction work.",
                    subCategories: [
                      {
                        id: "4-1",
                        name: "Hand Tools",
                        subSubCategories: [
                          { id: "4-1-1", name: "Hammers" },
                          { id: "4-1-2", name: "Screwdrivers" },
                          { id: "4-1-3", name: "Wrenches" },
                        ],
                      },
                      {
                        id: "4-2",
                        name: "Power Tools",
                        subSubCategories: [
                          { id: "4-2-1", name: "Drills" },
                          { id: "4-2-2", name: "Angle Grinders" },
                          { id: "4-2-3", name: "Circular Saws" },
                        ],
                      },
                    ],
                  },
                  {
                    id: "5",
                    name: "Doors & Windows",
                    description: "Various types of doors and windows for buildings.",
                    subCategories: [
                      {
                        id: "5-1",
                        name: "Doors",
                        subSubCategories: [
                          { id: "5-1-1", name: "Wooden Doors" },
                          { id: "5-1-2", name: "Steel Doors" },
                          { id: "5-1-3", name: "Glass Doors" },
                        ],
                      },
                      {
                        id: "5-2",
                        name: "Windows",
                        subSubCategories: [
                          { id: "5-2-1", name: "Aluminum Windows" },
                          { id: "5-2-2", name: "UPVC Windows" },
                          { id: "5-2-3", name: "Wooden Windows" },
                        ],
                      },
                    ],
                  },
                  {
                    id: "6",
                    name: "Roofing Materials",
                    description: "Materials used for roofing construction.",
                    subCategories: [
                      {
                        id: "6-1",
                        name: "Roof Sheets",
                        subSubCategories: [
                          { id: "6-1-1", name: "Metal Roofing" },
                          { id: "6-1-2", name: "Shingles" },
                          { id: "6-1-3", name: "Clay Tiles" },
                        ],
                      },
                      {
                        id: "6-2",
                        name: "Roof Insulation",
                        subSubCategories: [
                          { id: "6-2-1", name: "Foam Insulation" },
                          { id: "6-2-2", name: "Fiberglass Insulation" },
                          { id: "6-2-3", name: "Reflective Sheets" },
                        ],
                      },
                    ],
                  }
                ]}
                /> */}
                <Navbar/>
                {children}
                <Footer />
              </Provider>
            </ThemeProvider>
      </body>
    </html>
  );
}