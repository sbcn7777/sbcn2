'use client'

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { TrendingUp } from 'lucide-react'
import { GlassCard, CardHeading } from '../glass-card'
import { ChartTooltipBox, axisProps } from '../chart-tooltip'
import { yieldHistory } from '@/lib/mock-data'

export function YieldChart() {
  return (
    <GlassCard className="flex flex-col p-6">
      <CardHeading
        icon={<TrendingUp className="size-4" />}
        title="Yield Growth"
        description="Cumulative USDC yield earned over the last 6 months"
        action={
          <span className="rounded-md border border-success/30 bg-success/10 px-2 py-1 font-mono text-xs font-semibold text-success">
            +35.4% MoM
          </span>
        }
      />
      <div className="mt-6 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={yieldHistory} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="yieldFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffe600" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#ffe600" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" {...axisProps} />
            <YAxis {...axisProps} tickFormatter={(v) => `$${v}`} />
            <Tooltip
              cursor={{ stroke: '#334155' }}
              content={({ active, payload, label }) =>
                active && payload?.length ? (
                  <ChartTooltipBox
                    title={String(label)}
                    rows={[
                      { label: 'Cumulative', value: `$${payload[0].payload.cumulative.toLocaleString('en-US')}`, color: '#ffe600' },
                      { label: 'Monthly', value: `$${payload[0].payload.yield}` },
                    ]}
                  />
                ) : null
              }
            />
            <Area
              type="monotone"
              dataKey="cumulative"
              stroke="#ffe600"
              strokeWidth={2.5}
              fill="url(#yieldFill)"
              dot={false}
              activeDot={{ r: 5, fill: '#ffe600', stroke: '#080a11', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  )
}
