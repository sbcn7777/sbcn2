'use client'

import { useState } from 'react'
import { Store, ArrowDownRight, ArrowUpRight, Lock, Unlock, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassCard, CardHeading } from './glass-card'
import { cn } from '@/lib/utils'

const FLOOR = 540

const buyListings = [
  { id: 88, price: 540, unlocked: true },
  { id: 213, price: 555, unlocked: true },
  { id: 47, price: 590, unlocked: false },
  { id: 301, price: 620, unlocked: true },
  { id: 129, price: 675, unlocked: false },
]

const myNfts = [
  { id: 12, unlocked: true },
  { id: 76, unlocked: true },
  { id: 140, unlocked: false },
]

type Tab = 'buy' | 'sell'

export function Marketplace() {
  const [tab, setTab] = useState<Tab>('buy')
  const [selected, setSelected] = useState(myNfts[0].id)
  const [price, setPrice] = useState('560')

  const priceNum = Number(price) || 0
  const diff = ((priceNum - FLOOR) / FLOOR) * 100
  const selectedNft = myNfts.find((n) => n.id === selected)

  return (
    <GlassCard className="flex flex-col p-6">
      <CardHeading
        icon={<Store className="size-4" />}
        title="In-house Saba Marketplace"
        description="Quick listing for Genesis Passes"
      />

      <div className="mt-5 rounded-xl border border-primary/25 bg-[linear-gradient(135deg,rgb(255_230_0/0.10),rgb(255_230_0/0.02)_60%,transparent)] p-4">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            <Zap className="size-3.5" aria-hidden />
            Instant Buy
          </p>
          <span className="text-[11px] text-muted-foreground">Cheapest unlocked</span>
        </div>
        <div className="mt-3 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Genesis Pass #{buyListings[0].id}</p>
            <p className="mt-0.5 font-mono text-2xl font-bold text-foreground">
              {buyListings[0].price}
              <span className="ml-1 text-xs font-medium text-muted-foreground">USDC</span>
            </p>
          </div>
          <Button className="h-10 rounded-xl px-5 font-semibold hover:bg-primary/90">
            Buy Now
          </Button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { k: 'Floor', v: `${FLOOR}` },
          { k: '24h Vol', v: '12.4K' },
          { k: 'Listed', v: '27' },
        ].map((s) => (
          <div key={s.k} className="rounded-lg border border-border bg-secondary/40 px-3 py-2">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.k}</p>
            <p className="font-mono text-sm font-semibold">{s.v}</p>
          </div>
        ))}
      </div>

      <div
        role="tablist"
        aria-label="Marketplace mode"
        className="mt-5 grid grid-cols-2 rounded-xl border border-border bg-background/60 p-1"
      >
        {(['buy', 'sell'] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            aria-controls={`panel-${t}`}
            id={`tab-${t}`}
            onClick={() => setTab(t)}
            className={cn(
              'h-9 rounded-lg text-sm font-semibold capitalize transition-colors focus-visible:outline-2 focus-visible:outline-primary',
              tab === t
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'buy' ? (
        <ul id="panel-buy" role="tabpanel" aria-labelledby="tab-buy" className="mt-4 flex flex-col gap-2">
          {buyListings.map((l) => {
            const above = ((l.price - FLOOR) / FLOOR) * 100
            return (
              <li
                key={l.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-secondary/30 p-3 transition-colors hover:border-primary/30"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg border border-primary/20 bg-[linear-gradient(135deg,rgb(255_230_0/0.2),transparent)] font-mono text-xs font-bold text-primary">
                    #{l.id}
                  </div>
                  <div>
                    <p className="flex items-center gap-1.5 text-sm font-medium">
                      Genesis Pass
                      {l.unlocked ? (
                        <Unlock className="size-3 text-success" aria-label="Unlocked" />
                      ) : (
                        <Lock className="size-3 text-destructive" aria-label="Locked" />
                      )}
                    </p>
                    <p className="text-xs">
                      {above === 0 ? (
                        <span className="font-medium text-primary">At floor</span>
                      ) : (
                        <span className="text-muted-foreground">+{above.toFixed(1)}% above floor</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-semibold">{l.price}</span>
                  <Button size="sm" variant="outline" className="rounded-lg hover:border-primary/50 hover:text-primary">
                    Buy
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <form
          id="panel-sell"
          role="tabpanel"
          aria-labelledby="tab-sell"
          className="mt-4 flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <fieldset>
            <legend className="mb-2 text-xs font-medium text-muted-foreground">Select NFT</legend>
            <div className="grid grid-cols-3 gap-2">
              {myNfts.map((n) => (
                <button
                  type="button"
                  key={n.id}
                  disabled={!n.unlocked}
                  onClick={() => setSelected(n.id)}
                  aria-pressed={selected === n.id}
                  className={cn(
                    'flex flex-col items-center gap-1 rounded-xl border p-3 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                    selected === n.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-secondary/30 text-foreground hover:border-primary/30',
                  )}
                >
                  <span className="font-mono text-sm font-bold">#{n.id}</span>
                  {n.unlocked ? (
                    <span className="text-success">Unlocked</span>
                  ) : (
                    <span className="flex items-center gap-1 text-destructive">
                      <Lock className="size-3" /> Locked
                    </span>
                  )}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="list-price" className="mb-2 block text-xs font-medium text-muted-foreground">
              Listing price
            </label>
            <div className="flex h-11 items-center rounded-xl border border-border bg-background/60 px-4 focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/30">
              <input
                id="list-price"
                inputMode="decimal"
                value={price}
                onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ''))}
                className="w-full bg-transparent font-mono text-sm outline-none"
              />
              <span className="text-xs font-medium text-muted-foreground">USDC</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                Floor: <span className="font-mono text-foreground">{FLOOR} USDC</span>
              </span>
              {priceNum > 0 && (
                <span
                  className={cn(
                    'inline-flex items-center gap-0.5 font-medium',
                    diff >= 0 ? 'text-success' : 'text-destructive',
                  )}
                >
                  {diff >= 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                  {Math.abs(diff).toFixed(1)}% {diff >= 0 ? 'above' : 'below'} floor
                </span>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-secondary/30 p-3 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>Platform fee (2.5%)</span>
              <span className="font-mono">{(priceNum * 0.025).toFixed(2)}</span>
            </div>
            <div className="mt-1.5 flex justify-between font-medium text-foreground">
              <span>You receive</span>
              <span className="font-mono">{(priceNum * 0.975).toFixed(2)} USDC</span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!selectedNft?.unlocked || priceNum <= 0}
            className="h-11 rounded-xl font-semibold hover:bg-primary/90"
          >
            List NFT #{selected}
          </Button>
        </form>
      )}
    </GlassCard>
  )
}
