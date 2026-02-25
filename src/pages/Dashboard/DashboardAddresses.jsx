import { useMemo, useState, useEffect } from "react";
import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  BadgeCheck,
  X,
  Save,
} from "lucide-react";
import SectionHeader from "@/components/dashboard/SectionHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";
import EmptyState from "@/components/dashboard/EmptyState";

// ─── helpers ────────────────────────────────────────────────────────────────
const EMPTY = {
  title: "",
  receiver: "",
  phone: "",
  city: "",
  address: "",
  postalCode: "",
  isDefault: false,
};

const inputCls =
  "mt-1 w-full px-3 py-2.5 rounded-xl bg-[#0f1923] border border-white/10 text-sm " +
  "text-white outline-none transition focus:border-blue-500/40 focus:ring-2 " +
  "focus:ring-blue-500/10 placeholder:text-gray-500";

const initial = [
  {
    id: 1,
    title: "خانه",
    receiver: "بنیامین رضایی",
    phone: "09121234567",
    city: "تهران",
    address: "خیابان ولیعصر، کوچه نمونه، پلاک ۱۲، واحد ۳",
    postalCode: "1234567890",
    isDefault: true,
  },
  {
    id: 2,
    title: "محل کار",
    receiver: "بنیامین رضایی",
    phone: "09361234567",
    city: "تهران",
    address: "خیابان شریعتی، ساختمان آریا، طبقه ۳، واحد ۸",
    postalCode: "1122334455",
    isDefault: false,
  },
];

