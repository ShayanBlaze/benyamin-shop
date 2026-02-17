import {
  X,
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
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme"; // ✅ اضافه کردن این خط

// ✅ حذف isDark و onToggleDark از props
export default function MobileSidebar({ onClose }) {
  const [openCategory, setOpenCategory] = useState(null);
  const { isDark, toggleTheme } = useTheme(); // ✅ اضافه کردن این خط

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
      <div
        className={`
        p-4 pb-3 border-b
        ${
          isDark
            ? "bg-slate-800 border-gray-700/50"
            : "bg-white border-slate-200"
        }
      `}
      >
        <div className="flex items-center justify-between mb-2">
          <h2
            className={`
            text-xl font-bold
            ${isDark ? "text-white" : "text-slate-900"}
          `}
          >
            منوی اصلی
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className={`
              h-8 w-8 rounded-lg
              ${
                isDark
                  ? "hover:bg-white/10 text-gray-400 hover:text-white"
                  : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
              }
            `}
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
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group
                ${isDark ? "hover:bg-white/5" : "hover:bg-slate-100"}
              `}
            >
              <Home className="h-5 w-5 text-blue-400 group-hover:scale-110 transition-transform" />
              <span
                className={`
                text-base font-medium
                ${
                  isDark
                    ? "text-gray-200 group-hover:text-white"
                    : "text-slate-700 group-hover:text-slate-900"
                }
              `}
              >
                صفحه اصلی
              </span>
            </a>
            <a
              href="#"
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group
                ${isDark ? "hover:bg-white/5" : "hover:bg-slate-100"}
              `}
            >
              <Store className="h-5 w-5 text-green-400 group-hover:scale-110 transition-transform" />
              <span
                className={`
                text-base font-medium
                ${
                  isDark
                    ? "text-gray-200 group-hover:text-white"
                    : "text-slate-700 group-hover:text-slate-900"
                }
              `}
              >
                فروشگاه
              </span>
            </a>
            <a
              href="#"
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group
                ${isDark ? "hover:bg-white/5" : "hover:bg-slate-100"}
              `}
            >
              <FileText className="h-5 w-5 text-purple-400 group-hover:scale-110 transition-transform" />
              <span
                className={`
                text-base font-medium
                ${
                  isDark
                    ? "text-gray-200 group-hover:text-white"
                    : "text-slate-700 group-hover:text-slate-900"
                }
              `}
              >
                وبلاگ
              </span>
            </a>
          </div>

          <Separator className={isDark ? "bg-gray-700/50" : "bg-slate-200"} />

          {/* Categories Section */}
          <div className="space-y-2">
            <h3
              className={`
              text-xs font-semibold uppercase tracking-wider px-4 mb-3
              ${isDark ? "text-gray-400" : "text-slate-500"}
            `}
            >
              دسته بندی محصولات
            </h3>
            {carCategories.map((cat, index) => (
              <div key={index} className="space-y-1">
                <button
                  onClick={() => toggleCategory(index)}
                  className={`
                    flex items-center justify-between w-full px-4 py-3 
                    rounded-xl transition-all group
                    ${isDark ? "hover:bg-white/5" : "hover:bg-slate-100"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`${cat.bgColor} p-2 rounded-lg group-hover:scale-110 transition-transform`}
                    >
                      <span className={cat.color}>{cat.icon}</span>
                    </span>
                    <span
                      className={`
                      text-sm font-medium
                      ${
                        isDark
                          ? "text-gray-200 group-hover:text-white"
                          : "text-slate-700 group-hover:text-slate-900"
                      }
                    `}
                    >
                      {cat.title}
                    </span>
                  </div>
                  <ChevronDown
                    className={`
                      w-4 h-4 transition-transform duration-300
                      ${isDark ? "text-gray-400" : "text-slate-400"}
                      ${openCategory === index ? "rotate-180" : ""}
                    `}
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
                          className={`
                            block text-sm py-2 px-3 rounded-lg transition-all duration-200
                            ${
                              isDark
                                ? "text-gray-400 hover:text-blue-400 hover:bg-white/5"
                                : "text-slate-600 hover:text-blue-600 hover:bg-slate-100"
                            }
                          `}
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
      <div
        className={`
        p-4 border-t space-y-2
        ${
          isDark
            ? "bg-slate-800 border-gray-700/50"
            : "bg-white border-slate-200"
        }
      `}
      >
        <Button
          variant="outline"
          onClick={toggleTheme} // ✅ تغییر از onToggleDark
          className={`
            w-full justify-start gap-3 h-12
            ${
              isDark
                ? "bg-transparent border-gray-600 hover:bg-white/10 hover:border-blue-400 text-white"
                : "bg-white border-slate-300 hover:bg-slate-50 hover:border-blue-500 text-slate-900"
            }
          `}
        >
          {isDark ? (
            <>
              <Sun className="h-5 w-5 text-yellow-400" />
              <span>حالت روز</span>
            </>
          ) : (
            <>
              <Moon className="h-5 w-5 text-blue-500" />
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
