import { createContext, useContext, useState, useEffect } from "react";
import api from "@/api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // logout فقط state رو پاک می‌کنه.
  // navigate کردن بعد از logout، مسئولیت کامپوننت صداکننده‌ست
  // تا از race condition بین setUser(null) و window.location جلوگیری بشه.
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  useEffect(() => {
    const initAuth = () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setUser(userData);
        } catch {
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
