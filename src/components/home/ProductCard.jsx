import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star, TrendingUp, Eye } from "lucide-react";

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const discountAmount = product.originalPrice
    ? product.originalPrice - product.price
    : 0;

  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <div className="flex flex-col gap-2">
            {product.badge && (
              <Badge className="bg-orange-500 text-white text-xs">
                {product.badge}
              </Badge>
            )}
            {product.discount > 0 && (
              <Badge className="bg-red-500 text-white text-xs">
                {product.discount}% تخفیف
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-2 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            />
          </button>
        </div>

        {/* Quick View - Appears on hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button variant="secondary" size="sm" className="w-full">
            <Eye className="w-4 h-4 ml-2" />
            مشاهده سریع
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand & Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
            {product.brand}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {product.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.features.slice(0, 2).map((feature, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Rating & Sales */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {product.rating}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ({product.reviewCount})
            </span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="text-xs">{product.salesCount} فروش</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-3">
          {product.originalPrice && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-slate-400 line-through">
                {product.originalPrice.toLocaleString("fa-IR")} تومان
              </span>
              <Badge variant="destructive" className="text-xs">
                {discountAmount.toLocaleString("fa-IR")} تومان تخفیف
              </Badge>
            </div>
          )}
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {parseInt(product.price).toLocaleString("fa-IR")}
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              تومان
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button className="w-full group" disabled={product.stock !== "موجود"}>
          <ShoppingCart className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
          {product.stock === "موجود" ? "افزودن به سبد" : "ناموجود"}
        </Button>
      </div>
    </div>
  );
}
