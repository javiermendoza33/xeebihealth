import CareShell from '@/components/CareShell'
import Link from 'next/link'

const TREATMENTS = [
  { icon: '💊', label: 'Finasteride', sub: 'Prescription oral treatment', status: 'Most effective' },
  { icon: '💧', label: 'Minoxidil', sub: 'Topical or oral solution', status: 'FDA approved' },
  { icon: '🧴', label: 'Custom formula', sub: 'Combination therapy', status: 'Personalized' },
]

export default function HairLossPage() {
  return (
    <CareShell accentColor="#A3E635">
      <div style={{ padding: '40px 48px', maxWidth: 1100 }}>
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A3E635', fontWeight: 600, marginBottom: 8 }}>Hair Loss</p>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', letterSpacing: -0.5 }}>Your hair regrowth plan</h1>
          <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 15 }}>Clinically proven treatments — prescribed online, delivered to your door.</p>
        </div>

        <div style={{ padding: 40, background: 'linear-gradient(135deg, #1a2e0a, #243d0e)', borderRadius: 20, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Start your regrowth program</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 24, lineHeight: 1.5, maxWidth: 440 }}>
              A licensed physician reviews your photos and health history to prescribe the right treatment.
            </p>
            <Link href="/patient/care/hair/intake" style={{ display: 'inline-block', padding: '13px 28px', background: '#A3E635', color: '#1a2e0a', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>Get evaluated →</Link>
          </div>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: '#A3E635' }}>92%</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>see results in 6 months</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {TREATMENTS.map(t => (
            <div key={t.label} style={{ padding: '28px 24px', background: 'var(--card-bg)', border: '1px solid var(--divider)', borderRadius: 16 }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{t.icon}</div>
              <div style={{ display: 'inline-block', padding: '3px 10px', background: 'rgba(163,230,53,0.1)', color: '#A3E635', borderRadius: 100, fontSize: 11, fontWeight: 600, marginBottom: 10 }}>{t.status}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{t.label}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{t.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </CareShell>
  )
}
