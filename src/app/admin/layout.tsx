import Sidebar from '@/components/Sidebar'

const NAV = [
  { label: 'Overview',    href: '/admin/dashboard',  icon: '📊' },
  { label: 'Patients',    href: '/admin/patients',   icon: '👥' },
  { label: 'Providers',   href: '/admin/providers',  icon: '👨‍⚕️' },
  { label: 'Clinics',     href: '/admin/clinics',    icon: '🏥' },
  { label: 'Analytics',   href: '/admin/analytics',  icon: '📈' },
  { label: 'Billing',     href: '/admin/billing',    icon: '💰' },
  { label: 'Settings',    href: '/admin/settings',   icon: '⚙️' },
  { label: 'Audit Logs',  href: '/admin/audit',      icon: '🔍' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar portalLabel="Super Admin" accentColor="var(--amber)" navItems={NAV} />
      <main className="flex-1 ml-60 flex flex-col min-h-screen" style={{ background: 'var(--bg-dark)' }}>
        {children}
      </main>
    </div>
  )
}
