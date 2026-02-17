import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        md: "2rem",
        lg: "2.5rem",
        xl: "3rem",
        "2xl": "4rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xs: "480px",
        "3xl": "1600px",
      },
      colors: {
        primary: {
          DEFAULT: "#3B82F6",
          foreground: "#FFFFFF",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        // Dark mode colors
        background: {
          DEFAULT: "#0F172A", // dark background
          light: "#FFFFFF", // light background
        },
        foreground: {
          DEFAULT: "#F1F5F9", // dark text
          light: "#0F172A", // light text
        },
        card: {
          DEFAULT: "#1E293B", // dark card
          light: "#FFFFFF", // light card
        },
        border: {
          DEFAULT: "#334155", // dark border
          light: "#E2E8F0", // light border
        },
        muted: {
          DEFAULT: "#475569", // dark muted
          light: "#94A3B8", // light muted
        },
      },
      fontFamily: {
        dana: ["Dana", "sans-serif"],
      },
      spacing: {
        // Custom spacing برای consistency
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
      },
      backgroundColor: {
        // Dynamic backgrounds based on theme
        'theme': 'var(--bg-theme)',
        'theme-secondary': 'var(--bg-theme-secondary)',
      },
      textColor: {
        'theme': 'var(--text-theme)',
        'theme-secondary': 'var(--text-theme-secondary)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
