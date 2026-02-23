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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          type="button"
          onClick={onBack}
          className="p-2 rounded-full transition-colors"
          style={{ backgroundColor: "transparent" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#2d3c4f")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </button>
        <div className="flex-1 text-center pr-8">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3 border border-blue-500/30"
            style={{ backgroundColor: "rgba(59,130,246,0.15)" }}
          >
            <ShieldCheck className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">کد تایید</h2>
          <p className="text-sm text-gray-400" dir="ltr">
            کد ارسال شده به {phoneNumber} را وارد کنید
          </p>
        </div>
      </div>

      {/* OTP Inputs */}
      <div className="flex flex-row-reverse justify-center gap-2 sm:gap-3 py-4">
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
            className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold text-white rounded-xl border border-blue-500/30 transition-all outline-none focus:ring-1 focus:ring-blue-500"
            style={{ backgroundColor: "#2d3c4f" }}
          />
        ))}
      </div>

      {/* Timer / Resend */}
      <div className="flex items-center justify-center gap-2 text-sm" dir="ltr">
        {timer > 0 ? (
          <span className="text-gray-500 font-mono font-medium tracking-wide">
            {formatTime(timer)}
          </span>
        ) : (
          <button
            type="button"
            onClick={() => {
              setTimer(120);
              setCode(["", "", "", "", ""]);
              setTimeout(() => inputsRef.current[0]?.focus(), 10);
            }}
            className="flex items-center gap-1.5 text-blue-400 font-medium hover:text-blue-300 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span dir="rtl">ارسال مجدد کد</span>
          </button>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full h-11 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-40 disabled:shadow-none"
        disabled={isLoading || fullCode.length < 5}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            در حال بررسی...
          </span>
        ) : (
          "تایید و ورود"
        )}
      </Button>
    </form>
  );
}
