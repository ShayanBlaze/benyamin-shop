import { authService } from "@/services/auth.services";

const TEST_PHONE = "09016363878";

(async function testSendCode() {
  console.group("🧪 Auth send-code Test");

  try {
    const res = await authService.sendCode(TEST_PHONE);
    console.log("✅ send-code OK:", res);
  } catch (err) {
    console.log("❌ send-code FAILED");
    console.log("message:", err.message);
    console.log("status:", err.response?.status);
    console.log("data:", err.response?.data);
  } finally {
    console.groupEnd();
  }
})();
