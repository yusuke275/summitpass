'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { Mountain, LayoutDashboard, Map, Rss, User, Crown, Home, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'ダッシュボード' },
  { href: '/mountains', icon: Map, label: '山を探す' },
  { href: '/huts', icon: Home, label: '山小屋' },
  { href: '/safety', icon: ShieldCheck, label: '安全ガイド' },
  { href: '/feed', icon: Rss, label: 'タイムライン' },
  { href: '/profile', icon: User, label: 'プロフィール' },
]

export default function Navbar() {
  const pathname = usePathname()
  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Mountain className="h-7 w-7 text-emerald-500" />
          <span className="text-xl font-bold text-slate-900">SummitPass</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                pathname.startsWith(item.href)
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/climbs/new">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              + 登山記録
            </button>
          </Link>
          <UserButton />
        </div>
      </div>
      {/* モバイルナビ */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex-1 flex flex-col items-center py-2 text-xs transition-colors',
              pathname.startsWith(item.href) ? 'text-emerald-600' : 'text-slate-500'
            )}
          >
            <item.icon className="h-5 w-5 mb-0.5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
