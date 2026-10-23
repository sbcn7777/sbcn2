'use client'

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartColumn } from 'lucide-react'
import { GlassCard, CardHeading } from '../glass-card'
import { ChartTooltipBox, axisProps } from '../chart-tooltip'
import { revenueBreakdown } from '@/lib/mock-data'

const series = [
  { key: 'betting', label: 'Betting Revenue', color: '#ffe600' },
  { key: 'fees', label: 'Protocol Fees', color: '#28a0f0' },
  { key: 'marketplace', label: 'Marketplace', color: '#ef4444' },
] as const

export function RevenueChart() {
  return (
    <GlassCard className="flex flex-col p-6">
      <CardHeading
        icon={<ChartColumn className="size-4" />}
        title="Protocol Revenue"
        description="Weekly real-yield sources distributed to NFT holders"
        action={
          <ul className="hidden items-center gap-4 text-xs text-muted-foreground md:flex">
            {series.map((s) => (
              <li key={s.key} className="flex items-center gap-1.5">
                <span className="size-2 rounded-sm" style={{ background: s.color }} aria-hidden />
                {s.label}
              </li>
            ))}
          </ul>
        }
      />
      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenueBreakdown} margin={{ top: 8, right: 8, left: -4, bottom: 0 }}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="week" {...axisProps} />
            <YAxis {...axisProps} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip
              cursor={{ fill: 'rgb(255 230 0 / 0.05)' }}
              content={({ active, payload, label }) =>
                active && payload?.length ? (
                  <ChartTooltipBox
                    title={String(label)}
                    rows={series.map((s) => ({
                      label: s.label,
                      value: `$${Number(payload[0].payload[s.key]).toLocaleString('en-US')}`,
                      color: s.color,
                    }))}
                  />
                ) : null
              }
            />
            {series.map((s, i) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                stackId="rev"
                fill={s.color}
                radius={i === series.length - 1 ? [4, 4, 0, 0] : 0}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  )
}
