import { Mail } from 'lucide-react'
import { ArbitrumBadge } from './glass-card'

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground sm:flex-row md:px-8">
        <p>
          {'© 2026 '}
          <span className="font-semibold text-primary">SabaFi</span>. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <ArbitrumBadge compact />
          <a
            href="mailto:support@sabafi.proton.me"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
          >
            <Mail className="size-4" />
            ProtonMail Support
          </a>
        </div>
      </div>
    </footer>
  )
}
