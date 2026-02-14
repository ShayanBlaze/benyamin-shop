import ProductCarousel from "@/components/home/ProductCarousel";
import CategorySection from "@/components/home/CategorySection";
import BrandSection from "@/components/home/BrandSection";
import { Card } from "@/components/ui/card";

export default function Home() {
  const sampleProducts = [
    {
      id: 1,
      title: "لپ تاپ ۱۵.۶ اینچی ایسوس مدل Vivobook",
      image: "/placeholder-laptop.jpg",
      price: 75000000,
      originalPrice: 70000000,
      discount: 70,
      rating: 5.0,
    },
  ];

  return (
    <div className="py-6">
      {/* Hero Banner */}
      <Card className="mb-8 bg-linear-to-l from-blue-900/50 to-purple-900/50 border-slate-700">
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                جدیدترین محصولات
              </h1>
              <p className="text-slate-300 mb-6">جدیدترین و برترین محصولات</p>
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition">
                خرید ←
              </button>
            </div>
            <div className="w-full md:w-1/2">
              {/* Placeholder for product image */}
            </div>
          </div>
        </div>
      </Card>

      {/* Featured Products */}
      <ProductCarousel title="پیشنهاد شگفت انگیز" products={sampleProducts} />

      {/* Categories */}
      <CategorySection />

      {/* Brands */}
      <BrandSection />

      {/* More Product Sections */}
      <ProductCarousel title="محبوب‌ترین برندها" products={sampleProducts} />
    </div>
  );
}
