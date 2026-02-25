import { useMemo, useState } from "react";
import {
  UserRound,
  ShieldCheck,
  Phone,
  Mail,
  Save,
  CheckCircle2,
  Lock,
  Pencil,
} from "lucide-react";
import SectionHeader from "@/components/dashboard/SectionHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { useAuth } from "@/contexts/AuthContext";

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-gray-400">{label}</label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-3 py-2.5 rounded-xl bg-[#0f1923] border border-white/10 text-sm text-white outline-none transition focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10 placeholder:text-gray-500";

export default function DashboardAccount() {
  const { user } = useAuth();

  const initial = useMemo(
    () => ({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    }),
    [user],
  );

  const [form, setForm] = useState(initial);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);

  const change = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    // TODO: وصل به updateUser در AuthContext یا servcice مربوطه
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const cancel = () => {
    setForm(initial);
    setEditing(false);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="اطلاعات حساب"
        description="مشخصات کاربری‌ات رو مشاهده و ویرایش کن."
        action={
          saved ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              تغییرات ذخیره شد
            </span>
          ) : null
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* ── Profile Overview Card ────────────────────── */}
        <DashboardCard className="p-5 xl:col-span-1 flex flex-col gap-5">
          {/* Avatar + Name */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 grid place-items-center border border-blue-500/20 shrink-0">
              <UserRound className="w-7 h-7 text-blue-300" />
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold text-base truncate">
                {form.firstName || user?.firstName}{" "}
                {form.lastName || user?.lastName}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 font-mono">
                {user?.phoneNumber || "—"}
              </p>
            </div>
          </div>

          {/* OTP Security Banner */}
          <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/15 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-300 shrink-0" />
              <p className="text-sm font-bold text-emerald-300">
                ورود با OTP فعال است
              </p>
            </div>
            <p className="text-xs text-gray-400 leading-6">
              حساب شما با کد یک‌بار مصرف (OTP) محافظت می‌شه. نیازی به رمز عبور
              ندارید.
            </p>
          </div>

          {/* Phone locked note */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex items-start gap-3">
            <Lock className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <p className="text-xs text-gray-400 leading-6">
              شماره موبایل شناسه ورود شماست و قابل تغییر مستقیم نیست.
            </p>
          </div>
        </DashboardCard>

        {/* ── Edit Form Card ───────────────────────────── */}
        <DashboardCard className="p-5 xl:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <p className="text-white font-bold">ویرایش مشخصات</p>
            {!editing && (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-gray-200 transition-colors"
              >
                <Pencil className="w-4 h-4" />
                ویرایش
              </button>
            )}
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="نام">
                <input
                  value={form.firstName}
                  onChange={change("firstName")}
                  disabled={!editing}
                  placeholder="نام خود را وارد کنید"
                  className={`${inputCls} ${!editing ? "opacity-50 cursor-not-allowed" : ""}`}
                />
              </Field>

              <Field label="نام خانوادگی">
                <input
                  value={form.lastName}
                  onChange={change("lastName")}
                  disabled={!editing}
                  placeholder="نام خانوادگی خود را وارد کنید"
                  className={`${inputCls} ${!editing ? "opacity-50 cursor-not-allowed" : ""}`}
                />
              </Field>
            </div>

            <Field label="ایمیل (اختیاری)">
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  value={form.email}
                  onChange={change("email")}
                  disabled={!editing}
                  type="email"
                  placeholder="you@example.com"
                  className={`${inputCls} pr-10 ${!editing ? "opacity-50 cursor-not-allowed" : ""}`}
                />
              </div>
            </Field>

            <Field label="شماره موبایل">
              <div className="relative">
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  value={user?.phoneNumber || ""}
                  disabled
                  className={`${inputCls} pr-10 opacity-50 cursor-not-allowed`}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 text-[11px] text-gray-500">
                  <Lock className="w-3 h-3" /> قفل
                </span>
              </div>
            </Field>

            {/* Buttons — only show when editing */}
            {editing && (
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={cancel}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-gray-300 transition-colors"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
                >
                  <Save className="w-4 h-4" />
                  ذخیره تغییرات
                </button>
              </div>
            )}
          </form>
        </DashboardCard>
      </div>
    </div>
  );
}
