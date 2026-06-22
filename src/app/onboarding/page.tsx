'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const TOTAL = 5

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
  'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
  'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada',
  'New Hampshire','New Jersey','New Mexico','New York','North Carolina',
  'North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island',
  'South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
  'Virginia','Washington','West Virginia','Wisconsin','Wyoming',
]

const SPECIALTIES = [
  { icon: '🫀', label: 'Primary Care' },
  { icon: '🧠', label: 'Mental Health' },
  { icon: '🌿', label: 'Dermatology' },
  { icon: '🚨', label: 'Urgent Care' },
  { icon: '🌸', label: "Women's Health" },
  { icon: '🥗', label: 'Weight Care' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Step 1 — Name
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')

  // Step 2 — DOB
  const [month, setMonth] = useState('')
  const [day,   setDay]   = useState('')
  const [year,  setYear]  = useState('')

  // Step 3 — Specialty
  const [specialty, setSpecialty] = useState('')

  // Step 4 — State
  const [state, setState] = useState('')

  // Step 5 — Insurance
  const [insurance, setInsurance] = useState('')

  function next() { setStep(s => Math.min(s + 1, TOTAL)) }
  function back() { setStep(s => Math.max(s - 1, 1)) }

  async function finish() {
    setLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('profiles').upsert({
        id: user.id,
        full_name: `${firstName} ${lastName}`,
        email: user.email,
        role: 'patient',
      })
    }
    router.push('/patient/dashboard')
  }

  // Shared input style
  const inputBase: React.CSSProperties = {
    width: '100%', padding: '16px 20px', background: 'var(--card-bg)',
    border: '1px solid var(--divider)', borderRadius: 14, fontSize: 16,
    color: '#fff', outline: 'none', boxSizing: 'border-box',
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', display: 'flex', flexDirection: 'column' }}>

      {/* Top bar */}
      <div style={{ height: 72, display: 'flex', alignItems: 'center', padding: '0 48px', gap: 20, borderBottom: '1px solid var(--divider)' }}>
        {step > 1 ? (
          <button onClick={back} style={{ width: 38, height: 38, borderRadius: '50%', border: '1px solid var(--divider)', background: 'none', color: 'var(--muted)', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            ←
          </button>
        ) : (
          <Link href="/" style={{ width: 38, height: 38, borderRadius: '50%', border: '1px solid var(--divider)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: 18, textDecoration: 'none', flexShrink: 0 }}>
            ←
          </Link>
        )}

        {/* Progress bar */}
        <div style={{ flex: 1, height: 5, background: 'var(--divider)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(step / TOTAL) * 100}%`, background: 'var(--teal)', borderRadius: 3, transition: 'width 0.4s ease' }} />
        </div>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', fontSize: 20, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
          <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--teal)' }}>Care</em>MD
        </Link>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <div style={{ width: '100%', maxWidth: 560 }}>

          {/* ── Step 1: Name ── */}
          {step === 1 && (
            <div>
              <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal)', fontWeight: 600, marginBottom: 16 }}>Step 1 of {TOTAL}</p>
              <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', letterSpacing: -0.5, marginBottom: 10, lineHeight: 1.15 }}>
                What is your first and last name?
              </h1>
              <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 40, lineHeight: 1.6 }}>
                We'll use this for your care profile and any prescriptions.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--muted)', marginBottom: 8 }}>First name</label>
                  <input
                    autoFocus type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                    placeholder="First name" style={inputBase}
                    onFocus={e => e.target.style.borderColor = 'var(--teal)'}
                    onBlur={e => e.target.style.borderColor = 'var(--divider)'}
                    onKeyDown={e => e.key === 'Enter' && firstName && lastName && next()}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--muted)', marginBottom: 8 }}>Last name</label>
                  <input
                    type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                    placeholder="Last name" style={inputBase}
                    onFocus={e => e.target.style.borderColor = 'var(--teal)'}
                    onBlur={e => e.target.style.borderColor = 'var(--divider)'}
                    onKeyDown={e => e.key === 'Enter' && firstName && lastName && next()}
                  />
                </div>
              </div>
              <button
                onClick={next} disabled={!firstName.trim() || !lastName.trim()}
                style={{ width: '100%', marginTop: 32, padding: '16px', background: firstName && lastName ? 'var(--teal)' : 'var(--divider)', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, color: firstName && lastName ? 'var(--bg-dark)' : 'var(--muted)', cursor: firstName && lastName ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}
              >
                Next
              </button>
            </div>
          )}

          {/* ── Step 2: DOB ── */}
          {step === 2 && (
            <div>
              <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal)', fontWeight: 600, marginBottom: 16 }}>Step 2 of {TOTAL}</p>
              <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', letterSpacing: -0.5, marginBottom: 10, lineHeight: 1.15 }}>
                When were you born?
              </h1>
              <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 40, lineHeight: 1.6 }}>
                Your date of birth helps us verify eligibility and match you with the right provider.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.4fr', gap: 12 }}>
                {[
                  { label: 'Month', value: month, set: setMonth, placeholder: 'MM', maxLen: 2 },
                  { label: 'Day',   value: day,   set: setDay,   placeholder: 'DD', maxLen: 2 },
                  { label: 'Year',  value: year,  set: setYear,  placeholder: 'YYYY', maxLen: 4 },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--muted)', marginBottom: 8 }}>{f.label}</label>
                    <input
                      type="text" inputMode="numeric" value={f.value} maxLength={f.maxLen}
                      onChange={e => f.set(e.target.value.replace(/\D/g,''))}
                      placeholder={f.placeholder} style={{ ...inputBase, textAlign: 'center' }}
                      onFocus={e => e.target.style.borderColor = 'var(--teal)'}
                      onBlur={e => e.target.style.borderColor = 'var(--divider)'}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={next} disabled={!month || !day || year.length < 4}
                style={{ width: '100%', marginTop: 32, padding: '16px', background: month && day && year.length===4 ? 'var(--teal)' : 'var(--divider)', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, color: month && day && year.length===4 ? 'var(--bg-dark)' : 'var(--muted)', cursor: month && day && year.length===4 ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}
              >
                Next
              </button>
            </div>
          )}

          {/* ── Step 3: Specialty ── */}
          {step === 3 && (
            <div>
              <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal)', fontWeight: 600, marginBottom: 16 }}>Step 3 of {TOTAL}</p>
              <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', letterSpacing: -0.5, marginBottom: 10, lineHeight: 1.15 }}>
                What brings you in today?
              </h1>
              <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 32, lineHeight: 1.6 }}>Choose the area you need help with.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {SPECIALTIES.map(s => (
                  <button
                    key={s.label} onClick={() => setSpecialty(s.label)}
                    style={{ padding: '20px', background: specialty === s.label ? 'var(--teal-dim)' : 'var(--card-bg)', border: `1.5px solid ${specialty === s.label ? 'var(--teal)' : 'var(--divider)'}`, borderRadius: 14, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
                  >
                    <div style={{ fontSize: 26, marginBottom: 10 }}>{s.icon}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: specialty === s.label ? 'var(--teal)' : '#fff' }}>{s.label}</div>
                  </button>
                ))}
              </div>
              <button
                onClick={next} disabled={!specialty}
                style={{ width: '100%', marginTop: 24, padding: '16px', background: specialty ? 'var(--teal)' : 'var(--divider)', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, color: specialty ? 'var(--bg-dark)' : 'var(--muted)', cursor: specialty ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}
              >
                Next
              </button>
            </div>
          )}

          {/* ── Step 4: State ── */}
          {step === 4 && (
            <div>
              <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal)', fontWeight: 600, marginBottom: 16 }}>Step 4 of {TOTAL}</p>
              <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', letterSpacing: -0.5, marginBottom: 10, lineHeight: 1.15 }}>
                Where are you located?
              </h1>
              <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 40, lineHeight: 1.6 }}>
                Providers are licensed by state. We'll match you with someone in your area.
              </p>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--muted)', marginBottom: 8 }}>State</label>
                <select
                  value={state} onChange={e => setState(e.target.value)}
                  style={{ ...inputBase, appearance: 'none', backgroundImage: 'none', cursor: 'pointer' }}
                  onFocus={e => e.target.style.borderColor = 'var(--teal)'}
                  onBlur={e => e.target.style.borderColor = 'var(--divider)'}
                >
                  <option value="">Select your state</option>
                  {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <p style={{ marginTop: 16, fontSize: 12, color: 'var(--muted)' }}>🔒 Used only to match you with licensed providers.</p>
              <button
                onClick={next} disabled={!state}
                style={{ width: '100%', marginTop: 32, padding: '16px', background: state ? 'var(--teal)' : 'var(--divider)', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, color: state ? 'var(--bg-dark)' : 'var(--muted)', cursor: state ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}
              >
                Next
              </button>
            </div>
          )}

          {/* ── Step 5: Insurance ── */}
          {step === 5 && (
            <div>
              <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal)', fontWeight: 600, marginBottom: 16 }}>Step 5 of {TOTAL}</p>
              <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', letterSpacing: -0.5, marginBottom: 10, lineHeight: 1.15 }}>
                How will you pay for care?
              </h1>
              <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 32, lineHeight: 1.6 }}>
                No insurance? No problem — visits start at $49.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { value: 'insurance', icon: '🏥', label: 'I have insurance', sub: "We'll verify your coverage" },
                  { value: 'self-pay',  icon: '💳', label: 'Self-pay',         sub: 'Transparent pricing, no surprise bills' },
                  { value: 'employer',  icon: '🏢', label: 'Employer plan',    sub: 'Check if your employer covers CareMD' },
                ].map(opt => (
                  <button
                    key={opt.value} onClick={() => setInsurance(opt.value)}
                    style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 24px', background: insurance === opt.value ? 'var(--teal-dim)' : 'var(--card-bg)', border: `1.5px solid ${insurance === opt.value ? 'var(--teal)' : 'var(--divider)'}`, borderRadius: 14, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
                  >
                    <span style={{ fontSize: 28, flexShrink: 0 }}>{opt.icon}</span>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: insurance === opt.value ? 'var(--teal)' : '#fff', marginBottom: 3 }}>{opt.label}</div>
                      <div style={{ fontSize: 13, color: 'var(--muted)' }}>{opt.sub}</div>
                    </div>
                    {insurance === opt.value && (
                      <div style={{ marginLeft: 'auto', width: 22, height: 22, borderRadius: '50%', background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--bg-dark)', fontWeight: 700, flexShrink: 0 }}>✓</div>
                    )}
                  </button>
                ))}
              </div>
              <button
                onClick={finish} disabled={!insurance || loading}
                style={{ width: '100%', marginTop: 28, padding: '16px', background: insurance && !loading ? 'var(--teal)' : 'var(--divider)', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, color: insurance && !loading ? 'var(--bg-dark)' : 'var(--muted)', cursor: insurance && !loading ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}
              >
                {loading ? 'Setting up your profile…' : "Let's go →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
