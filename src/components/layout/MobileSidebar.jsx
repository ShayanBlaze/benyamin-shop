import { X, Home, Store, FileText, LogIn, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { mobileCategoris } from "@/const";

export default function MobileSidebar({ onClose }) {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (index) =>
    setOpenCategory(openCategory === index ? null : index);

  return (
    <>
      {/* Menu Header */}
      <div className="p-4 pb-3 border-b bg-slate-800 border-gray-700/50">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-white">منو</h2>
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
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group hover:bg-white/5"
            >
              <Home className="h-5 w-5 text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="text-base font-medium text-gray-200 group-hover:text-white">
                خانه
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group hover:bg-white/5"
            >
              <Store className="h-5 w-5 text-green-400 group-hover:scale-110 transition-transform" />
              <span className="text-base font-medium text-gray-200 group-hover:text-white">
                فروشگاه
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group hover:bg-white/5"
            >
              <FileText className="h-5 w-5 text-purple-400 group-hover:scale-110 transition-transform" />
              <span className="text-base font-medium text-gray-200 group-hover:text-white">
                بلاگ
              </span>
            </a>
          </div>

          <Separator className="bg-gray-700/50" />

          {/* Categories Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider px-4 mb-3 text-gray-400">
              دسته‌بندی‌ها
            </h3>
            {mobileCategoris.map((cat, index) => (
              <div key={index} className="space-y-1">
                <button
                  onClick={() => toggleCategory(index)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all group hover:bg-white/5"
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
                    className={`w-4 h-4 transition-transform duration-300 text-gray-400 ${
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
                          className="block text-sm py-2 px-3 rounded-lg transition-all duration-200 text-gray-400 hover:text-blue-400 hover:bg-white/5"
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

      {/* Menu Footer */}
      <div className="p-4 border-t space-y-2 bg-slate-800 border-gray-700/50">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start gap-3 h-12 shadow-lg">
          <LogIn className="h-5 w-5" />
          <span>ورود / ثبت‌نام</span>
        </Button>
      </div>
    </>
  );
}
