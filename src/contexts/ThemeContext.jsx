import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

/**
 * ThemeProvider - مدیریت تم سراسری برنامه
 * 
 * ویژگی‌ها:
 * - ذخیره‌سازی در localStorage
 * - پشتیبانی از system preference
 * - تغییر خودکار class در document
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // بررسی localStorage
    const savedTheme = localStorage.getItem("benyamin-shop-theme");
    if (savedTheme) {
      return savedTheme;
    }

    // بررسی system preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "dark"; // default به dark
  });

  useEffect(() => {
    const root = document.documentElement;

    // حذف تم قبلی
    root.classList.remove("light", "dark");

    // اضافه کردن تم جدید
    root.classList.add(theme);

    // ذخیره در localStorage
    localStorage.setItem("benyamin-shop-theme", theme);
  }, [theme]);

  // گوش دادن به تغییرات system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      // فقط اگر کاربر manual تنظیم نکرده باشد
      const savedTheme = localStorage.getItem("benyamin-shop-theme");
      if (!savedTheme) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const setLightTheme = () => setTheme("light");
  const setDarkTheme = () => setTheme("dark");

  const value = {
    theme,
    isDark: theme === "dark",
    isLight: theme === "light",
    toggleTheme,
    setLightTheme,
    setDarkTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * useTheme - Hook برای دسترسی به theme context
 * 
 * @returns {Object} theme context value
 * @throws {Error} اگر خارج از ThemeProvider استفاده شود
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

export default ThemeContext;
