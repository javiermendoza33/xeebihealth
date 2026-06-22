import CareShell from '@/components/CareShell'
import Link from 'next/link'

const PANELS = [
  { icon: '🧬', label: 'Biological age test', sub: 'Epigenetic methylation panel', cta: 'Order test' },
  { icon: '🩸', label: 'Comprehensive labs', sub: 'Hormones, metabolic, inflammatory markers', cta: 'Order labs' },
  { icon: '🧠', label: 'Cognitive health', sub: 'Brain health assessment & optimization', cta: 'Learn more' },
  { icon: '💪', label: 'Physical performance', sub: 'VO₂ max, muscle mass, strength', cta: 'Get tested' },
]

export default function LongevityPage() {
  return (
    <CareShell accentColor="#C084FC">
      <div style={{ padding: '40px 48px', maxWidth: 1100 }}>
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C084FC', fontWeight: 600, marginBottom: 8 }}>Longevity</p>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: 'var(--fg)', letterSpacing: -0.5 }}>Live longer, live better</h1>
          <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 15 }}>Science-backed preventive care to optimize your healthspan.</p>
        </div>

        <div style={{ padding: 40, background: 'linear-gradient(135deg, #2d1a4a, #3d1f6b)', borderRadius: 20, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Longevity baseline panel</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 24, lineHeight: 1.5, maxWidth: 440 }}>
              A comprehensive assessment of your biological age, key biomarkers, and personalized protocol.
            </p>
            <Link href="/patient/care/longevity/intake" style={{ display: 'inline-block', padding: '13px 28px', background: '#C084FC', color: '#2d1a4a', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>Book assessment →</Link>
          </div>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: '#C084FC' }}>Age</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>is just a number</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          {PANELS.map(p => (
            <div key={p.label} style={{ padding: '24px 20px', background: 'var(--card-bg)', border: '1px solid var(--divider)', borderRadius: 16 }}>
              <div style={{ fontSize: 26, marginBottom: 12 }}>{p.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)', marginBottom: 6 }}>{p.label}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 16 }}>{p.sub}</div>
              <div style={{ fontSize: 13, color: '#C084FC', fontWeight: 600 }}>{p.cta} →</div>
            </div>
          ))}
        </div>
      </div>
    </CareShell>
  )
}
