import api from "@/api/axiosInstance";
import {
  DEV_USER,
  DEV_TOKEN,
  MOCK_OTP,
  DEV_IS_EXISTING_USER,
} from "@/dev/mock-auth.js";

// چون بک‌اند هنوز آماده نیست، حالت ماک رو به صورت اجباری روی true قرار می‌دیم
// تا هم در حالت لوکال و هم در دیپلویمنتِ ورسل از دیتای ماک استفاده بشه.
// در آینده می‌تونید این رو مجدد به import.meta.env.DEV تغییر بدید.
const USE_MOCK_AUTH = true;

// ─── Helper: ساخت خطای شبیه‌سازی‌شده axios ───────────────────────────────
function mockAxiosError(status, message) {
  const error = new Error(message);
  error.response = { status, data: { message } };
  return error;
}

// ─── Helper: تأخیر مصنوعی برای شبیه‌سازی network ─────────────────────────
const delay = (ms = 600) => new Promise((res) => setTimeout(res, ms));

export const authService = {
  sendCode: async (phoneNumber) => {
    if (USE_MOCK_AUTH) {
      await delay();
      console.info(
        `%c[MOCK] OTP sent to ${phoneNumber} → use code: ${MOCK_OTP}`,
        "color: #60a5fa; font-weight: bold;",
      );
      return { message: "کد تأیید ارسال شد" };
    }

    const response = await api.post("/Auth/send-code", { phoneNumber });
    return response.data;
  },

  login: async (phoneNumber, code) => {
    if (USE_MOCK_AUTH) {
      await delay();

      // شبیه‌سازی کد اشتباه → 400
      if (code !== MOCK_OTP) {
        throw mockAxiosError(400, "کد وارد شده صحیح نیست");
      }

      // شبیه‌سازی کاربر جدید → 404
      if (!DEV_IS_EXISTING_USER) {
        throw mockAxiosError(404, "کاربر یافت نشد");
      }

      // شبیه‌سازی لاگین موفق
      return { token: DEV_TOKEN, userId: DEV_USER.userId };
    }

    const response = await api.post("/Auth/login", {
      phoneNumber,
      code,
      userId: "",
      token: "",
    });
    return response.data;
  },

  register: async (payload) => {
    if (USE_MOCK_AUTH) {
      await delay();
      console.info(
        `%c[MOCK] Registered user: ${payload.firstName} ${payload.lastName}`,
        "color: #34d399; font-weight: bold;",
      );
      return { token: DEV_TOKEN, userId: DEV_USER.userId };
    }

    const response = await api.post("/Auth/register", payload);
    return response.data;
  },
};
