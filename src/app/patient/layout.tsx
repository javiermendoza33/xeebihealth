import Sidebar from '@/components/Sidebar'

const NAV = [
  { label: 'Dashboard',     href: '/patient/dashboard',     icon: '🏠' },
  { label: 'Appointments',  href: '/patient/appointments',  icon: '📅' },
  { label: 'Messages',      href: '/patient/messages',      icon: '💬' },
  { label: 'Prescriptions', href: '/patient/prescriptions', icon: '💊' },
  { label: 'Lab Results',   href: '/patient/lab-results',   icon: '🧪' },
  { label: 'Billing',       href: '/patient/billing',       icon: '💳' },
  { label: 'Profile',       href: '/patient/profile',       icon: '👤' },
]

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar portalLabel="Patient Portal" accentColor="var(--teal)" navItems={NAV} />
      <main className="flex-1 ml-60 flex flex-col min-h-screen" style={{ background: 'var(--bg-dark)' }}>
        {children}
      </main>
    </div>
  )
}
