import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Heart,
  MapPin,
  User,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";

export default function DashboardLayout() {
  const location = useLocation();
  const { logout, user } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: "پیشخوان", path: "/dashboard" },
    { icon: Package, label: "سفارش‌ها", path: "/dashboard/orders" },
    { icon: Heart, label: "علاقه‌مندی‌ها", path: "/dashboard/favorites" },
    { icon: MapPin, label: "آدرس‌ها", path: "/dashboard/address" },
    { icon: User, label: "اطلاعات حساب", path: "/dashboard/account" },
  ];

  return (
    <div className="min-h-screen bg-[#0f1923] text-gray-100 flex flex-col" dir="rtl">
      {/* Header stays at the top */}
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Dashboard Sidebar / Mobile Navbar */}
          <div className="lg:col-span-1">
            <div className="bg-[#1f2a38] rounded-2xl border border-gray-700/50 p-4 lg:p-6 sticky top-20 lg:top-24 z-30">
              
              {/* User Profile Info */}
              <div className="flex items-center justify-between lg:justify-start gap-4 mb-4 lg:mb-8 lg:pb-6 border-b border-gray-700/50 pb-4">
                <div className="flex items-center gap-3 lg:gap-4 overflow-hidden">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <User className="w-5 h-5 lg:w-6 lg:h-6" />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-bold text-white text-sm lg:text-base truncate">
                      {user?.firstName} {user?.lastName}
                    </h3>
                    <p className="text-xs lg:text-sm text-gray-400 font-mono mt-0.5 lg:mt-1 truncate">
                      {user?.phoneNumber}
                    </p>
                  </div>
                </div>

                {/* Mobile Logout Button (Hidden on Desktop) */}
                <button
                  onClick={logout}
                  className="lg:hidden p-2 text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-colors shrink-0"
                  aria-label="خروج از حساب"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Menu */}
              <nav className="flex overflow-x-auto lg:flex-col gap-2 lg:gap-0 lg:space-y-3 pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] snap-x">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 lg:gap-3 px-4 py-2.5 lg:py-5 rounded-xl transition-all duration-200 shrink-0 snap-center ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "text-gray-400 bg-white/5 lg:bg-transparent hover:bg-white/10 lg:hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <item.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                      <span className="text-xs lg:text-sm font-medium whitespace-nowrap">{item.label}</span>
                    </Link>
                  );
                })}

                {/* Desktop Logout Button (Hidden on Mobile) */}
                <button
                  onClick={logout}
                  className="hidden lg:flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200 mt-4 border-t border-gray-700/50 pt-4 cursor-pointer"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium py-1">خروج از حساب</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="bg-[#1f2a38] rounded-2xl border border-gray-700/50 min-h-[400px] lg:min-h-125 p-4 lg:p-6 flex-1">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
