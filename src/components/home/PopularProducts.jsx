import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "./ProductCard";
import { popularProducts } from "@/const/popularProducts";
import { TrendingUp, ChevronLeft, Loader2 } from "lucide-react";

export default function PopularProducts() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // تشخیص موبایل
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Simulate API fetch
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // در واقعیت اینجا API call می‌زنید:
      // const response = await fetch('/api/products/popular');
      // const data = await response.json();
      // setProducts(data);

      setProducts(popularProducts);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  // محدود کردن تعداد محصولات در موبایل (6 محصول = 3 ردیف)
  const displayedProducts = isMobile ? products.slice(0, 6) : products;

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Icon with glow effect */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl blur-xl opacity-50 animate-pulse" />
              <div className="relative p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 shadow-2xl">
                <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
            </div>

            {/* Title & Description */}
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white">
                  محصولات پرفروش
                </h2>
                <Badge className="hidden xs:inline-flex bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/50 text-xs sm:text-sm">
                  {isMobile
                    ? `${displayedProducts.length} از ${products.length}`
                    : products.length}{" "}
                  محصول
                </Badge>
              </div>
              <p className="text-xs sm:text-sm lg:text-base text-slate-600 dark:text-slate-400">
                پرطرفدارترین و پرفروش‌ترین محصولات این ماه
              </p>
            </div>
          </div>

          {/* View All Button */}
          <Button
            variant="outline"
            size="lg"
            className="group border-2 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl transition-all duration-300 whitespace-nowrap"
          >
            مشاهده همه محصولات
            <ChevronLeft className="mr-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          // Loading Skeletons
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {[...Array(isMobile ? 6 : 10)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-slate-200 dark:bg-slate-700" />
                <div className="p-3 sm:p-4 md:p-5 space-y-2 sm:space-y-3">
                  <div className="h-3 sm:h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
                  <div className="h-4 sm:h-5 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                  <div className="h-4 sm:h-5 bg-slate-200 dark:bg-slate-700 rounded w-4/5" />
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="h-5 sm:h-6 bg-slate-200 dark:bg-slate-700 rounded w-16 sm:w-20" />
                  </div>
                  <div className="h-9 sm:h-10 bg-slate-200 dark:bg-slate-700 rounded w-full mt-3 sm:mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : displayedProducts.length > 0 ? (
          // Products Grid
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6 animate-in fade-in duration-700">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16 sm:py-24">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
              <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
              محصولی یافت نشد
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 text-center max-w-md">
              در حال حاضر محصول پرفروشی برای نمایش وجود ندارد.
            </p>
          </div>
        )}

        {/* اعلان "محصولات بیشتر" فقط در موبایل */}
        {!isLoading && isMobile && products.length > 6 && (
          <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-center">
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {products.length - 6}
              </span>{" "}
              محصول دیگر موجود است
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              برای مشاهده همه محصولات، روی دکمه "مشاهده همه" کلیک کنید
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
