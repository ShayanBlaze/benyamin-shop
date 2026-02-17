import BrandCard from "./BrandCard";
import { Car, Wrench, ArrowLeft } from "lucide-react";
import { brandsData } from "@/const";
import { categoryGridLayout } from "@/config/layouts";

export default function CategorySection() {
  return (
    <section className="py-12 md:py-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-linear-to-br from-primary/20 to-primary/5 rounded-xl">
              <Car className="w-6 h-6 text-primary" />
            </div>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
              محصولات اصل
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            برندهای برتر قطعات
          </h2>
          <p className="text-sm md:text-base text-slate-400 flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            با گارانتی معتبر و قیمت مناسب
          </p>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-primary/50 rounded-xl text-sm font-medium text-foreground transition-all duration-300 group hover:shadow-lg hover:shadow-primary/5"
        >
          <span>همه برندها</span>
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Desktop: Bento Grid - categoryGridLayout */}
      <div className="hidden lg:grid lg:grid-cols-4 auto-rows-[160px] gap-5">
        {categoryGridLayout.map((item, index) => (
          <BrandCard
            key={item.brand.id}
            brand={item.brand}
            index={index}
            variant={item.variant}
          />
        ))}
      </div>

      {/* Tablet: Grid 3 */}
      <div className="hidden md:grid lg:hidden md:grid-cols-3 gap-4">
        {brandsData.slice(0, 6).map((brand, index) => (
          <BrandCard
            key={brand.id}
            brand={brand}
            index={index}
            variant="default"
          />
        ))}
      </div>

      {/* Mobile: Grid 2 */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {brandsData.slice(0, 6).map((brand, index) => (
          <BrandCard
            key={brand.id}
            brand={brand}
            index={index}
            variant="default"
          />
        ))}
      </div>

      {/* View More Button */}
      <div className="mt-6 text-center lg:hidden">
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 border border-slate-700 hover:border-primary/50 rounded-xl text-sm text-foreground transition-all duration-300">
          <span>مشاهده بیشتر</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
