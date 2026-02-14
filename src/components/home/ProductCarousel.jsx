import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export default function ProductCarousel({ title, products }) {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <a href="#" className="text-blue-500 hover:underline text-sm">
          مشاهده همه ←
        </a>
      </div>

      <Carousel
        opts={{
          align: "start",
          direction: "rtl",
        }}
        className="w-full"
      >
        <CarouselContent className="-mr-2 md:-mr-4">
          {products.map((product, index) => (
            <CarouselItem
              key={index}
              className="pr-2 md:pr-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <Card className="bg-slate-800/50 border-slate-700 overflow-hidden group hover:border-blue-500 transition-all">
                <CardContent className="p-4">
                  {/* Product Image */}
                  <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-slate-900">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="object-contain w-full h-full group-hover:scale-105 transition-transform"
                    />
                    {product.discount && (
                      <Badge className="absolute top-2 left-2 bg-blue-600">
                        {product.discount}% تخفیف
                      </Badge>
                    )}
                  </div>

                  {/* Product Info */}
                  <h3 className="text-sm font-medium mb-2 line-clamp-2 h-10">
                    {product.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-xs text-slate-400">
                      {product.rating}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-500 line-through block">
                          {product.originalPrice.toLocaleString("fa-IR")} تومان
                        </span>
                      )}
                      <span className="text-lg font-bold text-blue-500">
                        {product.price.toLocaleString("fa-IR")} تومان
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="right-0" />
        <CarouselNext className="left-0" />
      </Carousel>
    </section>
  );
}
