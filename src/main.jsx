import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext";

if (import.meta.env.DEV) {
  const { DEV_TOKEN, DEV_USER } = await import("./dev/mock-auth.js");

  if (!localStorage.getItem("token")) {
    localStorage.setItem("token", DEV_TOKEN);
    localStorage.setItem("user", JSON.stringify(DEV_USER));
  }
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
