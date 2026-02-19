import { Battery, Disc, SprayCan, Wrench } from "lucide-react";

export const mobileCategoris = [
  {
    title: "لوازم مصرفی",
    icon: <SprayCan className="w-5 h-5" />,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    items: [
      "روغن موتور",
      "فیلتر هوا",
      "فیلتر روغن",
      "شمع",
      "تسمه تایم",
      "واشر سرسیلندر",
    ],
  },
  {
    title: "قطعات مکانیکی",
    icon: <Wrench className="w-5 h-5" />,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    items: ["دیسک ترمز", "لنت ترمز", "کمک فنر", "بوش", "گاردان", "کلاچ"],
  },
  {
    title: "برق و الکترونیک",
    icon: <Battery className="w-5 h-5" />,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    items: ["باتری", "دینام", "استارت", "سنسور", "ECU", "سیم کشی"],
  },
  {
    title: "تایر و رینگ",
    icon: <Disc className="w-5 h-5" />,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    items: [
      "تایر تابستانی",
      "تایر زمستانی",
      "رینگ آلومینیوم",
      "رینگ استیل",
      "زاپاس",
      "والو",
    ],
  },
];
