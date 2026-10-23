import { Users, Activity, Coins, Percent } from 'lucide-react'
import { GlassCard } from '../glass-card'

const stats = [
  { label: 'Total Referrals', value: '6', sub: '4 active this week', icon: Users },
  { label: 'Referred Volume', value: '$45,200', sub: '+$8,120 this week', icon: Activity },
  { label: 'Commission Earned', value: '$2,260.00', sub: '$186.40 claimable', icon: Coins },
  { label: 'Current Rate', value: '7%', sub: 'Gold tier', icon: Percent },
]

export function AffiliateStats() {
  return (
    <section aria-label="Affiliate metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ label, value, sub, icon: Icon }) => (
        <GlassCard key={label} className="p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{label}</p>
            <span className="flex size-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
              <Icon className="size-4" />
            </span>
          </div>
          <p className="mt-3 font-mono text-2xl font-semibold tracking-tight">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
        </GlassCard>
      ))}
    </section>
  )
}
