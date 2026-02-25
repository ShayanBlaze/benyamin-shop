import { Badge, ShoppingCart, Heart, PackageCheck, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardHome() {
  const { user } = useAuth();
  
  const stats = [
    { label: "سفارش‌های جاری", value: "۳", icon: Clock, color: "text-amber-400 bg-amber-500/10" },
    { label: "تحویل شده", value: "۱۲", icon: PackageCheck, color: "text-green-400 bg-green-500/10" },
    { label: "علاقه‌مندی‌ها", value: "۵", icon: Heart, color: "text-rose-400 bg-rose-500/10" },
  ];

  const recentOrders = [
    { id: "#B-1402", date: "۱۴۰۲/۱۱/۰۵", status: "در حال پردازش", total: "۲,۴۵۰,۰۰۰ تومان" },
    { id: "#B-1398", date: "۱۴۰۲/۱۰/۲۸", status: "تحویل شده", total: "۸۵۰,۰۰۰ تومان" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            سلام، {user?.firstName} عزیز!
          </h1>
          <p className="text-gray-400">به پنل کاربری خود خوش آمدید.</p>
        </div>
        <Link to="/" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
          بازگشت به فروشگاه ←
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#2d3c4f] rounded-xl p-5 border border-white/5 flex items-center gap-4 hover:border-blue-500/30 transition-colors">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">آخرین سفارش‌ها</h2>
          <Link to="/dashboard/orders" className="text-sm text-blue-400 hover:underline">
            مشاهده همه
          </Link>
        </div>
        
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div key={order.id} className="bg-[#2d3c4f] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/5 hover:bg-[#3d4f63] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <PackageCheck className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">{order.id}</p>
                  <p className="text-xs text-gray-400 mt-1">{order.date}</p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:gap-6 w-full sm:w-auto">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {order.status}
                </span>
                <p className="text-sm font-bold text-white">{order.total}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
