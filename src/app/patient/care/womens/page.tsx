import CareShell from '@/components/CareShell'
import Link from 'next/link'

const SERVICES = [
  { icon: '🌸', label: 'Birth control', sub: 'Pills, patches, rings & more', href: '#' },
  { icon: '⚖️', label: 'Hormone therapy', sub: 'HRT & hormone balancing', href: '#' },
  { icon: '🩺', label: 'OB/GYN consult', sub: 'Annual exams & pelvic health', href: '#' },
  { icon: '🌿', label: 'Menopause care', sub: 'Symptom management & support', href: '#' },
]

export default function WomensHealthPage() {
  return (
    <CareShell accentColor="#F9A8D4">
      <div style={{ padding: '40px 48px', maxWidth: 1100 }}>
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F9A8D4', fontWeight: 600, marginBottom: 8 }}>Women&apos;s Health</p>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', letterSpacing: -0.5 }}>Your women&apos;s health hub</h1>
          <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 15 }}>Comprehensive care — OB/GYN, hormones, birth control, and more.</p>
        </div>

        {/* Hero CTA */}
        <div style={{ padding: 40, background: 'linear-gradient(135deg, #831843, #9D174D)', borderRadius: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Book an OB/GYN visit</h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 24, lineHeight: 1.5, maxWidth: 460 }}>Connect with a board-certified OB/GYN for annual exams, birth control, hormones, and more — via secure video.</p>
          <Link href="/patient/care/womens/intake" style={{ display: 'inline-block', padding: '13px 28px', background: '#F9A8D4', color: '#831843', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>Schedule now →</Link>
        </div>

        {/* Service cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          {SERVICES.map(s => (
            <Link key={s.label} href={s.href}
              style={{ padding: '24px 20px', background: 'var(--card-bg)', border: '1px solid var(--divider)', borderRadius: 16, textDecoration: 'none', display: 'block' }}>
              <div style={{ fontSize: 26, marginBottom: 12 }}>{s.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{s.sub}</div>
              <div style={{ marginTop: 16, fontSize: 13, color: '#F9A8D4', fontWeight: 600 }}>Get started →</div>
            </Link>
          ))}
        </div>
      </div>
    </CareShell>
  )
}
