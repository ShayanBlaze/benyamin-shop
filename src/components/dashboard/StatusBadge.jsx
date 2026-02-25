const styles = {
  processing: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  shipped: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  delivered: "bg-green-500/10 text-green-300 border-green-500/20",
  canceled: "bg-rose-500/10 text-rose-300 border-rose-500/20",
};

const labels = {
  processing: "در حال پردازش",
  shipped: "ارسال شده",
  delivered: "تحویل شده",
  canceled: "لغو شده",
};

export default function StatusBadge({ status = "processing" }) {
  return (
    <span
      className={[
        "px-3 py-1 rounded-full text-xs font-medium border",
        styles[status] || styles.processing,
      ].join(" ")}
    >
      {labels[status] || labels.processing}
    </span>
  );
}
