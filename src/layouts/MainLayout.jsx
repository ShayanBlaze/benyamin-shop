import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white max-w-9/12 m-auto" dir="rtl">
      <Header />
      <main className="container mx-auto px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
