import { memo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Eye, Calendar, ArrowLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { faIR } from "date-fns/locale";

const ArticleCard = memo(function ArticleCard({ article }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
    locale: faIR,
  });

  return (
    <article className="group bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-2xl hover:border-purple-500 dark:hover:border-purple-400 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-700 shrink-0">
        {/* Loading State */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-slate-400" />
          </div>
        )}

        <img
          src={article.image}
          alt={article.title}
          onLoad={() => setImageLoaded(true)}
          className={cn(
            "w-full h-full object-cover transition-all duration-500 group-hover:scale-110",
            imageLoaded ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Category Badge */}
        <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-purple-500 hover:bg-purple-600 text-white text-[10px] sm:text-xs shadow-lg">
          {article.category}
        </Badge>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-5 flex flex-col grow">
        {/* Meta Info */}
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>{article.readTime} دقیقه</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>{article.views?.toLocaleString("fa-IR")}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">{timeAgo}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 line-clamp-2 h-10 sm:h-12 leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors cursor-pointer">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="hidden sm:block text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-3 sm:mb-4 line-clamp-2">
          {article.excerpt}
        </p>

        {/* Spacer */}
        <div className="grow" />

        {/* Author & Read More */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src={article.author?.avatar || "/images/default-avatar.jpg"}
              alt={article.author?.name}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full ring-2 ring-slate-200 dark:ring-slate-700"
            />
            <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
              {article.author?.name}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="group/btn text-xs sm:text-sm h-8 sm:h-9 hover:text-purple-600 dark:hover:text-purple-400"
          >
            <span className="hidden xs:inline">ادامه مطلب</span>
            <span className="xs:hidden">بیشتر</span>
            <ArrowLeft className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:-translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </article>
  );
});

ArticleCard.displayName = "ArticleCard";

export default ArticleCard;
