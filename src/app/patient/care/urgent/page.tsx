import CareShell from '@/components/CareShell'
import Link from 'next/link'

const SYMPTOMS = ['Fever','UTI / Infection','Sore throat','Rash','Ear pain','Nausea','Sinus pain','Eye infection']

export default function UrgentCarePage() {
  return (
    <CareShell accentColor="#F87171">
      <div style={{ padding: '40px 48px', maxWidth: 1100 }}>
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F87171', fontWeight: 600, marginBottom: 8 }}>Urgent Care</p>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', letterSpacing: -0.5 }}>Need care now?</h1>
          <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 15 }}>Connect with a provider in as little as 15 minutes — no appointment needed.</p>
        </div>

        {/* See a provider now */}
        <div style={{ padding: 40, background: 'linear-gradient(135deg, #7F1D1D, #991B1B)', borderRadius: 20, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#FCA5A5', marginBottom: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>⚡ Providers available now</div>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Start a visit in minutes</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, maxWidth: 400 }}>Describe your symptoms and a licensed provider will join your video visit immediately.</p>
          </div>
          <Link href="/patient/care/urgent/intake" style={{ display: 'block', padding: '16px 32px', background: '#F87171', color: '#fff', borderRadius: 100, fontSize: 16, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Start visit now →</Link>
        </div>

        {/* Common symptoms */}
        <div style={{ padding: 32, background: 'var(--card-bg)', border: '1px solid var(--divider)', borderRadius: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 20 }}>What are you experiencing?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {SYMPTOMS.map(s => (
              <Link key={s} href="#"
                style={{ padding: '10px 20px', background: 'var(--bg-dark)', border: '1px solid var(--divider)', borderRadius: 100, fontSize: 14, color: 'var(--muted)', textDecoration: 'none', fontWeight: 500 }}>
                {s}
              </Link>
            ))}
          </div>
          <p style={{ marginTop: 20, fontSize: 12, color: 'var(--muted)' }}>🚨 For life-threatening emergencies, call 911 immediately.</p>
        </div>
      </div>
    </CareShell>
  )
}
