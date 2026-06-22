import CareShell from '@/components/CareShell'
import Link from 'next/link'

const MILESTONES = [
  { label: 'Starting weight', value: '—', unit: 'lbs', done: false },
  { label: 'First check-in', value: 'Week 1', unit: '', done: false },
  { label: '5% lost', value: '5%', unit: 'goal', done: false },
  { label: 'Target weight', value: '—', unit: 'lbs', done: false },
]

export default function WeightCarePage() {
  return (
    <CareShell accentColor="var(--amber)">
      <div style={{ padding: '40px 48px', maxWidth: 1100 }}>
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber)', fontWeight: 600, marginBottom: 8 }}>Weight Care</p>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', letterSpacing: -0.5 }}>Your weight care journey</h1>
          <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 15 }}>GLP-1 medication, nutrition coaching, and ongoing provider support.</p>
        </div>

        {/* Start program */}
        <div style={{ padding: 40, background: 'linear-gradient(135deg, #78350F, #92400E)', borderRadius: 20, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Start your GLP-1 program</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, maxWidth: 440 }}>Semaglutide (Ozempic/Wegovy) and Tirzepatide prescribed by licensed providers — delivered to your door.</p>
              <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
                <Link href="/patient/care/weight/intake" style={{ padding: '12px 24px', background: 'var(--amber)', color: '#78350F', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>Get started →</Link>
                <Link href="#" style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.12)', color: '#fff', borderRadius: 100, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Learn more</Link>
              </div>
            </div>
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: 48, fontWeight: 700, color: 'var(--amber)' }}>$199</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>per month</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Milestones */}
          <div style={{ padding: 32, background: 'var(--card-bg)', border: '1px solid var(--divider)', borderRadius: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Your milestones</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {MILESTONES.map((m, i) => (
                <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', border: `2px solid ${m.done ? 'var(--amber)' : 'var(--divider)'}`, background: m.done ? 'var(--amber)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: m.done ? 'var(--bg-dark)' : 'var(--muted)', fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, color: '#fff', fontWeight: 500 }}>{m.label}</p>
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--muted)' }}>{m.value} {m.unit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nutrition */}
          <div style={{ padding: 32, background: 'var(--card-bg)', border: '1px solid var(--divider)', borderRadius: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Nutrition coaching</h2>
            <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24, lineHeight: 1.6 }}>Work with a registered dietitian alongside your medication for lasting results.</p>
            <Link href="#" style={{ display: 'inline-block', padding: '12px 24px', border: '1px solid var(--amber)', color: 'var(--amber)', borderRadius: 100, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Meet a dietitian →</Link>
          </div>
        </div>
      </div>
    </CareShell>
  )
}
