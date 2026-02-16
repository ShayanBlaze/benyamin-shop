import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, Star, Rocket, Zap } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    title: "روغن موتور الف مدل Evolution 700 ST",
    image: "/images/oil-elf.png",
    price: "1,250,000",
    discount: 15,
    rating: 4.8,
    isExpress: true,
  },
  {
    id: 2,
    title: "لنت ترمز جلو تکستار مدل 206 تیپ 5",
    image: "/images/brake-pad.png",
    price: "980,000",
    discount: 10,
    rating: 4.5,
    isExpress: false,
  },
  {
    id: 3,
    title: "شمع خودرو بوش مدل ایریدیوم پایه کوتاه",
    image: "/images/spark-plug.png",
    price: "450,000",
    discount: 20,
    rating: 4.9,
    isExpress: true,
  },
  {
    id: 4,
    title: "فیلتر هوا سرکان مدل 206",
    image: "/images/air-filter.png",
    price: "120,000",
    discount: 5,
    rating: 4.2,
    isExpress: true,
  },
  {
    id: 5,
    title: "تسمه تایم پاورگریپ مدل 206 تیپ 5",
    image: "/images/belt.png",
    price: "850,000",
    discount: 12,
    rating: 4.7,
    isExpress: false,
  },
  {
    id: 6,
    title: "روغن ترمز فومن شیمی مدل DOT4",
    image: "/images/brake-fluid.png",
    price: "65,000",
    discount: 8,
    rating: 4.6,
    isExpress: true,
  },
];

