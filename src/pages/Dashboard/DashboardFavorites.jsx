import { useState } from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import SectionHeader from "@/components/dashboard/SectionHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";
import EmptyState from "@/components/dashboard/EmptyState";

const mockFavorites = [
  { id: 1, title: "لنت ترمز جلو برمبو (Brembo)", price: "۱,۹۵۰,۰۰۰ تومان" },
  { id: 2, title: "فیلتر هوای اسپرت K&N", price: "۲,۳۰۰,۰۰۰ تومان" },
  {
    id: 3,
    title: "روغن موتور ۵W-30 لیکومولی ۴ لیتری",
    price: "۲,۷۵۰,۰۰۰ تومان",
  },
  { id: 4, title: "هدلایت LED لنزدار (جفت)", price: "۱,۳۵۰,۰۰۰ تومان" },
  { id: 5, title: "روکش فرمان اسپرت دوختی", price: "۴۹۰,۰۰۰ تومان" },
  { id: 6, title: "دیسک ترمز جلو (جفت)", price: "۲,۹۰۰,۰۰۰ تومان" },
];

export default function DashboardFavorites() {
  const [items, setItems] = useState(mockFavorites);

  const remove = (id) => setItems((prev) => prev.filter((x) => x.id !== id));

  return (
    <div className="space-y-6">
      <SectionHeader
        title="علاقه‌مندی‌ها"
        description="محصولات موردعلاقه‌ات را سریع ببین و به سبد اضافه کن."
      />

      {items.length === 0 ? (
        <EmptyState
          title="لیست علاقه‌مندی‌ها خالیه"
          description="چند محصول به علاقه‌مندی‌ها اضافه کن تا اینجا نمایش داده بشه."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {items.map((p) => (
            <DashboardCard key={p.id} className="p-4">
              {/* Title + Price */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-white font-bold truncate">{p.title}</p>
                  <p className="text-sm text-gray-300 mt-2 font-bold">
                    {p.price}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 grid place-items-center shrink-0 border border-blue-500/15">
                  <Heart className="w-5 h-5 text-blue-300" />
                </div>
              </div>

              {/* Actions (stack on mobile) */}
              <div className="mt-4 flex flex-col sm:flex-row items-stretch gap-2">
                <button
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm transition-colors"
                  type="button"
                >
                  <ShoppingCart className="w-4 h-4" />
                  افزودن به سبد
                </button>

                <button
                  onClick={() => remove(p.id)}
                  className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 text-sm transition-colors"
                  aria-label="حذف از علاقه‌مندی‌ها"
                  type="button"
                >
                  <Trash2 className="w-4 h-4" />
                  حذف
                </button>
              </div>
            </DashboardCard>
          ))}
        </div>
      )}
    </div>
  );
}
