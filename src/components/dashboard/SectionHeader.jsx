export default function SectionHeader({ title, description, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-white">{title}</h1>
        {description ? (
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
