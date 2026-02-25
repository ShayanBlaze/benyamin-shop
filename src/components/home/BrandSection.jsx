import { Link } from "react-router-dom";
import { LayoutGrid, ChevronLeft } from "lucide-react";
import { categories } from "@/const/categories";

function CategoryItem({ cat }) {
  return (
    <Link
      to={`/categories/${cat.slug}`}
      className="group flex flex-col items-center gap-3 focus:outline-none"
    >
      {/* Circle */}
      <div
        className={[
          "relative w-20 h-20 sm:w-24 sm:h-24 rounded-full",
          "ring-2",
          cat.ringColor,
          cat.iconBg,
          cat.hoverBg,
          cat.hoverRing,
          "grid place-items-center",
          "transition-all duration-300",
          "group-hover:scale-110",
          "group-hover:shadow-xl",
          cat.hoverShadow,
          "active:scale-95",
        ].join(" ")}
      >
        {/* top-shine */}
        <div className="absolute inset-0 rounded-full bg-linear-to-b from-white/10 to-transparent pointer-events-none" />
        <cat.Icon
          className={`w-9 h-9 sm:w-10 sm:h-10 ${cat.iconColor} relative z-10`}
        />
      </div>

      {/* Label */}
      <span
        className={[
          "text-xs sm:text-sm font-bold text-center leading-snug",
          "text-gray-300 group-hover:text-white",
          "transition-colors duration-200",
          "w-full max-w-22.5",
        ].join(" ")}
      >
        {cat.label}
      </span>
    </Link>
  );
}

export default function BrandSection() {
  return (
    <section className="py-10 sm:py-14" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ─────────────────────────────────── */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          {/* Right: title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 grid place-items-center shrink-0">
              <LayoutGrid className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                دسته‌بندی‌های <span className="text-blue-400">محبوب</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                جدیدترین و پروترین دسته‌بندی‌ها
              </p>
            </div>
          </div>

          {/* Left: view all */}
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
              bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium
              transition-colors shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
            مشاهده همه
          </Link>
        </div>

        {/* ── Grid ───────────────────────────────────── */}
        {/*
          Mobile  : 3 cols  (3 + 3 + 2)
          Tablet  : 4 cols  (4 + 4)
          Desktop : 8 cols  (all in one row)
        */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-y-8 gap-x-4 sm:gap-x-6">
          {categories.map((cat) => (
            <CategoryItem key={cat.id} cat={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
