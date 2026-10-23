import { SiteHeader } from '@/components/dashboard/site-header'
import { MetricCards } from '@/components/dashboard/metric-cards'
import { MintModule } from '@/components/dashboard/mint-module'
import { ReferralModule } from '@/components/dashboard/referral-module'
import { Marketplace } from '@/components/dashboard/marketplace'
import { SiteFooter } from '@/components/dashboard/site-footer'

export default function Page() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(60%_60%_at_20%_0%,rgb(255_230_0/0.08),transparent_70%),radial-gradient(40%_50%_at_90%_10%,rgb(239_68_68/0.06),transparent_70%)]"
      />
      <SiteHeader />
      <main className="relative mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Investor Dashboard</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-balance md:text-3xl">
            Welcome back, investor
          </h1>
        </div>

        <MetricCards />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <MintModule />
            <ReferralModule />
          </div>
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <Marketplace />
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
