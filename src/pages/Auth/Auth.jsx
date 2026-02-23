import { useLogin } from "@/hooks/useLogin";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import StepPhone from "@/components/auth/StepPhone";
import StepVerify from "@/components/auth/StepVerify";
import StepRegister from "@/components/auth/StepRegister";
import { ShoppingBag, Shield, Truck, Star } from "lucide-react";

const features = [
  { icon: Truck, text: "ارسال سریع به سراسر کشور" },
  { icon: Shield, text: "تضمین اصالت کالا" },
  { icon: Star, text: "بیش از ۱۰,۰۰۰ محصول متنوع" },
];

export default function Auth() {
  const { user } = useAuth();
  const {
    step,
    phoneNumber,
    loading,
    isNewUser,
    handleSendCode,
    handleLogin,
    handleRegister,
    resetFlow,
  } = useLogin();

  if (user) return <Navigate to="/" replace />;

  const STEPS = isNewUser
    ? ["شماره موبایل", "کد تایید", "تکمیل پروفایل"]
    : ["شماره موبایل", "کد تایید"];

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#0f1923" }}
      dir="rtl"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-125 h-125 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-100 h-100 rounded-full bg-indigo-600/8 blur-[100px]" />
      </div>

      <div
        className="relative z-10 w-full max-w-4xl flex rounded-3xl overflow-hidden border border-white/5"
        style={{
          backgroundColor: "#1f2a38",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* ── Branding panel ── */}
        <div
          className="relative hidden md:flex flex-col justify-between w-2/5 p-10 text-white border-l border-white/5"
          style={{
            background: "linear-gradient(160deg, #1a2d45 0%, #0f1923 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <Link to="/" className="relative z-10 flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-500/30">
              <ShoppingBag className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex items-center gap-0.5">
              <span className="text-2xl font-extrabold text-white">
                بنیامین
              </span>
              <span className="text-2xl font-extrabold text-blue-400">شاپ</span>
            </div>
          </Link>

          <div className="relative z-10 space-y-7">
            <div>
              <h2 className="text-3xl font-bold leading-snug text-white mb-3">
                خرید آسان،
                <br />
                <span className="text-blue-400">تجربه‌ای متفاوت</span>
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                با ثبت‌نام در بنیامین‌شاپ به هزاران محصول با بهترین قیمت دسترسی
                پیدا کنید.
              </p>
            </div>

            <div className="space-y-2.5 mb-3">
              {/* eslint-disable-next-line no-unused-vars */}
              {features.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 border border-white/5"
                  style={{ backgroundColor: "#2d3c4f" }}
                >
                  <div className="p-1.5 rounded-lg bg-blue-500/20">
                    <Icon className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <span className="text-sm text-gray-300">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-xs text-gray-600">
            © ۱۴۰۴ بنیامین‌شاپ — تمامی حقوق محفوظ است.
          </p>
        </div>

        {/* ── Form panel ── */}
        <div className="flex-1 flex flex-col justify-center p-8 sm:p-12">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 md:hidden">
            <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-500/30">
              <ShoppingBag className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex gap-0.5">
              <span className="text-xl font-extrabold text-white">بنیامین</span>
              <span className="text-xl font-extrabold text-blue-400">شاپ</span>
            </div>
          </Link>

          {/* Step indicator — فقط از step 2 به بعد نمایش داده میشه */}
          {step > 1 && (
            <div className="flex items-center justify-center gap-2 mb-10">
              {STEPS.map((label, idx) => {
                const stepNum = idx + 1;
                const isActive = step === stepNum;
                const isDone = step > stepNum;
                return (
                  <div key={label} className="flex items-center gap-2">
                    <div
                      className={`flex items-center gap-1.5 transition-all duration-300 ${
                        isActive || isDone ? "opacity-100" : "opacity-30"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          isDone
                            ? "bg-green-500/20 text-green-400 border border-green-500/40"
                            : isActive
                              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                              : "text-gray-500 border border-gray-700"
                        }`}
                        style={
                          !isDone && !isActive
                            ? { backgroundColor: "#2d3c4f" }
                            : {}
                        }
                      >
                        {isDone ? "✓" : stepNum}
                      </div>
                      <span
                        className={`text-xs hidden sm:inline font-medium transition-colors ${
                          isActive
                            ? "text-blue-400"
                            : isDone
                              ? "text-green-400"
                              : "text-gray-600"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    {idx < STEPS.length - 1 && (
                      <div
                        className={`w-8 h-px mx-1 transition-colors duration-500 ${
                          step > stepNum ? "bg-green-500/40" : "bg-white/10"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Step content */}
          <div className="w-full max-w-sm mx-auto">
            {step === 1 && (
              <StepPhone onSubmit={handleSendCode} isLoading={loading} />
            )}
            {step === 2 && (
              <StepVerify
                phoneNumber={phoneNumber}
                onSubmit={handleLogin}
                onBack={resetFlow}
                isLoading={loading}
              />
            )}
            {step === 3 && (
              <StepRegister
                onSubmit={handleRegister}
                onBack={resetFlow}
                isLoading={loading}
              />
            )}
          </div>

          <p className="mt-8 text-xs text-gray-600 text-center max-w-xs mx-auto leading-relaxed">
            با ورود، شرایط و{" "}
            <Link
              to="/terms"
              className="text-blue-500 hover:text-blue-400 transition-colors"
            >
              قوانین استفاده
            </Link>{" "}
            از خدمات بنیامین‌شاپ را می‌پذیرید.
          </p>
        </div>
      </div>
    </div>
  );
}
