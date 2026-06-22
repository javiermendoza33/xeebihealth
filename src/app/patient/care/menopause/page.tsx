import CareShell from '@/components/CareShell'
import Link from 'next/link'

const SERVICES = [
  { icon: '💊', label: 'Hormone therapy (HRT)', sub: 'Estrogen, progesterone & combined options', href: '#' },
  { icon: '🌡️', label: 'Hot flash relief', sub: 'Non-hormonal & hormonal treatments', href: '#' },
  { icon: '😴', label: 'Sleep & mood support', sub: 'Address insomnia, anxiety & brain fog', href: '#' },
  { icon: '🦴', label: 'Bone health', sub: 'Osteoporosis screening & prevention', href: '#' },
]

export default function MenopausePage() {
  return (
    <CareShell accentColor="#FB7185">
      <div style={{ padding: '40px 48px', maxWidth: 1100 }}>
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FB7185', fontWeight: 600, marginBottom: 8 }}>Menopause Care</p>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', letterSpacing: -0.5 }}>Navigate menopause with confidence</h1>
          <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 15 }}>Expert guidance on HRT, symptoms, and long-term health — all online.</p>
        </div>

        <div style={{ padding: 40, background: 'linear-gradient(135deg, #4a0d1a, #6b1428)', borderRadius: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Book a menopause consultation</h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 24, lineHeight: 1.5, maxWidth: 460 }}>
            Menopause-certified physicians ready to build your personalized treatment plan.
          </p>
          <Link href="/patient/care/menopause/intake" style={{ display: 'inline-block', padding: '13px 28px', background: '#FB7185', color: '#4a0d1a', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>Schedule now →</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          {SERVICES.map(s => (
            <Link key={s.label} href={s.href}
              style={{ padding: '24px 20px', background: 'var(--card-bg)', border: '1px solid var(--divider)', borderRadius: 16, textDecoration: 'none', display: 'block' }}>
              <div style={{ fontSize: 26, marginBottom: 12 }}>{s.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{s.sub}</div>
              <div style={{ marginTop: 16, fontSize: 13, color: '#FB7185', fontWeight: 600 }}>Learn more →</div>
            </Link>
          ))}
        </div>
      </div>
    </CareShell>
  )
}
