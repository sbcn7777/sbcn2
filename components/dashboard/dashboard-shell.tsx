'use client'

import { useState } from 'react'
import { AppSidebar } from './app-sidebar'
import { TopBar } from './top-bar'

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className="relative min-h-screen">
      <AppSidebar open={navOpen} onClose={() => setNavOpen(false)} />
      <div className="relative flex min-h-screen flex-col lg:pl-72">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(50%_60%_at_15%_0%,rgb(255_230_0/0.07),transparent_70%),radial-gradient(35%_50%_at_95%_5%,rgb(239_68_68/0.05),transparent_70%)]"
        />
        <TopBar onMenuClick={() => setNavOpen(true)} />
        {children}
      </div>
    </div>
  )
}
