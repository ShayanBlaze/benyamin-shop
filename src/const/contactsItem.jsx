import { Clock, Mail, MapPin, Phone } from "lucide-react";

export const contactItems = [
  {
    icon: Phone,
    label: "شماره تماس",
    value: "۰۲۱-۱۲۳۴-۵۶۷۸",
    href: "tel:02112345678",
  },
  {
    icon: Mail,
    label: "آدرس ایمیل",
    value: "info@benyaminshop.ir",
    href: "mailto:info@benyaminshop.ir",
  },
  {
    icon: MapPin,
    label: "آدرس",
    value: "تهران، بازار بزرگ قطعات خودرو",
    href: "#",
  },
  {
    icon: Clock,
    label: "ساعت پاسخگویی",
    value: "شنبه تا پنجشنبه، ۹ تا ۱۸",
    href: null,
  },
];
