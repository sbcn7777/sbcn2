'use client'

import { useState } from 'react'
import { Sparkles, CheckCircle2, Circle, Loader2, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassCard, CardHeading } from './glass-card'
import { cn } from '@/lib/utils'

const TOTAL_SUPPLY = 500
const PRICE = 500

const requirements = [
  { label: 'Hold at least 1 SabaFi Presale NFT', progress: '1 / 1', done: true },
  { label: 'Refer 3 active players', progress: '2 / 3', done: false },
  { label: 'Generate 10,000 USDC referred volume', progress: '45,200 USDC — target reached', done: true },
  { label: '30-day holding period', progress: '21 / 30 days', done: false },
]

type Step = 'idle' | 'approving' | 'approved' | 'minting'

export function MintModule() {
  const [minted, setMinted] = useState(142)
  const [step, setStep] = useState<Step>('idle')

  const pct = (minted / TOTAL_SUPPLY) * 100
  const doneCount = requirements.filter((r) => r.done).length

  const approve = () => {
    setStep('approving')
    setTimeout(() => setStep('approved'), 1200)
  }

  const mint = () => {
    setStep('minting')
    setTimeout(() => {
      setMinted((m) => Math.min(m + 1, TOTAL_SUPPLY))
      setStep('idle')
    }, 1400)
  }

  return (
    <GlassCard className="overflow-hidden p-6">
      <CardHeading
        icon={<Sparkles className="size-4" />}
        title="Genesis Presale NFT Mint Box"
        description="Genesis Investor Pass — earns a share of platform betting yield."
        action={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/10 px-2.5 py-1 text-xs font-semibold text-destructive">
            <span className="size-1.5 rounded-full bg-destructive" aria-hidden />
            Presale Live
          </span>
        }
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <div className="flex flex-col gap-5 lg:col-span-3">
          <div>
            <div className="flex items-end justify-between">
              <span className="text-sm text-muted-foreground">Minted</span>
              <span className="font-mono text-sm">
                <span className="font-semibold text-foreground">{minted}</span>
                <span className="text-muted-foreground"> / {TOTAL_SUPPLY}</span>
              </span>
            </div>
            <div
              className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-secondary"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={TOTAL_SUPPLY}
              aria-valuenow={minted}
              aria-label="NFTs minted"
            >
              <div
                className="h-full rounded-full bg-primary shadow-[0_0_12px_rgb(255_230_0/0.6)] transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {pct.toFixed(1)}% sold · {TOTAL_SUPPLY - minted} remaining
            </p>
          </div>

          <dl className="grid grid-cols-3 gap-3">
            {[
              { k: 'Price', v: `${PRICE} USDC` },
              { k: 'Max / Wallet', v: '5' },
              { k: 'Est. APY', v: '18–24%' },
            ].map((item) => (
              <div key={item.k} className="rounded-xl border border-border bg-secondary/40 p-3">
                <dt className="text-xs text-muted-foreground">{item.k}</dt>
                <dd className="mt-1 font-mono text-sm font-semibold text-foreground">{item.v}</dd>
              </div>
            ))}
          </dl>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              variant="outline"
              onClick={approve}
              disabled={step !== 'idle'}
              className="h-11 rounded-xl text-sm font-semibold"
            >
              {step === 'approving' ? (
                <Loader2 className="animate-spin" />
              ) : step === 'approved' || step === 'minting' ? (
                <CheckCircle2 className="text-success" />
              ) : (
                <span className="flex size-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold">
                  1
                </span>
              )}
              {step === 'approving' ? 'Approving…' : step === 'idle' ? 'Approve USDC' : 'USDC Approved'}
            </Button>
            <Button
              onClick={mint}
              disabled={step !== 'approved'}
              className={cn(
                'h-11 rounded-xl text-sm font-semibold hover:bg-primary/90',
                step === 'approved' && 'glow-gold',
              )}
            >
              {step === 'minting' ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span className="flex size-5 items-center justify-center rounded-full bg-primary-foreground/15 text-[10px] font-bold">
                  2
                </span>
              )}
              {step === 'minting' ? 'Minting…' : 'Mint NFT'}
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background/40 p-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="size-4 text-primary" />
              Unlock Condition Tracker
            </h3>
            <span className="font-mono text-xs text-muted-foreground">
              {doneCount}/{requirements.length}
            </span>
          </div>
          <ul className="mt-4 flex flex-col gap-3">
            {requirements.map((r) => (
              <li key={r.label} className="flex items-start gap-2.5">
                {r.done ? (
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-label="Completed" />
                ) : (
                  <Circle className="mt-0.5 size-4 shrink-0 text-destructive" aria-label="Pending" />
                )}
                <div className="min-w-0">
                  <p className={cn('text-sm', r.done ? 'text-foreground' : 'text-secondary-foreground')}>
                    {r.label}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">{r.progress}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </GlassCard>
  )
}
