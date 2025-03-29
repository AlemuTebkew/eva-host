import React, { SetStateAction, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import Link from "next/link";
import { Category, SubCategory, SubSubCategory } from "@/types/category";


type SidebarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  categories: Category[];
};

const Sidebar = ({ isOpen, setIsOpen, categories }: SidebarProps) => {
  const [value, setValue] = useState("categories");

  return (
    <div
      className={`fixed top-0 left-0 w-72 h-screen bg-background shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="flex justify-end p-4">
        <button onClick={() => setIsOpen(false)}>
          <X className="text-secondaryT" size={24} />
        </button>
      </div>
      <nav>
        <Tabs value={value} onValueChange={setValue} className="px-2">
          <TabsList className="w-full">
            <TabsTrigger value="categories" className="w-full">Categories</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="h-screen overflow-y-auto pr-2 px-4" style={{ maxHeight: "calc(100vh - 120px)" }}>
          <Accordion type="multiple">
            {categories.map((category) => (
              <AccordionItem key={category.id} value={category.id}>
                <AccordionTrigger>
                  <Link
                    onClick={() => setIsOpen(false)}
                    className="hover:text-primaryT"
                    href={`/products?category=${category.name}&categoryId=${category.id}`}
                  >
                    <p>{category.name}</p>
                  </Link>
                </AccordionTrigger>
                <AccordionContent>
                  <Accordion type="multiple">
                    {category.subCategories.map((subCategory: SubCategory) => (
                      <AccordionItem key={subCategory.id} value={subCategory.id}>
                        <AccordionTrigger>
                          <Link
                            onClick={() => setIsOpen(false)}
                            className="hover:text-primaryT"
                            href={`/products?category=${category.name}&categoryId=${category.id}&subCategory=${subCategory.name}`}
                          >
                            <p className="font-normal">{subCategory.name}</p>
                          </Link>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="flex flex-col gap-0">
                            <Separator />
                            {subCategory.subSubCategories.map((subSubCategory: SubSubCategory, index) => (
                              <div key={index} className="w-full flex flex-col gap-0">
                                <li key={subSubCategory.id}>
                                  <Link
                                    onClick={() => setIsOpen(false)}
                                    className="hover:text-primaryT px-2"
                                    href={`/products?category=${category.name}&categoryId=${category.id}&subCategory=${subCategory.name}&subSubCategory=${subSubCategory.name}`}
                                  >
                                    <p className="font-normal">{subSubCategory.name}</p>
                                  </Link>
                                </li>
                                <Separator />
                              </div>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Link className="hover:text-primaryT" onClick={() => setIsOpen(false)} href={`/blogs`}>
            <h4>Blog</h4>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
