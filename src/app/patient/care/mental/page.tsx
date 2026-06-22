import CareShell from '@/components/CareShell'
import Link from 'next/link'

const MOOD = ['😔','😕','😐','🙂','😊']
const RESOURCES = [
  { icon: '🧘', title: 'Daily mindfulness', sub: '5-min guided session', time: '5 min' },
  { icon: '📓', title: 'Mood journal', sub: 'Log how you\'re feeling', time: 'Today' },
  { icon: '📚', title: 'Anxiety toolkit', sub: 'CBT techniques & exercises', time: 'Guide' },
]

export default function MentalHealthPage() {
  return (
    <CareShell accentColor="#A78BFA">
      <div style={{ padding: '40px 48px', maxWidth: 1100 }}>
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A78BFA', fontWeight: 600, marginBottom: 8 }}>Mental Health</p>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', letterSpacing: -0.5 }}>How are you feeling today?</h1>
          <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 15 }}>Therapy, psychiatry, and support — all on your schedule.</p>
        </div>

        {/* Mood check-in */}
        <div style={{ padding: 32, background: 'var(--card-bg)', border: '1px solid var(--divider)', borderRadius: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 20 }}>Daily mood check-in</h2>
          <div style={{ display: 'flex', gap: 16 }}>
            {MOOD.map((m, i) => (
              <button key={i} style={{ flex: 1, padding: '18px 8px', background: i === 3 ? 'rgba(167,139,250,0.15)' : 'var(--bg-dark)', border: `1.5px solid ${i === 3 ? '#A78BFA' : 'var(--divider)'}`, borderRadius: 14, fontSize: 28, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                {m}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Book therapy */}
          <div style={{ padding: 32, background: 'linear-gradient(135deg, #4C1D95, #7C3AED)', borderRadius: 20 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Book a therapy session</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 24, lineHeight: 1.5 }}>Connect with a licensed therapist or psychiatrist today.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/patient/care/mental/intake" style={{ padding: '11px 22px', background: '#fff', color: '#4C1D95', borderRadius: 100, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Therapist →</Link>
              <Link href="#" style={{ padding: '11px 22px', background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 100, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Psychiatrist →</Link>
            </div>
          </div>

          {/* Resources */}
          <div style={{ padding: 32, background: 'var(--card-bg)', border: '1px solid var(--divider)', borderRadius: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Resources for you</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {RESOURCES.map(r => (
                <div key={r.title} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 38, height: 38, background: 'rgba(167,139,250,0.12)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{r.icon}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, color: '#fff', fontWeight: 500 }}>{r.title}</p>
                    <p style={{ fontSize: 12, color: 'var(--muted)' }}>{r.sub}</p>
                  </div>
                  <span style={{ fontSize: 12, color: '#A78BFA', fontWeight: 600 }}>{r.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CareShell>
  )
}
