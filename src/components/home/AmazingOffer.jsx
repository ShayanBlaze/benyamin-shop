import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Rocket } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: 1,
    title: "روغن موتور الف مدل Evolution 700 ST",
    image: "/images/oil-elf.png", // Placeholder path
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
  const carouselRef = useRef(null);

  return (
    <section className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
      <div className="bg-[#EF394E] rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        {/* Right Side: Title & Timer */}
        <div className="lg:w-1/5 flex flex-col items-center justify-center text-center text-white shrink-0 z-10">
          <div className="mb-6">
            <img
              src="/images/amazing-box.png" // Placeholder
              alt="Amazing Offer"
              className="w-24 h-24 object-contain mb-4 hidden lg:block mx-auto opacity-90 drop-shadow-xl"
            />
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">
              پیشنهاد
              <br className="hidden lg:block" />
              <span className="text-white inline-block mt-1">شگفت‌انگیز</span>
            </h2>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-2 mb-6 direction-ltr">
            <div className="bg-white text-[#EF394E] w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shadow-sm">
              12
            </div>
            <span className="text-white font-bold text-xl">:</span>
            <div className="bg-white text-[#EF394E] w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shadow-sm">
              45
            </div>
            <span className="text-white font-bold text-xl">:</span>
            <div className="bg-white text-[#EF394E] w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shadow-sm">
              30
            </div>
          </div>

          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 hover:text-white gap-2 group"
          >
            مشاهده همه
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </Button>

          <img
             src="/images/amazing-typo.svg" 
             alt="" 
             className="absolute bottom-4 right-4 w-32 opacity-10 pointer-events-none"
          />
        </div>

        {/* Left Side: Product Carousel */}
        <div className="lg:w-4/5 w-full relative group/carousel">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              direction: "rtl",
            }}
            className="w-full"
            ref={carouselRef}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/4"
                >
                  <div className="bg-white rounded-2xl p-4 h-full flex flex-col relative group hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden">
                    {/* Special Offer Badge */}
                    <div className="absolute top-0 right-0 z-10">
                        <span className="bg-[#EF394E] text-white text-[10px] px-2 py-1 rounded-bl-xl rounded-tr-md font-medium shadow-sm">
                            شگفت‌انگیز
                        </span>
                    </div>

                    {/* Image Area */}
                    <div className="relative aspect-square mb-4 p-2 bg-gray-50 rounded-xl overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            e.target.src = "https://placehold.co/200x200?text=Product";
                        }}
                      />
                      {product.isExpress && (
                        <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full border border-blue-100">
                          <Rocket className="w-3 h-3" />
                          <span>ارسال امروز</span>
                        </div>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 flex flex-col justify-between space-y-3">
                        <div>
                             {/* Rating */}
                            <div className="flex items-center gap-1 mb-2">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                <span className="text-xs text-gray-500 font-medium">{product.rating}</span>
                            </div>
                            <h3 className="text-sm text-gray-700 font-medium leading-snug line-clamp-2 min-h-[2.5rem]">
                                {product.title}
                            </h3>
                        </div>

                      {/* Price Section */}
                      <div className="flex items-end justify-between mt-auto pt-2 border-t border-gray-100">
                         <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="bg-[#EF394E] text-white text-[10px] px-1.5 rounded-md font-bold">
                                    {product.discount}%
                                </span>
                                <del className="text-xs text-gray-400 decoration-gray-400">
                                    {/* Calculated original price purely for visual demo, assuming 'price' is discounted */}
                                    {parseInt(product.price.replace(/,/g, '')) * 1.15 > 0 ? (parseInt(product.price.replace(/,/g, '')) * 1.15).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
                                </del>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-base font-bold text-gray-800">
                                {product.price}
                                </span>
                                <span className="text-[10px] text-gray-500">تومان</span>
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
              
              {/* "See All" Card as last item */}
               <CarouselItem className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/4">
                  <div className="bg-white/10 border-2 border-white/20 border-dashed rounded-2xl h-full flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:bg-white/20 transition-all group/see-all">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3 group-hover/see-all:scale-110 transition-transform">
                             <ChevronLeft className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-white font-medium">مشاهده همه شگفت‌انگیزها</span>
                  </div>
               </CarouselItem>

            </CarouselContent>
            
            {/* Custom Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-6 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity hidden sm:flex">
               <Button 
                variant="secondary" 
                size="icon" 
                className="h-9 w-9 rounded-full shadow-lg bg-white hover:bg-gray-100 border border-gray-200"
                onClick={() => carouselRef.current?.prev()}
               >
                 <ChevronRight className="h-4 w-4 text-gray-700" />
               </Button>
            </div>
             <div className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-6 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity hidden sm:flex">
               <Button 
                variant="secondary" 
                size="icon" 
                className="h-9 w-9 rounded-full shadow-lg bg-white hover:bg-gray-100 border border-gray-200"
                 onClick={() => carouselRef.current?.next()}
               >
                 <ChevronLeft className="h-4 w-4 text-gray-700" />
               </Button>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
