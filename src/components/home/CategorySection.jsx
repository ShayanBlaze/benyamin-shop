import BrandCard from "./BrandCard";
import { Car, Wrench, ArrowLeft } from "lucide-react";

const brandsData = [
  {
    id: 1,
    name: "بوش",
    description: "قطعات و سیستم‌های الکتریکی خودرو",
    image: "https://logos-world.net/wp-content/uploads/2020/08/Bosch-Logo.png",
    productCount: 450,
    gradient: "from-slate-800/50 via-slate-900/50 to-slate-800/60",
    featured: true,
  },
  {
    id: 2,
    name: "دنسو",
    description: "سیستم‌های تهویه و برودتی",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Denso_logo.svg/330px-Denso_logo.svg.png?20091102194349",
    productCount: 320,
    gradient: "from-blue-950/30 via-slate-900/50 to-slate-800/50",
    featured: false,
  },
  {
    id: 3,
    name: "برمبو",
    description: "سیستم‌های ترمز و لنت",
    image:
      "https://upload.wikimedia.org/wikipedia/de/thumb/7/72/Brembo-logo.svg/3840px-Brembo-logo.svg.png",
    productCount: 285,
    gradient: "from-red-950/30 via-slate-900/50 to-slate-800/50",
    featured: true,
  },
  {
    id: 4,
    name: "مگنتی مارلی",
    description: "قطعات موتور و سیستم سوخت",
    image:
      "https://logoeps.com/wp-content/uploads/2012/10/magneti-marelli-vector-logo.png",
    productCount: 510,
    gradient: "from-slate-800/50 via-slate-900/50 to-blue-950/30",
    featured: false,
  },
  {
    id: 5,
    name: "زی‌اف",
    description: "گیربکس و سیستم انتقال قدرت",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/94/ZF_logo_STD_Blue_3CC.svg",
    productCount: 195,
    gradient: "from-slate-900/50 via-slate-800/50 to-slate-900/60",
    featured: false,
  },
  {
    id: 6,
    name: "کاسترول",
    description: "روغن موتور و مکمل‌های خودرو",
    image: "https://etimg.etb2bimg.com/photo/98300892.cms",
    productCount: 380,
    gradient: "from-green-950/30 via-slate-900/50 to-slate-800/50",
    featured: false,
  },
  {
    id: 7,
    name: "NGK",
    description: "شمع و سیستم احتراق",
    image:
      "https://icon2.cleanpng.com/20181124/rcw/kisspng-ngk-spark-plug-logo-2-18-bmw-i3-ignition-coil-tdu2-car-mods-and-texmod-tutorial-test-drive-unl-1713918798837.webp",
    productCount: 240,
    gradient: "from-slate-800/50 via-slate-900/50 to-slate-800/60",
    featured: false,
  },
  {
    id: 8,
    name: "بیلشتاین",
    description: "سیستم تعلیق و کمک فنر",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e6/BILSTEIN_Logo.png",
    productCount: 175,
    gradient: "from-yellow-950/30 via-slate-900/50 to-slate-800/50",
    featured: false,
  },
  {
    id: 9,
    name: "والئو",
    description: "سیستم‌های روشنایی و برق",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Valeo_Logo.svg",
    productCount: 295,
    gradient: "from-slate-800/50 via-slate-900/50 to-slate-800/60",
    featured: false,
  },
];

const gridLayout = [
  { brand: brandsData[1], variant: "default" },
  { brand: brandsData[0], variant: "hero" },
  { brand: brandsData[2], variant: "tall" },
  { brand: brandsData[3], variant: "default" },
  { brand: brandsData[4], variant: "default" },
  { brand: brandsData[5], variant: "default" },
  { brand: brandsData[6], variant: "default" },
  { brand: brandsData[8], variant: "default" },
  { brand: brandsData[7], variant: "wide" },
];

export default function CategorySection() {
  return (
    <section className="py-12 md:py-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-linear-to-br from-primary/20 to-primary/5 rounded-xl">
              <Car className="w-6 h-6 text-primary" />
            </div>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
              محصولات اصل
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            برندهای برتر قطعات
          </h2>
          <p className="text-sm md:text-base text-slate-400 flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            با گارانتی معتبر و قیمت مناسب
          </p>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-primary/50 rounded-xl text-sm font-medium text-foreground transition-all duration-300 group hover:shadow-lg hover:shadow-primary/5"
        >
          <span>همه برندها</span>
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Desktop: Bento Grid - gridLayout */}
      <div className="hidden lg:grid lg:grid-cols-4 auto-rows-[160px] gap-5">
        {gridLayout.map((item, index) => (
          <BrandCard
            key={item.brand.id}
            brand={item.brand}
            index={index}
            variant={item.variant}
          />
        ))}
      </div>

      {/* Tablet: Grid 3 */}
      <div className="hidden md:grid lg:hidden md:grid-cols-3 gap-4">
        {brandsData.slice(0, 6).map((brand, index) => (
          <BrandCard
            key={brand.id}
            brand={brand}
            index={index}
            variant="default"
          />
        ))}
      </div>

      {/* Mobile: Grid 2 */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {brandsData.slice(0, 6).map((brand, index) => (
          <BrandCard
            key={brand.id}
            brand={brand}
            index={index}
            variant="default"
          />
        ))}
      </div>

      {/* View More Button */}
      <div className="mt-6 text-center lg:hidden">
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 border border-slate-700 hover:border-primary/50 rounded-xl text-sm text-foreground transition-all duration-300">
          <span>مشاهده بیشتر</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
