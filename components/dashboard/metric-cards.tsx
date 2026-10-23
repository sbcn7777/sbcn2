'use client'

import { useState } from 'react'
import { Gem, TrendingUp, Coins, Users, Lock, Unlock, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassCard } from './glass-card'
import { cn } from '@/lib/utils'

function MetricShell({
  label,
  icon,
  children,
  highlight = false,
}: {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
  highlight?: boolean
}) {
  return (
    <GlassCard
      className={cn(
        'flex flex-col gap-4 p-5',
        highlight && 'border-primary/40 bg-[radial-gradient(120%_100%_at_100%_0%,rgb(255_230_0/0.12),transparent_60%)]',
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className="flex size-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
          {icon}
        </span>
      </div>
      {children}
    </GlassCard>
  )
}

function Amount({ value }: { value: string }) {
  return (
    <p className="flex items-baseline gap-1.5">
      <span className="font-mono text-2xl font-semibold tracking-tight text-foreground">{value}</span>
      <span className="text-xs font-medium text-muted-foreground">USDC</span>
    </p>
  )
}

export function MetricCards() {
  const [unclaimed, setUnclaimed] = useState(320.1)
  const [claimed, setClaimed] = useState(false)

  const handleClaim = () => {
    setUnclaimed(0)
    setClaimed(true)
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricShell label="NFT Holdings" icon={<Gem className="size-4" />}>
        <p className="font-mono text-2xl font-semibold tracking-tight">3 NFTs</p>
        <div className="flex flex-wrap gap-2 text-xs font-medium">
          <span className="inline-flex items-center gap-1 rounded-md border border-success/30 bg-success/10 px-2 py-1 text-success">
            <Unlock className="size-3" /> 2 Unlocked
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border border-destructive/30 bg-destructive/10 px-2 py-1 text-destructive">
            <Lock className="size-3" /> 1 Locked
          </span>
        </div>
      </MetricShell>

      <MetricShell label="Total Yield Earned" icon={<TrendingUp className="size-4" />}>
        <Amount value={claimed ? '$1,565.60' : '$1,245.50'} />
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-success">+12.4%</span> vs last 30 days
        </p>
      </MetricShell>

      <MetricShell label="Unclaimed Yield" icon={<Coins className="size-4" />} highlight>
        <div className="flex items-end justify-between gap-3">
          <Amount
            value={`$${unclaimed.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          />
          <Button
            onClick={handleClaim}
            disabled={unclaimed === 0}
            className="glow-gold h-9 rounded-lg px-4 font-semibold hover:bg-primary/90"
          >
            {claimed ? (
              <>
                <Check /> Claimed
              </>
            ) : (
              'Claim All'
            )}
          </Button>
        </div>
      </MetricShell>

      <MetricShell label="Total Referred Volume" icon={<Users className="size-4" />}>
        <Amount value="$45,200" />
        <p className="text-xs text-muted-foreground">
          From <span className="font-medium text-foreground">18</span> referred players
        </p>
      </MetricShell>
    </div>
  )
}
