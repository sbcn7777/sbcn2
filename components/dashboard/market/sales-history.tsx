import { ExternalLink, Receipt } from 'lucide-react'
import { GlassCard, CardHeading } from '../glass-card'
import { salesHistory } from '@/lib/mock-data'

export function SalesHistory() {
  return (
    <GlassCard className="p-6">
      <CardHeading icon={<Receipt className="size-4" />} title="Recent Sales" description="Latest settled trades" />
      <div className="mt-5 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[620px] text-sm">
          <caption className="sr-only">Recent NFT sales</caption>
          <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">NFT ID</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Price</th>
              <th scope="col" className="px-4 py-3 font-medium">Seller</th>
              <th scope="col" className="px-4 py-3 font-medium">Tx Hash</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {salesHistory.map((s, i) => {
              const prev = salesHistory[i + 1]?.price ?? s.price
              const up = s.price >= prev
              return (
                <tr key={s.tx} className="transition-colors hover:bg-secondary/30">
                  <td className="px-4 py-3 font-mono font-semibold text-foreground">Genesis #{String(s.id).padStart(3, '0')}</td>
                  <td className={`px-4 py-3 text-right font-mono font-semibold ${up ? 'text-[#22c55e]' : 'text-destructive'}`}>
                    {s.price} <span className="text-xs font-normal text-muted-foreground">USDC</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">{s.seller}</td>
                  <td className="px-4 py-3">
                    <a
                      href="https://arbiscan.io"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-muted-foreground hover:text-primary"
                    >
                      {s.tx}
                      <ExternalLink className="size-3" />
                      <span className="sr-only">(view on Arbiscan)</span>
                    </a>
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{s.time}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </GlassCard>
  )
}
