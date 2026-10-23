import type { Metadata } from 'next'
import { RevenueChart } from '@/components/dashboard/analytics/revenue-chart'
import { ApyPanel } from '@/components/dashboard/analytics/apy-panel'
import { YieldChart } from '@/components/dashboard/overview/yield-chart'

export const metadata: Metadata = { title: 'Analytics & Real Yield | SabaFi' }

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <RevenueChart />
        </div>
        <ApyPanel />
      </div>
      <YieldChart />
    </div>
  )
}
