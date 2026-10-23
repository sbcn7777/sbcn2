function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

export type Candle = {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export function generateCandles(count = 48): Candle[] {
  const rand = seeded(42)
  const candles: Candle[] = []
  let price = 470
  const start = new Date('2026-09-07T00:00:00Z').getTime()
  for (let i = 0; i < count; i++) {
    const drift = 2.4
    const open = price
    const close = Math.max(380, open + (rand() - 0.42) * 26 + drift * 0.2)
    const high = Math.max(open, close) + rand() * 12
    const low = Math.min(open, close) - rand() * 12
    const d = new Date(start + i * 24 * 3600 * 1000)
    candles.push({
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }),
      open: +open.toFixed(1),
      high: +high.toFixed(1),
      low: +low.toFixed(1),
      close: +close.toFixed(1),
      volume: Math.round(1800 + rand() * 6200),
    })
    price = close
  }
  const last = candles[candles.length - 1]
  const scale = 580 / last.close
  return candles.map((c) => ({
    ...c,
    open: +(c.open * scale).toFixed(1),
    high: +(c.high * scale).toFixed(1),
    low: +(c.low * scale).toFixed(1),
    close: +(c.close * scale).toFixed(1),
  }))
}

export const yieldHistory = [
  { month: 'May', yield: 92, cumulative: 92 },
  { month: 'Jun', yield: 128, cumulative: 220 },
  { month: 'Jul', yield: 156, cumulative: 376 },
  { month: 'Aug', yield: 201, cumulative: 577 },
  { month: 'Sep', yield: 284, cumulative: 861 },
  { month: 'Oct', yield: 384.5, cumulative: 1245.5 },
]

export const activityLog = [
  { type: 'Claim', detail: 'Yield claimed', amount: '+212.40', tx: '0x9f2a…c41e', time: '2h ago', positive: true },
  { type: 'Mint', detail: 'Genesis NFT #142', amount: '-500.00', tx: '0x31bd…a7f0', time: '1d ago', positive: false },
  { type: 'Referral', detail: 'Commission from 0x4b2E…a91F', amount: '+46.12', tx: '0x77c0…2b9d', time: '2d ago', positive: true },
  { type: 'Sale', detail: 'Sold Genesis NFT #088', amount: '+565.00', tx: '0xe1a4…0d33', time: '4d ago', positive: true },
  { type: 'Claim', detail: 'Yield claimed', amount: '+188.95', tx: '0x0c5f…9e12', time: '6d ago', positive: true },
]

export const referredPlayers = [
  { wallet: '0x4b2E…a91F', joined: 'Oct 02, 2026', active: true, volume: 18450, yieldGen: 922.5 },
  { wallet: '0x91cA…03bD', joined: 'Sep 27, 2026', active: true, volume: 12300, yieldGen: 615.0 },
  { wallet: '0xF0e1…7C22', joined: 'Sep 19, 2026', active: false, volume: 6720, yieldGen: 336.0 },
  { wallet: '0x2D8a…e4A0', joined: 'Sep 11, 2026', active: true, volume: 5180, yieldGen: 259.0 },
  { wallet: '0xAb77…1f9E', joined: 'Aug 30, 2026', active: false, volume: 2550, yieldGen: 127.5 },
  { wallet: '0x6E0d…b8C1', joined: 'Aug 21, 2026', active: true, volume: 0, yieldGen: 0 },
]

export const salesHistory = [
  { id: 311, price: 580, seller: '0x8aC2…f19B', tx: '0x5d1e…a20c', time: '2m ago' },
  { id: 207, price: 575, seller: '0x1fE9…07aD', tx: '0xb8a0…4c71', time: '14m ago' },
  { id: 44, price: 610, seller: '0xC33b…e5A2', tx: '0x02ff…9e3b', time: '38m ago' },
  { id: 129, price: 568, seller: '0x7d40…1b0E', tx: '0x4c9a…d18f', time: '1h ago' },
  { id: 98, price: 562, seller: '0xE12a…88cF', tx: '0x91b3…7a05', time: '2h ago' },
  { id: 256, price: 555, seller: '0x3B7f…c2D4', tx: '0xa7e2…3f6c', time: '3h ago' },
]

export const revenueBreakdown = [
  { week: 'W1', betting: 18200, fees: 4200, marketplace: 2100 },
  { week: 'W2', betting: 21400, fees: 4900, marketplace: 2600 },
  { week: 'W3', betting: 19800, fees: 5300, marketplace: 3100 },
  { week: 'W4', betting: 26300, fees: 6100, marketplace: 3800 },
  { week: 'W5', betting: 29100, fees: 6400, marketplace: 4600 },
  { week: 'W6', betting: 33800, fees: 7200, marketplace: 5200 },
]
