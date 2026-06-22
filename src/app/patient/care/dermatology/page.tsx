import CareShell from '@/components/CareShell'
import Link from 'next/link'

const CONDITIONS = [
  { icon: '🌿', label: 'Acne', status: 'Active treatment' },
  { icon: '🌡️', label: 'Eczema', status: 'Monitoring' },
  { icon: '💆', label: 'Hair Loss', status: 'Prescription ready' },
]

export default function DermatologyPage() {
  return (
    <CareShell accentColor="var(--green)">
      <div style={{ padding: '40px 48px', maxWidth: 1100 }}>
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--green)', fontWeight: 600, marginBottom: 8 }}>Dermatology</p>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', letterSpacing: -0.5 }}>Your skin care plan</h1>
          <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 15 }}>Board-certified dermatologists, available via video or photo review.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          {/* Photo submission */}
          <div style={{ padding: 32, background: 'linear-gradient(135deg, #064E3B, #065F46)', borderRadius: 20 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Submit a skin photo</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 24, lineHeight: 1.5 }}>Get a diagnosis and treatment plan from a board-certified dermatologist within 24 hours.</p>
            <Link href="/patient/care/dermatology/intake" style={{ display: 'inline-block', padding: '12px 24px', background: 'var(--green)', color: 'var(--bg-dark)', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>Upload photo →</Link>
          </div>

          {/* Active conditions */}
          <div style={{ padding: 32, background: 'var(--card-bg)', border: '1px solid var(--divider)', borderRadius: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Active conditions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {CONDITIONS.map(c => (
                <div key={c.label} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 38, height: 38, background: 'rgba(100,200,140,0.12)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{c.icon}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, color: '#fff', fontWeight: 500 }}>{c.label}</p>
                    <p style={{ fontSize: 12, color: 'var(--green)' }}>{c.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video visit */}
        <div style={{ padding: 28, background: 'var(--card-bg)', border: '1px solid var(--divider)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Prefer a live video consultation?</h3>
            <p style={{ fontSize: 14, color: 'var(--muted)' }}>Meet a dermatologist face-to-face via secure video visit.</p>
          </div>
          <Link href="#" style={{ padding: '12px 24px', background: 'var(--green)', color: 'var(--bg-dark)', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>Book video visit</Link>
        </div>
      </div>
    </CareShell>
  )
}
