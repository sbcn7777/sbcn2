'use client'

import { useEffect, useState } from 'react'
import { GlassCard } from '../glass-card'

type Order = { price: number; qty: number }

const initialAsks: Order[] = [
  { price: 612, qty: 2 },
  { price: 604, qty: 4 },
  { price: 598, qty: 3 },
  { price: 592, qty: 6 },
  { price: 586, qty: 5 },
  { price: 580, qty: 8 },
]
const initialBids: Order[] = [
  { price: 572, qty: 7 },
  { price: 568, qty: 9 },
  { price: 561, qty: 4 },
  { price: 555, qty: 11 },
  { price: 548, qty: 6 },
  { price: 540, qty: 3 },
]

function jitter(orders: Order[]) {
  return orders.map((o) => ({ ...o, qty: Math.max(1, o.qty + Math.round((Math.random() - 0.5) * 3)) }))
}

function Row({ order, max, side }: { order: Order; max: number; side: 'ask' | 'bid' }) {
  const color = side === 'ask' ? '#ef4444' : '#22c55e'
  return (
    <li className="relative grid grid-cols-3 px-4 py-1 font-mono text-xs">
      <span
        aria-hidden
        className="absolute inset-y-0 right-0 transition-[width] duration-500"
        style={{ width: `${(order.qty / max) * 100}%`, background: color, opacity: 0.12 }}
      />
      <span className="relative" style={{ color }}>{order.price.toFixed(2)}</span>
      <span className="relative text-right text-secondary-foreground">{order.qty}</span>
      <span className="relative text-right text-muted-foreground">
        {(order.price * order.qty).toLocaleString('en-US')}
      </span>
    </li>
  )
}

export function OrderBook() {
  const [asks, setAsks] = useState(initialAsks)
  const [bids, setBids] = useState(initialBids)

  useEffect(() => {
    const id = setInterval(() => {
      setAsks(jitter)
      setBids(jitter)
    }, 2500)
    return () => clearInterval(id)
  }, [])

  const max = Math.max(...asks.map((a) => a.qty), ...bids.map((b) => b.qty))
  const spread = asks[asks.length - 1].price - bids[0].price

  return (
    <GlassCard className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold">Order Book</h2>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="size-1.5 animate-pulse rounded-full bg-[#22c55e]" aria-hidden />
          Live
        </span>
      </div>
      <div className="grid grid-cols-3 px-4 py-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        <span>Price</span>
        <span className="text-right">Qty</span>
        <span className="text-right">Total</span>
      </div>
      <ul aria-label="Sell orders">
        {asks.map((o) => (
          <Row key={o.price} order={o} max={max} side="ask" />
        ))}
      </ul>
      <div className="flex items-center justify-between border-y border-border bg-secondary/40 px-4 py-2">
        <span className="font-mono text-base font-semibold text-[#22c55e]">580.00</span>
        <span className="font-mono text-xs text-muted-foreground">Spread {spread} USDC</span>
      </div>
      <ul aria-label="Buy orders" className="pb-2">
        {bids.map((o) => (
          <Row key={o.price} order={o} max={max} side="bid" />
        ))}
      </ul>
    </GlassCard>
  )
}
