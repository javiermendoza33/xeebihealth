'use client'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const SAGE       = '#5B9E82'
const SAGE_MID   = '#3D7A62'
const SAGE_LIGHT = '#EBF5EF'
const FOREST     = '#1C2D26'
const PAGE_BG    = '#F4F7F5'
const CARD       = '#FFFFFF'
const BORDER     = '#E2ECE7'
const MUTED      = '#7A9386'

const CARE_LABELS: Record<string, string> = {
  nutrition:   'Nutrition — Registered Dietitian',
  mental:      'Mental Health — Therapist',
  primary:     'Primary Care — Physician',
  dermatology: 'Dermatology — Specialist',
  weight:      'Weight Loss — Provider',
  womens:      "Women's Health — OB/GYN",
  urgent:      'Urgent Care — Provider',
  male:        'Male Sexual Health — Provider',
  hair:        'Hair Loss — Dermatologist',
  longevity:   'Longevity — Specialist',
  menopause:   'Menopause — Specialist',
}

const PROVIDERS: Record<string, { name: string; title: string; rating: string; reviews: number }> = {
  nutrition:   { name: 'Dr. Sarah Chen, RD',       title: 'Registered Dietitian',      rating: '4.9', reviews: 312 },
  mental:      { name: 'Dr. Marcus Reid, LCSW',    title: 'Licensed Therapist',         rating: '4.8', reviews: 187 },
  primary:     { name: 'Dr. Aisha Patel, MD',      title: 'Board-Certified Physician',  rating: '4.9', reviews: 521 },
  dermatology: { name: 'Dr. James Yoo, MD',        title: 'Dermatologist',              rating: '4.7', reviews: 244 },
  weight:      { name: 'Dr. Lena Torres, MD',      title: 'Weight Loss Specialist',     rating: '4.9', reviews: 398 },
  womens:      { name: 'Dr. Priya Nair, MD',       title: 'OB/GYN',                     rating: '4.8', reviews: 276 },
  urgent:      { name: 'Dr. Kevin Brooks, MD',     title: 'Urgent Care Provider',       rating: '4.7', reviews: 163 },
  male:        { name: 'Dr. Daniel Fox, MD',       title: 'Men\'s Health Specialist',   rating: '4.8', reviews: 209 },
  hair:        { name: 'Dr. Lisa Park, MD',        title: 'Hair Loss Specialist',       rating: '4.9', reviews: 185 },
  longevity:   { name: 'Dr. Robert Osei, MD',      title: 'Longevity Specialist',       rating: '4.8', reviews: 142 },
  menopause:   { name: 'Dr. Carol Nguyen, MD',     title: 'Menopause Specialist',       rating: '4.9', reviews: 198 },
}

// Available days relative to today (days from now that have slots)
const AVAILABLE_OFFSETS = [1, 2, 3, 5, 6, 8, 9, 10, 12, 13]

const TIMES_AM = ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM']
const TIMES_PM = ['12:00 PM', '1:00 PM', '1:30 PM', '2:00 PM', '3:00 PM', '3:30 PM', '4:00 PM', '5:00 PM']

// Pseudo-randomize available slots per day (deterministic by offset)
function getSlotsForDay(offset: number) {
  const am = TIMES_AM.filter((_, i) => (i + offset) % 3 !== 0)
  const pm = TIMES_PM.filter((_, i) => (i + offset) % 4 !== 1)
  return { am, pm }
}

function getDate(offsetDays: number) {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  return d
}

