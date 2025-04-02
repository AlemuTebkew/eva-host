"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function MobileTabs() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full px-4">
      {/* Tabs Navigation */}
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
      </TabsList>

      {/* Tabs Content */}
      <TabsContent value="products">
        <div className="p-4">Products Content</div>
      </TabsContent>
      <TabsContent value="suppliers">
        <div className="p-4">Suppliers Content</div>
      </TabsContent>
      <TabsContent value="services">
        <div className="p-4">Services Content</div>
      </TabsContent>
    </Tabs>
  );
}
