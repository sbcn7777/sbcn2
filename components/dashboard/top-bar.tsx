'use client'

import { useState } from 'react'
import { Bell, Menu, Search, Wallet, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const [connected, setConnected] = useState(true)

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b border-border bg-background/70 px-4 backdrop-blur-xl md:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        className="flex size-10 items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </button>

      <div className="min-w-0">
        <h1 className="truncate text-xl font-bold tracking-tight md:text-2xl">Investor Dashboard</h1>
        <p className="hidden text-xs text-muted-foreground sm:block">
          Track your Genesis NFTs, yield and affiliate earnings
        </p>
      </div>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <label className="relative hidden xl:block">
          <span className="sr-only">Search</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search wallet, NFT ID, tx..."
            className="h-10 w-64 rounded-xl border border-border bg-secondary/50 pl-9 pr-12 text-sm placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border px-1.5 font-mono text-[10px] text-muted-foreground">
            ⌘K
          </kbd>
        </label>

        <button
          type="button"
          className="relative flex size-10 items-center justify-center rounded-xl border border-border bg-secondary/50 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Notifications, 3 unread"
        >
          <Bell className="size-[18px]" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive ring-2 ring-background" />
        </button>

        <button
          type="button"
          className="hidden h-10 items-center gap-2 rounded-xl border border-[#28a0f0]/30 bg-[#28a0f0]/10 px-3 text-sm font-medium text-foreground transition-colors hover:border-[#28a0f0]/60 md:flex"
          aria-label="Switch network, current: Arbitrum Nitro"
        >
          <span className="size-2 rounded-full bg-[#28a0f0] shadow-[0_0_8px_#28a0f0]" aria-hidden />
          Arbitrum Nitro
          <ChevronDown className="size-4 text-muted-foreground" />
        </button>

        <Button
          size="lg"
          onClick={() => setConnected((c) => !c)}
          className="glow-gold h-10 gap-2 rounded-xl px-4 font-semibold hover:bg-primary/90"
          aria-label={connected ? 'Wallet 0x71C…976F connected, click to disconnect' : 'Connect Wallet'}
        >
          <Wallet />
          {connected ? <span className="font-mono">0x71C…976F</span> : 'Connect Wallet'}
        </Button>
      </div>
    </header>
  )
}
