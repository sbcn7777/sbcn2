import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { MetricCards } from '@/components/dashboard/metric-cards'
import { MintModule } from '@/components/dashboard/mint-module'
import { ReferralModule } from '@/components/dashboard/referral-module'
import { Marketplace } from '@/components/dashboard/marketplace'
import { SiteFooter } from '@/components/dashboard/site-footer'

export default function Page() {
  return (
    <DashboardShell>
      <main className="relative w-full flex-1 px-4 py-6 md:px-8 md:py-8">
        <MetricCards />

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="flex min-w-0 flex-col gap-6 xl:col-span-2">
            <div id="mint" className="scroll-mt-24">
              <MintModule />
            </div>
            <div id="affiliate" className="scroll-mt-24">
              <ReferralModule />
            </div>
          </div>
          <div id="marketplace" className="scroll-mt-24 xl:col-span-1">
            <div className="xl:sticky xl:top-26">
              <Marketplace />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </DashboardShell>
  )
}
