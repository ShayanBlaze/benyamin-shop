import {
  ShoppingCart,
  User,
  Search,
  Menu,
  MapPin,
  Sun,
  Moon,
  ChevronDown,
  Laptop,
  Smartphone,
  Watch,
  Headphones,
  Speaker,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import React from "react";

export default function Header() {
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-b from-[#1e2a3a] to-[#1a2332] text-white shadow-2xl relative z-50">
      {/* Top Section */}
      <div className="container mx-auto px-4 lg:px-8 py-4 lg:py-5">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-white/10 rounded-xl"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#1a2332] text-white border-gray-700"
            >
              <nav className="flex flex-col gap-6 mt-8">
                <a
                  href="#"
                  className="text-lg hover:text-blue-400 transition-colors"
                >
                  صفحه اصلی
                </a>
                <a
                  href="#"
                  className="text-lg hover:text-blue-400 transition-colors"
                >
                  دسته بندی ها
                </a>
                <a
                  href="#"
                  className="text-lg hover:text-blue-400 transition-colors"
                >
                  فروشگاه
                </a>
                <a
                  href="#"
                  className="text-lg hover:text-blue-400 transition-colors"
                >
                  وبلاگ
                </a>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Right: Search */}
          <div className="relative flex-1 lg:flex-none lg:w-96 order-2 lg:order-1">
            <Input
              type="text"
              placeholder="جستجو در کارین..."
              className="bg-[#2d3c4f] border-0 text-white placeholder:text-gray-400 pr-12 pl-4 h-12 lg:h-14 text-base lg:text-lg rounded-2xl shadow-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 transition-all"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute left-2 top-1/2 -translate-y-1/2 hover:bg-blue-500/20 rounded-xl transition-all"
            >
              <Search className="h-5 w-5 lg:h-6 lg:w-6 text-blue-400" />
            </Button>
          </div>

          {/* Center: Logo */}
          <div className="flex flex-col items-center order-1 lg:order-2">
            <div className="flex items-center gap-1">
              <span className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
                کارین
              </span>
              <span className="text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                شاپ
              </span>
            </div>
            <p className="text-xs lg:text-sm text-gray-400 mt-1">
              خرید موبایل و لپ‌تاپ
            </p>
          </div>

          {/* Left: Icons */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 order-3">
            <Button
              variant="outline"
              className="bg-transparent border-2 border-gray-600 hover:bg-white/10 hover:border-blue-400 text-white text-base lg:text-lg h-12 lg:h-14 px-5 lg:px-6 rounded-2xl transition-all shadow-lg"
            >
              <User className="h-5 w-5 lg:h-6 lg:w-6 ml-2" />
              حساب کاربری
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="hover:bg-white/10 h-12 w-12 lg:h-14 lg:w-14 rounded-2xl transition-all shadow-lg"
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
              className="relative hover:bg-white/10 h-12 w-12 lg:h-14 lg:w-14 rounded-2xl transition-all shadow-lg"
            >
              <ShoppingCart className="h-6 w-6 lg:h-7 lg:w-7" />
              <Badge className="absolute -top-1 -right-1 h-6 w-6 lg:h-7 lg:w-7 flex items-center justify-center p-0 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 border-0 text-sm lg:text-base font-bold shadow-lg rounded-full">
                12
              </Badge>
            </Button>
          </div>

          {/* Mobile Cart Icon */}
          <div className="flex lg:hidden items-center gap-2 order-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-white/10 h-11 w-11 rounded-xl"
            >
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-pink-500 to-rose-600 border-0 text-xs font-bold rounded-full">
                12
              </Badge>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Navigation */}
      <div className="bg-gradient-to-b from-[#141d28] to-[#0f1720] border-t border-white/5 shadow-xl">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="hidden lg:flex items-center justify-between py-4">
            {/* Navigation Menu (Moved to Right) */}
            <NavigationMenu dir="rtl">
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <a href="#" className={navigationMenuTriggerStyle()}>
                    <span className="text-base lg:text-lg hover:text-blue-400 transition-colors">
                      صفحه اصلی
                    </span>
                  </a>
                </NavigationMenuItem>

                {/* Mega Menu for Categories */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-white/5 text-white data-[state=open]:bg-white/10 text-base lg:text-lg">
                    دسته بندی ها
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[600px] lg:w-[800px] p-6 bg-[#1a2332] text-white border border-gray-700 rounded-xl shadow-2xl grid grid-cols-2 gap-6">
                      {/* Left Column: Featured Image/Offer */}
                      <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 p-6 flex flex-col justify-end">
                        <div className="absolute top-0 right-0 p-4">
                          <Badge className="bg-yellow-400 text-black hover:bg-yellow-500">
                            پیشنهاد ویژه
                          </Badge>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">
                          جشنواره تابستانی
                        </h3>
                        <p className="text-sm text-blue-100 mb-4">
                          تا ۵۰٪ تخفیف روی لوازم جانبی موبایل
                        </p>
                        <Button
                          variant="secondary"
                          className="w-fit bg-white text-blue-900 hover:bg-gray-100"
                        >
                          مشاهده همه
                        </Button>
                      </div>

                      {/* Right Column: Categories Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <a
                          href="#"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                        >
                          <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                            <Smartphone className="h-5 w-5 text-blue-400 group-hover:text-white" />
                          </div>
                          <div>
                            <div className="font-medium">موبایل</div>
                            <div className="text-xs text-gray-400">
                              اپل، سامسونگ، شیائومی
                            </div>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                        >
                          <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                            <Laptop className="h-5 w-5 text-purple-400 group-hover:text-white" />
                          </div>
                          <div>
                            <div className="font-medium">لپ‌تاپ</div>
                            <div className="text-xs text-gray-400">
                              مک‌بوک، ایسوس، لنوو
                            </div>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                        >
                          <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                            <Watch className="h-5 w-5 text-green-400 group-hover:text-white" />
                          </div>
                          <div>
                            <div className="font-medium">ساعت هوشمند</div>
                            <div className="text-xs text-gray-400">
                              اپل واچ، گلکسی واچ
                            </div>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                        >
                          <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                            <Headphones className="h-5 w-5 text-red-400 group-hover:text-white" />
                          </div>
                          <div>
                            <div className="font-medium">هدفون</div>
                            <div className="text-xs text-gray-400">
                              ایرپاد، گلکسی بادز
                            </div>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                        >
                          <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                            <Speaker className="h-5 w-5 text-orange-400 group-hover:text-white" />
                          </div>
                          <div>
                            <div className="font-medium">اسپیکر</div>
                            <div className="text-xs text-gray-400">
                              JBL، سونی، هارمن
                            </div>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                        >
                          <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
                            <Camera className="h-5 w-5 text-cyan-400 group-hover:text-white" />
                          </div>
                          <div>
                            <div className="font-medium">دوربین</div>
                            <div className="text-xs text-gray-400">
                              کانن، نیکون، سونی
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <a href="#" className={navigationMenuTriggerStyle()}>
                    <span className="text-base lg:text-lg hover:text-blue-400 transition-colors">
                      فروشگاه
                    </span>
                  </a>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <a href="#" className={navigationMenuTriggerStyle()}>
                    <span className="text-base lg:text-lg hover:text-blue-400 transition-colors">
                      وبلاگ
                    </span>
                  </a>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Location Selector (Moved to Left) */}
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 text-base lg:text-lg h-12 lg:h-14 px-5 lg:px-6 rounded-2xl transition-all shadow-lg ml-auto mr-0"
            >
              <MapPin className="h-5 w-5 lg:h-6 lg:w-6 ml-2 text-orange-500" />
              آدرس خود را انتخاب کنید
            </Button>
          </div>

          {/* Mobile Bottom Navigation */}
          <div className="lg:hidden flex items-center justify-center py-3">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 text-sm h-10 px-4 rounded-xl"
            >
              <MapPin className="h-4 w-4 ml-2 text-orange-500" />
              آدرس خود را انتخاب کنید
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
