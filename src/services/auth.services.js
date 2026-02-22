import api from "@/api/axiosInstance";

export const authService = {
  sendCode: async (phoneNumber) => {
    const response = await api.post("/Auth/send-code", { phoneNumber });
    return response.data;
  },

  login: async (phoneNumber, code) => {
    const response = await api.post("/Auth/login", {
      phoneNumber,
      code,
      // userId,
      // token,
    });
    return response.data;
  },

  register: async (payload) => {
    const response = await api.post("/Auth/register", payload);
    return response.data;
  },
};