// ─── Address Form (shared for modal + sheet) ─────────────────────────────────
function AddressForm({ form, setForm, mode, onSubmit, onCancel }) {
  const ch = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-400">عنوان</label>
          <input
            value={form.title}
            onChange={ch("title")}
            required
            placeholder="مثلاً خانه"
            className={inputCls}
          />
        </div>
        <div>
          <label className="text-xs text-gray-400">شهر</label>
          <input
            value={form.city}
            onChange={ch("city")}
            required
            placeholder="تهران"
            className={inputCls}
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-400">نام گیرنده</label>
          <input
            value={form.receiver}
            onChange={ch("receiver")}
            required
            placeholder="نام کامل"
            className={inputCls}
          />
        </div>
        <div>
          <label className="text-xs text-gray-400">شماره تماس</label>
          <input
            value={form.phone}
            onChange={ch("phone")}
            required
            placeholder="09xx..."
            className={inputCls}
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="text-xs text-gray-400">آدرس کامل</label>
        <textarea
          value={form.address}
          onChange={ch("address")}
          required
          placeholder="خیابان، کوچه، پلاک..."
          rows={3}
          className={`${inputCls} resize-none`}
        />
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-400">کد پستی</label>
          <input
            value={form.postalCode}
            onChange={ch("postalCode")}
            placeholder="۱۰ رقم"
            className={inputCls}
          />
        </div>

        {/* Default checkbox */}
        <div className="flex items-end pb-1">
          <label className="inline-flex items-center gap-2 cursor-pointer select-none">
            <div
              onClick={() =>
                setForm((p) => ({ ...p, isDefault: !p.isDefault }))
              }
              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${
                form.isDefault
                  ? "bg-blue-600 border-blue-600"
                  : "bg-white/5 border-white/20"
              }`}
            >
              {form.isDefault && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 12 12"
                >
                  <path
                    d="M2 6l3 3 5-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span className="text-sm text-gray-300">آدرس پیش‌فرض</span>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-gray-300 transition-colors"
        >
          انصراف
        </button>
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
        >
          <Save className="w-4 h-4" />
          {mode === "edit" ? "ذخیره تغییرات" : "ثبت آدرس"}
        </button>
      </div>
    </form>
  );
}

// ─── Bottom Sheet (mobile) ────────────────────────────────────────────────────
function BottomSheet({ open, title, onClose, children }) {
  // lock body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-end sm:hidden transition-all duration-300 ${
        open ? "visible" : "invisible"
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Sheet */}
      <div
        className={`relative bg-[#1a2535] border-t border-white/10 rounded-t-3xl px-4 pt-4 pb-6 max-h-[92dvh] overflow-y-auto transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Drag handle */}
        <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-white font-bold">{title}</p>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 grid place-items-center text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

// ─── Desktop Modal ────────────────────────────────────────────────────────────
function DesktopModal({ open, title, onClose, children }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 hidden sm:flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div onClick={onClose} className="absolute inset-0" />
      <div className="relative w-full max-w-lg bg-[#1a2535] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-white font-bold">
            <MapPin className="w-5 h-5 text-blue-400" />
            {title}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 grid place-items-center text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function DashboardAddresses() {
  const [items, setItems] = useState(initial);
  const [mode, setMode] = useState("create");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [open, setOpen] = useState(false);

  const openCreate = () => {
    setMode("create");
    setEditingId(null);
    setForm(EMPTY);
    setOpen(true);
  };

  const openEdit = (a) => {
    setMode("edit");
    setEditingId(a.id);
    setForm({
      title: a.title,
      receiver: a.receiver,
      phone: a.phone,
      city: a.city,
      address: a.address,
      postalCode: a.postalCode,
      isDefault: a.isDefault,
    });
    setOpen(true);
  };

  const close = () => setOpen(false);

  const submit = (e) => {
    e.preventDefault();
    if (mode === "create") {
      const next = { ...form, id: Date.now() };
      setItems((prev) => {
        const cleaned = form.isDefault
          ? prev.map((x) => ({ ...x, isDefault: false }))
          : prev;
        return [next, ...cleaned];
      });
    } else {
      setItems((prev) =>
        prev.map((x) => {
          if (x.id !== editingId)
            return form.isDefault ? { ...x, isDefault: false } : x;
          return { ...x, ...form };
        }),
      );
    }
    close();
  };

  const remove = (id) => setItems((prev) => prev.filter((x) => x.id !== id));

  const sorted = useMemo(
    () =>
      [...items].sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0)),
    [items],
  );

  const formProps = { form, setForm, mode, onSubmit: submit, onCancel: close };
  const modalTitle = mode === "edit" ? "ویرایش آدرس" : "افزودن آدرس جدید";

  return (
    <>
      <div className="space-y-6">
        <SectionHeader
          title="آدرس‌ها"
          description="آدرس‌های ارسال رو مدیریت کن."
          action={
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm transition-colors"
              type="button"
            >
              <Plus className="w-4 h-4" />
              آدرس جدید
            </button>
          }
        />

        {sorted.length === 0 ? (
          <EmptyState
            title="هنوز آدرسی ثبت نشده"
            description="برای ارسال سفارش‌ها حداقل یک آدرس اضافه کن."
          />
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            {sorted.map((a) => (
              <DashboardCard key={a.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  {/* Icon + Info */}
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-2xl bg-blue-500/10 grid place-items-center border border-blue-500/20 shrink-0">
                      <MapPin className="w-5 h-5 text-blue-300" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-white font-bold">{a.title}</p>
                        {a.isDefault && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                            <BadgeCheck className="w-3.5 h-3.5" />
                            پیش‌فرض
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1 truncate">
                        {a.receiver} · {a.phone} · {a.city}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => openEdit(a)}
                      className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 grid place-items-center text-gray-300 transition-colors"
                      aria-label="ویرایش"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => remove(a.id)}
                      className="w-8 h-8 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 grid place-items-center text-rose-300 transition-colors"
                      aria-label="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Full Address */}
                <p className="mt-3 text-xs text-gray-300 leading-6 bg-[#0f1923] rounded-xl px-3 py-2 border border-white/5">
                  {a.address}
                  {a.postalCode ? ` — کد پستی: ${a.postalCode}` : ""}
                </p>
              </DashboardCard>
            ))}
          </div>
        )}
      </div>

      {/* Mobile: Bottom Sheet */}
      <BottomSheet open={open} title={modalTitle} onClose={close}>
        <AddressForm {...formProps} />
      </BottomSheet>

      {/* Desktop: Centered Modal */}
      <DesktopModal open={open} title={modalTitle} onClose={close}>
        <AddressForm {...formProps} />
      </DesktopModal>
    </>
  );
}
