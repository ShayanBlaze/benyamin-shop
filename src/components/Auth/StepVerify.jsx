import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";

export default function StepVerify({
  phoneNumber,
  onSubmit,
  onBack,
  isLoading,
}) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
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

  const handleChange = (idx, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...code];
    next[idx] = val;
    setCode(next);
    if (val && idx < 5) inputsRef.current[idx + 1]?.focus();
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
      .slice(0, 6);
    if (pasted.length === 6) {
      setCode(pasted.split(""));
      inputsRef.current[5]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullCode.length === 6) onSubmit(fullCode);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          <h2 className="text-xl font-bold text-white">تایید شماره موبایل</h2>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            کد ۶ رقمی ارسال‌شده به{" "}
            <span className="font-mono font-semibold text-blue-400" dir="ltr">
              {phoneNumber}
            </span>{" "}
            را وارد کنید
          </p>
        </div>
      </div>

      {/* OTP boxes */}
      <div
        className="flex items-center justify-center gap-2.5"
        dir="ltr"
        onPaste={handlePaste}
      >
        {code.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => (inputsRef.current[idx] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            autoFocus={idx === 0}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            className="w-11 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all duration-200"
            style={{
              backgroundColor: digit ? "rgba(59,130,246,0.12)" : "#2d3c4f",
              borderColor: digit ? "rgba(59,130,246,0.6)" : "#3d4f63",
              color: digit ? "#60a5fa" : "#e2e8f0",
              boxShadow: digit ? "0 0 0 3px rgba(59,130,246,0.08)" : "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#3b82f6";
              e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.15)";
            }}
            onBlur={(e) => {
              if (!digit) {
                e.target.style.borderColor = "#3d4f63";
                e.target.style.boxShadow = "none";
              }
            }}
          />
        ))}
      </div>

      {/* Resend */}
      <div className="text-center">
        {timer > 0 ? (
          <p className="text-xs text-gray-500">
            ارسال مجدد کد تا{" "}
            <span className="font-mono font-bold text-blue-400">
              {formatTime(timer)}
            </span>{" "}
            دیگر
          </p>
        ) : (
          <button
            type="button"
            onClick={() => {
              setTimer(120);
              setCode(["", "", "", "", "", ""]);
            }}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1.5 mx-auto transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            ارسال مجدد کد تایید
          </button>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 text-white h-11 text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-40 disabled:shadow-none cursor-pointer"
        disabled={isLoading || fullCode.length < 6}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            در حال بررسی...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            تایید و ورود
          </span>
        )}
      </Button>
    </form>
  );
}
