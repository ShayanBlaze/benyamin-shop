import ProductCarousel from "@/components/home/ProductCarousel";
import CategorySection from "@/components/home/CategorySection";
import BrandSection from "@/components/home/BrandSection";
import HeroSlider from "@/components/home/HeroSlider";
import AmazingOffer from "@/components/home/AmazingOffer";

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
    {
      id: 1,
      title: "لپ تاپ ۱۵.۶ اینچی ایسوس مدل Vivobook",
      image: "/placeholder-laptop.jpg",
      price: 75000000,
      originalPrice: 70000000,
      discount: 70,
      rating: 5.0,
    },
    {
      id: 1,
      title: "لپ تاپ ۱۵.۶ اینچی ایسوس مدل Vivobook",
      image: "/placeholder-laptop.jpg",
      price: 75000000,
      originalPrice: 70000000,
      discount: 70,
      rating: 5.0,
    },
    {
      id: 1,
      title: "لپ تاپ ۱۵.۶ اینچی ایسوس مدل Vivobook",
      image: "/placeholder-laptop.jpg",
      price: 75000000,
      originalPrice: 70000000,
      discount: 70,
      rating: 5.0,
    },
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
      <HeroSlider />

      {/* Amazing Offer Section */}
      <AmazingOffer />

      {/* Categories */}
      <CategorySection />

      {/* Brands */}
      <BrandSection />

      {/* More Product Sections */}
      <ProductCarousel title="محبوب‌ترین برندها" products={sampleProducts} />
    </div>
  );
}
