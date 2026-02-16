import {
  X,
  Search,
  Home,
  Store,
  FileText,
  Sun,
  Moon,
  LogIn,
  ChevronDown,
  SprayCan,
  Wrench,
  Battery,
  Disc,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function MobileSidebar({ onClose, isDark, onToggleDark }) {
  const [openCategory, setOpenCategory] = useState(null);

  const carCategories = [
    {
      title: "لوازم مصرفی",
      icon: <SprayCan className="w-5 h-5" />,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      items: [
        "روغن موتور",
        "فیلتر روغن و هوا",
        "لنت ترمز",
        "شمع و وایر",
        "ضدیخ و آب رادیاتور",
      ],
    },
    {
      title: "قطعات یدکی",
      icon: <Wrench className="w-5 h-5" />,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      items: ["دیسک و صفحه", "تسمه تایم", "واتر پمپ", "کمک فنر", "بلبرینگ چرخ"],
    },
    {
      title: "برق و انژکتور",
      icon: <Battery className="w-5 h-5" />,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      items: [
        "باتری خودرو",
        "دینام و استارت",
        "سنسور اکسیژن",
        "کوئل",
        "فیوز و رله",
      ],
    },
    {
      title: "تزئینات و سیستم",
      icon: <Disc className="w-5 h-5" />,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      items: [
        "کفپوش سه بعدی",
        "روکش صندلی",
        "ضبط و باند",
        "هدلایت و زنون",
        "خوشبو کننده",
      ],
    },
  ];

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  return (
    <>
      {/* Menu Header */}

      <div className="p-4 pb-3 bg-[#1a2332] border-b border-gray-700/50">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-white">منوی اصلی</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Menu Content - Scrollable */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <nav className="p-4 space-y-2">
          {/* Quick Links */}
          <div className="space-y-1 mb-4">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
            >
              <Home className="h-5 w-5 text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="text-base font-medium text-gray-200 group-hover:text-white">
                صفحه اصلی
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
            >
              <Store className="h-5 w-5 text-green-400 group-hover:scale-110 transition-transform" />
              <span className="text-base font-medium text-gray-200 group-hover:text-white">
                فروشگاه
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
            >
              <FileText className="h-5 w-5 text-purple-400 group-hover:scale-110 transition-transform" />
              <span className="text-base font-medium text-gray-200 group-hover:text-white">
                وبلاگ
              </span>
            </a>
          </div>

          <Separator className="bg-gray-700/50 my-4" />

          {/* Categories Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-3">
              دسته بندی محصولات
            </h3>
            {carCategories.map((cat, index) => (
              <div key={index} className="space-y-1">
                <button
                  onClick={() => toggleCategory(index)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`${cat.bgColor} p-2 rounded-lg group-hover:scale-110 transition-transform`}
                    >
                      <span className={cat.color}>{cat.icon}</span>
                    </span>
                    <span className="text-sm font-medium text-gray-200 group-hover:text-white">
                      {cat.title}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                      openCategory === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Collapsible Items */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    openCategory === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <ul className="pr-12 pl-4 py-2 space-y-1">
                    {cat.items.map((item, idx) => (
                      <li key={idx}>
                        <a
                          href="#"
                          className="block text-sm text-gray-400 hover:text-blue-400 py-2 px-3 rounded-lg hover:bg-white/5 transition-all duration-200"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* Menu Footer - Fixed at Bottom */}
      <div className="p-4 bg-[#1a2332] border-t border-gray-700/50 space-y-2">
        <Button
          variant="outline"
          onClick={onToggleDark}
          className="w-full bg-transparent border border-gray-600 hover:bg-white/10 hover:border-blue-400 text-white justify-start gap-3 h-12"
        >
          {isDark ? (
            <>
              <Sun className="h-5 w-5 text-yellow-400" />
              <span>حالت روز</span>
            </>
          ) : (
            <>
              <Moon className="h-5 w-5 text-blue-300" />
              <span>حالت شب</span>
            </>
          )}
        </Button>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start gap-3 h-12 shadow-lg">
          <LogIn className="h-5 w-5" />
          <span>ورود / ثبت نام</span>
        </Button>
      </div>
    </>
  );
}
