'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CONDITIONS = [
  'None of these',
  'Prediabetes',
  'Metabolic syndrome',
  'Type 2 diabetes',
  'Dyslipidemia',
  'Hypertension',
  'Cardiovascular disease',
  'Nonalcoholic fatty liver disease',
  'Polycystic ovary syndrome (PCOS)',
  'Female infertility',
  'Male hypogonadism',
  'Obstructive sleep apnea',
  'Asthma/reactive airway disease',
  'Osteoarthritis',
  'Urinary stress incontinence',
  'Gastroesophageal reflux disease',
  'Depression',
]

const MEDICATIONS = [
  'Ozempic (semaglutide)',
  'Wegovy (semaglutide)',
  'Mounjaro (tirzepatide)',
  'Zepbound (tirzepatide)',
  'Phentermine',
  'Contrave',
  'Qsymia',
  'Other',
]

const NAVY = '#1E2B5E'
const BORDER = '#E5E7EB'
const MUTED = '#9CA3AF'
const TOTAL = 9

export default function WeightIntakePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [heightFt, setHeightFt] = useState('')
  const [heightIn, setHeightIn] = useState('')
  const [currentWeight, setCurrentWeight] = useState('')
  const [goalWeight, setGoalWeight] = useState('')
  const [timeline, setTimeline] = useState('')
  const [conditions, setConditions] = useState<string[]>([])
  const [prevMeds, setPrevMeds] = useState<string | null>(null)
  const [medications, setMedications] = useState<string[]>([])
  const [payment, setPayment] = useState('')

  const totalInches = (parseInt(heightFt) || 0) * 12 + (parseInt(heightIn) || 0)
  const bmi = totalInches > 0 && currentWeight
    ? ((parseInt(currentWeight) / (totalInches * totalInches)) * 703).toFixed(1)
    : null
  const toLose = Math.max(0, parseInt(currentWeight || '0') - parseInt(goalWeight || '0'))

  const progress = Math.round(((step - 1) / (TOTAL - 1)) * 100)

  function goNext() {
    if (step === 6 && prevMeds === 'No') { setStep(8); return }
    setStep(s => s + 1)
  }
  function goBack() {
    if (step === 1) { router.push('/patient/care/weight'); return }
    if (step === 8 && prevMeds === 'No') { setStep(6); return }
    setStep(s => s - 1)
  }

  function toggleCondition(c: string) {
    if (c === 'None of these') { setConditions(['None of these']); return }
    setConditions(prev => {
      const filtered = prev.filter(x => x !== 'None of these')
      return filtered.includes(c) ? filtered.filter(x => x !== c) : [...filtered, c]
    })
  }
  function toggleMed(m: string) {
    setMedications(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])
  }

  const inputStyle = (active: boolean): React.CSSProperties => ({
    width: '100%', padding: '18px 20px', fontSize: 22, fontWeight: 500, color: NAVY,
    border: `2px solid ${active ? NAVY : BORDER}`, borderRadius: 16, outline: 'none',
    boxSizing: 'border-box',
  })

  const nextBtn = (enabled: boolean): React.CSSProperties => ({
    width: '100%', padding: '18px', fontSize: 16, fontWeight: 600,
    background: enabled ? NAVY : '#E5E7EB', color: enabled ? '#fff' : MUTED,
    border: 'none', borderRadius: 100, cursor: enabled ? 'pointer' : 'not-allowed',
  })

  const cardBtn = (selected: boolean): React.CSSProperties => ({
    width: '100%', padding: '20px 24px', marginBottom: 12, textAlign: 'left',
    background: selected ? `${NAVY}0A` : '#fff',
    border: `1.5px solid ${selected ? NAVY : BORDER}`,
    borderRadius: 16, cursor: 'pointer',
  })

  const checkBox = (selected: boolean): React.CSSProperties => ({
    width: 20, height: 20, borderRadius: 6, flexShrink: 0,
    border: `2px solid ${selected ? NAVY : '#D1D5DB'}`,
    background: selected ? NAVY : '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  })

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '20px 32px', display: 'flex', alignItems: 'center', gap: 20, borderBottom: `1px solid ${BORDER}`, position: 'sticky', top: 0, background: '#fff', zIndex: 10 }}>
        <button onClick={goBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: MUTED, padding: '4px 8px', lineHeight: 1 }}>←</button>
        <div style={{ flex: 1, height: 6, background: '#E5E7EB', borderRadius: 100, overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: NAVY, borderRadius: 100, transition: 'width 0.35s ease' }} />
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: NAVY, letterSpacing: -0.3 }}>
          <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Care</span>MD
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: '56px 32px 80px', maxWidth: 580, width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>

        {/* Step 1 — Height */}
        {step === 1 && (
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: NAVY, lineHeight: 1.3, marginBottom: 40 }}>What is your height?</h1>
            <div style={{ display: 'flex', gap: 16, marginBottom: 40 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 13, color: MUTED, display: 'block', marginBottom: 8 }}>Feet</label>
                <input type="number" min={3} max={8} placeholder="5" value={heightFt}
                  onChange={e => setHeightFt(e.target.value)} style={inputStyle(!!heightFt)} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 13, color: MUTED, display: 'block', marginBottom: 8 }}>Inches</label>
                <input type="number" min={0} max={11} placeholder="8" value={heightIn}
                  onChange={e => setHeightIn(e.target.value)} style={inputStyle(!!heightIn)} />
              </div>
            </div>
            <button onClick={goNext} disabled={!heightFt || !heightIn} style={nextBtn(!!(heightFt && heightIn))}>Next</button>
          </div>
        )}

        {/* Step 2 — Current weight */}
        {step === 2 && (
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: NAVY, lineHeight: 1.3, marginBottom: 40 }}>What is your current weight?</h1>
            <label style={{ fontSize: 13, color: MUTED, display: 'block', marginBottom: 8 }}>Pounds (lbs)</label>
            <input type="number" min={80} max={700} placeholder="185" value={currentWeight}
              onChange={e => setCurrentWeight(e.target.value)} style={{ ...inputStyle(!!currentWeight), marginBottom: bmi ? 8 : 40 }} />
            {bmi && <p style={{ fontSize: 13, color: MUTED, marginBottom: 40 }}>Your BMI: <strong style={{ color: NAVY }}>{bmi}</strong></p>}
            <button onClick={goNext} disabled={!currentWeight} style={nextBtn(!!currentWeight)}>Next</button>
          </div>
        )}

        {/* Step 3 — Goal weight */}
        {step === 3 && (
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: NAVY, lineHeight: 1.3, marginBottom: 8 }}>What is your goal weight?</h1>
            <p style={{ fontSize: 15, color: MUTED, marginBottom: 40 }}>Even losing 5–10% of your weight has significant health benefits.</p>
            <label style={{ fontSize: 13, color: MUTED, display: 'block', marginBottom: 8 }}>Pounds (lbs)</label>
            <input type="number" min={80} max={500} placeholder="155" value={goalWeight}
              onChange={e => setGoalWeight(e.target.value)}
              style={{ ...inputStyle(!!goalWeight), marginBottom: goalWeight && currentWeight ? 8 : 40 }} />
            {goalWeight && currentWeight && (
              <p style={{ fontSize: 13, color: MUTED, marginBottom: 40 }}>
                Goal: lose <strong style={{ color: NAVY }}>{toLose} lbs</strong>
              </p>
            )}
            <button onClick={goNext} disabled={!goalWeight} style={nextBtn(!!goalWeight)}>Next</button>
          </div>
        )}

        {/* Step 4 — Timeline */}
        {step === 4 && (
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: NAVY, lineHeight: 1.3, marginBottom: 8 }}>What&apos;s your timeline?</h1>
            <p style={{ fontSize: 15, color: MUTED, marginBottom: 40 }}>This helps us recommend the right program intensity.</p>
            {[
              { value: 'fast', label: 'As fast as possible', sub: 'Maximum support from day one' },
              { value: 'steady', label: 'Slow and steady', sub: '1–2 lbs per week, sustainable pace' },
              { value: 'flexible', label: "I'm flexible", sub: 'Let my provider recommend a plan' },
            ].map(opt => (
              <button key={opt.value} onClick={() => { setTimeline(opt.value); setTimeout(goNext, 220) }} style={cardBtn(timeline === opt.value)}>
                <div style={{ fontSize: 16, fontWeight: 600, color: NAVY }}>{opt.label}</div>
                <div style={{ fontSize: 13, color: MUTED, marginTop: 4 }}>{opt.sub}</div>
              </button>
            ))}
          </div>
        )}

        {/* Step 5 — Health conditions */}
        {step === 5 && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: NAVY, lineHeight: 1.35, marginBottom: 8 }}>
              Do you currently have, or have a history of, any of the following conditions?
            </h1>
            <p style={{ fontSize: 14, color: MUTED, marginBottom: 28 }}>Select all that apply.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
              {CONDITIONS.map(c => {
                const sel = conditions.includes(c)
                return (
                  <button key={c} onClick={() => toggleCondition(c)}
                    style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '15px 18px', background: sel ? `${NAVY}0A` : '#fff', border: `1.5px solid ${sel ? NAVY : BORDER}`, borderRadius: 14, cursor: 'pointer', textAlign: 'left' }}>
                    <div style={checkBox(sel)}>
                      {sel && <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: 15, color: NAVY, fontWeight: sel ? 500 : 400 }}>{c}</span>
                  </button>
                )
              })}
            </div>
            <button onClick={goNext} disabled={conditions.length === 0} style={{ ...nextBtn(conditions.length > 0), position: 'sticky', bottom: 24 }}>Next</button>
          </div>
        )}

        {/* Step 6 — Previous meds Yes/No */}
        {step === 6 && (
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: NAVY, lineHeight: 1.35, marginBottom: 48 }}>
              Have you taken any weight loss medication(s) within the past 6 months?
            </h1>
            {['Yes', 'No'].map(opt => (
              <button key={opt} onClick={() => { setPrevMeds(opt); setTimeout(() => opt === 'No' ? setStep(8) : setStep(7), 220) }}
                style={{ ...cardBtn(prevMeds === opt), display: 'block', fontSize: 17, fontWeight: 500, color: NAVY, textAlign: 'center', padding: '22px' }}>
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* Step 7 — Which medications */}
        {step === 7 && (
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: NAVY, lineHeight: 1.35, marginBottom: 8 }}>Which medication(s) have you taken?</h1>
            <p style={{ fontSize: 14, color: MUTED, marginBottom: 28 }}>Select all that apply.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
              {MEDICATIONS.map(m => {
                const sel = medications.includes(m)
                return (
                  <button key={m} onClick={() => toggleMed(m)}
                    style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '15px 18px', background: sel ? `${NAVY}0A` : '#fff', border: `1.5px solid ${sel ? NAVY : BORDER}`, borderRadius: 14, cursor: 'pointer', textAlign: 'left' }}>
                    <div style={checkBox(sel)}>
                      {sel && <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: 15, color: NAVY, fontWeight: sel ? 500 : 400 }}>{m}</span>
                  </button>
                )
              })}
            </div>
            <button onClick={goNext} disabled={medications.length === 0} style={{ ...nextBtn(medications.length > 0), position: 'sticky', bottom: 24 }}>Next</button>
          </div>
        )}

        {/* Step 8 — Payment */}
        {step === 8 && (
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: NAVY, lineHeight: 1.35, marginBottom: 8 }}>How would you like to pay?</h1>
            <p style={{ fontSize: 15, color: MUTED, marginBottom: 40 }}>We accept most major insurance plans and offer affordable self-pay options.</p>
            {[
              { value: 'insurance', label: 'Use my insurance', sub: "We'll verify your coverage before your first visit" },
              { value: 'selfpay', label: 'Self-pay — $199/month', sub: 'Includes provider visits, medication & coaching' },
              { value: 'unsure', label: "I'm not sure yet", sub: "We'll help you choose the best option" },
            ].map(opt => (
              <button key={opt.value} onClick={() => { setPayment(opt.value); setTimeout(goNext, 220) }} style={cardBtn(payment === opt.value)}>
                <div style={{ fontSize: 16, fontWeight: 600, color: NAVY }}>{opt.label}</div>
                <div style={{ fontSize: 13, color: MUTED, marginTop: 4 }}>{opt.sub}</div>
              </button>
            ))}
          </div>
        )}

        {/* Step 9 — Plan reveal */}
        {step === 9 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: NAVY, marginBottom: 12 }}>You&apos;re a great fit!</h1>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.7, marginBottom: 48, maxWidth: 440, margin: '0 auto 48px' }}>
              Based on your responses, you qualify for our GLP-1 weight loss program. A licensed provider will review your intake and reach out within 24 hours.
            </p>
            <div style={{ background: '#F9FAFB', border: `1px solid ${BORDER}`, borderRadius: 20, padding: '28px 32px', textAlign: 'left', marginBottom: 32 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: NAVY, marginBottom: 20 }}>Your personalized plan</h2>
              {[
                { label: 'Current weight', value: `${currentWeight} lbs` },
                { label: 'Goal weight', value: `${goalWeight} lbs` },
                { label: 'To lose', value: `${toLose} lbs` },
                { label: 'Program', value: 'GLP-1 (Semaglutide or Tirzepatide)' },
                { label: 'Next step', value: 'Provider consultation' },
              ].map((r, i, arr) => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: i < arr.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
                  <span style={{ fontSize: 14, color: MUTED }}>{r.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: NAVY }}>{r.value}</span>
                </div>
              ))}
            </div>
            <button onClick={() => router.push('/patient/care/weight')}
              style={{ width: '100%', padding: '18px', background: NAVY, color: '#fff', border: 'none', borderRadius: 100, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
              Go to my weight care plan →
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
