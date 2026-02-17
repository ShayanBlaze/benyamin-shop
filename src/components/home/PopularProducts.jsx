import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "./ProductCard";
import { popularProducts } from "@/const/popularProducts";
import { TrendingUp, ChevronLeft } from "lucide-react";

export default function PopularProducts() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "همه محصولات" },
    { id: "consumables", label: "لوازم مصرفی" },
    { id: "spare-parts", label: "قطعات یدکی" },
    { id: "electrical", label: "برق و انژکتور" },
  ];

  const filteredProducts =
    activeTab === "all"
      ? popularProducts
      : popularProducts.filter((p) => p.category === activeTab);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
              <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                محصولات پرفروش
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
                پرطرفدارترین محصولات این ماه
              </p>
            </div>
          </div>

          <Button variant="outline" className="group">
            مشاهده همه
            <ChevronLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="whitespace-nowrap"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
