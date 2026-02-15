import { useRef, useState, useEffect, useMemo } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  ChevronRight,
  ChevronLeft,
  Zap,
  Shield,
  Award,
  ShoppingCart,
  Package,
  Percent,
} from "lucide-react";

const sliderData = [
  {
    id: 1,
    brand: "Mobil 1",
    model: "Advanced Full Synthetic",
    subtitle: "بهترین انتخاب برای موتورهای مدرن",
    price: "۱,۸۵۰,۰۰۰",
    originalPrice: "۲,۱۰۰,۰۰۰",
    discount: "12",
    stock: "موجود در انبار",
    badge: "پرفروش",
    specs: [
      { icon: Zap, label: "روانکاری فوق‌العاده" },
      { icon: Shield, label: "محافظت تا ۲۰ هزار کیلومتر" },
      { icon: Award, label: "مورد تأیید BMW و Mercedes" },
    ],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format",
  },
  {
    id: 2,
    brand: "Bosch",
    model: "AeroTwin Wiper",
    subtitle: "برف‌پاک‌کن بی‌صدا با فناوری آلمانی",
    price: "۵۴۰,۰۰۰",
    originalPrice: null,
    discount: null,
    stock: "فقط ۳ عدد باقی‌مانده",
    badge: "جدید",
    specs: [
      { icon: Shield, label: "پاک‌سازی کامل" },
      { icon: Zap, label: "عمر ۲ برابر" },
      { icon: Award, label: "نصب آسان" },
    ],
    image:
      "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?q=80&w=1200&auto=format",
  },
  {
    id: 3,
    brand: "Michelin",
    model: "Primacy 4",
    subtitle: "لاستیک چهارفصل با عملکرد استثنایی",
    price: "۴,۲۰۰,۰۰۰",
    originalPrice: "۴,۸۰۰,۰۰۰",
    discount: "15",
    stock: "موجود در انبار",
    badge: "پیشنهاد ویژه",
    specs: [
      { icon: Shield, label: "گریپ عالی در باران" },
      { icon: Zap, label: "عمر ۸۰ هزار کیلومتر" },
      { icon: Award, label: "صرفه‌جویی سوخت" },
    ],
    image:
      "https://images.unsplash.com/photo-1629897048514-3dd7414fe72a?q=80&w=1200&auto=format",
  },
];

