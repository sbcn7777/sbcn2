'use client'

import { useMemo, useState } from 'react'
import { Bar, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { GlassCard } from '../glass-card'
import { ChartTooltipBox, axisProps } from '../chart-tooltip'
import { generateCandles, type Candle } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const UP = '#22c55e'
const DOWN = '#ef4444'
const ranges = [
  { label: '7D', days: 7 },
  { label: '14D', days: 14 },
  { label: '30D', days: 30 },
  { label: 'All', days: 48 },
] as const

type ShapeProps = { x?: number; y?: number; width?: number; height?: number; payload?: Candle }

function CandleShape({ x = 0, y = 0, width = 0, height = 0, payload }: ShapeProps) {
  if (!payload) return null
  const { open, close, high, low } = payload
  const up = close >= open
  const color = up ? UP : DOWN
  const ratio = height / Math.max(high - low, 0.0001)
  const bodyTop = y + (high - Math.max(open, close)) * ratio
  const bodyHeight = Math.max(Math.abs(open - close) * ratio, 1.5)
  const cx = x + width / 2
  const bodyWidth = Math.max(width * 0.7, 2)

  return (
    <g>
      <line x1={cx} x2={cx} y1={y} y2={y + height} stroke={color} strokeWidth={1.25} />
      <rect
        x={cx - bodyWidth / 2}
        y={bodyTop}
        width={bodyWidth}
        height={bodyHeight}
        fill={color}
        fillOpacity={up ? 0.9 : 1}
        rx={1}
      />
    </g>
  )
}

export function CandleChart() {
  const all = useMemo(() => generateCandles(48), [])
  const [range, setRange] = useState<number>(30)
  const data = useMemo(
    () => all.slice(-range).map((c) => ({ ...c, range: [c.low, c.high] as [number, number] })),
    [all, range],
  )
  const last = data[data.length - 1]
  const first = data[0]
  const change = ((last.close - first.open) / first.open) * 100
  const min = Math.min(...data.map((d) => d.low))
  const max = Math.max(...data.map((d) => d.high))
  const maxVol = Math.max(...data.map((d) => d.volume))

  return (
    <GlassCard className="flex flex-col p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs">
          <span className="text-sm font-semibold text-foreground">Floor Price · 1D</span>
          <span className="text-muted-foreground">
            O <span className="text-foreground">{last.open}</span>
          </span>
          <span className="text-muted-foreground">
            H <span className="text-foreground">{last.high}</span>
          </span>
          <span className="text-muted-foreground">
            L <span className="text-foreground">{last.low}</span>
          </span>
          <span className="text-muted-foreground">
            C <span className="text-foreground">{last.close}</span>
          </span>
          <span className={change >= 0 ? 'text-[#22c55e]' : 'text-destructive'}>
            {change >= 0 ? '+' : ''}
            {change.toFixed(2)}%
          </span>
        </div>
        <div role="tablist" aria-label="Chart range" className="flex rounded-lg border border-border bg-secondary/50 p-0.5">
          {ranges.map((r) => (
            <button
              key={r.label}
              role="tab"
              type="button"
              aria-selected={range === r.days}
              onClick={() => setRange(r.days)}
              className={cn(
                'rounded-md px-2.5 py-1 font-mono text-xs font-medium transition-colors',
                range === r.days ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 h-[380px] w-full" role="img" aria-label={`Candlestick chart of NFT floor price, last close ${last.close} USDC`}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }} barCategoryGap="18%">
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="date" {...axisProps} minTickGap={24} />
            <YAxis
              yAxisId="price"
              orientation="right"
              {...axisProps}
              domain={[Math.floor(min - 10), Math.ceil(max + 10)]}
              width={48}
            />
            <YAxis yAxisId="vol" hide domain={[0, maxVol * 4]} />
            <Tooltip
              cursor={{ fill: 'rgb(255 230 0 / 0.05)' }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null
                const c = payload[0].payload as Candle
                const up = c.close >= c.open
                return (
                  <ChartTooltipBox
                    title={c.date}
                    rows={[
                      { label: 'Open', value: `${c.open}` },
                      { label: 'High', value: `${c.high}` },
                      { label: 'Low', value: `${c.low}` },
                      { label: 'Close', value: `${c.close}`, color: up ? UP : DOWN },
                      { label: 'Volume', value: `$${c.volume.toLocaleString('en-US')}` },
                    ]}
                  />
                )
              }}
            />
            <Bar yAxisId="vol" dataKey="volume" isAnimationActive={false} fill="#334155" fillOpacity={0.5} />
            <Bar
              yAxisId="price"
              dataKey="range"
              isAnimationActive={false}
              shape={(props: unknown) => <CandleShape {...(props as ShapeProps)} />}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  )
}
