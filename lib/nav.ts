import {
  LayoutDashboard,
  Rocket,
  ChartCandlestick,
  Users,
  ChartLine,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  title: string
  description: string
}

export const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    title: 'Investor Dashboard',
    description: 'Executive overview of your yield, holdings and activity',
  },
  {
    label: 'NFT Presale & Vault',
    href: '/presale',
    icon: Rocket,
    title: 'NFT Presale & Vault',
    description: 'Mint Genesis Investor Passes and track vault reserves',
  },
  {
    label: 'Marketplace',
    href: '/marketplace',
    icon: ChartCandlestick,
    title: 'Saba Marketplace',
    description: 'Pro trading terminal for Genesis NFTs on Arbitrum',
  },
  {
    label: 'Affiliate & Ref',
    href: '/affiliate',
    icon: Users,
    title: 'Affiliate Hub',
    description: 'Manage referrals, commission tiers and player volume',
  },
  {
    label: 'Analytics & Real Yield',
    href: '/analytics',
    icon: ChartLine,
    title: 'Analytics & Real Yield',
    description: 'Protocol revenue, APY and yield distribution data',
  },
]

export function getNavItem(pathname: string) {
  return navItems.find((item) => item.href === pathname) ?? navItems[0]
}
