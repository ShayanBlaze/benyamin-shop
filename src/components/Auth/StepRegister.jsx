import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, ArrowRight, UserCheck } from "lucide-react";

export default function StepRegister({ onSubmit, onBack, isLoading }) {
  const [formData, setFormData] = useState({ firstName: "", lastName: "" });
  const [touched, setTouched] = useState({ firstName: false, lastName: false });

  const getError = (field) => {
    if (!touched[field]) return null;
    if (!formData[field].trim()) return "این فیلد الزامی است";
    if (formData[field].trim().length < 2) return "حداقل ۲ کاراکتر وارد کنید";
    return null;
  };

  const isValid =
    formData.firstName.trim().length >= 2 &&
    formData.lastName.trim().length >= 2;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ firstName: true, lastName: true });
    if (isValid) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Header */}
      <div className="flex items-start gap-3 mb-7">
        <button
          type="button"
          onClick={onBack}
          className="p-2 rounded-xl transition-colors text-gray-400 hover:text-white mt-0.5 shrink-0"
          style={{ backgroundColor: "#2d3c4f" }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#3d4f63")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#2d3c4f")
          }
        >
          <ArrowRight className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-white">تکمیل ثبت‌نام</h2>
          <p className="text-xs text-gray-500 mt-1">
            شما کاربر جدید هستید، مشخصات خود را وارد کنید
          </p>
        </div>
      </div>

      {/* Avatar placeholder */}
      <div className="flex justify-center mb-2">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center border-2 border-dashed"
          style={{ backgroundColor: "#2d3c4f", borderColor: "#3d4f63" }}
        >
          <User className="w-7 h-7 text-gray-500" />
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-4">
        {[
          {
            field: "firstName",
            label: "نام",
            placeholder: "مثال: علی",
            autoFocus: true,
          },
          {
            field: "lastName",
            label: "نام خانوادگی",
            placeholder: "مثال: محمدی",
            autoFocus: false,
          },
        ].map(({ field, label, placeholder, autoFocus }) => {
          const err = getError(field);
          return (
            <div key={field} className="space-y-1.5">
              <label className="text-xs font-medium text-gray-400 block">
                {label}
              </label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                <Input
                  placeholder={placeholder}
                  value={formData[field]}
                  autoFocus={autoFocus}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  onBlur={() => setTouched({ ...touched, [field]: true })}
                  className={`pr-10 text-white border-0 focus-visible:ring-1 focus-visible:ring-blue-500 placeholder:text-gray-600 ${
                    err ? "ring-1 ring-red-500/50" : ""
                  }`}
                  style={{ backgroundColor: "#2d3c4f" }}
                />
              </div>
              <div className="h-4">
                {err && <p className="text-xs text-red-400">{err}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 text-white h-11 text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-40 disabled:shadow-none cursor-pointer"
        disabled={isLoading || !isValid}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            در حال ثبت‌نام...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <UserCheck className="w-4 h-4" />
            تکمیل ثبت‌نام
          </span>
        )}
      </Button>
    </form>
  );
}
