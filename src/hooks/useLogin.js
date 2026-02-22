import { useState } from "react";
import { authService } from "@/services/auth.services";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export const useLogin = () => {
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (phone) => {
    setLoading(true);
    try {
      await authService.sendCode(phone);
      setPhoneNumber(phone);
      setStep(2);
      toast.success("کد تایید ارسال شد");
    } catch (error) {
      toast.error(error.response?.data?.message || "خطا در ارسال کد");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (code) => {
    setLoading(true);
    setOtpCode(code);
    try {
      const data = await authService.login(phoneNumber, code);

      login(data.token, { userId: data.userId, phoneNumber });

      toast.success("خوش آمدید!");
      return { success: true };
    } catch (error) {
      const status = error.response?.status;
      if (status === 404) {
        setStep(3);
        toast.info("حساب کاربری پیدا نشد. لطفاً ثبت نام کنید.");
        return { success: false, needsRegister: true };
      }
      toast.error(error.response?.data?.message || "کد وارد شده صحیح نیست");
      return { success: false, needsRegister: false };
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setLoading(true);
    try {
      const data = await authService.register({
        phoneNumber,
        code: otpCode,
        ...formData,
      });

      login(data.token, { userId: data.userId, phoneNumber });

      toast.success("ثبت نام با موفقیت انجام شد!");
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || "خطا در ثبت نام");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const resetFlow = () => {
    setStep(1);
    setPhoneNumber("");
    setOtpCode("");
  };

  return {
    step,
    phoneNumber,
    loading,
    handleSendCode,
    handleLogin,
    handleRegister,
    resetFlow,
  };
};
