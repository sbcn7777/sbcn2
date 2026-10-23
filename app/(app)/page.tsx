import { MetricCards } from '@/components/dashboard/metric-cards'
import { YieldChart } from '@/components/dashboard/overview/yield-chart'
import { PortfolioSummary } from '@/components/dashboard/overview/portfolio-summary'
import { ActivityLog } from '@/components/dashboard/overview/activity-log'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <MetricCards />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <YieldChart />
        </div>
        <PortfolioSummary />
      </div>
      <ActivityLog />
    </div>
  )
}
