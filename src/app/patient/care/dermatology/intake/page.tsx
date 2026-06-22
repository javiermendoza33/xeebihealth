import IntakeFlow, { IntakeConfig } from '@/components/IntakeFlow'

const config: IntakeConfig = {
  backHref: '/patient/care/dermatology',
  doneHref: '/patient/care/dermatology',
  steps: [
    {
      kind: 'multi', q: "What's your main skin concern?", sub: 'Select all that apply.',
      items: ['Acne / breakouts', 'Eczema / dry skin', 'Psoriasis', 'Rosacea', 'Anti-aging / wrinkles', 'Dark spots / hyperpigmentation', 'Rash or unknown reaction', 'Other'],
    },
    {
      kind: 'single', q: 'How long have you had this concern?',
      options: [
        { label: 'Less than 3 months' },
        { label: '3–12 months' },
        { label: '1–3 years' },
        { label: 'More than 3 years' },
      ],
    },
    {
      kind: 'single', q: 'How would you describe your skin type?',
      options: [
        { label: 'Oily',         sub: 'Shiny, prone to breakouts' },
        { label: 'Dry',          sub: 'Tight, flaky, or rough patches' },
        { label: 'Combination',  sub: 'Oily T-zone, dry cheeks' },
        { label: 'Sensitive',    sub: 'Easily irritated or reactive' },
        { label: "I'm not sure" },
      ],
    },
    { kind: 'yesno', q: 'Have you tried any prescription skincare treatments before?' },
    {
      kind: 'single', q: 'How would you prefer your visit?',
      options: [
        { label: 'Photo review',   sub: 'Submit photos — get a diagnosis within 24 hours' },
        { label: 'Video visit',    sub: 'Live video with a dermatologist' },
      ],
    },
    {
      kind: 'single', q: 'How would you like to pay?',
      options: [
        { label: 'Use my insurance',  sub: "We'll verify coverage before your visit" },
        { label: 'Self-pay',          sub: 'Transparent pricing, no surprise bills' },
        { label: "I'm not sure yet",  sub: "We'll help you choose" },
      ],
    },
    {
      kind: 'reveal', emoji: '🌿',
      title: 'Your skincare plan is ready.',
      body: 'A board-certified dermatologist will review your intake and photos, then send your diagnosis and treatment plan within 24 hours.',
      summaryFn: (a) => [
        { label: 'Skin concern',       value: ((a['s0'] as string[]) ?? []).join(', ') || '—' },
        { label: 'Duration',           value: (a['s1'] as string) ?? '—' },
        { label: 'Skin type',          value: (a['s2'] as string) ?? '—' },
        { label: 'Visit type',         value: (a['s4'] as string) ?? '—' },
        { label: 'Next step',          value: 'Dermatologist review' },
      ],
    },
  ],
}

export default function DermatologyIntakePage() {
  return <IntakeFlow config={config} />
}
