import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function StepPhone({ onSubmit, isLoading }) {
  const [phone, setPhone] = useState("");

  const isValid = phone.length === 11 && phone.startsWith("09");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(phone);
    } else {
      toast.error("لطفاً یک شماره موبایل معتبر وارد کنید");
    }
  };

  const errorMsg =
    phone.length > 0 && !phone.startsWith("09")
      ? "شماره باید با ۰۹ شروع شود"
      : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Header */}
      <div className="text-center space-y-2 mb-7">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-2 border border-blue-500/30"
          style={{ backgroundColor: "rgba(59,130,246,0.15)" }}
        >
          <Phone className="w-6 h-6 text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">ورود / ثبت‌نام</h2>
        <p className="text-sm text-gray-400">شماره موبایل خود را وارد کنید</p>
      </div>

      {/* Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-400 block">
          شماره موبایل
        </label>
        <div className="relative">
          {/* Flag + country code */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
            <span className="text-base leading-none">🇮🇷</span>
            <span
              className="text-xs font-mono text-gray-500 border-l pl-2"
              style={{ borderColor: "#3d4f63" }}
            >
              +98
            </span>
          </div>
          <Input
            type="tel"
            dir="ltr"
            placeholder="09123456789"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            className={`pr-20 text-left font-mono tracking-wider placeholder:tracking-normal placeholder:font-sans text-white border-0 focus-visible:ring-1 focus-visible:ring-blue-500 ${
              errorMsg ? "ring-1 ring-red-500/50" : ""
            }`}
            style={{ backgroundColor: "#2d3c4f" }}
            maxLength={11}
            autoFocus
          />
        </div>
        <div className="flex justify-between items-center h-4">
          <p className="text-xs text-red-400">{errorMsg ?? ""}</p>
          <p
            className={`text-xs font-mono transition-colors ${
              phone.length === 11 ? "text-green-400" : "text-gray-600"
            }`}
          >
            {phone.length}
            <span className="text-gray-700">/11</span>
          </p>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 text-white h-11 text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-40 disabled:shadow-none cursor-pointer"
        disabled={isLoading || !isValid}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            در حال ارسال...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            ارسال کد تایید
            <ArrowLeft className="w-4 h-4" />
          </span>
        )}
      </Button>
    </form>
  );
}
