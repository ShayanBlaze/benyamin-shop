import {
  ShoppingCart,
  User,
  Search,
  Menu,
  MapPin,
  Sun,
  Moon,
  ChevronDown,
  History,
  TrendingUp,
  X,
  SprayCan,
  Wrench,
  Battery,
  Disc,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";
import React from "react";

export default function Header() {
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Hardcoded Data
  const recentSearches = ["لنت ترمز پراید", "روغن موتور کاسترول", "شمع NGK"];

  const popularSearches = ["کفپوش سه بعدی", "هدلایت", "مکمل سوخت", "تسمه تایم"];

  const carCategories = [
    {
      title: "لوازم مصرفی",
      icon: <SprayCan className="w-5 h-5 text-blue-400" />,
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
      icon: <Wrench className="w-5 h-5 text-orange-400" />,
      items: ["دیسک و صفحه", "تسمه تایم", "واتر پمپ", "کمک فنر", "بلبرینگ چرخ"],
    },
    {
      title: "برق و انژکتور",
      icon: <Battery className="w-5 h-5 text-yellow-400" />,
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
      icon: <Disc className="w-5 h-5 text-purple-400" />,
      items: [
        "کفپوش سه بعدی",
        "روکش صندلی",
        "ضبط و باند",
        "هدلایت و زنون",
        "خوشبو کننده",
      ],
    },
  ];

  return (
    <>
      {/* Search Overlay/Backdrop */}
      {isSearchFocused && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300" />
      )}

      <header className="text-white relative z-50 mt-10">
        {/* Top Section */}
        <div className="container mx-auto px-4 lg:px-8 py-4 lg:py-5 relative z-50">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden hover:bg-white/10 rounded-xl transition-all duration-300"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-[#1f2a38] text-white border-gray-700"
              >
                <nav className="flex flex-col gap-6 mt-8">
                  <a
                    href="#"
                    className="text-lg hover:text-blue-400 transition-colors duration-300"
                  >
                    صفحه اصلی
                  </a>
                  <a
                    href="#"
                    className="text-lg hover:text-blue-400 transition-colors duration-300"
                  >
                    دسته بندی ها
                  </a>
                  <a
                    href="#"
                    className="text-lg hover:text-blue-400 transition-colors duration-300"
                  >
                    فروشگاه
                  </a>
                  <a
                    href="#"
                    className="text-lg hover:text-blue-400 transition-colors duration-300"
                  >
                    وبلاگ
                  </a>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Right: Search Area */}
            <div
              ref={searchContainerRef}
              className={`relative flex-1 lg:flex-none transition-all duration-300 order-2 lg:order-1 ${isSearchFocused ? "lg:w-[500px] z-50" : "lg:w-96"}`}
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder="جستجو در بنیامین شاپ..."
                  onFocus={() => setIsSearchFocused(true)}
                  className={`bg-[#2d3c4f] border-0 text-white placeholder:text-gray-400 pr-12 pl-4 h-12 lg:h-14 text-base lg:text-lg rounded-2xl shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 transition-all duration-300 ${isSearchFocused ? "rounded-b-none shadow-none bg-[#1f2a38]" : ""}`}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute left-2 top-1/2 -translate-y-1/2 hover:bg-blue-500/20 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  <Search className="h-5 w-5 lg:h-6 lg:w-6 text-blue-400" />
                </Button>

                {/* Search Dropdown Panel */}
                {isSearchFocused && (
                  <div className="absolute top-full right-0 left-0 bg-[#1f2a38] rounded-b-2xl border-t border-gray-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-4">
                      {/* Recent Searches */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2 px-2">
                          <span className="text-sm text-gray-400 flex items-center gap-2">
                            <History className="w-4 h-4" /> جستجوهای اخیر
                          </span>
                          <button className="text-xs text-blue-400 hover:text-blue-300">
                            پاک کردن
                          </button>
                        </div>
                        <ul className="space-y-1">
                          {recentSearches.map((item, idx) => (
                            <li key={idx}>
                              <a
                                href="#"
                                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors group"
                              >
                                <span>{item}</span>
                                <X className="w-4 h-4 opacity-0 group-hover:opacity-50 hover:!opacity-100 cursor-pointer" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-gray-700 my-2"></div>

                      {/* Popular Searches */}
                      <div>
                        <div className="mb-2 px-2 pt-2">
                          <span className="text-sm text-gray-400 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-orange-400" />{" "}
                            پیشنهادات پرطرفدار
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 px-2">
                          {popularSearches.map((tag, idx) => (
                            <a
                              key={idx}
                              href="#"
                              className="px-3 py-1.5 bg-[#2d3c4f] hover:bg-blue-600 rounded-full text-sm text-gray-300 hover:text-white transition-all duration-200"
                            >
                              {tag}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Center: Logo */}
            <div className="flex flex-col items-center order-1 lg:order-2">
              <div className="flex items-center gap-1">
                <span className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
                  بنیامین
                </span>
                <span className="text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  شاپ
                </span>
              </div>
              <p className="text-xs lg:text-sm text-gray-400 mt-1">
                مرجع تخصصی لوازم یدکی خودرو
              </p>
            </div>

            {/* Left: Icons */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4 order-3">
              <Button
                variant="outline"
                className="bg-transparent border-2 border-gray-600 hover:bg-white/10 hover:border-blue-400 text-white text-base lg:text-lg h-12 lg:h-14 px-5 lg:px-6 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                <User className="h-5 w-5 lg:h-6 lg:w-6 ml-2" />
                حساب کاربری
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDark(!isDark)}
                className="hover:bg-white/10 h-12 w-12 lg:h-14 lg:w-14 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg border border-gray-700 cursor-pointer"
              >
                {isDark ? (
                  <Sun className="h-6 w-6 lg:h-7 lg:w-7 text-yellow-400" />
                ) : (
                  <Moon className="h-6 w-6 lg:h-7 lg:w-7 text-blue-300" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-blue-700 h-12 w-12 lg:h-14 lg:w-14 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg border border-gray-700 bg-blue-500 cursor-pointer group"
              >
                <ShoppingCart className="h-6 w-6 lg:h-7 lg:w-7" />
                {/* Pulsing Badge */}
                <Badge className="absolute -top-1 -right-1 h-5 w-5 lg:h-5 lg:w-5 flex items-center justify-center p-0 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 border-0 text-xs lg:text-xs font-bold shadow-md rounded-full animate-pulse">
                  12
                </Badge>
              </Button>
            </div>

            {/* Mobile Cart Icon */}
            <div className="flex lg:hidden items-center gap-2 order-3">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-white/10 h-11 w-11 rounded-xl transition-all duration-300"
              >
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 bg-gradient-to-r from-pink-500 to-rose-600 border-0 text-[10px] font-bold rounded-full animate-pulse">
                  12
                </Badge>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Custom Navigation & Mega Menu */}
        <div className="bg-[#1f2a38] border-white/5 relative z-30 rounded-3xl shadow-md mt-4">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="hidden lg:flex items-center justify-between relative">
              {/* Main Navigation List */}
              <nav className="flex items-center gap-1">
                <a
                  href="#"
                  className="px-4 py-6 text-base lg:text-lg hover:text-blue-400 transition-colors duration-300 relative group"
                >
                  صفحه اصلی
                  <span className="absolute bottom-4 right-4 left-4 h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </a>

                {/* Mega Menu Trigger */}
                <div className="group px-4 py-6 cursor-pointer">
                  <div className="flex items-center gap-1 text-base lg:text-lg group-hover:text-blue-400 transition-colors duration-300">
                    دسته بندی ها
                    <ChevronDown className="w-4 h-4 mt-1 transition-transform duration-300 group-hover:rotate-180" />
                  </div>

                  {/* Custom Mega Menu Dropdown */}
                  <div className="absolute top-full right-0 w-full xl:w-[1000px] invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-50 pt-2">
                    <div className="bg-[#1a2332] rounded-xl border border-gray-700/50 shadow-2xl p-6 grid grid-cols-12 gap-6 overflow-hidden">
                      {/* Categories List */}
                      <div className="col-span-9 grid grid-cols-2 gap-x-8 gap-y-8">
                        {carCategories.map((cat, index) => (
                          <div key={index} className="space-y-3">
                            <div className="flex items-center gap-2 border-b border-gray-700/50 pb-2 mb-3">
                              <span className="bg-white/5 p-1.5 rounded-lg">
                                {cat.icon}
                              </span>
                              <h3 className="font-bold text-blue-100 text-lg">
                                {cat.title}
                              </h3>
                            </div>
                            <ul className="space-y-2 pr-2">
                              {cat.items.map((item, idx) => (
                                <li key={idx}>
                                  <a
                                    href="#"
                                    className="text-gray-400 hover:text-blue-400 hover:translate-x-[-4px] transition-all duration-200 block text-sm"
                                  >
                                    {item}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Featured Side Banner */}
                      <div className="col-span-3 bg-gradient-to-b from-blue-900/50 to-slate-900/50 rounded-xl p-5 border border-white/5 flex flex-col justify-between relative group/banner overflow-hidden">
                        <div className="absolute inset-0 bg-blue-600/10 blur-xl group-hover/banner:bg-blue-600/20 transition-all duration-500"></div>
                        <div className="relative z-10">
                          <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">
                            پیشنهاد لحظه‌ای
                          </div>
                          <h4 className="text-xl font-bold mb-2 text-white">
                            روغن موتور اسپیدی
                          </h4>
                          <p className="text-gray-400 text-sm mb-4">
                            مناسب برای تمام فصول با گرانروی 20W-50
                          </p>
                        </div>

                        <div className="relative z-10 text-center mt-4">
                          <div className="text-2xl font-bold text-blue-400 mb-4">
                            450,000{" "}
                            <span className="text-sm text-gray-400">تومان</span>
                          </div>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            افزودن به سبد
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="#"
                  className="px-4 py-6 text-base lg:text-lg hover:text-blue-400 transition-colors duration-300 relative group"
                >
                  فروشگاه
                  <span className="absolute bottom-4 right-4 left-4 h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </a>
                <a
                  href="#"
                  className="px-4 py-6 text-base lg:text-lg hover:text-blue-400 transition-colors duration-300 relative group"
                >
                  وبلاگ
                  <span className="absolute bottom-4 right-4 left-4 h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </a>
              </nav>

              {/* Location Selector */}
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 text-base lg:text-lg h-12 lg:h-14 px-5 lg:px-6 rounded-2xl transition-all duration-300 ml-0"
              >
                <MapPin className="h-5 w-5 lg:h-6 lg:w-6 ml-2 text-orange-500" />
                آدرس خود را انتخاب کنید
              </Button>
            </div>

            {/* Mobile Bottom Navigation Button */}
            <div className="lg:hidden flex items-center justify-center py-3">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 text-sm h-10 px-4 rounded-xl transition-all duration-300"
              >
                <MapPin className="h-4 w-4 ml-2 text-orange-500" />
                آدرس خود را انتخاب کنید
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
