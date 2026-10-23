'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Wallet, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ArbitrumBadge } from './glass-card'

export function SiteHeader() {
  const [connected, setConnected] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <a href="#" className="flex items-center gap-3" aria-label="SabaFi home">
          <Image
            src="/sabafi-logo.png"
            alt=""
            width={40}
            height={40}
            className="rounded-lg border border-primary/30"
            priority
          />
          <div className="leading-tight">
            <span className="block text-lg font-extrabold tracking-tight text-primary">SabaFi</span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Safe Betting &amp; Double Profit
            </span>
          </div>
        </a>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ArbitrumBadge />
          </div>
          {connected ? (
            <Button
              variant="outline"
              size="lg"
              onClick={() => setConnected(false)}
              className="h-10 gap-2 rounded-xl px-4 font-mono"
              aria-label="Disconnect wallet 0x7a3F…91cE"
            >
              <span className="size-2 rounded-full bg-success" aria-hidden />
              0x7a3F…91cE
              <LogOut className="text-muted-foreground" />
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={() => setConnected(true)}
              className="glow-gold h-10 gap-2 rounded-xl px-4 font-semibold hover:bg-primary/90"
            >
              <Wallet />
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
