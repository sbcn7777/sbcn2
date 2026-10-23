import { Gauge } from 'lucide-react'
import { GlassCard, CardHeading } from '../glass-card'

const sources = [
  { label: 'Betting house edge', pct: 68, color: '#ffe600' },
  { label: 'Protocol fees', pct: 21, color: '#28a0f0' },
  { label: 'Marketplace royalties', pct: 11, color: '#ef4444' },
]

export function ApyPanel() {
  return (
    <GlassCard className="flex flex-col p-6">
      <CardHeading icon={<Gauge className="size-4" />} title="Real Yield APY" description="Trailing 30-day annualised" />
      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-mono text-5xl font-semibold tracking-tight text-primary">38.4%</span>
        <span className="font-mono text-sm font-semibold text-success">+4.1%</span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">Paid in USDC · no token emissions</p>

      <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Yield Sources</h3>
      <ul className="mt-3 flex flex-col gap-4">
        {sources.map((s) => (
          <li key={s.label}>
            <div className="flex justify-between text-sm">
              <span className="text-secondary-foreground">{s.label}</span>
              <span className="font-mono text-foreground">{s.pct}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary" aria-hidden>
              <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
            </div>
          </li>
        ))}
      </ul>

      <dl className="mt-auto grid grid-cols-2 gap-3 pt-6">
        <div className="rounded-xl border border-border bg-secondary/40 p-3">
          <dt className="text-xs text-muted-foreground">Next distribution</dt>
          <dd className="mt-1 font-mono text-sm font-semibold">Oct 31, 00:00 UTC</dd>
        </div>
        <div className="rounded-xl border border-border bg-secondary/40 p-3">
          <dt className="text-xs text-muted-foreground">Per NFT (est.)</dt>
          <dd className="mt-1 font-mono text-sm font-semibold text-success">+$36.92</dd>
        </div>
      </dl>
    </GlassCard>
  )
}
