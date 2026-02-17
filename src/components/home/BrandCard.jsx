import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function BrandCard({ brand, index, variant = "default" }) {
  const variants = {
    hero: "col-span-2 row-span-2",
    wide: "col-span-2 row-span-1",
    tall: "col-span-1 row-span-2",
    default: "col-span-1 row-span-1",
  };

  const isLarge = variant === "hero";
  const isTall = variant === "tall";
  const isWide = variant === "wide";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`group relative overflow-hidden rounded-2xl bg-linear-to-br ${brand.gradient} border border-slate-700/50 hover:border-primary/50 transition-all duration-500 cursor-pointer ${variants[variant]}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.4),transparent_70%)] group-hover:scale-110 transition-transform duration-700" />
      </div>

      {/* Floating Sparkle - only for large cards */}
      {isLarge && (
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Sparkles className="w-5 h-5 text-primary/70 animate-pulse" />
        </div>
      )}

      {/* Content */}
      <div
        className={`relative h-full ${isLarge ? "p-6 md:p-8" : "p-5"} flex ${isTall || isLarge ? "flex-col" : "flex-row items-center"} ${isLarge ? "justify-between" : ""}`}
      >
        {/* Logo Section */}
        <div
          className={`relative ${isTall || isLarge ? "mb-auto" : "shrink-0"}`}
        >
          <div
            className={`relative ${isLarge ? "w-28 h-28" : "w-16 h-16"} rounded-xl bg-slate-900/70 backdrop-blur-sm flex items-center justify-center overflow-hidden group-hover:scale-105 transition-all duration-500 shadow-lg`}
          >
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <img
              src={brand.image}
              alt={brand.name}
              className={`${isLarge ? "w-16 h-16" : "w-10 h-10"} object-contain filter brightness-95 group-hover:brightness-110 transition-all duration-300 relative z-10`}
            />
          </div>

          {/* Featured Badge - for all cards */}
          {brand.featured && (
            <div
              className={`absolute ${isLarge ? "-top-2 -right-2" : "-top-1 -right-1"} px-2 py-1 rounded-lg bg-primary/90 text-white ${isLarge ? "text-xs" : "text-[10px]"} font-bold shadow-lg`}
            >
              ویژه
            </div>
          )}
        </div>

        {/* Text Content */}
        <div
          className={`flex-1 ${isTall || isLarge ? "mt-5" : isWide ? "mr-5" : "mr-4"}`}
        >
          {/* Brand Name */}
          <h3
            className={`font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 ${isLarge ? "text-3xl mb-3" : isWide ? "text-xl" : "text-lg"}`}
          >
            {brand.name}
          </h3>

          {/* Description - only for large cards */}
          {(isLarge || isWide || isTall) && (
            <p
              className={`text-slate-400 mb-3 ${isLarge ? "text-sm line-clamp-2" : "text-xs line-clamp-1"}`}
            >
              {brand.description}
            </p>
          )}

          {/* Product Count */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span
              className={`text-slate-300 ${isLarge ? "text-sm" : "text-xs"}`}
            >
              {brand.productCount.toLocaleString("fa-IR")} محصول
            </span>
          </div>

          {/* CTA - for all cards */}
          <button
            className={`flex items-center gap-2 ${isLarge ? "text-sm" : "text-xs"} font-medium text-primary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 mt-auto`}
          >
            <span>مشاهده محصولات</span>
            <ArrowLeft className={`${isLarge ? "w-4 h-4" : "w-3 h-3"}`} />
          </button>
        </div>
      </div>

      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-linear-to-r from-transparent via-white/3 to-transparent" />
    </motion.div>
  );
}
