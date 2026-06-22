import CareShell from '@/components/CareShell'
import Link from 'next/link'

const STATS = [
  { label: 'Next appointment', value: 'June 28', sub: 'Dr. Sarah Chen · 10:00 AM', color: 'var(--teal)' },
  { label: 'Active prescriptions', value: '2', sub: 'Lisinopril · Atorvastatin', color: 'var(--green)' },
  { label: 'Last visit', value: '14 days ago', sub: 'Annual physical', color: 'var(--amber)' },
  { label: 'Pending labs', value: '1', sub: 'Complete blood panel', color: '#A78BFA' },
]

const TASKS = [
  { icon: '🩺', label: 'Schedule annual physical', due: 'Due this month' },
  { icon: '💊', label: 'Refill Lisinopril prescription', due: 'Due in 5 days' },
  { icon: '🧪', label: 'Complete blood panel', due: 'Lab order ready' },
]

export default function PrimaryCarePage() {
  return (
    <CareShell accentColor="var(--teal)">
      <div style={{ padding: '40px 48px', maxWidth: 1100 }}>
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal)', fontWeight: 600, marginBottom: 8 }}>Primary Care</p>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', letterSpacing: -0.5 }}>Good morning, Javier 👋</h1>
          <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 15 }}>Your primary care hub — checkups, prescriptions, and chronic care in one place.</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 36 }}>
          {STATS.map(s => (
            <div key={s.label} style={{ padding: '24px', background: 'var(--card-bg)', border: '1px solid var(--divider)', borderRadius: 16 }}>
              <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8, fontWeight: 500 }}>{s.label}</p>
              <p style={{ fontSize: 26, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.value}</p>
              <p style={{ fontSize: 12, color: 'var(--muted)' }}>{s.sub}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Book visit */}
          <div style={{ padding: 32, background: 'var(--teal)', borderRadius: 20 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--bg-dark)', marginBottom: 8 }}>Book a visit</h2>
            <p style={{ fontSize: 14, color: 'rgba(11,24,40,0.7)', marginBottom: 24, lineHeight: 1.5 }}>See a board-certified primary care physician today via video visit.</p>
            <Link href="#" style={{ display: 'inline-block', padding: '12px 24px', background: 'var(--bg-dark)', color: 'var(--teal)', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>Schedule now →</Link>
          </div>

          {/* To-do */}
          <div style={{ padding: 32, background: 'var(--card-bg)', border: '1px solid var(--divider)', borderRadius: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Action items</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {TASKS.map(t => (
                <div key={t.label} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 38, height: 38, background: 'var(--bg-dark)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{t.icon}</div>
                  <div>
                    <p style={{ fontSize: 14, color: '#fff', fontWeight: 500 }}>{t.label}</p>
                    <p style={{ fontSize: 12, color: 'var(--teal)' }}>{t.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CareShell>
  )
}
