import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { GlassCard } from '../glass-card'

const stats = [
  { label: 'Floor Price', value: '580 USDC', change: '+12.0%' },
  { label: '24h Volume', value: '$125,000', change: '+31.4%' },
  { label: 'Total Listed', value: '32 NFTs', sub: '6.4% of supply' },
  { label: 'Owners', value: '118', sub: '1.2 NFT / wallet' },
  { label: 'Best Bid', value: '572 USDC', sub: 'Spread 1.4%' },
]

export function MarketStats() {
  return (
    <GlassCard className="flex flex-col gap-5 p-5 lg:flex-row lg:items-center">
      <div className="flex items-center gap-3 lg:border-r lg:border-border lg:pr-6">
        <Image
          src="/sabafi-logo.png"
          alt=""
          width={44}
          height={44}
          className="rounded-xl border border-primary/30"
        />
        <div>
          <p className="flex items-center gap-2 text-base font-bold">
            GENESIS / USDC
            <span className="rounded border border-[#28a0f0]/30 bg-[#28a0f0]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[#28a0f0]">
              ARB
            </span>
          </p>
          <p className="text-xs text-muted-foreground">SabaFi Genesis Investor Pass</p>
        </div>
      </div>
      <dl className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="text-xs text-muted-foreground">{s.label}</dt>
            <dd className="mt-1 font-mono text-lg font-semibold text-foreground">{s.value}</dd>
            {s.change ? (
              <dd className="inline-flex items-center gap-0.5 font-mono text-xs font-semibold text-[#22c55e]">
                <ArrowUpRight className="size-3" /> {s.change} 24h
              </dd>
            ) : (
              <dd className="font-mono text-xs text-muted-foreground">{s.sub}</dd>
            )}
          </div>
        ))}
      </dl>
    </GlassCard>
  )
}
