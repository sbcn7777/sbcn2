import Link from 'next/link'
import { Wallet, ArrowUpRight } from 'lucide-react'
import { GlassCard, CardHeading } from '../glass-card'

const allocation = [
  { label: 'Genesis NFTs (3)', value: 1740, color: '#ffe600' },
  { label: 'Unclaimed Yield', value: 320.1, color: '#22c55e' },
  { label: 'Affiliate Balance', value: 186.4, color: '#28a0f0' },
  { label: 'Wallet USDC', value: 412.0, color: '#ef4444' },
]

export function PortfolioSummary() {
  const total = allocation.reduce((s, a) => s + a.value, 0)

  return (
    <GlassCard className="flex flex-col p-6">
      <CardHeading icon={<Wallet className="size-4" />} title="Portfolio Summary" description="Net value at floor price" />

      <div className="mt-6">
        <p className="text-xs text-muted-foreground">Net Worth</p>
        <p className="mt-1 flex items-baseline gap-2">
          <span className="font-mono text-3xl font-semibold tracking-tight">
            ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="font-mono text-xs font-semibold text-success">+8.2%</span>
        </p>
      </div>

      <div className="mt-5 flex h-2.5 w-full overflow-hidden rounded-full bg-secondary" aria-hidden>
        {allocation.map((a) => (
          <span key={a.label} style={{ width: `${(a.value / total) * 100}%`, background: a.color }} />
        ))}
      </div>

      <ul className="mt-5 flex flex-col gap-3">
        {allocation.map((a) => (
          <li key={a.label} className="flex items-center gap-3 text-sm">
            <span className="size-2.5 rounded-sm" style={{ background: a.color }} aria-hidden />
            <span className="text-secondary-foreground">{a.label}</span>
            <span className="ml-auto font-mono text-foreground">
              ${a.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="w-12 text-right font-mono text-xs text-muted-foreground">
              {((a.value / total) * 100).toFixed(1)}%
            </span>
          </li>
        ))}
      </ul>

      <Link
        href="/analytics"
        className="mt-auto flex items-center justify-center gap-1.5 pt-6 text-sm font-medium text-primary hover:underline"
      >
        View full analytics <ArrowUpRight className="size-4" />
      </Link>
    </GlassCard>
  )
}