const HeroSlider = () => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: false }));

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => {
      api.off("select");
    };
  }, [api]);

  // Memoize badge class to prevent re-calculations
  const getBadgeClass = useMemo(() => {
    return (badge) => {
      const baseClass = "text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 border-0 shadow-lg shrink-0 whitespace-nowrap";
      if (badge === "پرفروش") return `${baseClass} bg-orange-500 hover:bg-orange-600`;
      if (badge === "جدید") return `${baseClass} bg-green-500 hover:bg-green-600`;
      if (badge === "پیشنهاد ویژه") return `${baseClass} bg-red-500 hover:bg-red-600`;
      return baseClass;
    };
  }, []);

  return (
    <section
      className="relative w-full bg-background overflow-hidden"
      dir="ltr"
    >
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
          direction: "rtl",
          skipSnaps: false,
          dragFree: false,
        }}
        className="w-full"
      >
        <CarouselContent className="h-full ml-0">
          {sliderData.map((slide, index) => (
            <CarouselItem key={slide.id} className="relative w-full pl-0">
              {/* Responsive Height Container */}
              <div className="relative w-full h-125 sm:h-150 md:h-162.5 lg:h-175 xl:h-187.5">
                {/* Background Image Container - Optimized */}
                <div className="absolute inset-0 overflow-hidden rounded-none sm:rounded-lg md:rounded-xl lg:rounded-2xl">
                  <img
                    src={slide.image}
                    alt={slide.model}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                    style={{
                      transform: current === index ? 'scale(1)' : 'scale(1.05)',
                      transition: 'transform 0.7s ease-out',
                      willChange: current === index ? 'transform' : 'auto',
                    }}
                  />

                  {/* Simplified Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 h-full w-full" dir="rtl">
                  <div className="container mx-auto h-full px-4 sm:px-6 md:px-8">
                    <div className="flex flex-col justify-end h-full pb-24 sm:pb-28 md:pb-32 lg:pb-36 xl:pb-44 max-w-full sm:max-w-2xl lg:max-w-3xl">
                      {/* Badges Row - Optimized */}
                      <div className="flex items-center gap-2 mb-3 sm:mb-4 flex-wrap">
                        {/* Brand Badge */}
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/40 sm:bg-black/50 border border-white/20 sm:border-white/30 shrink-0">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500 animate-pulse"></div>
                          <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-white tracking-widest uppercase whitespace-nowrap">
                            {slide.brand}
                          </span>
                        </div>

                        {/* Product Badge */}
                        {slide.badge && (
                          <Badge className={getBadgeClass(slide.badge)}>
                            {slide.badge}
                          </Badge>
                        )}

                        {/* Discount Badge */}
                        {slide.discount && (
                          <Badge className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 border-0 shadow-lg flex items-center gap-1 shrink-0 whitespace-nowrap">
                            <Percent className="w-3 h-3" />
                            {slide.discount}٪ تخفیف
                          </Badge>
                        )}
                      </div>

                      {/* Main Title - Simplified Shadows */}
                      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[0.95] tracking-tighter drop-shadow-2xl">
                          {slide.model}
                        </h1>
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white font-medium tracking-wide drop-shadow-lg">
                          {slide.subtitle}
                        </p>
                      </div>

                      {/* Specs Grid - Reduced backdrop-blur */}
                      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-3 mb-4 sm:mb-6">
                        {slide.specs.map((spec, idx) => {
                          const Icon = spec.icon;
                          return (
                            <div
                              key={idx}
                              className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl bg-black/30 sm:bg-black/40 border border-white/20 hover:bg-black/40 sm:hover:bg-black/50 hover:border-white/30 transition-all"
                              style={{ willChange: 'auto' }}
                            >
                              <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-400 shrink-0" />
                              <span className="text-[10px] sm:text-xs md:text-sm font-medium text-white text-center sm:text-right leading-tight">
                                {spec.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Price & Stock & Buttons */}
                      <div className="flex flex-col gap-3 sm:gap-4">
                        {/* Price Row */}
                        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                          {/* Price Tag - Reduced backdrop blur */}
                          <div className="bg-black/40 sm:bg-black/50 border border-white/20 sm:border-white/30 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3">
                            {slide.originalPrice && (
                              <p className="text-[10px] sm:text-xs text-gray-400 line-through mb-0.5">
                                {slide.originalPrice} تومان
                              </p>
                            )}
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">
                              {slide.price}{" "}
                              <span className="text-xs sm:text-sm text-gray-300">
                                تومان
                              </span>
                            </p>
                          </div>

                          {/* Stock Status */}
                          <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-black/30 sm:bg-black/40 border border-white/20 rounded-xl sm:rounded-2xl">
                            <Package
                              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${
                                slide.stock.includes("موجود")
                                  ? "text-green-400"
                                  : "text-orange-400"
                              }`}
                            />
                            <span className="text-[10px] sm:text-xs md:text-sm font-medium text-white whitespace-nowrap">
                              {slide.stock}
                            </span>
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                          <Button
                            size="lg"
                            className="h-11 sm:h-12 md:h-13 px-4 sm:px-5 md:px-6 rounded-full text-xs sm:text-sm md:text-base font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] sm:hover:scale-105 transition-all duration-300 w-full xs:w-auto md:w-96 touch-target flex items-center justify-center gap-2 cursor-pointer"
                            style={{ willChange: 'transform' }}
                          >
                            <ShoppingCart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                            <span className="whitespace-nowrap">افزودن به سبد</span>
                          </Button>

                          <Button
                            variant="outline"
                            size="lg"
                            className="h-11 sm:h-12 md:h-13 px-4 sm:px-5 md:px-6 rounded-full text-xs sm:text-sm md:text-base font-semibold bg-black/20 sm:bg-black/30 border-white/30 text-white hover:bg-black/30 sm:hover:bg-black/40 hover:border-white/40 transition-all w-full md:w-96 xs:w-auto touch-target whitespace-nowrap cursor-pointer"
                          >
                            مشاهده جزئیات
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Controls */}
        <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-14 xl:bottom-16 left-1/2 -translate-x-1/2 z-30 w-auto" dir="rtl">
          {/* Mobile Navigation */}
          <div className="sm:hidden flex items-center gap-3 px-4 py-3 rounded-full bg-black/50 border border-white/20 shadow-2xl">
            <div className="flex gap-1.5">
              {sliderData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => api?.scrollTo(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    current === idx
                      ? "w-8 h-2.5 bg-gradient-to-r from-primary to-blue-600"
                      : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`اسلاید ${idx + 1}`}
                />
              ))}
            </div>
            <div className="w-px h-6 bg-white/20"></div>
            <div className="flex items-center gap-1 px-2">
              <span className="text-lg font-black text-white tabular-nums">
                {String(current + 1).padStart(2, "0")}
              </span>
              <span className="text-white/50 text-sm font-light">/</span>
              <span className="text-sm text-white/70 tabular-nums">
                {String(sliderData.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-4 md:gap-6 px-4 md:px-6 py-3 md:py-4 rounded-full bg-black/50 border border-white/20 shadow-2xl">
            <button
              onClick={() => api?.scrollPrev()}
              className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/10 hover:bg-primary border border-white/20 hover:border-primary text-white transition-all duration-300 hover:scale-110 flex items-center justify-center group touch-target"
              aria-label="اسلاید قبلی"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <div className="flex gap-2">
              {sliderData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => api?.scrollTo(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    current === idx
                      ? "w-10 md:w-12 h-2.5 md:h-3 bg-gradient-to-r from-primary to-blue-600"
                      : "w-2.5 md:w-3 h-2.5 md:h-3 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`اسلاید ${idx + 1}`}
                />
              ))}
            </div>

            <div className="w-px h-6 md:h-8 bg-white/20"></div>

            <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3">
              <span className="text-xl md:text-2xl font-black text-white tabular-nums">
                {String(current + 1).padStart(2, "0")}
              </span>
              <span className="text-white/50 text-base md:text-lg font-light">/</span>
              <span className="text-sm md:text-base text-white/70 tabular-nums">
                {String(sliderData.length).padStart(2, "0")}
              </span>
            </div>

            <div className="w-px h-6 md:h-8 bg-white/20"></div>

            <button
              onClick={() => api?.scrollNext()}
              className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/10 hover:bg-primary border border-white/20 hover:border-primary text-white transition-all duration-300 hover:scale-110 flex items-center justify-center group touch-target"
              aria-label="اسلاید بعدی"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar - Simplified */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-white/10 z-20 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-blue-600 transition-all duration-300 ease-out"
            style={{ 
              width: `${((current + 1) / sliderData.length) * 100}%`,
              willChange: 'width'
            }}
          />
        </div>
      </Carousel>

      {/* Wave Separator - Simplified */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-0 z-10">
        <svg
          className="relative block w-full h-10 sm:h-12 md:h-15 lg:h-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,48 C240,90 480,90 720,48 C960,6 1080,6 1200,48 L1200,120 L0,120 Z"
            fill="rgba(15, 23, 42, 0.95)"
          />
          <path
            d="M0,72 C240,36 480,36 720,72 C960,108 1080,108 1200,72 L1200,120 L0,120 Z"
            fill="rgba(15, 23, 42, 0.9)"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSlider;
