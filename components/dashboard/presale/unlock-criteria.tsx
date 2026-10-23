import { ShieldCheck, CheckCircle2, Circle } from 'lucide-react'
import { GlassCard, CardHeading } from '../glass-card'
import { cn } from '@/lib/utils'

const criteria = [
  { label: 'Min Staking Volume', detail: '10,000 USDC staked in vault', current: 12500, target: 10000, unit: 'USDC' },
  { label: 'Active Referrals', detail: 'Refer 3 players with live bets', current: 2, target: 3, unit: 'players' },
  { label: 'Referred Volume', detail: 'Generate 25,000 USDC referred volume', current: 45200, target: 25000, unit: 'USDC' },
  { label: 'Holding Period', detail: 'Hold Genesis NFT for 30 days', current: 21, target: 30, unit: 'days' },
]

export function UnlockCriteria() {
  const done = criteria.filter((c) => c.current >= c.target).length

  return (
    <GlassCard className="flex flex-col p-6">
      <CardHeading
        icon={<ShieldCheck className="size-4" />}
        title="Unlock Criteria"
        description="Complete all to unlock yield withdrawals"
        action={
          <span className="rounded-md border border-border bg-secondary px-2 py-1 font-mono text-xs font-semibold">
            {done}/{criteria.length}
          </span>
        }
      />
      <ul className="mt-6 flex flex-col gap-5">
        {criteria.map((c) => {
          const met = c.current >= c.target
          const pct = Math.min(100, (c.current / c.target) * 100)
          return (
            <li key={c.label}>
              <div className="flex items-start gap-2.5">
                {met ? (
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-label="Met" />
                ) : (
                  <Circle className="mt-0.5 size-4 shrink-0 text-destructive" aria-label="Pending" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">{c.label}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {c.current.toLocaleString('en-US')} / {c.target.toLocaleString('en-US')} {c.unit}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">{c.detail}</p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary" aria-hidden>
                    <div
                      className={cn('h-full rounded-full', met ? 'bg-success' : 'bg-destructive')}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </GlassCard>
  )
}
