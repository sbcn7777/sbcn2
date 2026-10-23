import type { Metadata } from 'next'
import { MintModule } from '@/components/dashboard/mint-module'
import { UnlockCriteria } from '@/components/dashboard/presale/unlock-criteria'
import { VaultReserve } from '@/components/dashboard/presale/vault-reserve'

export const metadata: Metadata = { title: 'NFT Presale & Vault | SabaFi' }

export default function PresalePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <MintModule />
        </div>
        <UnlockCriteria />
      </div>
      <VaultReserve />
    </div>
  )
}
