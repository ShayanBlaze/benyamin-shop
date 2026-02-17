import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ArticleCard from "./ArticleCard";
import { recentArticles } from "@/const";
import { BookOpen, ChevronLeft, Loader2 } from "lucide-react";

export default function RecentArticles() {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Simulate API fetch
  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // const response = await fetch('/api/articles/recent');
      // const data = await response.json();
      // setArticles(data);

      setArticles(recentArticles);
      setIsLoading(false);
    };

    fetchArticles();
  }, []);

  const displayedArticles = isMobile
    ? articles.slice(0, 4)
    : articles.slice(0, 6);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Icon with glow effect */}
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50 animate-pulse" />
              <div className="relative p-3 sm:p-4 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 shadow-2xl">
                <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
            </div>

            {/* Title & Description */}
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white">
                  مقالات و آموزش‌ها
                </h2>
                <Badge className="hidden xs:inline-flex bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 text-xs sm:text-sm">
                  {articles.length} مقاله
                </Badge>
              </div>
              <p className="text-xs sm:text-sm lg:text-base text-slate-600 dark:text-slate-400">
                جدیدترین مطالب آموزشی و راهنمای تعمیرات خودرو
              </p>
            </div>
          </div>

          {/* View All Button */}
          <Button
            variant="outline"
            size="lg"
            className="group border-2 hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-xl transition-all duration-300 whitespace-nowrap"
          >
            همه مقالات
            <ChevronLeft className="mr-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Articles Grid */}
        {isLoading ? (
          // Loading Skeletons
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {[...Array(isMobile ? 4 : 6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-pulse"
              >
                <div className="aspect-video bg-slate-200 dark:bg-slate-700" />
                <div className="p-3 sm:p-4 md:p-5 space-y-2 sm:space-y-3">
                  <div className="h-3 sm:h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
                  <div className="h-4 sm:h-5 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                  <div className="h-4 sm:h-5 bg-slate-200 dark:bg-slate-700 rounded w-4/5" />
                  <div className="hidden sm:block space-y-2">
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                  </div>
                  <div className="flex justify-between items-center pt-3">
                    <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-full w-24" />
                    <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : displayedArticles.length > 0 ? (
          // Articles Grid
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 animate-in fade-in duration-700">
            {displayedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16 sm:py-24">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
              <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
              مقاله‌ای یافت نشد
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 text-center max-w-md">
              در حال حاضر مقاله‌ای برای نمایش وجود ندارد.
            </p>
          </div>
        )}

        {/* notify more articles only for mobile */}
        {!isLoading && isMobile && articles.length > 4 && (
          <div className="mt-6 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 text-center">
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              <span className="font-bold text-purple-600 dark:text-purple-400">
                {articles.length - 4}
              </span>{" "}
              مقاله دیگر موجود است
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              برای مشاهده همه مقالات، روی دکمه "همه مقالات" کلیک کنید
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
