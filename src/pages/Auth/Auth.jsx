import { useLogin } from "@/hooks/useLogin";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import StepPhone from "@/components/auth/StepPhone";
import StepVerify from "@/components/auth/StepVerify";
import StepRegister from "@/components/auth/StepRegister";

export default function Auth() {
  const { user } = useAuth();
  const {
    step,
    phoneNumber,
    loading,
    handleSendCode,
    handleLogin,
    handleRegister,
    resetFlow,
  } = useLogin();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <Link to="/" className="mb-8 flex items-center gap-1">
        <span className="text-3xl font-bold text-slate-800">بنیامین</span>
        <span className="text-3xl font-bold text-blue-600">شاپ</span>
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
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

      <p className="mt-6 text-xs text-slate-500 text-center max-w-sm">
        با ورود و یا ثبت نام در بنیامین شاپ، شما شرایط و قوانین استفاده از خدمات
        ما را می‌پذیرید.
      </p>
    </div>
  );
}
