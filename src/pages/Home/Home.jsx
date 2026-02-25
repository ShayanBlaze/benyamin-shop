import CategorySection from "@/components/home/CategorySection";
import HeroSlider from "@/components/home/HeroSlider";
import AmazingOffer from "@/components/home/AmazingOffer";
import PopularProducts from "@/components/home/PopularProducts";
import RecentArticles from "@/components/home/RecentArticles";
import BrandSection from "@/components/home/BrandSection";

export default function Home() {
  return (
    <div className="py-6">
      {/* Hero Banner */}
      <HeroSlider />

      {/* Amazing Offer Section */}
      <AmazingOffer />

      {/* Brand Section */}
      <BrandSection />

      {/* Categories */}
      <CategorySection />

      {/* Popular Products */}
      <PopularProducts />

      {/* Recent Articles */}
      <RecentArticles />
    </div>
  );
}
