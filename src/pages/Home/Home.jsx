import ProductCarousel from "@/components/home/ProductCarousel";
import CategorySection from "@/components/home/CategorySection";
import BrandSection from "@/components/home/BrandSection";
import HeroSlider from "@/components/home/HeroSlider";
import AmazingOffer from "@/components/home/AmazingOffer";
import { amazingOfferProducts } from "@/const";

export default function Home() {
  return (
    <div className="py-6">
      {/* Hero Banner */}
      <HeroSlider />

      {/* Amazing Offer Section */}
      <AmazingOffer />

      {/* Categories */}
      <CategorySection />

      {/* Brands */}
      <BrandSection />

      {/* More Product Sections */}
      <ProductCarousel title="محبوب‌ترین برندها" products={amazingOfferProducts} />
    </div>
  );
}
