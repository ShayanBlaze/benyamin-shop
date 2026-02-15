import { useRef, useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronRight, ChevronLeft, Zap, Shield, Award } from "lucide-react";

const sliderData = [
  {
    id: 1,
    brand: "Mercedes-Benz",
    model: "S-Class 2026",
    subtitle: "پیشرفته‌ترین فناوری جهان",
    price: "از ۱۲ میلیارد تومان",
    specs: [
      { icon: Zap, label: "۴۸۰ اسب بخار" },
      { icon: Shield, label: "سیستم خودران" },
      { icon: Award, label: "لوکس‌ترین کابین" },
    ],
    image:
      "https://cdn.motor1.com/images/mgl/vx0AxR/s1/mercedes-classe-s-2026.jpg",
    accentColor: "blue",
  },
  {
    id: 2,
    brand: "BMW",
    model: "M4 Competition",
    subtitle: "قلب تپنده پیست‌های مسابقه",
    price: "از ۸.۵ میلیارد تومان",
    specs: [
      { icon: Zap, label: "۵۰۳ اسب بخار" },
      { icon: Shield, label: "دیفرانسیل فعال" },
      { icon: Award, label: "۰ تا ۱۰۰: ۳.۵ ثانیه" },
    ],
    image:
      "https://wallpapers.com/images/hd/shiny-black-bmw-m4-car-f4nqi6xjpni7ls9r.jpg",
    accentColor: "orange",
  },
  {
    id: 3,
    brand: "Porsche",
    model: "911 GT3 RS",
    subtitle: "مهندسی بی‌نظیر آلمانی",
    price: "از ۱۵ میلیارد تومان",
    specs: [
      { icon: Zap, label: "۵۲۵ اسب بخار" },
      { icon: Shield, label: "سیستم DRS فعال" },
      { icon: Award, label: "بدنه کربن فایبر" },
    ],
    image:
      "https://images.ctfassets.net/s699s7kh1jys/252RSF4efvadqYtH1MF8BJ/e56224f0573ec1ec0d6bdf8003c8b2ed/Porche_911_GT3_RS_parked_on_racetrack_wallpaper_desktop_1.jpg",
    accentColor: "red",
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

  return (
    <section className="relative w-full bg-background" dir="ltr">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
          direction: "rtl",
        }}
        className="w-full"
      >
        <CarouselContent className="h-full ml-0">
          {sliderData.map((slide, index) => (
            <CarouselItem
              key={slide.id}
              className="relative w-full h-full pl-0"
            >
              {/* Background Image Container */}
              <div className="absolute inset-0 overflow-hidden rounded-lg">
                <img
                  src={slide.image}
                  alt={slide.model}
                  className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out
                    ${current === index ? "scale-100" : "scale-105"}`}
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-transparent" />
              </div>

              {/* Content Container */}
              <div className="relative z-10 h-full w-full m-20" dir="rtl">
                <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col justify-end h-full pb-24 md:pb-32 lg:pb-40 max-w-3xl">
                    {/* Brand Badge */}
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/30 w-fit mb-4
                                 animate-in slide-in-from-right-8 fade-in duration-500"
                    >
                      <div
                        className={`w-2 h-2 rounded-full bg-${slide.accentColor}-500 animate-pulse`}
                      ></div>
                      <span
                        className="text-xs md:text-sm font-semibold text-white tracking-widest uppercase"
                        style={{
                          textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                        }}
                      >
                        {slide.brand}
                      </span>
                    </div>

                    {/* Main Title */}
                    <div className="space-y-3 mb-6 animate-in slide-in-from-right-10 fade-in duration-700 delay-100">
                      <h1
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter"
                        style={{
                          textShadow: `
                            0 2px 12px rgba(0,0,0,0.8),
                            0 0 20px rgba(0,0,0,0.5),
                            1px 1px 0px rgba(0,0,0,0.4)
                          `,
                          WebkitTextStroke: "0.5px rgba(0,0,0,0.2)",
                        }}
                      >
                        {slide.model}
                      </h1>
                      <p
                        className="text-base sm:text-lg md:text-xl text-white font-medium tracking-wide"
                        style={{
                          textShadow: "0 2px 8px rgba(0,0,0,0.7)",
                        }}
                      >
                        {slide.subtitle}
                      </p>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 animate-in slide-in-from-right-10 fade-in duration-700 delay-200">
                      {slide.specs.map((spec, idx) => {
                        const Icon = spec.icon;
                        return (
                          <div
                            key={idx}
                            className="flex flex-col sm:flex-row items-center gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl 
                                       bg-black/40 backdrop-blur-md border border-white/25
                                       hover:bg-black/50 hover:border-white/35 transition-all"
                          >
                            <Icon
                              className={`w-5 h-5 sm:w-6 sm:h-6 text-${slide.accentColor}-400 shrink-0`}
                            />
                            <span
                              className="text-xs sm:text-sm font-medium text-white text-center sm:text-right leading-tight"
                              style={{
                                textShadow: "0 1px 6px rgba(0,0,0,0.6)",
                              }}
                            >
                              {spec.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Price & Buttons */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 animate-in slide-in-from-right-10 fade-in duration-700 delay-300">
                      {/* Price Tag */}
                      <div className="bg-black/50 backdrop-blur-md border border-white/30 rounded-2xl px-5 py-3">
                        <p
                          className="text-xs text-gray-200 mb-0.5"
                          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
                        >
                          قیمت شروع
                        </p>
                        <p
                          className="text-xl md:text-2xl font-bold text-white"
                          style={{ textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}
                        >
                          {slide.price}
                        </p>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex gap-3 flex-wrap">
                        <Button
                          size="lg"
                          className={`h-12 md:h-14 px-6 md:px-8 rounded-full text-sm md:text-base font-semibold
                                     bg-primary hover:bg-primary/90 text-white
                                     shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)]
                                     hover:scale-105 transition-all duration-300`}
                        >
                          مشاهده جزئیات
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className="h-12 md:h-14 px-6 md:px-8 rounded-full text-sm md:text-base font-semibold
                                   bg-black/30 backdrop-blur-md border-white/35 text-white 
                                   hover:bg-black/40 hover:border-white/50 transition-all"
                        >
                          رزرو تست‌درایو
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Modern Navigation Controls - REDESIGNED */}
        <div
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30"
          dir="rtl"
        >
          <div className="flex items-center gap-6 px-6 py-4 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 shadow-2xl">
            {/* Arrow Left */}
            <button
              onClick={() => api?.scrollPrev()}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-primary border border-white/20 hover:border-primary 
                         text-white transition-all duration-300 hover:scale-110 flex items-center justify-center group"
              aria-label="اسلاید قبلی"
            >
              <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* Pagination Dots */}
            <div className="flex gap-2">
              {sliderData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => api?.scrollTo(idx)}
                  className={`transition-all duration-500 rounded-full
                    ${
                      current === idx
                        ? "w-12 h-3 bg-linear-to-r from-primary to-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                        : "w-3 h-3 bg-white/40 hover:bg-white/70 hover:scale-125"
                    }`}
                  aria-label={`اسلاید ${idx + 1}`}
                />
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-white/20"></div>

            {/* Slide Counter */}
            <div className="flex items-center gap-2 px-3">
              <span
                className="text-2xl font-black text-white tabular-nums"
                style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
              >
                {String(current + 1).padStart(2, "0")}
              </span>
              <span className="text-white/50 text-lg font-light">/</span>
              <span
                className="text-base text-white/70 tabular-nums"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
              >
                {String(sliderData.length).padStart(2, "0")}
              </span>
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-white/20"></div>

            {/* Arrow Right */}
            <button
              onClick={() => api?.scrollNext()}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-primary border border-white/20 hover:border-primary 
                         text-white transition-all duration-300 hover:scale-110 flex items-center justify-center group"
              aria-label="اسلاید بعدی"
            >
              <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Animated Progress Bar at Bottom */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-white/10 via-white/5 to-white/10 z-20 overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-primary via-blue-500 to-primary shadow-[0_0_15px_rgba(59,130,246,0.8)] 
                       transition-all duration-500 ease-out relative"
            style={{ width: `${((current + 1) / sliderData.length) * 100}%` }}
          >
            {/* Animated Glow Effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
        </div>
      </Carousel>

      {/* Curved Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-0 z-10">
        <svg
          className="relative block w-full h-15 md:h-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(15, 23, 42, 0.95)" />
              <stop offset="100%" stopColor="rgba(15, 23, 42, 1)" />
            </linearGradient>
          </defs>
          <path
            d="M0,48 C240,90 480,90 720,48 C960,6 1080,6 1200,48 L1200,120 L0,120 Z"
            fill="url(#waveGradient)"
            className="animate-[wave_8s_ease-in-out_infinite]"
          />
          <path
            d="M0,72 C240,36 480,36 720,72 C960,108 1080,108 1200,72 L1200,120 L0,120 Z"
            fill="rgba(15, 23, 42, 0.8)"
            className="animate-[wave_10s_ease-in-out_infinite_reverse]"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSlider;
