import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";

export default function StepVerify({
  phoneNumber,
  onSubmit,
  onBack,
  isLoading,
}) {
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
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const handleChange = (idx, e) => {
    const val = e.target.value;

    if (val === "") {
      const next = [...code];
      next[idx] = "";
      setCode(next);
      return;
    }

    const char = val.slice(-1);
    const englishChar = char
      .replace(/[۰-۹]/g, (w) => String.fromCharCode(w.charCodeAt(0) - 1728))
      .replace(/[٠-٩]/g, (w) => String.fromCharCode(w.charCodeAt(0) - 1584));

    if (!/^\d$/.test(englishChar)) return;

    const next = [...code];
    next[idx] = englishChar;
    setCode(next);

    if (idx < 4) {
      setTimeout(() => inputsRef.current[idx + 1]?.focus(), 10);
    }
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace") {
      if (!code[idx] && idx > 0) {
        setTimeout(() => inputsRef.current[idx - 1]?.focus(), 10);
      }
    } else if (e.key === "ArrowLeft") {
      if (idx > 0) setTimeout(() => inputsRef.current[idx - 1]?.focus(), 10);
    } else if (e.key === "ArrowRight") {
      if (idx < 4) setTimeout(() => inputsRef.current[idx + 1]?.focus(), 10);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/[۰-۹]/g, (w) => String.fromCharCode(w.charCodeAt(0) - 1728))
      .replace(/[٠-٩]/g, (w) => String.fromCharCode(w.charCodeAt(0) - 1584))
      .replace(/\D/g, "")
      .slice(0, 5);

    if (pasted) {
      const next = [...code];
      for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
      setCode(next);
      const nextFocusIdx = pasted.length < 5 ? pasted.length : 4;
      setTimeout(() => inputsRef.current[nextFocusIdx]?.focus(), 10);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullCode.length >= 5) onSubmit(fullCode);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 w-full max-w-sm mx-auto">
      {/* Header Section */}
      <div className="relative flex flex-col items-center text-center pt-2 sm:pt-4">
        {/* Back Button positioned absolutely on mobile, relatively on larger screens if needed, but absolute fits this design best */}
        <button
          type="button"
          onClick={onBack}
          className="absolute right-0 top-0 sm:top-2 p-2 sm:p-2.5 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          aria-label="بازگشت"
        >
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Icon & Title */}
        <div className="flex flex-col items-center mt-2 sm:mt-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 sm:mb-5 shadow-inner">
            <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2 tracking-tight">
            تایید شماره موبایل
          </h2>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-[260px] sm:max-w-xs mx-auto">
            کد ۵ رقمی پیامک شده به شماره{" "}
            <span className="font-mono text-blue-300 font-medium" dir="ltr">{phoneNumber}</span>{" "}
            را وارد کنید.
          </p>
        </div>
      </div>

      {/* OTP Inputs Grid */}
      <div className="flex flex-row-reverse justify-center gap-2 sm:gap-3 lg:gap-4 px-2">
        {code.map((val, idx) => (
          <input
            key={idx}
            ref={(el) => (inputsRef.current[idx] = el)}
            autoFocus={idx === 0}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={val}
            maxLength={2}
            onChange={(e) => handleChange(idx, e)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            dir="ltr"
            className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold text-white bg-[#2d3c4f] rounded-xl border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all outline-none caret-blue-400 shadow-sm"
          />
        ))}
      </div>

      {/* Timer / Resend Action */}
      <div className="flex items-center justify-center min-h-[24px]">
        {timer > 0 ? (
          <div className="flex items-center gap-2 text-sm sm:text-base text-gray-400 bg-white/5 px-4 py-1.5 rounded-full">
            <span>زمان باقیمانده:</span>
            <span className="font-mono font-medium text-white tracking-widest" dir="ltr">
              {formatTime(timer)}
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              setTimer(120);
              setCode(["", "", "", "", ""]);
              setTimeout(() => inputsRef.current[0]?.focus(), 10);
            }}
            className="flex items-center gap-2 text-sm sm:text-base text-blue-400 font-medium hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 px-4 py-2 rounded-full transition-all"
          >
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>ارسال مجدد کد تایید</span>
          </button>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          className="w-full h-12 sm:h-14 text-sm sm:text-base font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
          disabled={isLoading || fullCode.length < 5}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              در حال بررسی...
            </span>
          ) : (
            "تایید و ادامه"
          )}
        </Button>
      </div>
    </form>
  );
}
