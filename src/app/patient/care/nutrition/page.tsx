import CareShell from '@/components/CareShell'
import Link from 'next/link'

const SERVICES = [
  { icon: '🥗', label: 'Meal planning', sub: 'Personalized weekly plans from a dietitian', href: '#' },
  { icon: '📊', label: 'Macro coaching', sub: 'Protein, carbs & fat optimized for your goals', href: '#' },
  { icon: '🩺', label: 'Medical nutrition', sub: 'Dietitian support for chronic conditions', href: '#' },
  { icon: '💪', label: 'Performance nutrition', sub: 'Fuel your workouts & recovery', href: '#' },
]

export default function NutritionPage() {
  return (
    <CareShell accentColor="#34D399">
      <div style={{ padding: '40px 48px', maxWidth: 1100 }}>
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#34D399', fontWeight: 600, marginBottom: 8 }}>Nutrition</p>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', letterSpacing: -0.5 }}>Eat well, feel better</h1>
          <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 15 }}>Work with a registered dietitian to build sustainable eating habits.</p>
        </div>

        <div style={{ padding: 40, background: 'linear-gradient(135deg, #064e3b, #065f46)', borderRadius: 20, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Meet your dietitian</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 24, lineHeight: 1.5, maxWidth: 440 }}>
              Registered dietitians create a personalized nutrition plan based on your goals, preferences, and health history.
            </p>
            <Link href="/patient/care/nutrition/intake" style={{ display: 'inline-block', padding: '13px 28px', background: '#34D399', color: '#064e3b', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>Book a session →</Link>
          </div>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: '#34D399' }}>RD</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Registered Dietitian</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          {SERVICES.map(s => (
            <Link key={s.label} href={s.href}
              style={{ padding: '24px 20px', background: 'var(--card-bg)', border: '1px solid var(--divider)', borderRadius: 16, textDecoration: 'none', display: 'block' }}>
              <div style={{ fontSize: 26, marginBottom: 12 }}>{s.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{s.sub}</div>
              <div style={{ marginTop: 16, fontSize: 13, color: '#34D399', fontWeight: 600 }}>Get started →</div>
            </Link>
          ))}
        </div>
      </div>
    </CareShell>
  )
}
