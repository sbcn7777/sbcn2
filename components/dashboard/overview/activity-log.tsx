import { History, ExternalLink } from 'lucide-react'
import { GlassCard, CardHeading } from '../glass-card'
import { activityLog } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const typeStyles: Record<string, string> = {
  Claim: 'border-success/30 bg-success/10 text-success',
  Mint: 'border-primary/30 bg-primary/10 text-primary',
  Referral: 'border-[#28a0f0]/30 bg-[#28a0f0]/10 text-[#28a0f0]',
  Sale: 'border-destructive/30 bg-destructive/10 text-destructive',
}

export function ActivityLog() {
  return (
    <GlassCard className="p-6">
      <CardHeading
        icon={<History className="size-4" />}
        title="Recent Activity"
        description="Latest on-chain transactions and claims"
      />
      <div className="mt-5 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[620px] text-sm">
          <caption className="sr-only">Recent activity</caption>
          <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Type</th>
              <th scope="col" className="px-4 py-3 font-medium">Details</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Amount (USDC)</th>
              <th scope="col" className="px-4 py-3 font-medium">Tx Hash</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {activityLog.map((a) => (
              <tr key={a.tx} className="transition-colors hover:bg-secondary/30">
                <td className="px-4 py-3">
                  <span className={cn('rounded-md border px-2 py-0.5 text-xs font-medium', typeStyles[a.type])}>
                    {a.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-secondary-foreground">{a.detail}</td>
                <td className={cn('px-4 py-3 text-right font-mono font-semibold', a.positive ? 'text-success' : 'text-destructive')}>
                  {a.amount}
                </td>
                <td className="px-4 py-3">
                  <a
                    href="https://arbiscan.io"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-muted-foreground hover:text-primary"
                  >
                    {a.tx}
                    <ExternalLink className="size-3" />
                    <span className="sr-only">(view on Arbiscan)</span>
                  </a>
                </td>
                <td className="px-4 py-3 text-right text-muted-foreground">{a.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  )
}
