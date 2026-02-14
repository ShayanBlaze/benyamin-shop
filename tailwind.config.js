/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6",
          foreground: "#FFFFFF",
        },
        background: "#0F172A",
        foreground: "#F1F5F9",
      },
      fontFamily: {
        dana: ["Dana", "sans-serif"],
      },
    },
  },
  plugins: [import("tailwindcss-animate")],
};
