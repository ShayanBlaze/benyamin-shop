import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, Heart, MapPin, User, LogOut } from "lucide-react";
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
    <div className="min-h-screen bg-[#0f1923] text-gray-100" dir="rtl">
      {/* Header stays at the top */}
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Dashboard Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#1f2a38] rounded-2xl border border-gray-700/50 p-6 sticky top-24">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-700/50">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <User className="w-6 h-6" />
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-white truncate">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-sm text-gray-400 font-mono mt-1 truncate">
                    {user?.phoneNumber}
                  </p>
                </div>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
                
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200 mt-4 border-t border-gray-700/50 pt-4"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">خروج از حساب</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="lg:col-span-3">
            <div className="bg-[#1f2a38] rounded-2xl border border-gray-700/50 min-h-[500px] p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
