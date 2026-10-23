type Row = { label: string; value: string; color?: string }

export function ChartTooltipBox({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <div className="rounded-lg border border-border bg-popover/95 px-3 py-2 text-xs shadow-xl backdrop-blur">
      <p className="mb-1 font-medium text-muted-foreground">{title}</p>
      {rows.map((r) => (
        <div key={r.label} className="flex items-center justify-between gap-6">
          <span className="flex items-center gap-1.5 text-secondary-foreground">
            {r.color ? <span className="size-2 rounded-full" style={{ background: r.color }} /> : null}
            {r.label}
          </span>
          <span className="font-mono font-semibold text-foreground">{r.value}</span>
        </div>
      ))}
    </div>
  )
}

export const axisProps = {
  stroke: '#64748b',
  fontSize: 11,
  tickLine: false,
  axisLine: false,
} as const
