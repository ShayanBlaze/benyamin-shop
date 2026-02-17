import { useState, memo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Star,
  Loader2,
  Check,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ProductCard = memo(function ProductCard({ product }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const isOutOfStock = product.stock !== "موجود";

  // Handle add to cart
  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (isOutOfStock || isAddingToCart) return;

    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }, 600);
  };

  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-2xl hover:border-blue-500 dark:hover:border-blue-400 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700 shrink-0">
        {/* Loading State */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-slate-400" />
          </div>
        )}

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={cn(
            "w-full h-full object-cover transition-all duration-500 group-hover:scale-110",
            imageLoaded ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
            <span className="text-white font-bold text-sm sm:text-base">
              ناموجود
            </span>
          </div>
        )}

        {/* Badges - ساده‌تر */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 sm:gap-1.5 z-10">
          {product.badge && (
            <Badge className="bg-orange-500 text-white text-[10px] sm:text-xs shadow-lg px-1.5 py-0.5 sm:px-2 sm:py-1">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-0.5 sm:ml-1" />
              {product.badge}
            </Badge>
          )}
          {discountPercent > 0 && (
            <Badge className="bg-red-500 text-white text-[10px] sm:text-xs shadow-lg px-1.5 py-0.5 sm:px-2 sm:py-1">
              {discountPercent}%
            </Badge>
          )}
        </div>
      </div>

      {/* Content - با flex-grow برای یکسان سازی */}
      <div className="p-2.5 sm:p-3.5 md:p-4 flex flex-col flex-grow">
        {/* Brand */}
        <div className="mb-1.5 sm:mb-2">
          <span className="text-[10px] sm:text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            {product.brand}
          </span>
        </div>

        {/* Title - ارتفاع ثابت */}
        <h3 className="text-xs sm:text-sm md:text-base font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 line-clamp-2 h-8 sm:h-10 leading-tight">
          {product.name}
        </h3>

        {/* Rating - ساده‌تر */}
        <div className="flex items-center gap-1 mb-2 sm:mb-3">
          <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
            {product.rating}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500">
            ({product.reviewCount?.toLocaleString("fa-IR")})
          </span>
        </div>

        {/* Spacer - فضای خالی تا دکمه همیشه پایین بچسبه */}
        <div className="flex-grow" />

        {/* Price */}
        <div className="mb-2.5 sm:mb-3">
          {product.originalPrice && (
            <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 line-through block mb-0.5">
              {parseInt(product.originalPrice).toLocaleString("fa-IR")}
            </span>
          )}
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg md:text-xl font-black text-slate-900 dark:text-white">
              {parseInt(product.price).toLocaleString("fa-IR")}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400">
              تومان
            </span>
          </div>
        </div>

        {/* Add to Cart Button - همیشه در پایین */}
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAddingToCart || isAdded}
          className={cn(
            "w-full transition-all duration-300 shadow-md text-xs sm:text-sm h-8 sm:h-9 md:h-10",
            isAdded && "bg-green-500 hover:bg-green-600",
          )}
        >
          {isAddingToCart ? (
            <>
              <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 ml-1 animate-spin" />
              در حال افزودن...
            </>
          ) : isAdded ? (
            <>
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 animate-bounce" />
              اضافه شد!
            </>
          ) : isOutOfStock ? (
            "ناموجود"
          ) : (
            <>
              <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:rotate-12 transition-transform" />
              افزودن به سبد
            </>
          )}
        </Button>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
