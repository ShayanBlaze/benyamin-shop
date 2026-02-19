import {
  ShoppingCart,
  User,
  Search,
  Menu,
  ChevronDown,
  History,
  TrendingUp,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";
import MobileSidebar from "./MobileSidebar";
import { carCategories } from "@/const";
import { recentSearches, popularSearches } from "@/const";
import React from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
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

  const handleMobileMenuChange = (open) => {
    setMobileMenuOpen(open);
  };

  return (
    <>
      {/* Search Overlay/Backdrop */}
      {(isSearchFocused || isMobileSearchOpen) && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => {
            setIsSearchFocused(false);
            setIsMobileSearchOpen(false);
          }}
        />
      )}

      <header
        className={`
  sticky top-0 z-50 w-full
  backdrop-blur-sm "bg-white/90 border-slate-200
  transition-colors duration-200
`}
      >
        {/* Top Section */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 lg:py-5 relative z-50">
          <div className="flex flex-col gap-4">
            {/* Row 1: Logo, Mobile Menu, Cart/User */}
            <div className="flex items-center justify-between gap-2 sm:gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6 lg:items-center">
              {/* Mobile Menu Button */}
              <Sheet
                open={mobileMenuOpen}
                onOpenChange={handleMobileMenuChange}
              >
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden hover:bg-white/10 rounded-xl transition-all duration-300 touch-target h-10 w-10 sm:h-11 sm:w-11"
                  >
                    <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className={`
    w-[85vw] sm:w-95 p-0 overflow-hidden flex flex-col [&>button]:hidden
    transition-colors duration-200 bg-slate-900 border-slate-700
  `}
                >
                  <SheetTitle className="sr-only">منوی اصلی</SheetTitle>
                  <SheetDescription className="sr-only">
                    دسترسی به منوی اصلی و دسته‌بندی محصولات
                  </SheetDescription>

                  <MobileSidebar
                    onClose={() => handleMobileMenuChange(false)}
                  />
                </SheetContent>
              </Sheet>
              {/* Desktop Search Area (Hidden on Mobile) */}
              <div
                ref={searchContainerRef}
                className={`hidden lg:flex relative transition-all duration-300 order-2 lg:order-1 w-full max-w-sm xl:max-w-md ${
                  isSearchFocused ? "z-50" : ""
                }`}
              >
                <div className="relative w-full">
                  <Input
                    type="text"
                    placeholder="جستجو در بنیامین شاپ..."
                    onFocus={() => setIsSearchFocused(true)}
                    className={`bg-[#2d3c4f] border-0 text-white placeholder:text-gray-400 pr-10 sm:pr-12 pl-4 h-10 sm:h-12 lg:h-14 text-sm sm:text-base lg:text-lg rounded-xl sm:rounded-2xl shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 transition-all duration-300 ${
                      isSearchFocused
                        ? "rounded-b-none shadow-none bg-[#1f2a38]"
                        : ""
                    }`}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 hover:bg-blue-500/20 rounded-lg sm:rounded-xl transition-all duration-300 cursor-pointer h-8 w-8 sm:h-10 sm:w-10"
                  >
                    <Search className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-400" />
                  </Button>

                  {/* Desktop Search Dropdown Panel */}
                  {isSearchFocused && (
                    <div className="absolute top-full right-0 left-0 bg-[#1f2a38] rounded-b-xl sm:rounded-b-2xl border-t border-gray-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                      <div className="p-3 sm:p-4 max-h-[60vh] overflow-y-auto">
                        {/* Recent Searches */}
                        <div className="mb-3 sm:mb-4">
                          <div className="flex items-center justify-between mb-2 px-1 sm:px-2">
                            <span className="text-xs sm:text-sm text-gray-400 flex items-center gap-1.5 sm:gap-2">
                              <History className="w-3 h-3 sm:w-4 sm:h-4" />{" "}
                              جستجوهای اخیر
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
                                  className="flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-white/5 text-sm sm:text-base text-gray-300 hover:text-white transition-colors group"
                                >
                                  <span>{item}</span>
                                  <X className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-50 hover:opacity-100! cursor-pointer" />
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="border-t border-gray-700 my-2"></div>

                        {/* Popular Searches */}
                        <div>
                          <div className="mb-2 px-1 sm:px-2 pt-2">
                            <span className="text-xs sm:text-sm text-gray-400 flex items-center gap-1.5 sm:gap-2">
                              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />{" "}
                              پیشنهادات پرطرفدار
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2 px-1 sm:px-2">
                            {popularSearches.map((tag, idx) => (
                              <a
                                key={idx}
                                href="#"
                                className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#2d3c4f] hover:bg-blue-600 rounded-full text-xs sm:text-sm text-gray-300 hover:text-white transition-all duration-200"
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
              <div className="flex flex-col items-center order-1 lg:order-2 lg:justify-self-center">
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <span className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
                    بنیامین
                  </span>
                  <span className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    شاپ
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs lg:text-sm text-gray-400 mt-0.5 sm:mt-1 hidden sm:block">
                  مرجع تخصصی لوازم یدکی خودرو
                </p>
              </div>
              {/* Right: Desktop Icons */}
              <div className="hidden lg:flex items-center justify-end gap-2 xl:gap-4 order-3">
                <Button
                  variant="outline"
                  className="bg-transparent border-2 border-gray-600 hover:bg-white/10 hover:border-blue-400 text-white text-sm lg:text-base xl:text-lg h-11 lg:h-12 xl:h-14 px-4 lg:px-5 xl:px-6 rounded-xl lg:rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <User className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 ml-2" />
                  حساب کاربری
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-blue-700 h-11 w-11 lg:h-12 lg:w-12 xl:h-14 xl:w-14 rounded-xl lg:rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg border border-gray-700 bg-blue-500 cursor-pointer group"
                >
                  <ShoppingCart className="h-5 w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-linear-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 border-0 text-xs font-bold shadow-md rounded-full animate-pulse">
                    12
                  </Badge>
                </Button>
              </div>
              {/* Mobile Cart Icon - Location Removed */}
              <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 order-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-white/10 h-10 w-10 sm:h-11 sm:w-11 rounded-xl transition-all duration-300 touch-target"
                >
                  <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 bg-linear-to-r from-pink-500 to-rose-600 border-0 text-[10px] sm:text-xs font-bold rounded-full animate-pulse">
                    12
                  </Badge>
                </Button>
              </div>
            </div>

            {/* Row 2: Mobile Search Bar (Visible only on Mobile/Tablet) */}
            <div
              className="relative w-full lg:hidden"
              onClick={() => setIsMobileSearchOpen(true)}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <div className="block w-full pl-10 pr-3 py-2.5 border-0 rounded-xl leading-5 bg-[#2d3c4f] text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-[#1f2a38] focus:text-white sm:text-sm transition duration-150 ease-in-out cursor-text">
                جستجو در بنیامین شاپ...
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Modal */}
        {isMobileSearchOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-x-0 top-0 bg-[#1f2a38] rounded-b-3xl shadow-2xl p-4 animate-in slide-in-from-top duration-300">
              <div className="flex items-center gap-2 mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileSearchOpen(false)}
                  className="hover:bg-white/10 rounded-xl h-10 w-10"
                >
                  <X className="h-5 w-5" />
                </Button>

                <Input
                  type="text"
                  placeholder="جستجو کنید..."
                  autoFocus
                  className="bg-[#2d3c4f] border-0 text-white placeholder:text-gray-400 h-10 text-sm rounded-xl flex-1"
                />

                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-blue-500/20 rounded-xl h-10 w-10"
                >
                  <Search className="h-5 w-5 text-blue-400" />
                </Button>
              </div>

              {/* Mobile Search Content */}
              <div className="max-h-[60vh] overflow-y-auto">
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400 flex items-center gap-1.5">
                      <History className="w-3 h-3" /> جستجوهای اخیر
                    </span>
                    <button className="text-xs text-blue-400">پاک کردن</button>
                  </div>
                  <ul className="space-y-1">
                    {recentSearches.map((item, idx) => (
                      <li key={idx}>
                        <a
                          href="#"
                          className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-gray-300"
                        >
                          <span>{item}</span>
                          <X className="w-4 h-4 text-gray-500" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-700 my-3"></div>

                <div>
                  <div className="mb-2">
                    <span className="text-xs text-gray-400 flex items-center gap-1.5">
                      <TrendingUp className="w-3 h-3 text-orange-400" />{" "}
                      پیشنهادات پرطرفدار
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((tag, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="px-3 py-1.5 bg-[#2d3c4f] rounded-full text-xs text-gray-300"
                      >
                        {tag}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation Bar */}
        <div className="bg-[#1f2a38] border-white/5 relative z-30 rounded-2xl sm:rounded-3xl shadow-md mt-3 sm:mt-4 w-10/12 mx-auto">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-between relative">
              <nav className="flex items-center gap-1">
                <a
                  href="#"
                  className="px-3 xl:px-4 py-5 xl:py-6 text-sm lg:text-base xl:text-lg hover:text-blue-400 transition-colors duration-300 relative group"
                >
                  صفحه اصلی
                  <span className="absolute bottom-3 xl:bottom-4 right-3 xl:right-4 left-3 xl:left-4 h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </a>

                {/* Mega Menu Trigger */}
                <div className="group px-3 xl:px-4 py-5 xl:py-6 cursor-pointer">
                  <div className="flex items-center gap-1 text-sm lg:text-base xl:text-lg group-hover:text-blue-400 transition-colors duration-300">
                    دسته بندی ها
                    <ChevronDown className="w-4 h-4 mt-0.5 transition-transform duration-300 group-hover:rotate-180" />
                  </div>

                  {/* Mega Menu Dropdown */}
                  <div className="absolute top-full right-0 w-full xl:w-250 2xl:w-300 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-50 pt-2">
                    <div className="bg-[#1a2332] rounded-xl border border-gray-700/50 shadow-2xl p-4 lg:p-6 grid grid-cols-12 gap-4 lg:gap-6 overflow-hidden">
                      {/* Categories List */}
                      <div className="col-span-9 grid grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-6 lg:gap-y-8">
                        {carCategories.map((cat, index) => (
                          <div key={index} className="space-y-2 lg:space-y-3">
                            <div className="flex items-center gap-2 border-b border-gray-700/50 pb-2 mb-2 lg:mb-3">
                              <span className="bg-white/5 p-1 lg:p-1.5 rounded-lg">
                                <span className={cat.color}>{cat.icon}</span>
                              </span>
                              <h3 className="font-bold text-blue-100 text-base lg:text-lg">
                                {cat.title}
                              </h3>
                            </div>
                            <ul className="space-y-1.5 lg:space-y-2 pr-2">
                              {cat.items.map((item, idx) => (
                                <li key={idx}>
                                  <a
                                    href="#"
                                    className="text-gray-400 hover:text-blue-400 hover:-translate-x-1 transition-all duration-200 block text-xs lg:text-sm"
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
                      <div className="col-span-3 bg-linear-to-b from-blue-900/50 to-slate-900/50 rounded-xl p-4 lg:p-5 border border-white/5 flex flex-col justify-between relative group/banner overflow-hidden">
                        <div className="absolute inset-0 bg-blue-600/10 blur-xl group-hover/banner:bg-blue-600/20 transition-all duration-500"></div>
                        <div className="relative z-10">
                          <div className="bg-orange-500 text-white text-xs font-bold px-2.5 lg:px-3 py-1 rounded-full w-fit mb-3 lg:mb-4">
                            پیشنهاد لحظه‌ای
                          </div>
                          <h4 className="text-lg lg:text-xl font-bold mb-1.5 lg:mb-2 text-white">
                            روغن موتور اسپیدی
                          </h4>
                          <p className="text-gray-400 text-xs lg:text-sm mb-3 lg:mb-4">
                            مناسب برای تمام فصول با گرانروی 20W-50
                          </p>
                        </div>

                        <div className="relative z-10 text-center mt-3 lg:mt-4">
                          <div className="text-xl lg:text-2xl font-bold text-blue-400 mb-3 lg:mb-4">
                            450,000{" "}
                            <span className="text-xs lg:text-sm text-gray-400">
                              تومان
                            </span>
                          </div>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs lg:text-sm h-9 lg:h-10">
                            افزودن به سبد
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="#"
                  className="px-3 xl:px-4 py-5 xl:py-6 text-sm lg:text-base xl:text-lg hover:text-blue-400 transition-colors duration-300 relative group"
                >
                  فروشگاه
                  <span className="absolute bottom-3 xl:bottom-4 right-3 xl:right-4 left-3 xl:left-4 h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </a>
                <a
                  href="#"
                  className="px-3 xl:px-4 py-5 xl:py-6 text-sm lg:text-base xl:text-lg hover:text-blue-400 transition-colors duration-300 relative group"
                >
                  وبلاگ
                  <span className="absolute bottom-3 xl:bottom-4 right-3 xl:right-4 left-3 xl:left-4 h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
