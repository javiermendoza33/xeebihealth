'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

type NavItem = { label: string; href: string; icon: string }

interface SidebarProps {
  portalLabel: string
  accentColor: string
  navItems: NavItem[]
}

export default function Sidebar({ portalLabel, accentColor, navItems }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
    router.refresh()
  }

  return (
    <aside
      className="fixed inset-y-0 left-0 w-60 flex flex-col z-10"
      style={{ background: 'var(--sidebar-bg)', borderRight: '1px solid var(--divider)' }}
    >
      {/* Logo */}
      <div className="px-6 pt-8 pb-4">
        <p className="text-base font-bold text-white">XeebiHealth</p>
        <p className="text-xs mt-0.5 font-medium" style={{ color: accentColor }}>{portalLabel}</p>
      </div>

      <div className="mx-6 h-px" style={{ background: 'var(--divider)' }} />

      {/* Nav */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const active = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition',
                active ? 'font-semibold text-white' : 'font-normal'
              )}
              style={{
                background: active ? 'var(--teal-dim)' : 'transparent',
                color: active ? '#fff' : 'var(--muted)',
              }}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Sign out */}
      <div className="px-4 pb-6">
        <div className="mx-2 mb-4 h-px" style={{ background: 'var(--divider)' }} />
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm w-full transition hover:opacity-80"
          style={{ color: 'var(--muted)' }}
        >
          <span className="text-base">🚪</span>
          Sign out
        </button>
      </div>
    </aside>
  )
}
