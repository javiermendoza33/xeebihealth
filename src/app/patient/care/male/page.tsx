import CareShell from '@/components/CareShell'
import Link from 'next/link'

const SERVICES = [
  { icon: '💊', label: 'Erectile Dysfunction', sub: 'Sildenafil, tadalafil & more', href: '#' },
  { icon: '⚡', label: 'Testosterone', sub: 'TRT evaluation & management', href: '#' },
  { icon: '🧬', label: 'Premature Ejaculation', sub: 'Proven treatment plans', href: '#' },
  { icon: '🩺', label: 'Men\'s Wellness', sub: 'Annual labs & preventive care', href: '#' },
]

export default function MaleSexualHealthPage() {
  return (
    <CareShell accentColor="#60A5FA">
      <div style={{ padding: '40px 48px', maxWidth: 1100 }}>
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#60A5FA', fontWeight: 600, marginBottom: 8 }}>Male Sexual Health</p>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', letterSpacing: -0.5 }}>Your men&apos;s health hub</h1>
          <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 15 }}>Discreet, effective care for ED, testosterone, and more — all online.</p>
        </div>

        <div style={{ padding: 40, background: 'linear-gradient(135deg, #1e3a5f, #1e4080)', borderRadius: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Talk to a provider today</h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 24, lineHeight: 1.5, maxWidth: 460 }}>
            Board-certified physicians specializing in men&apos;s health — 100% online, completely private.
          </p>
          <Link href="/patient/care/male/intake" style={{ display: 'inline-block', padding: '13px 28px', background: '#60A5FA', color: '#1e3a5f', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>Get started →</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          {SERVICES.map(s => (
            <Link key={s.label} href={s.href}
              style={{ padding: '24px 20px', background: 'var(--card-bg)', border: '1px solid var(--divider)', borderRadius: 16, textDecoration: 'none', display: 'block' }}>
              <div style={{ fontSize: 26, marginBottom: 12 }}>{s.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{s.sub}</div>
              <div style={{ marginTop: 16, fontSize: 13, color: '#60A5FA', fontWeight: 600 }}>Get started →</div>
            </Link>
          ))}
        </div>
      </div>
    </CareShell>
  )
}
