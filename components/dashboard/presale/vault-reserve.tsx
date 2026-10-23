import { Vault, BadgeCheck, ExternalLink, FileCode2 } from 'lucide-react'
import { GlassCard, CardHeading } from '../glass-card'

const reserves = [
  { label: 'Total Value Locked', value: '$71,000', sub: '142 NFTs × 500 USDC' },
  { label: 'Yield Reserve Pool', value: '$18,420', sub: 'Covers 9.4 weeks of payouts' },
  { label: 'Insurance Buffer', value: '$7,100', sub: '10% of TVL' },
  { label: 'Collateral Ratio', value: '138%', sub: 'Target ≥ 120%', positive: true },
]

const audits = [
  { firm: 'CertiK', score: '94.2 / 100', date: 'Sep 2026' },
  { firm: 'Halborn', score: '0 Critical · 0 High', date: 'Aug 2026' },
]

export function VaultReserve() {
  return (
    <GlassCard className="p-6">
      <CardHeading
        icon={<Vault className="size-4" />}
        title="Smart Contract Vault"
        description="Transparent on-chain reserves backing every Genesis NFT"
        action={
          <a
            href="https://arbiscan.io"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-3 py-1.5 font-mono text-xs text-muted-foreground hover:text-primary"
          >
            <FileCode2 className="size-3.5" />
            0xSaBa…V4u1
            <ExternalLink className="size-3" />
          </a>
        }
      />

      <dl className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {reserves.map((r) => (
          <div key={r.label} className="rounded-xl border border-border bg-secondary/40 p-4">
            <dt className="text-xs text-muted-foreground">{r.label}</dt>
            <dd className={`mt-1 font-mono text-xl font-semibold ${r.positive ? 'text-success' : 'text-foreground'}`}>
              {r.value}
            </dd>
            <dd className="mt-1 text-xs text-muted-foreground">{r.sub}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6">
        <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Security Proof</h3>
        <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {audits.map((a) => (
            <li
              key={a.firm}
              className="flex items-center gap-3 rounded-xl border border-success/20 bg-success/5 p-4"
            >
              <span className="flex size-10 items-center justify-center rounded-lg border border-success/30 bg-success/10 text-success">
                <BadgeCheck className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">Audited by {a.firm}</p>
                <p className="font-mono text-xs text-muted-foreground">
                  {a.score} · {a.date}
                </p>
              </div>
              <a
                href="#"
                className="ml-auto text-xs font-medium text-primary hover:underline"
                aria-label={`View ${a.firm} audit report`}
              >
                Report
              </a>
            </li>
          ))}
        </ul>
      </div>
    </GlassCard>
  )
}
