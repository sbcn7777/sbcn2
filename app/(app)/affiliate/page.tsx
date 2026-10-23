import type { Metadata } from 'next'
import { AffiliateStats } from '@/components/dashboard/affiliate/affiliate-stats'
import { ReferralModule } from '@/components/dashboard/referral-module'
import { CommissionTiers } from '@/components/dashboard/affiliate/commission-tiers'

export const metadata: Metadata = { title: 'Affiliate Hub | SabaFi' }

export default function AffiliatePage() {
  return (
    <div className="flex flex-col gap-6">
      <AffiliateStats />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <ReferralModule />
        </div>
        <CommissionTiers />
      </div>
    </div>
  )
}
