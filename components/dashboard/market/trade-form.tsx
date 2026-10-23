'use client'

import { useState } from 'react'
import { Zap, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassCard } from '../glass-card'
import { cn } from '@/lib/utils'

const FEE = 0.025
const myNfts = ['#012', '#088', '#142']

export function TradeForm() {
  const [mode, setMode] = useState<'buy' | 'list'>('buy')
  const [qty, setQty] = useState(1)
  const [price, setPrice] = useState('595')
  const [nft, setNft] = useState(myNfts[0])
  const [status, setStatus] = useState<'idle' | 'pending' | 'done'>('idle')

  const floor = 580
  const listPrice = Number(price) || 0
  const subtotal = mode === 'buy' ? floor * qty : listPrice
  const fee = subtotal * FEE
  const total = mode === 'buy' ? subtotal + fee : subtotal - fee

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('pending')
    setTimeout(() => setStatus('done'), 1200)
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <GlassCard className="p-4">
      <div role="tablist" aria-label="Trade mode" className="grid grid-cols-2 rounded-xl border border-border bg-secondary/50 p-1">
        {(['buy', 'list'] as const).map((m) => (
          <button
            key={m}
            role="tab"
            type="button"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={cn(
              'rounded-lg py-2 text-sm font-semibold transition-colors',
              mode === m
                ? m === 'buy'
                  ? 'bg-[#22c55e] text-[#04120a]'
                  : 'bg-destructive text-white'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {m === 'buy' ? 'Quick Buy' : 'List NFT'}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
        {mode === 'buy' ? (
          <div>
            <label htmlFor="qty" className="text-xs text-muted-foreground">
              Quantity (at floor)
            </label>
            <div className="mt-1.5 flex items-center gap-2">
              {[1, 2, 3, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setQty(n)}
                  className={cn(
                    'h-10 flex-1 rounded-lg border font-mono text-sm transition-colors',
                    qty === n ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:text-foreground',
                  )}
                  aria-pressed={qty === n}
                >
                  {n}
                </button>
              ))}
              <input id="qty" type="hidden" value={qty} readOnly />
            </div>
          </div>
        ) : (
          <>
            <div>
              <label htmlFor="nft" className="text-xs text-muted-foreground">
                Select NFT
              </label>
              <select
                id="nft"
                value={nft}
                onChange={(e) => setNft(e.target.value)}
                className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background/60 px-3 font-mono text-sm focus:border-primary/60 focus:outline-none"
              >
                {myNfts.map((n) => (
                  <option key={n} value={n}>
                    Genesis {n}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="price" className="text-xs text-muted-foreground">
                List Price
              </label>
              <div className="relative mt-1.5">
                <input
                  id="price"
                  inputMode="decimal"
                  value={price}
                  onChange={(e) => setPrice(e.target.value.replace(/[^\d.]/g, ''))}
                  className="h-10 w-full rounded-lg border border-border bg-background/60 px-3 pr-14 font-mono text-sm focus:border-primary/60 focus:outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">USDC</span>
              </div>
              <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                {listPrice >= floor ? (
                  <span className="text-[#22c55e]">+{(((listPrice - floor) / floor) * 100).toFixed(1)}% above floor</span>
                ) : (
                  <span className="text-destructive">{(((listPrice - floor) / floor) * 100).toFixed(1)}% below floor</span>
                )}
              </p>
            </div>
          </>
        )}

        <dl className="flex flex-col gap-1.5 rounded-lg border border-border bg-background/40 p-3 font-mono text-xs">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">{mode === 'buy' ? 'Subtotal' : 'List price'}</dt>
            <dd>{subtotal.toFixed(2)} USDC</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Protocol fee (2.5%)</dt>
            <dd>{fee.toFixed(2)} USDC</dd>
          </div>
          <div className="flex justify-between border-t border-border pt-1.5 text-sm font-semibold">
            <dt>{mode === 'buy' ? 'You pay' : 'You receive'}</dt>
            <dd className="text-primary">{total.toFixed(2)} USDC</dd>
          </div>
        </dl>

        <Button
          type="submit"
          disabled={status !== 'idle' || (mode === 'list' && listPrice <= 0)}
          className="glow-gold h-11 rounded-xl font-semibold hover:bg-primary/90"
        >
          {status === 'pending' ? (
            <Loader2 className="animate-spin" />
          ) : status === 'done' ? (
            <CheckCircle2 />
          ) : (
            <Zap />
          )}
          {status === 'pending'
            ? 'Confirming…'
            : status === 'done'
              ? 'Settled on Arbitrum'
              : mode === 'buy'
                ? `Instant Buy ${qty} NFT${qty > 1 ? 's' : ''}`
                : `List Genesis ${nft}`}
        </Button>
        <p className="text-center text-[11px] text-muted-foreground">Instant settlement via Arbitrum · ~0.25s finality</p>
      </form>
    </GlassCard>
  )
}
