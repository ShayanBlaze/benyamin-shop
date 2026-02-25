import { useState } from "react";
import {
  PackageCheck,
  Clock,
  XCircle,
  ReceiptText,
  X,
  CalendarDays,
  Banknote,
} from "lucide-react";

// ─── helpers ───────────────────────────────────────────────────────────────
function cn(...c) {
  return c.filter(Boolean).join(" ");
}

const STATUS_MAP = {
  processing: {
    label: "در حال پردازش",
    cls: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    Icon: Clock,
  },
  delivered: {
    label: "تحویل شده",
    cls: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    Icon: PackageCheck,
  },
  canceled: {
    label: "لغو شده",
    cls: "bg-rose-500/10 text-rose-300 border-rose-500/20",
    Icon: XCircle,
  },
};

function StatusBadge({ status }) {
  const { label, cls, Icon } = STATUS_MAP[status] ?? STATUS_MAP.processing;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border",
        cls,
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}

// ─── Invoice Modal ──────────────────────────────────────────────────────────
function InvoiceModal({ order, onClose }) {
  if (!order) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#1a2535] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-white font-bold">
            <ReceiptText className="w-5 h-5 text-blue-400" />
            فاکتور سفارش
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 grid place-items-center text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Order ID + Status */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">شماره سفارش</p>
            <p className="text-white font-extrabold text-lg mt-0.5">
              {order.id}
            </p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        {/* Details Grid */}
        <div className="px-5 py-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-2xl p-3">
              <p className="text-xs text-gray-400 mb-1 flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" /> تاریخ
              </p>
              <p className="text-white text-sm font-medium">{order.date}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-3">
              <p className="text-xs text-gray-400 mb-1 flex items-center gap-1.5">
                <Banknote className="w-3.5 h-3.5" /> مبلغ کل
              </p>
              <p className="text-white text-sm font-bold">{order.total}</p>
            </div>
          </div>

          {/* Items */}
          <div>
            <p className="text-xs text-gray-400 mb-2">اقلام سفارش</p>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-white/5 rounded-2xl px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {item.name}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      تعداد: {item.qty}
                    </p>
                  </div>
                  <p className="text-white text-sm font-bold shrink-0 mr-3">
                    {item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total row */}
          <div className="flex items-center justify-between bg-blue-500/10 border border-blue-500/20 rounded-2xl px-4 py-3">
            <p className="text-blue-300 text-sm font-medium">
              مجموع قابل پرداخت
            </p>
            <p className="text-white font-extrabold">{order.total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function DashboardOrders() {
  // TODO: داده‌ها را از API یا Context واقعی بگیر
  const orders = [
    {
      id: "#B-1402",
      date: "۱۴۰۲/۱۱/۰۵",
      status: "processing",
      total: "۴,۶۵۰,۰۰۰ تومان",
      items: [
        { name: "فیلتر روغن بوش اصلی", qty: 2, price: "۸۵۰,۰۰۰ تومان" },
        { name: "تسمه تایم گیتس", qty: 1, price: "۲,۴۰۰,۰۰۰ تومان" },
        { name: "واشر سرسیلندر پژو ۴۰۵", qty: 1, price: "۱,۴۰۰,۰۰۰ تومان" },
      ],
    },
    {
      id: "#B-1398",
      date: "۱۴۰۲/۱۰/۲۸",
      status: "delivered",
      total: "۱,۹۵۰,۰۰۰ تومان",
      items: [{ name: "لنت ترمز جلو برمبو", qty: 1, price: "۱,۹۵۰,۰۰۰ تومان" }],
    },
    {
      id: "#B-1391",
      date: "۱۴۰۲/۱۰/۱۴",
      status: "canceled",
      total: "۳,۲۰۰,۰۰۰ تومان",
      items: [
        { name: "کمک فنر جلو مونرو سمند", qty: 2, price: "۳,۲۰۰,۰۰۰ تومان" },
      ],
    },
    {
      id: "#B-1387",
      date: "۱۴۰۲/۰۹/۳۰",
      status: "delivered",
      total: "۶,۱۰۰,۰۰۰ تومان",
      items: [
        { name: "رینگ اسپورت ۱۷ اینچ BBS", qty: 4, price: "۵,۲۰۰,۰۰۰ تومان" },
        { name: "پیچ و مهره رینگ اسپورت", qty: 1, price: "۴۵۰,۰۰۰ تومان" },
        { name: "دریچه گاز تمیزکننده", qty: 1, price: "۴۵۰,۰۰۰ تومان" },
      ],
    },
  ];

  const [active, setActive] = useState(null);

  return (
    <>
      <div className="space-y-5">
        {/* Page Header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">سفارش‌ها</h1>
          <p className="text-sm text-gray-400 mt-1">
            برای مشاهده فاکتور هر سفارش روی آن کلیک کنید.
          </p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 grid place-items-center mx-auto mb-4">
              <ReceiptText className="w-7 h-7 text-blue-300" />
            </div>
            <p className="text-white font-bold">هنوز سفارشی ثبت نشده</p>
            <p className="text-sm text-gray-400 mt-1">اولین خریدت رو ثبت کن!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <button
                key={order.id}
                type="button"
                onClick={() => setActive(order)}
                className="w-full text-right bg-white/5 hover:bg-white/8 border border-white/10 hover:border-blue-500/30 rounded-2xl p-4 transition-all duration-200 group"
              >
                {/* Row: icon + info + badge + price */}
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Icon */}
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-blue-500/10 grid place-items-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                    <ReceiptText className="w-5 h-5 text-blue-300" />
                  </div>

                  {/* Name + Date */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm sm:text-base truncate">
                      {order.items.length === 1
                        ? order.items[0].name
                        : `${order.items[0].name} و ${order.items.length - 1} مورد دیگر`}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {order.date} · {order.id}
                    </p>
                  </div>

                  {/* Badge + Price — stack on mobile */}
                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 shrink-0">
                    <StatusBadge status={order.status} />
                    <p className="text-white font-extrabold text-sm sm:text-base whitespace-nowrap">
                      {order.total}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Invoice Modal */}
      <InvoiceModal order={active} onClose={() => setActive(null)} />
    </>
  );
}
