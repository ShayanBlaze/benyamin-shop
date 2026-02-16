import { useRef, useState, useEffect, useMemo, memo } from "react";
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

// Memoized spec item to prevent unnecessary re-renders
const SpecItem = memo(({ Icon, label }) => (
  <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl bg-black/40 border border-white/20 transition-colors duration-200">
    <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-400 shrink-0" />
    <span className="text-[10px] sm:text-xs md:text-sm font-medium text-white text-center sm:text-right leading-tight">
      {label}
    </span>
  </div>
));

SpecItem.displayName = 'SpecItem';

const HeroSlider = () => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  // Optimized autoplay for smoother transitions
  const plugin = useRef(
    Autoplay({ 
      delay: 5000, 
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => {
      api.off("select");
    };
  }, [api]);

  // Memoize badge class
  const getBadgeClass = useMemo(() => {
    return (badge) => {
      const baseClass =
        "text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 border-0 shadow-md shrink-0 whitespace-nowrap";
      if (badge === "پرفروش")
        return `${baseClass} bg-orange-500`;
      if (badge === "جدید")
        return `${baseClass} bg-green-500`;
      if (badge === "پیشنهاد ویژه")
        return `${baseClass} bg-red-500`;
      return baseClass;
    };
  }, []);

  return (
    <section
      className="relative w-full bg-background overflow-hidden rounded-2xl"
      dir="ltr"
      style={{
        contain: 'layout style paint',
        contentVisibility: 'auto',
      }}
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
          // Performance optimizations
          inViewThreshold: 0.7,
        }}
        className="w-full"
      >
        <CarouselContent 
          className="h-full ml-0" 
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
        >
          {sliderData.map((slide, index) => (
            <CarouselItem 
              key={slide.id} 
              className="relative w-full pl-0"
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
              }}
            >
              <div 
                className="relative w-full h-125 sm:h-150 md:h-162.5 lg:h-175 xl:h-187.5"
                style={{
                  contain: 'layout style paint',
                }}
              >
                {/* Background Image - Using CSS background for better performance */}
                <div className="absolute inset-0 overflow-hidden rounded-none sm:rounded-lg md:rounded-xl lg:rounded-2xl">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url(${slide.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transform: 'translateZ(0) scale(1)',
                      willChange: 'auto',
                    }}
                  />

                  {/* Static gradient overlays */}
                  <div 
                    className="absolute inset-0" 
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, transparent 70%)",
                      pointerEvents: 'none',
                    }}
                  />
                  <div 
                    className="absolute inset-0" 
                    style={{
                      background:
                        "linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 40%)",
                      pointerEvents: 'none',
                    }}
                  />
                </div>

                {/* Content Container */}
                <div className="relative z-10 h-full w-full" dir="rtl">
                  <div className="container mx-auto h-full px-4 sm:px-6 md:px-8">
                    <div className="flex flex-col justify-end h-full pb-24 sm:pb-28 md:pb-32 lg:pb-36 xl:pb-44 max-w-full sm:max-w-2xl lg:max-w-3xl">
                      {/* Badges Row */}
                      <div className="flex items-center gap-2 mb-3 sm:mb-4 flex-wrap">
                        {/* Brand Badge */}
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/50 border border-white/20 shrink-0">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500"></div>
                          <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-white tracking-widest uppercase whitespace-nowrap">
                            {slide.brand}
                          </span>
                        </div>

                        {slide.badge && (
                          <Badge className={getBadgeClass(slide.badge)}>
                            {slide.badge}
                          </Badge>
                        )}

                        {slide.discount && (
                          <Badge className="bg-gradient-to-r from-pink-500 to-rose-600 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 border-0 shadow-md flex items-center gap-1 shrink-0 whitespace-nowrap">
                            <Percent className="w-3 h-3" />
                            {slide.discount}٪ تخفیف
                          </Badge>
                        )}
                      </div>

                      {/* Main Title - Simplified shadows */}
                      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                        <h1 
                          className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[0.95] tracking-tighter"
                          style={{ textShadow: '0 4px 12px rgba(0,0,0,0.8)' }}
                        >
                          {slide.model}
                        </h1>
                        <p 
                          className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white font-medium tracking-wide"
                          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
                        >
                          {slide.subtitle}
                        </p>
                      </div>

                      {/* Specs Grid - Using memoized component */}
                      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-3 mb-4 sm:mb-6">
                        {slide.specs.map((spec, idx) => (
                          <SpecItem key={idx} Icon={spec.icon} label={spec.label} />
                        ))}
                      </div>

                      {/* Price & Stock & Buttons */}
                      <div className="flex flex-col gap-3 sm:gap-4">
                        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                          {/* Price Tag */}
                          <div className="bg-black/50 border border-white/20 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3">
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
                          <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-black/40 border border-white/20 rounded-xl sm:rounded-2xl">
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

                        {/* Buttons - Active scale instead of hover for mobile */}
                        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                          <Button
                            size="lg"
                            className="h-11 sm:h-12 md:h-13 px-4 sm:px-5 md:px-6 rounded-full text-xs sm:text-sm md:text-base font-semibold bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg w-full xs:w-auto md:w-96 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform duration-150"
                          >
                            <ShoppingCart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                            <span className="whitespace-nowrap">
                              افزودن به سبد
                            </span>
                          </Button>

                          <Button
                            variant="outline"
                            size="lg"
                            className="h-11 sm:h-12 md:h-13 px-4 sm:px-5 md:px-6 rounded-full text-xs sm:text-sm md:text-base font-semibold bg-black/30 border-white/30 text-white w-full md:w-96 xs:w-auto whitespace-nowrap cursor-pointer active:scale-95 transition-transform duration-150"
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
        <div
          className="absolute bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-14 xl:bottom-16 left-1/2 -translate-x-1/2 z-30 w-auto"
          dir="rtl"
        >
          {/* Mobile Navigation */}
          <div 
            className="sm:hidden flex items-center gap-3 px-4 py-3 rounded-full bg-black/60 border border-white/20 shadow-xl"
            style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
          >
            <div className="flex gap-1.5">
              {sliderData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => api?.scrollTo(idx)}
                  className={`transition-all duration-200 rounded-full ${
                    current === idx
                      ? "w-8 h-2.5 bg-gradient-to-r from-primary to-blue-600"
                      : "w-2.5 h-2.5 bg-white/40"
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
          <div 
            className="hidden sm:flex items-center gap-4 md:gap-6 px-4 md:px-6 py-3 md:py-4 rounded-full bg-black/60 border border-white/20 shadow-xl"
            style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          >
            <button
              onClick={() => api?.scrollPrev()}
              className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/10 hover:bg-primary border border-white/20 hover:border-primary text-white transition-colors duration-200 flex items-center justify-center group"
              aria-label="اسلاید قبلی"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <div className="flex gap-2">
              {sliderData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => api?.scrollTo(idx)}
                  className={`transition-all duration-200 rounded-full ${
                    current === idx
                      ? "w-10 md:w-12 h-2.5 md:h-3 bg-gradient-to-r from-primary to-blue-600"
                      : "w-2.5 md:w-3 h-2.5 md:h-3 bg-white/40 hover:bg-white/60"
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
              <span className="text-white/50 text-base md:text-lg font-light">
                /
              </span>
              <span className="text-sm md:text-base text-white/70 tabular-nums">
                {String(sliderData.length).padStart(2, "0")}
              </span>
            </div>

            <div className="w-px h-6 md:h-8 bg-white/20"></div>

            <button
              onClick={() => api?.scrollNext()}
              className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/10 hover:bg-primary border border-white/20 hover:border-primary text-white transition-colors duration-200 flex items-center justify-center group"
              aria-label="اسلاید بعدی"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-white/10 z-20 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-blue-600 transition-all duration-300 ease-linear"
            style={{
              width: `${((current + 1) / sliderData.length) * 100}%`,
              transform: 'translateZ(0)',
            }}
          />
        </div>
      </Carousel>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-0 z-10 pointer-events-none">
        <svg
          className="relative block w-full h-10 sm:h-12 md:h-15 lg:h-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ transform: 'translateZ(0)' }}
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
