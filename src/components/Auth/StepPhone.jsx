import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import { toast } from "sonner";

export default function StepPhone({ onSubmit, isLoading }) {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.length === 11 && phone.startsWith("09")) {
      onSubmit(phone);
    } else {
      toast.error("لطفا یک شماره موبایل معتبر وارد کنید");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          ورود / ثبت‌نام
        </h2>
        <p className="text-sm text-slate-500">شماره موبایل خود را وارد کنید</p>
      </div>

      <div className="relative">
        <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <Input
          type="tel"
          dir="ltr"
          placeholder="09123456789"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="pr-10 text-left"
          maxLength={11}
          autoFocus
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        disabled={isLoading || phone.length !== 11}
      >
        {isLoading ? "در حال ارسال..." : "ارسال کد تایید"}
      </Button>
    </form>
  );
}
