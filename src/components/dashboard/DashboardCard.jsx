export default function DashboardCard({ children, className = "" }) {
  return (
    <div
      className={[
        "bg-[#2d3c4f] rounded-2xl border border-white/5",
        "hover:border-blue-500/20 transition-colors",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
