import { Trophy, Lock } from 'lucide-react'
import { GlassCard, CardHeading } from '../glass-card'
import { cn } from '@/lib/utils'

const CURRENT_VOLUME = 45200

const tiers = [
  { name: 'Bronze', rate: '3%', min: 0, color: '#cd7f32' },
  { name: 'Silver', rate: '5%', min: 10000, color: '#cbd5e1' },
  { name: 'Gold', rate: '7%', min: 40000, color: '#ffe600' },
  { name: 'Diamond', rate: '10%', min: 100000, color: '#28a0f0' },
]

export function CommissionTiers() {
  const currentIndex = tiers.findLastIndex((t) => CURRENT_VOLUME >= t.min)
  const next = tiers[currentIndex + 1]
  const pct = next
    ? ((CURRENT_VOLUME - tiers[currentIndex].min) / (next.min - tiers[currentIndex].min)) * 100
    : 100

  return (
    <GlassCard className="flex flex-col p-6">
      <CardHeading
        icon={<Trophy className="size-4" />}
        title="Commission Tiers"
        description="Higher referred volume unlocks bigger revenue share"
      />

      <ol className="mt-6 flex flex-col gap-2.5">
        {tiers.map((t, i) => {
          const active = i === currentIndex
          const reached = i <= currentIndex
          return (
            <li
              key={t.name}
              className={cn(
                'flex items-center gap-3 rounded-xl border p-3 transition-colors',
                active ? 'border-primary/40 bg-primary/10' : 'border-border bg-secondary/30',
              )}
            >
              <span
                className="flex size-9 items-center justify-center rounded-lg border text-sm font-bold"
                style={{ borderColor: `${t.color}55`, color: t.color, background: `${t.color}14` }}
              >
                {reached ? t.name[0] : <Lock className="size-3.5" aria-label="Locked" />}
              </span>
              <div className="min-w-0">
                <p className={cn('text-sm font-semibold', reached ? 'text-foreground' : 'text-muted-foreground')}>
                  {t.name}
                  {active && (
                    <span className="ml-2 rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
                      Current
                    </span>
                  )}
                </p>
                <p className="font-mono text-xs text-muted-foreground">≥ {t.min.toLocaleString('en-US')} USDC volume</p>
              </div>
              <span className={cn('ml-auto font-mono text-lg font-semibold', reached ? 'text-foreground' : 'text-muted-foreground')}>
                {t.rate}
              </span>
            </li>
          )
        })}
      </ol>

      {next && (
        <div className="mt-6">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress to {next.name}</span>
            <span className="font-mono text-foreground">
              {CURRENT_VOLUME.toLocaleString('en-US')} / {next.min.toLocaleString('en-US')}
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary" aria-hidden>
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-[#28a0f0]" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            <span className="font-mono text-primary">{(next.min - CURRENT_VOLUME).toLocaleString('en-US')} USDC</span> more
            referred volume to reach {next.rate} commission.
          </p>
        </div>
      )}
    </GlassCard>
  )
}
