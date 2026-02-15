import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function MainLayout() {
  return (
    <div
      className="min-h-screen bg-[#0F172A] text-white flex flex-col"
      dir="rtl"
    >
      <Header />

      <main className="flex-1 container mx-auto section-padding-x py-6 sm:py-8 md:py-10 lg:py-12">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
