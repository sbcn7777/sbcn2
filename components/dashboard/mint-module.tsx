'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Sparkles, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassCard, CardHeading } from './glass-card'
import { cn } from '@/lib/utils'

const TOTAL_SUPPLY = 500
const PRICE = 500

type Step = 'idle' | 'approving' | 'approved' | 'minting'

export function MintModule() {
  const [minted, setMinted] = useState(142)
  const [step, setStep] = useState<Step>('idle')

  const pct = (minted / TOTAL_SUPPLY) * 100

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

        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-primary/20 bg-[radial-gradient(80%_80%_at_50%_30%,rgb(255_230_0/0.14),transparent_70%)] p-6 lg:col-span-2">
          <Image
            src="/sabafi-logo.png"
            alt="Genesis Investor Pass artwork"
            width={160}
            height={160}
            className="rounded-2xl border border-primary/30 shadow-[0_0_48px_-8px_rgb(255_230_0/0.6)]"
          />
          <p className="mt-4 text-sm font-semibold text-foreground">Genesis Investor Pass</p>
          <p className="font-mono text-xs text-muted-foreground">Next mint: #{minted + 1}</p>
        </div>
      </div>
    </GlassCard>
  )
}
