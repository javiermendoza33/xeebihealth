'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const CARE_NAV = [
  { key: 'primary',     label: 'Primary Care',   icon: '🫀', href: '/patient/care/primary' },
  { key: 'mental',      label: 'Mental Health',  icon: '🧠', href: '/patient/care/mental' },
  { key: 'dermatology', label: 'Dermatology',    icon: '🌿', href: '/patient/care/dermatology' },
  { key: 'urgent',      label: 'Urgent Care',    icon: '🚨', href: '/patient/care/urgent' },
  { key: 'womens',      label: "Women's Health", icon: '🌸', href: '/patient/care/womens' },
  { key: 'weight',      label: 'Weight Care',    icon: '🥗', href: '/patient/care/weight' },
]

const PATIENT_NAV = [
  { label: 'My Dashboard', href: '/patient/dashboard', icon: '⊞' },
  { label: 'Appointments', href: '#', icon: '📅' },
  { label: 'Messages',     href: '#', icon: '💬' },
  { label: 'Prescriptions',href: '#', icon: '💊' },
  { label: 'Lab Results',  href: '#', icon: '🧪' },
]

export default function CareShell({ children, accentColor = 'var(--teal)' }: { children: React.ReactNode, accentColor?: string }) {
  const pathname = usePathname()
  const router = useRouter()

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* Sidebar */}
      <aside style={{ width: 260, background: 'var(--sidebar-bg)', borderRight: '1px solid var(--divider)', display: 'flex', flexDirection: 'column', flexShrink: 0, padding: '24px 0' }}>
        <Link href="/" style={{ padding: '0 24px 24px', borderBottom: '1px solid var(--divider)', marginBottom: 16, display: 'block', textDecoration: 'none', fontSize: 20, fontWeight: 700, color: '#fff' }}>
          <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--teal)' }}>Care</em>MD
        </Link>

        {/* Patient nav */}
        <div style={{ padding: '0 12px', marginBottom: 8 }}>
          <p style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, padding: '0 12px', marginBottom: 6 }}>My Care</p>
          {PATIENT_NAV.map(n => {
            const active = pathname === n.href
            return (
              <Link key={n.label} href={n.href}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, textDecoration: 'none', marginBottom: 2,
                  background: active ? 'var(--teal-dim)' : 'transparent',
                  color: active ? 'var(--teal)' : 'var(--muted)', fontSize: 14, fontWeight: active ? 600 : 400 }}>
                <span>{n.icon}</span>{n.label}
              </Link>
            )
          })}
        </div>

        {/* Care specialties */}
        <div style={{ padding: '0 12px', marginTop: 12 }}>
          <p style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, padding: '0 12px', marginBottom: 6 }}>Specialties</p>
          {CARE_NAV.map(n => {
            const active = pathname === n.href
            return (
              <Link key={n.key} href={n.href}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, textDecoration: 'none', marginBottom: 2,
                  background: active ? `${accentColor}18` : 'transparent',
                  color: active ? accentColor : 'var(--muted)', fontSize: 14, fontWeight: active ? 600 : 400 }}>
                <span>{n.icon}</span>{n.label}
              </Link>
            )
          })}
        </div>

        <button onClick={signOut} style={{ margin: 'auto 24px 0', padding: '10px 0', background: 'none', border: '1px solid var(--divider)', borderRadius: 8, color: 'var(--muted)', fontSize: 13, cursor: 'pointer' }}>
          Sign out
        </button>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: 'auto' }}>{children}</main>
    </div>
  )
}
