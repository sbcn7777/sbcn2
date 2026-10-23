import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { SiteFooter } from '@/components/dashboard/site-footer'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell>
      <main className="relative w-full flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      <SiteFooter />
    </DashboardShell>
  )
}
