'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

type NavItem = { label: string; href: string; icon: string }
type NavSection = { label: string; items: NavItem[] }

interface SidebarProps {
  portalLabel: string
  accentColor: string
  navItems?: NavItem[]
  sections?: NavSection[]
  variant?: 'dark' | 'light'
}

const DARK = {
  bg:           'var(--sidebar-bg)',
  border:       'var(--divider)',
  logoText:     '#FFFFFF',
  sectionLabel: 'var(--muted)',
  navText:      'var(--muted)',
  activeNavBg:  'var(--teal-dim)',
  activeNavText:'#FFFFFF',
  divider:      'var(--divider)',
  signOut:      'var(--muted)',
}

const LIGHT = {
  bg:           '#F5F0E8',
  border:       '#E0D5C5',
  logoText:     '#1C2D26',
  sectionLabel: '#A0907A',
  navText:      '#6B5E4E',
  activeNavBg:  '#E0D5C5',
  activeNavText:'#1C2D26',
  divider:      '#E0D5C5',
  signOut:      '#A0907A',
}

export default function Sidebar({ portalLabel, accentColor, navItems, sections, variant = 'dark' }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const t = variant === 'light' ? LIGHT : DARK

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
    router.refresh()
  }

  function NavLink({ item }: { item: NavItem }) {
    const active = pathname === item.href || (item.href !== '/patient/dashboard' && pathname.startsWith(item.href))
    return (
      <Link
        href={item.href}
        className={cn('flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition', active ? 'font-semibold' : 'font-normal')}
        style={{ background: active ? t.activeNavBg : 'transparent', color: active ? t.activeNavText : t.navText }}
      >
        <span className="text-base">{item.icon}</span>
        {item.label}
      </Link>
    )
  }

  return (
    <aside
      className="fixed inset-y-0 left-0 w-60 flex flex-col z-10"
      style={{ background: t.bg, borderRight: `1px solid ${t.border}` }}
    >
      {/* Logo */}
      <div className="px-6 pt-8 pb-4">
        <p className="text-base font-bold" style={{ color: t.logoText }}>XeebiHealth</p>
        <p className="text-xs mt-0.5 font-medium" style={{ color: accentColor }}>{portalLabel}</p>
      </div>

      <div className="mx-6 h-px" style={{ background: t.divider }} />

      {/* Nav */}
      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        {sections ? (
          sections.map((section, si) => (
            <div key={si} className={si > 0 ? 'mt-4' : ''}>
              <p className="px-3 mb-1.5 text-xs font-semibold tracking-widest uppercase" style={{ color: t.sectionLabel }}>
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map(item => <NavLink key={item.href} item={item} />)}
              </div>
            </div>
          ))
        ) : (
          <div className="space-y-1">
            {(navItems ?? []).map(item => <NavLink key={item.href} item={item} />)}
          </div>
        )}
      </nav>

      {/* Sign out */}
      <div className="px-4 pb-6">
        <div className="mx-2 mb-4 h-px" style={{ background: t.divider }} />
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm w-full transition hover:opacity-80"
          style={{ color: t.signOut }}
        >
          <span className="text-base">🚪</span>
          Sign out
        </button>
      </div>
    </aside>
  )
}
