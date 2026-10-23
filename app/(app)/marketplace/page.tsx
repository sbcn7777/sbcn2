import type { Metadata } from 'next'
import { MarketStats } from '@/components/dashboard/market/market-stats'
import { CandleChart } from '@/components/dashboard/market/candle-chart'
import { OrderBook } from '@/components/dashboard/market/order-book'
import { TradeForm } from '@/components/dashboard/market/trade-form'
import { SalesHistory } from '@/components/dashboard/market/sales-history'

export const metadata: Metadata = { title: 'Marketplace | SabaFi' }

export default function MarketplacePage() {
  return (
    <div className="flex flex-col gap-6">
      <MarketStats />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex min-w-0 flex-col gap-6">
          <CandleChart />
          <SalesHistory />
        </div>
        <div className="flex flex-col gap-6">
          <OrderBook />
          <TradeForm />
        </div>
      </div>
    </div>
  )
}
