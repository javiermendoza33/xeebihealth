import CareShell from '@/components/CareShell'
import Link from 'next/link'

const SAGE       = '#5B9E82'
const SAGE_MID   = '#3D7A62'
const SAGE_LIGHT = '#EBF5EF'
const FOREST     = '#1C2D26'
const MUTED_SAGE = '#7A9386'
const PAGE_BG    = '#F4F7F5'
const CARD       = '#FFFFFF'
const BORDER     = '#E2ECE7'

const MILESTONES = [
  { label: 'Starting weight',  value: '—',     unit: 'lbs',  done: false },
  { label: 'First check-in',   value: 'Week 1', unit: '',     done: false },
  { label: '5% lost',          value: '5%',     unit: 'goal', done: false },
  { label: 'Target weight',    value: '—',      unit: 'lbs',  done: false },
]

export default function WeightCarePage() {
  return (
    <CareShell accentColor={SAGE}>
      <div style={{ minHeight: '100vh', background: PAGE_BG, padding: '48px 52px', maxWidth: 1100 }}>

        {/* Page header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 15 }}>🥗</span>
            <p style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: SAGE, fontWeight: 700 }}>Weight Loss</p>
          </div>
          <h1 style={{ fontSize: 34, fontWeight: 700, color: FOREST, letterSpacing: -0.8, lineHeight: 1.2, marginBottom: 10 }}>
            Your weight care journey
          </h1>
          <p style={{ color: MUTED_SAGE, fontSize: 15, lineHeight: 1.65, maxWidth: 540 }}>
            GLP-1 medication, nutrition coaching, and ongoing provider support — all in one place, at your own pace.
          </p>
        </div>

        {/* Hero card — soft forest gradient */}
        <div style={{
          padding: '40px 44px',
          background: 'linear-gradient(135deg, #1E4035 0%, #2C6650 55%, #3A8565 100%)',
          borderRadius: 24,
          marginBottom: 24,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative rings */}
          <div style={{ position: 'absolute', right: -60, top: -60, width: 240, height: 240, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', right: -20, top: -20, width: 160, height: 160, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)' }} />
          <div style={{ position: 'absolute', right: 80, bottom: -80, width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', position: 'relative' }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 10, lineHeight: 1.35 }}>
                Start your GLP-1 program
              </h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, maxWidth: 400, marginBottom: 28 }}>
                Semaglutide (Ozempic/Wegovy) and Tirzepatide prescribed by licensed providers — delivered to your door.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/patient/care/weight/plan"
                  style={{ padding: '13px 26px', background: '#fff', color: FOREST, borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                  See plans →
                </Link>
                <Link href="#"
                  style={{ padding: '13px 26px', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.9)', borderRadius: 100, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
                  Learn more
                </Link>
              </div>
            </div>
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: '#fff', letterSpacing: -1, lineHeight: 1 }}>From $49</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>/ month</div>
            </div>
          </div>
        </div>

        {/* Gentle daily reminder */}
        <div style={{
          padding: '15px 22px',
          background: SAGE_LIGHT,
          border: `1px solid ${BORDER}`,
          borderRadius: 14,
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>🌱</span>
          <p style={{ fontSize: 14, color: FOREST, lineHeight: 1.5 }}>
            <span style={{ color: SAGE, fontWeight: 600 }}>Today&apos;s reminder: </span>
            Progress, not perfection. Every step forward is one step closer.
          </p>
        </div>

        {/* Bottom grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

          {/* Milestone tracker */}
          <div style={{ padding: '32px 28px', background: CARD, border: `1px solid ${BORDER}`, borderRadius: 20, boxShadow: '0 2px 8px rgba(28,45,38,0.05)' }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: FOREST, marginBottom: 4 }}>Your milestones</h2>
            <p style={{ fontSize: 13, color: MUTED_SAGE, marginBottom: 26 }}>Track your progress at every step.</p>
            {MILESTONES.map((m, i) => (
              <div key={m.label} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '13px 0',
                borderBottom: i < MILESTONES.length - 1 ? `1px solid ${BORDER}` : 'none',
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                  background: m.done ? SAGE : SAGE_LIGHT,
                  border: `1.5px solid ${m.done ? SAGE : BORDER}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700,
                  color: m.done ? '#fff' : MUTED_SAGE,
                }}>
                  {m.done ? '✓' : i + 1}
                </div>
                <p style={{ flex: 1, fontSize: 14, color: FOREST, fontWeight: 500 }}>{m.label}</p>
                <span style={{ fontSize: 13, color: MUTED_SAGE }}>{m.value}{m.unit ? ` ${m.unit}` : ''}</span>
              </div>
            ))}
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Nutrition coaching */}
            <div style={{ flex: 1, padding: '32px 28px', background: CARD, border: `1px solid ${BORDER}`, borderRadius: 20, boxShadow: '0 2px 8px rgba(28,45,38,0.05)' }}>
              <span style={{ fontSize: 28, display: 'block', marginBottom: 14 }}>🥦</span>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: FOREST, marginBottom: 8 }}>Nutrition coaching</h2>
              <p style={{ fontSize: 14, color: MUTED_SAGE, lineHeight: 1.65, marginBottom: 24 }}>
                Work with a registered dietitian alongside your medication for sustainable, lasting results.
              </p>
              <Link href="#" style={{
                display: 'inline-block', padding: '11px 22px',
                background: SAGE_LIGHT, color: SAGE_MID,
                borderRadius: 100, fontSize: 14, fontWeight: 600, textDecoration: 'none',
                border: `1px solid rgba(91,158,130,0.25)`,
              }}>
                Meet a dietitian →
              </Link>
            </div>

            {/* Care team reassurance */}
            <div style={{
              padding: '22px 28px',
              background: CARD,
              border: `1px solid ${BORDER}`,
              borderRadius: 20,
              boxShadow: '0 2px 8px rgba(28,45,38,0.05)',
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <div style={{ width: 46, height: 46, borderRadius: '50%', background: SAGE_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                👩‍⚕️
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: FOREST, marginBottom: 3 }}>Your care team is with you</p>
                <p style={{ fontSize: 13, color: MUTED_SAGE, lineHeight: 1.5 }}>A licensed provider reviews your plan every week.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </CareShell>
  )
}
