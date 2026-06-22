import Sidebar from '@/components/Sidebar'

const SECTIONS = [
  {
    label: 'My Care',
    items: [
      { label: 'Dashboard',    href: '/patient/dashboard',    icon: '🏠' },
      { label: 'Appointments', href: '/patient/appointments', icon: '📅' },
      { label: 'Messages',     href: '/patient/messages',     icon: '💬' },
      { label: 'Prescriptions',href: '/patient/prescriptions',icon: '💊' },
      { label: 'Lab Results',  href: '/patient/lab-results',  icon: '🧪' },
      { label: 'Billing',      href: '/patient/billing',      icon: '💳' },
      { label: 'Profile',      href: '/patient/profile',      icon: '👤' },
    ],
  },
  {
    label: 'Specialties',
    items: [
      { label: 'Primary Care',       href: '/patient/care/primary',     icon: '🫀' },
      { label: 'Mental Health',      href: '/patient/care/mental',      icon: '🧠' },
      { label: 'Skincare',           href: '/patient/care/dermatology', icon: '🌿' },
      { label: 'Urgent Care',        href: '/patient/care/urgent',      icon: '🚨' },
      { label: "Women's Health",     href: '/patient/care/womens',      icon: '🌸' },
      { label: 'Weight Loss',        href: '/patient/care/weight',      icon: '🥗' },
      { label: 'Male Sexual Health', href: '/patient/care/male',        icon: '♂️' },
      { label: 'Hair Loss',          href: '/patient/care/hair',        icon: '💆' },
      { label: 'Longevity',          href: '/patient/care/longevity',   icon: '⏳' },
      { label: 'Menopause',          href: '/patient/care/menopause',   icon: '🌡️' },
      { label: 'Nutrition',          href: '/patient/care/nutrition',   icon: '🍎' },
    ],
  },
]

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen patient-portal">
      <Sidebar portalLabel="Patient Portal" accentColor="#5B9E82" sections={SECTIONS} variant="light" />
      <main className="flex-1 ml-60 flex flex-col min-h-screen" style={{ background: '#F4F7F5' }}>
        {children}
      </main>
    </div>
  )
}
