import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, ArrowRight } from "lucide-react";

export default function StepRegister({ onSubmit, onBack, isLoading }) {
  const [formData, setFormData] = useState({ firstName: "", lastName: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center mb-6">
        <button
          type="button"
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowRight className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex-1 text-center pr-8">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
            تکمیل ثبت‌نام
          </h2>
          <p className="text-xs text-slate-500">
            شما کاربر جدید هستید، مشخصات خود را وارد کنید
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <User className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            placeholder="نام"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className="pr-10"
            autoFocus
          />
        </div>
        <div className="relative">
          <User className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            placeholder="نام خانوادگی"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="pr-10"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        disabled={isLoading || !formData.firstName || !formData.lastName}
      >
        {isLoading ? "در حال ثبت‌نام..." : "تکمیل ثبت‌نام"}
      </Button>
    </form>
  );
}
