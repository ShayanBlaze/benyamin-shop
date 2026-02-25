import { Battery, Disc, SprayCan, Wrench } from "lucide-react";

export const carCategories = [
  {
    title: "لوازم مصرفی",
    icon: <SprayCan className="w-5 h-5" />,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    items: [
      "روغن موتور",
      "فیلتر روغن و هوا",
      "لنت ترمز",
      "شمع و وایر",
      "ضدیخ و آب رادیاتور",
    ],
  },
  {
    title: "قطعات یدکی",
    icon: <Wrench className="w-5 h-5" />,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    items: ["دیسک و صفحه", "تسمه تایم", "واتر پمپ", "کمک فنر", "بلبرینگ چرخ"],
  },
  {
    title: "برق و انژکتور",
    icon: <Battery className="w-5 h-5" />,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    items: [
      "باتری خودرو",
      "دینام و استارت",
      "سنسور اکسیژن",
      "کوئل",
      "فیوز و رله",
    ],
  },
  {
    title: "تزئینات و سیستم",
    icon: <Disc className="w-5 h-5" />,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    items: [
      "کفپوش سه بعدی",
      "روکش صندلی",
      "ضبط و باند",
      "هدلایت و زنون",
      "خوشبو کننده",
    ],
  },
];