export default function AmazingOffer() {
  const [api, setApi] = useState();
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(45);
  const [seconds, setSeconds] = useState(30);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect if user prefers reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Optimized countdown timer using requestAnimationFrame
  useEffect(() => {
    let rafId;
    let lastUpdate = Date.now();

    const updateTimer = () => {
      const now = Date.now();
      if (now - lastUpdate >= 1000) {
        lastUpdate = now;
        setSeconds((prev) => {
          if (prev === 0) {
            setMinutes((m) => {
              if (m === 0) {
                setHours((h) => (h === 0 ? 23 : h - 1));
                return 59;
              }
              return m - 1;
            });
            return 59;
          }
          return prev - 1;
        });
      }
      rafId = requestAnimationFrame(updateTimer);
    };

    rafId = requestAnimationFrame(updateTimer);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Memoize formatted time to prevent unnecessary re-renders
  const formattedTime = useMemo(() => ({
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  }), [hours, minutes, seconds]);

  return (
    <section className="container mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
      <div className="bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#2563eb] rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6 lg:flex-row lg:gap-8 items-stretch relative overflow-hidden shadow-2xl will-change-transform">
        {/* Simplified Background Decorations - Reduced blur for performance */}
        <div 
          className="absolute top-0 right-0 w-64 sm:w-80 h-64 sm:h-80 bg-blue-400/10 rounded-full blur-2xl pointer-events-none"
          style={{ transform: 'translate(50%, -50%)', willChange: 'transform' }}
        />
        <div 
          className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-indigo-600/10 rounded-full blur-xl pointer-events-none"
          style={{ transform: 'translate(-50%, 50%)', willChange: 'transform' }}
        />

        {/* Mobile: Horizontal Header */}
        <div className="lg:hidden flex items-center justify-between w-full z-10 pb-3 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg" style={{ transform: 'rotate(3deg)' }}>
              <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white drop-shadow-lg">
                پیشنهاد شگفت‌انگیز
              </h2>
              <p className="text-xs text-yellow-300 font-medium">تا پایان فرصت</p>
            </div>
          </div>

          {/* Timer - Compact */}
          <div className="flex items-center gap-1.5 direction-ltr">
            <div className="bg-white/95 text-blue-600 w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-sm sm:text-base shadow-md">
              {formattedTime.seconds}
            </div>
            <span className="text-white font-bold text-lg">:</span>
            <div className="bg-white/95 text-blue-600 w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-sm sm:text-base shadow-md">
              {formattedTime.minutes}
            </div>
            <span className="text-white font-bold text-lg">:</span>
            <div className="bg-white/95 text-blue-600 w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-sm sm:text-base shadow-md">
              {formattedTime.hours}
            </div>
          </div>
        </div>

        {/* Desktop: Vertical Sidebar */}
        <div className="hidden lg:flex lg:w-1/5 flex-col items-center justify-center text-center text-white shrink-0 z-10">
          <div className="mb-6 relative">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-xl transition-transform duration-300 hover:scale-105" style={{ transform: 'rotate(3deg)' }}>
              <Zap className="w-12 h-12 text-white" />
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold mb-2 drop-shadow-lg">
              پیشنهاد
              <br />
              <span className="text-yellow-300 inline-block mt-1">
                شگفت‌انگیز
              </span>
            </h2>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-2 mb-6 direction-ltr">
            <div className="bg-white/95 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg transition-transform duration-300 hover:scale-110">
              {formattedTime.seconds}
            </div>
            <span className="text-white font-bold text-2xl">:</span>
            <div className="bg-white/95 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg transition-transform duration-300 hover:scale-110">
              {formattedTime.minutes}
            </div>
            <span className="text-white font-bold text-2xl">:</span>
            <div className="bg-white/95 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg transition-transform duration-300 hover:scale-110">
              {formattedTime.hours}
            </div>
          </div>

          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 hover:text-white gap-2 group border border-white/30 hover:border-white/50 rounded-xl transition-all duration-300"
          >
            مشاهده همه
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </Button>
        </div>

        {/* Product Carousel */}
        <div className="w-full lg:w-4/5 relative group/carousel">
          <Carousel
            opts={{
              align: "start",
              loop: false,
              direction: "rtl",
              skipSnaps: false,
              dragFree: true,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-3">
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-2 md:pl-3 basis-[47%] xs:basis-2/5 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 h-full flex flex-col relative group hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden will-change-transform">
                    {/* Special Offer Badge - Removed animate-pulse for performance */}
                    <div className="absolute top-0 right-0 z-10">
                      <span className="bg-gradient-to-r from-orange-500 to-pink-600 text-white text-[9px] sm:text-[10px] px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-bl-lg sm:rounded-bl-xl rounded-tr-xl sm:rounded-tr-2xl font-bold shadow-lg flex items-center gap-0.5 sm:gap-1">
                        <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white" />
                        <span className="hidden xs:inline">شگفت‌انگیز</span>
                      </span>
                    </div>

                    {/* Image Area - Optimized hover effect */}
                    <div className="relative aspect-square mb-3 sm:mb-4 p-2 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-lg sm:rounded-xl overflow-hidden transition-shadow duration-300">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/200x200?text=Product";
                        }}
                      />
                      {product.isExpress && (
                        <div className="absolute bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-[10px] text-blue-600 bg-blue-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border border-blue-200 font-medium shadow-sm">
                          <Rocket className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          <span className="hidden xs:inline">ارسال امروز</span>
                        </div>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
                      <div>
                        <div className="flex items-center gap-1 mb-1.5 sm:mb-2">
                          <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-[10px] sm:text-xs text-gray-600 font-semibold">
                            {product.rating}
                          </span>
                        </div>
                        <h3 className="text-xs sm:text-sm text-gray-700 font-medium leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] group-hover:text-blue-600 transition-colors">
                          {product.title}
                        </h3>
                      </div>

                      <div className="flex items-end justify-between mt-auto pt-2 sm:pt-3 border-t border-gray-100">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                            <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-md font-bold shadow-sm">
                              {product.discount}%
                            </span>
                            <del className="text-[10px] sm:text-xs text-gray-400 decoration-gray-400">
                              {parseInt(product.price.replace(/,/g, "")) * 1.15 > 0
                                ? (parseInt(product.price.replace(/,/g, "")) * 1.15)
                                    .toFixed(0)
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                : ""}
                            </del>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-sm sm:text-base md:text-lg font-black text-blue-600">
                              {product.price}
                            </span>
                            <span className="text-[9px] sm:text-[10px] text-gray-500 font-medium">
                              تومان
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}

              {/* "See All" Card */}
              <CarouselItem className="pl-2 md:pl-3 basis-[47%] xs:basis-2/5 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 border-dashed rounded-xl sm:rounded-2xl h-full min-h-[280px] sm:min-h-[320px] flex flex-col items-center justify-center text-center p-4 sm:p-6 cursor-pointer hover:bg-white/20 hover:border-white/50 transition-all duration-300 group/see-all">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mb-2 sm:mb-3 group-hover/see-all:scale-110 transition-transform duration-300 shadow-lg">
                    <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <span className="text-white font-bold text-xs sm:text-sm drop-shadow-lg">
                    مشاهده همه
                  </span>
                  <span className="text-white/80 text-[10px] sm:text-xs mt-1">
                    شگفت‌انگیزها
                  </span>
                </div>
              </CarouselItem>
            </CarouselContent>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-6 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity hidden md:flex">
              <Button
                variant="secondary"
                size="icon"
                className="h-10 w-10 rounded-full shadow-xl bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:scale-110"
                onClick={() => api?.scrollPrev()}
              >
                <ChevronRight className="h-5 w-5 text-blue-600" />
              </Button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-6 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity hidden md:flex">
              <Button
                variant="secondary"
                size="icon"
                className="h-10 w-10 rounded-full shadow-xl bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:scale-110"
                onClick={() => api?.scrollNext()}
              >
                <ChevronLeft className="h-5 w-5 text-blue-600" />
              </Button>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
