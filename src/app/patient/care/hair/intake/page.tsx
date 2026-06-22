import IntakeFlow, { IntakeConfig } from '@/components/IntakeFlow'

const config: IntakeConfig = {
  backHref: '/patient/care/hair',
  doneHref: '/patient/care/hair',
  steps: [
    {
      kind: 'single', q: 'How would you describe your hair loss?',
      options: [
        { label: 'Thinning overall',      sub: 'Hair feels less dense across the scalp' },
        { label: 'Receding hairline',     sub: 'Temples or forehead moving back' },
        { label: 'Crown / top thinning',  sub: 'Noticeable on the top of the head' },
        { label: 'Patchy loss',           sub: 'Circular or irregular bald patches' },
        { label: 'Excessive shedding',    sub: 'More hair coming out than usual' },
      ],
    },
    {
      kind: 'single', q: 'How long has this been happening?',
      options: [
        { label: 'Less than 6 months' },
        { label: '6–12 months' },
        { label: '1–3 years' },
        { label: 'More than 3 years' },
      ],
    },
    { kind: 'yesno', q: 'Is there a family history of hair loss?' },
    { kind: 'yesno', q: 'Have you tried any hair loss treatments before?' },
    {
      kind: 'single', q: 'How would you like to pay?',
      options: [
        { label: 'Use my insurance',  sub: "We'll verify coverage before your visit" },
        { label: 'Self-pay',          sub: 'Transparent pricing, no surprise bills' },
        { label: "I'm not sure yet",  sub: "We'll help you choose" },
      ],
    },
    {
      kind: 'reveal', emoji: '💆',
      title: 'Your regrowth plan is ready.',
      body: 'A physician will review your intake and photos, then prescribe a personalized treatment plan — often including finasteride, minoxidil, or a custom formula.',
      summaryFn: (a) => [
        { label: 'Hair loss type',    value: (a['s0'] as string) ?? '—' },
        { label: 'Duration',          value: (a['s1'] as string) ?? '—' },
        { label: 'Family history',    value: (a['s2'] as string) ?? '—' },
        { label: 'Prior treatment',   value: (a['s3'] as string) ?? '—' },
        { label: 'Next step',         value: 'Physician review & prescription' },
      ],
    },
  ],
}

export default function HairIntakePage() {
  return <IntakeFlow config={config} />
}