function formatDate(d: Date) {
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

function BookingContent() {
  const router = useRouter()
  const params = useSearchParams()
  const care = params.get('care') ?? 'primary'

  const provider = PROVIDERS[care] ?? PROVIDERS['primary']
  const careLabel = CARE_LABELS[care] ?? 'Provider Visit'

  const [selectedOffset, setSelectedOffset] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [booking, setBooking] = useState(false)

  const slots = selectedOffset !== null ? getSlotsForDay(selectedOffset) : null

  async function confirm() {
    setBooking(true)
    await new Promise(r => setTimeout(r, 800))
    setConfirmed(true)
    setBooking(false)
  }

  if (confirmed && selectedOffset !== null && selectedTime) {
    const date = getDate(selectedOffset)
    return (
      <div style={{ minHeight: '100vh', background: PAGE_BG, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: FOREST, marginBottom: 10 }}>Appointment confirmed!</h1>
          <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.65, marginBottom: 32 }}>
            Your session with <strong style={{ color: FOREST }}>{provider.name}</strong> is booked for{' '}
            <strong style={{ color: FOREST }}>{formatDate(date)} at {selectedTime}</strong>.<br />
            You&apos;ll receive a confirmation email shortly.
          </p>
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: '20px 24px', marginBottom: 28, textAlign: 'left' }}>
            {[
              { label: 'Provider',   value: provider.name },
              { label: 'Specialty',  value: provider.title },
              { label: 'Date',       value: formatDate(date) },
              { label: 'Time',       value: selectedTime },
              { label: 'Format',     value: 'Secure video visit' },
            ].map((r, i, arr) => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: i < arr.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
                <span style={{ fontSize: 13, color: MUTED }}>{r.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: FOREST }}>{r.value}</span>
              </div>
            ))}
          </div>
          <Link href="/patient/appointments"
            style={{ display: 'block', padding: '14px', background: SAGE, color: '#fff', borderRadius: 100, fontSize: 15, fontWeight: 700, textDecoration: 'none', marginBottom: 12 }}>
            View my appointments →
          </Link>
          <Link href="/patient/dashboard"
            style={{ display: 'block', padding: '14px', background: CARD, color: MUTED, border: `1px solid ${BORDER}`, borderRadius: 100, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
            Back to dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: PAGE_BG, padding: '0 0 80px' }}>

      {/* Header */}
      <div style={{ background: CARD, borderBottom: `1px solid ${BORDER}`, padding: '20px 40px', display: 'flex', alignItems: 'center', gap: 20, position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => router.back()}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: MUTED, padding: '4px 8px' }}>←</button>
        <div>
          <p style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: SAGE, fontWeight: 700, marginBottom: 2 }}>Book a session</p>
          <p style={{ fontSize: 15, fontWeight: 700, color: FOREST }}>{careLabel}</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px' }}>

        {/* Provider card */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: '20px 24px', marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: SAGE_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>👩‍⚕️</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: FOREST, marginBottom: 2 }}>{provider.name}</p>
            <p style={{ fontSize: 13, color: MUTED }}>{provider.title}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: FOREST }}>{provider.rating} ★</p>
            <p style={{ fontSize: 12, color: MUTED }}>{provider.reviews} reviews</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selectedOffset !== null ? '1fr 1fr' : '1fr', gap: 24 }}>

          {/* Date picker */}
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: FOREST, marginBottom: 4 }}>Select a date</h2>
            <p style={{ fontSize: 13, color: MUTED, marginBottom: 16 }}>Next available appointments</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {AVAILABLE_OFFSETS.map(offset => {
                const date = getDate(offset)
                const selected = selectedOffset === offset
                return (
                  <button key={offset}
                    onClick={() => { setSelectedOffset(offset); setSelectedTime(null) }}
                    style={{
                      padding: '14px 18px', textAlign: 'left',
                      background: selected ? SAGE_LIGHT : CARD,
                      border: `1.5px solid ${selected ? SAGE : BORDER}`,
                      borderRadius: 12, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}>
                    <span style={{ fontSize: 14, fontWeight: selected ? 700 : 500, color: selected ? SAGE_MID : FOREST }}>
                      {formatDate(date)}
                    </span>
                    <span style={{ fontSize: 12, color: MUTED }}>
                      {getSlotsForDay(offset).am.length + getSlotsForDay(offset).pm.length} slots
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Time picker */}
          {selectedOffset !== null && slots && (
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: FOREST, marginBottom: 4 }}>Select a time</h2>
              <p style={{ fontSize: 13, color: MUTED, marginBottom: 16 }}>{formatDate(getDate(selectedOffset))}</p>

              {slots.am.length > 0 && (
                <>
                  <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED, fontWeight: 600, marginBottom: 10 }}>Morning</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
                    {slots.am.map(t => {
                      const sel = selectedTime === t
                      return (
                        <button key={t} onClick={() => setSelectedTime(t)}
                          style={{ padding: '12px', background: sel ? SAGE_LIGHT : CARD, border: `1.5px solid ${sel ? SAGE : BORDER}`, borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: sel ? 700 : 500, color: sel ? SAGE_MID : FOREST }}>
                          {t}
                        </button>
                      )
                    })}
                  </div>
                </>
              )}

              {slots.pm.length > 0 && (
                <>
                  <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED, fontWeight: 600, marginBottom: 10 }}>Afternoon</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 28 }}>
                    {slots.pm.map(t => {
                      const sel = selectedTime === t
                      return (
                        <button key={t} onClick={() => setSelectedTime(t)}
                          style={{ padding: '12px', background: sel ? SAGE_LIGHT : CARD, border: `1.5px solid ${sel ? SAGE : BORDER}`, borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: sel ? 700 : 500, color: sel ? SAGE_MID : FOREST }}>
                          {t}
                        </button>
                      )
                    })}
                  </div>
                </>
              )}

              <button
                onClick={confirm}
                disabled={!selectedTime || booking}
                style={{
                  width: '100%', padding: '15px',
                  background: selectedTime ? SAGE : BORDER,
                  color: selectedTime ? '#fff' : MUTED,
                  border: 'none', borderRadius: 100,
                  fontSize: 15, fontWeight: 700,
                  cursor: selectedTime ? 'pointer' : 'not-allowed',
                  opacity: booking ? 0.7 : 1,
                }}>
                {booking ? 'Confirming…' : selectedTime ? `Confirm — ${selectedTime}` : 'Select a time'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function BookAppointmentPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#F4F7F5' }} />}>
      <BookingContent />
    </Suspense>
  )
}
