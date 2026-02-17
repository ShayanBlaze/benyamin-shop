import { Zap, Shield, Award } from "lucide-react";

export const sliderData = [
  {
    id: 1,
    brand: "Mobil 1",
    model: "Advanced Full Synthetic",
    subtitle: "بهترین انتخاب برای موتورهای مدرن",
    price: "۱،۸۵۰،۰۰۰",
    originalPrice: "۲،۱۰۰،۰۰۰",
    discount: "12",
    stock: "موجود در انبار",
    badge: "پرفروش",
    specs: [
      { icon: Zap, label: "روانکاری فوق‌العاده" },
      { icon: Shield, label: "محافظت تا ۲۰ هزار کیلومتر" },
      { icon: Award, label: "مورد تأیید BMW و Mercedes" },
    ],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format",
  },
  {
    id: 2,
    brand: "Bosch",
    model: "AeroTwin Wiper",
    subtitle: "برف‌پاک‌کن بی‌صدا با فناوری آلمانی",
    price: "۵۴۰،۰۰۰",
    originalPrice: null,
    discount: null,
    stock: "فقط ۳ عدد باقی‌مانده",
    badge: "جدید",
    specs: [
      { icon: Shield, label: "پاک‌سازی کامل" },
      { icon: Zap, label: "عمر ۲ برابر" },
      { icon: Award, label: "نصب آسان" },
    ],
    image:
      "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?q=80&w=1200&auto=format",
  },
  {
    id: 3,
    brand: "Michelin",
    model: "Primacy 4",
    subtitle: "لاستیک چهارفصل با عملکرد استثنایی",
    price: "۴،۲۰۰،۰۰۰",
    originalPrice: "۴،۸۰۰،۰۰۰",
    discount: "15",
    stock: "موجود در انبار",
    badge: "پیشنهاد ویژه",
    specs: [
      { icon: Shield, label: "گریپ عالی در باران" },
      { icon: Zap, label: "عمر ۸۰ هزار کیلومتر" },
      { icon: Award, label: "صرفه‌جویی سوخت" },
    ],
    image:
      "https://images.unsplash.com/photo-1629897048514-3dd7414fe72a?q=80&w=1200&auto=format",
  },
];
