import Image from 'next/image'
import {
  LayoutDashboard,
  Gem,
  Store,
  Users,
  LineChart,
  X,
  Activity,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '#', active: true },
  { label: 'NFT Presale & Vault', icon: Gem, href: '#mint' },
  { label: 'Marketplace', icon: Store, href: '#marketplace' },
  { label: 'Affiliate & Ref', icon: Users, href: '#affiliate' },
  { label: 'Analytics / Yield', icon: LineChart, href: '#' },
]

export function AppSidebar({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />
      <aside
        aria-label="Primary"
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border bg-[#0b0e17]/95 backdrop-blur-xl transition-transform lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-20 items-center justify-between gap-3 border-b border-border px-5">
          <a href="#" className="flex items-center gap-3" aria-label="SabaFi home">
            <Image
              src="/sabafi-logo.png"
              alt=""
              width={42}
              height={42}
              className="rounded-xl border border-primary/30 shadow-[0_0_24px_-6px_rgb(255_230_0/0.5)]"
              priority
            />
            <div className="leading-tight">
              <span className="block text-xl font-extrabold tracking-tight text-primary">SabaFi</span>
              <span className="block whitespace-nowrap text-[11px] font-semibold text-destructive">
                Safe Betting &amp; Double Profit
              </span>
            </div>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground lg:hidden"
            aria-label="Close navigation"
          >
            <X className="size-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-6">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
            Menu
          </p>
          <ul className="flex flex-col gap-1">
            {navItems.map(({ label, icon: Icon, href, active }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={onClose}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'group relative flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground',
                  )}
                >
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-primary shadow-[0_0_12px_rgb(255_230_0/0.8)]"
                    />
                  )}
                  <Icon
                    className={cn(
                      'size-[18px]',
                      active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground',
                    )}
                  />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 border-t border-border p-4">
          <div className="rounded-xl border border-border bg-secondary/40 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Network
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#28a0f0] opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-[#28a0f0]" />
              </span>
              <span className="text-sm font-semibold text-foreground">Arbitrum One</span>
              <span className="ml-auto font-mono text-[11px] text-muted-foreground">#42161</span>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-success/20 bg-success/5 px-3 py-2.5">
            <Activity className="size-4 text-success" aria-hidden />
            <span className="text-xs font-medium text-foreground">All systems operational</span>
            <span className="ml-auto size-2 rounded-full bg-success" aria-hidden />
          </div>
        </div>
      </aside>
    </>
  )
}
