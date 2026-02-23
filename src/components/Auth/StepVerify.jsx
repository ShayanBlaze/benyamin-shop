import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";

export default function StepVerify({
  phoneNumber,
  onSubmit,
  onBack,
  isLoading,
}) {
  // ۱. تغییر از ۶ خانه به ۵ خانه
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [timer, setTimer] = useState(120);
  const inputsRef = useRef([]);

  const fullCode = code.join("");

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0",
    )}`;

  const handleChange = (idx, val) => {
    if (!/^\d?$/.test(val)) return;

    const next = [...code];
    next[idx] = val;
    setCode(next);

    // ۲. آخرین ایندکس در آرایه ۵ تایی، ۴ است.
    if (val && idx < 4) inputsRef.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      // ۳. تغییر برش و بررسی از ۶ به ۵ کاراکتر
      .slice(0, 5);

    if (pasted.length === 5) {
      setCode(pasted.split(""));
      // ۴. فکوس روی آخرین خانه (ایندکس ۴)
      inputsRef.current[4]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ۵. بررسی رشته کامل (fullCode) به جای آرایه
    if (fullCode.length >= 5) onSubmit(fullCode);
  };

  // ۶. بازسازی کامل JSX که در کانفلیکت حذف شده بود
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center mb-6">
        <button
          type="button"
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowRight className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex-1 text-center pr-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">کد تایید</h2>
          <p className="text-sm text-slate-500" dir="ltr">
            کد ارسال شده به {phoneNumber} را وارد کنید
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-3 py-4" dir="ltr">
        {code.map((val, idx) => (
          <input
            key={idx}
            ref={(el) => (inputsRef.current[idx] = el)}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={val}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onPaste={handlePaste}
            className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-slate-200 
                       bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 
                       focus:ring-blue-500/20 transition-all outline-none"
            maxLength={1}
            dir="ltr"
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-sm">
        {timer > 0 ? (
          <span className="text-slate-500 font-medium tracking-wide" dir="ltr">
            {formatTime(timer)}
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setTimer(120)}
            className="flex items-center gap-1 text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            ارسال مجدد کد
          </button>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 
                   text-white shadow-lg shadow-blue-600/20 rounded-xl transition-all"
        disabled={isLoading || fullCode.length < 5}
      >
        {isLoading ? "در حال بررسی..." : "تایید و ورود"}
      </Button>
    </form>
  );
}
