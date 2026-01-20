const data = [
  [0, 1, 0, 2, 0, 0, 0],
  [0, 3, 0, 1, 0, 0, 0],
  [0, 0, 2, 0, 4, 0, 0],
  [0, 1, 0, 0, 2, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
];

function getColor(level: number) {
  switch (level) {
    case 0:
      return "bg-[var(--color-border)]";
    case 1:
      return "bg-green-900";
    case 2:
      return "bg-green-700";
    case 3:
      return "bg-green-500";
    default:
      return "bg-green-400";
  }
}

export default function Heatmap() {
  return (
    <div>
      {/* GRID */}
      <div className="flex gap-2">
        {data.map((week, i) => (
          <div key={i} className="grid grid-rows-7 gap-1">
            {week.map((day, j) => (
              <div
                key={j}
                className={`w-3 h-3 rounded-sm ${getColor(day)}`}
                title={`${day} contributions`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* LEGEND */}
      <div className="mt-6 flex items-center gap-2 text-xs text-[var(--color-muted)]">
        <span>Less</span>

        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-[var(--color-border)]" />
          <div className="w-3 h-3 rounded-sm bg-green-900" />
          <div className="w-3 h-3 rounded-sm bg-green-700" />
          <div className="w-3 h-3 rounded-sm bg-green-500" />
          <div className="w-3 h-3 rounded-sm bg-green-400" />
        </div>

        <span>More</span>
      </div>
    </div>
  );
}
