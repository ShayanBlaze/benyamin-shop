import {
  Send,
  ChevronDown,
  ArrowLeft,
  Shield,
  Truck,
  RotateCcw,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { footerLinks } from "@/const";
import { socialLinks } from "@/const/socialLinks";
import { TeamModal } from "./TeamModal";
import { contactItems } from "@/const";

// ─── Accordion (mobile only) ────────────────────────────────────────────────
function AccordionSection({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/8 lg:border-none">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 lg:py-0 lg:cursor-default"
      >
        <span className="text-sm font-semibold text-white/90 tracking-wide">
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-500 transition-transform duration-300 lg:hidden ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 lg:block ${
          open ? "max-h-96 pb-5" : "max-h-0 lg:max-h-none"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Trust Badge ─────────────────────────────────────────────────────────────
function TrustBadge({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/4 border border-white/6 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 group">
      <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300">
        <Icon className="w-4 h-4 text-blue-400" />
      </div>
      <div>
        <p className="text-xs font-semibold text-white/80">{title}</p>
        <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

// ─── Main Footer ─────────────────────────────────────────────────────────────
function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [teamModalOpen, setTeamModalOpen] = useState(false);

  const handleSubscribe = () => {
    if (email) setSubscribed(true);
  };

  return (
    <footer
      dir="rtl"
      className="relative bg-[#0c1520] dark:bg-slate-950 text-slate-400"
    >
      {/* ── Top gradient separator ── */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-blue-500/40 to-transparent" />
      {/* ── Trust Badges Strip ── */}
      <div className="border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <TrustBadge
              icon={Shield}
              title="ضمانت اصالت کالا"
              subtitle="تمام محصولات دارای گارانتی"
            />
            <TrustBadge
              icon={Truck}
              title="ارسال سریع"
              subtitle="تحویل ۱ تا ۳ روز کاری"
            />
            <TrustBadge
              icon={RotateCcw}
              title="۷ روز مرجوعی"
              subtitle="بدون سوال و پیچیدگی"
            />
            <TrustBadge
              icon={Clock}
              title="پشتیبانی آنلاین"
              subtitle="شنبه تا پنجشنبه ۹ تا ۱۸"
            />
          </div>
        </div>
      </div>
      {/* ── Certifications & Trust Marks ── */}
      <div className="border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6">
          {/* Title */}
          <p className="text-xs text-slate-500 text-center mb-5 tracking-wide">
            نمادهای اعتماد و مجوزهای فعالیت
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
            >
              <div
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-white/4 border border-white/8
                        group-hover:border-blue-500/30 group-hover:bg-blue-500/5
                        transition-all duration-300 flex items-center justify-center
                        group-hover:shadow-lg group-hover:shadow-blue-500/10"
              >
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-[10px] font-bold text-blue-400 leading-none">
                    e
                  </span>
                  <span className="text-[8px] text-slate-500 leading-none">
                    NAMAD
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-slate-600 group-hover:text-slate-400 transition-colors">
                اینماد
              </span>
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
            >
              <div
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-white/4 border border-white/8
                        group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5
                        transition-all duration-300 flex items-center justify-center
                        group-hover:shadow-lg group-hover:shadow-emerald-500/10"
              >
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-[10px] font-bold text-emerald-400 leading-none">
                    SAMAN
                  </span>
                  <span className="text-[8px] text-slate-500 leading-none">
                    DEHI
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-slate-600 group-hover:text-slate-400 transition-colors">
                ساماندهی
              </span>
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
            >
              <div
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-white/4 border border-white/8
                        group-hover:border-yellow-500/30 group-hover:bg-yellow-500/5
                        transition-all duration-300 flex items-center justify-center
                        group-hover:shadow-lg group-hover:shadow-yellow-500/10"
              >
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-[10px] font-bold text-yellow-400 leading-none">
                    ZARIN
                  </span>
                  <span className="text-[8px] text-slate-500 leading-none">
                    PAY
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-slate-600 group-hover:text-slate-400 transition-colors">
                زرین‌پال
              </span>
            </a>

            {/* SSL */}
            <div className="group flex flex-col items-center gap-2 cursor-default">
              <div
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-white/4 border border-white/8
                        group-hover:border-green-500/30 group-hover:bg-green-500/5
                        transition-all duration-300 flex items-center justify-center
                        group-hover:shadow-lg group-hover:shadow-green-500/10"
              >
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-[10px] font-bold text-green-400 leading-none">
                    SSL
                  </span>
                  <span className="text-[8px] text-slate-500 leading-none">
                    SECURE
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-slate-600 group-hover:text-slate-400 transition-colors">
                اتصال امن
              </span>
            </div>
          </div>
        </div>
      </div>
      ;{/* ── Main Grid ── */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* ── Col 1: Brand ── */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logotype */}
            <div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-2xl font-bold text-white">بنیامین</span>
                <span className="text-2xl font-bold bg-linear-to-l from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  شاپ
                </span>
              </div>
              <p className="text-xs text-slate-500 tracking-wide">
                مرجع تخصصی لوازم یدکی خودرو
              </p>
            </div>

            {/* About text */}
            <p className="text-sm text-slate-400 leading-7">
              بنیامین شاپ با بیش از یک دهه تجربه در حوزه لوازم یدکی، قطعات اصل و
              باکیفیت برای تمام برندهای ایرانی و خارجی را با ضمانت اصالت به شما
              ارائه می‌دهد.
            </p>

            {/* Social links */}
            <div>
              <p className="text-xs text-slate-500 mb-3 font-medium">
                ما را در شبکه‌های اجتماعی دنبال کنید
              </p>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    title={social.label}
                    className="relative p-2.5 rounded-xl bg-white/5 border border-white/8 hover:bg-blue-600 hover:border-blue-600 text-slate-400 hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20 group"
                  >
                    {social.icon}
                    {/* Tooltip */}
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div className="lg:col-span-2">
            <AccordionSection title="دسترسی سریع">
              <ul className="space-y-1 md:mt-4">
                {footerLinks.quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group flex items-center justify-between py-2 px-2.5 rounded-lg text-sm text-slate-400 hover:text-blue-400 hover:bg-blue-500/8 transition-all duration-200"
                    >
                      <span>{link.label}</span>
                      <ArrowLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionSection>
          </div>

          {/* ── Col 3: Categories ── */}
          <div className="lg:col-span-3">
            <AccordionSection title="دسته‌بندی محصولات">
              <ul className="space-y-1 md:mt-4">
                {footerLinks.categories.map((cat) => (
                  <li key={cat.label}>
                    <a
                      href={cat.href}
                      className="group flex items-center justify-between py-2 px-2.5 rounded-lg text-sm text-slate-400 hover:text-blue-400 hover:bg-blue-500/8 transition-all duration-200"
                    >
                      <span>{cat.label}</span>
                      <ArrowLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionSection>
          </div>

          {/* ── Col 4: Contact + Newsletter ── */}
          <div className="lg:col-span-3 space-y-6">
            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold text-white/90 mb-4 hidden lg:block">
                تماس با ما
              </h3>
              <ul className="space-y-3">
                {contactItems.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="group flex items-start gap-3 hover:text-slate-300 transition-colors duration-200"
                      >
                        <span className="mt-0.5 p-1.5 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-200 shrink-0">
                          <item.icon className="w-3.5 h-3.5 text-blue-400" />
                        </span>
                        <div>
                          <p className="text-[11px] text-slate-500 mb-0.5">
                            {item.label}
                          </p>
                          <p className="text-sm text-slate-300">{item.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 p-1.5 rounded-lg bg-blue-500/10 shrink-0">
                          <item.icon className="w-3.5 h-3.5 text-blue-400" />
                        </span>
                        <div>
                          <p className="text-[11px] text-slate-500 mb-0.5">
                            {item.label}
                          </p>
                          <p className="text-sm text-slate-300">{item.value}</p>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Card */}
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-600/15 to-blue-900/10 border border-blue-500/15 p-5">
              {/* Glow */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <p className="text-sm font-semibold text-white mb-1 relative">
                خبرنامه بنیامین شاپ
              </p>
              <p className="text-xs text-slate-500 mb-4 relative">
                از تخفیف‌ها و جدیدترین محصولات باخبر باش
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-green-400 text-sm py-2">
                  <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-xs">
                    ✓
                  </span>
                  عضویت با موفقیت انجام شد!
                </div>
              ) : (
                <div className="flex gap-2 relative">
                  <Input
                    type="email"
                    placeholder="ایمیل خود را وارد کنید"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 text-sm h-10 rounded-xl focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0 focus-visible:border-blue-500/50"
                  />
                  <Button
                    onClick={handleSubscribe}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-500 text-white h-10 px-4 rounded-xl shrink-0 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-5">
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-xs text-slate-600">
              © {new Date().getFullYear()} بنیامین شاپ — تمام حقوق محفوظ است
            </p>

            {/* Legal links */}
            <div className="flex items-center gap-1 text-xs text-slate-500">
              {[
                { label: "حریم خصوصی", href: "#" },
                { label: "قوانین و مقررات", href: "#" },
                { label: "راهنمای خرید", href: "#" },
              ].map((link, i, arr) => (
                <span key={link.label} className="flex items-center gap-1">
                  <a
                    href={link.href}
                    className="hover:text-slate-300 transition-colors duration-200 px-1"
                  >
                    {link.label}
                  </a>
                  {i < arr.length - 1 && (
                    <span className="text-slate-700">·</span>
                  )}
                </span>
              ))}
            </div>

            {/* Mini logo */}
            <div className="flex items-baseline gap-0.5">
              <span className="text-sm font-bold text-white/40">بنیامین</span>
              <span className="text-sm font-bold text-blue-500/60">شاپ</span>
            </div>
          </div>

          {/* ── Developer Credit ── */}
          <div className="mt-4 pt-4 border-t border-white/4 flex justify-center">
            <button
              onClick={() => setTeamModalOpen(true)}
              className="group flex items-center gap-1.5 text-[11px] text-slate-600
               hover:text-slate-400 transition-colors duration-300 cursor-pointer"
            >
              <span>ساخته شده با</span>
              <span className="text-red-500/60 group-hover:text-red-400 transition-colors">
                ♥
              </span>
              <span>توسط</span>
              <span
                className="font-medium text-slate-500 group-hover:text-blue-400
                     transition-colors duration-300
                     underline underline-offset-2 decoration-dotted"
              >
                تیم توسعه بنیامین شاپ
              </span>
              <span
                className="w-1 h-1 rounded-full bg-blue-500/50
                     group-hover:bg-blue-400
                     group-hover:shadow-[0_0_6px_2px_rgba(96,165,250,0.4)]
                     transition-all duration-300"
              />
            </button>
          </div>

          {/* Modal */}
          <TeamModal open={teamModalOpen} onOpenChange={setTeamModalOpen} />
        </div>
      </div>
      <TeamModal open={teamModalOpen} onOpenChange={setTeamModalOpen} />
    </footer>
  );
}

export default Footer;
