import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardCard from "./DashboardCard";

export default function EmptyState({
  title,
  description,
  ctaLabel = "بازگشت به فروشگاه",
  ctaTo = "/",
}) {
  return (
    <DashboardCard className="p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
          <Sparkles className="w-6 h-6 text-blue-300" />
        </div>
        <div className="flex-1">
          <p className="text-white font-bold">{title}</p>
          <p className="text-sm text-gray-400 mt-1">{description}</p>

          <div className="mt-4">
            <Link
              to={ctaTo}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
