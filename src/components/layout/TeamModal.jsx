import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Github, Linkedin } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { teamMembers } from "@/const";

// ─── Shared Content ───────────────────────────────────────────────────────────
function TeamContent() {
  return (
    <div className="space-y-3">
      {teamMembers.map((member) => (
        <div
          key={member.name}
          className="flex items-center gap-4 p-4 rounded-xl
                     bg-white/4 border border-white/6
                     hover:border-white/12 transition-colors duration-200"
        >
          {/* Avatar */}
          <div
            className={`w-11 h-11 rounded-xl bg-linear-to-br ${member.color}
                        flex items-center justify-center
                        text-sm font-bold text-white shrink-0 shadow-lg`}
          >
            {member.avatar}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">{member.name}</p>
            <p className="text-xs text-blue-400 mt-0.5">{member.role}</p>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {member.description}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-1.5 shrink-0">
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10
                           text-slate-400 hover:text-white transition-all duration-200"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-blue-600
                           text-slate-400 hover:text-white transition-all duration-200"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      ))}

      <p className="text-center text-[11px] text-slate-600 pt-1">
        ساخته شده با ♥ در ایران
      </p>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function TeamModal({ open, onOpenChange }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          dir="rtl"
          className="bg-[#0f1923] border-white/10 text-white max-w-lg"
        >
          <DialogHeader className="text-right">
            <DialogTitle className="text-base font-bold text-white">
              تیم توسعه بنیامین شاپ
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 text-right">
              افرادی که این پروژه رو از صفر ساختن
            </DialogDescription>
          </DialogHeader>

          <div className="mt-1">
            <TeamContent />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        dir="rtl"
        className="bg-[#0f1923] border-t border-white/10 text-white px-4 pb-8"
      >
        {/* Drag handle */}
        <div className="mx-auto w-10 h-1 rounded-full bg-white/20 mt-3 mb-1" />

        <DrawerHeader className="text-right px-0 pb-3">
          <DrawerTitle className="text-base font-bold text-white">
            تیم توسعه بنیامین شاپ
          </DrawerTitle>
          <DrawerDescription className="text-xs text-slate-500 text-right">
            افرادی که این پروژه رو از صفر ساختن
          </DrawerDescription>
        </DrawerHeader>

        <TeamContent />
      </DrawerContent>
    </Drawer>
  );
}
