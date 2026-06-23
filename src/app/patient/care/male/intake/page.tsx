'use client'
import IntakeFlow, { IntakeConfig } from '@/components/IntakeFlow'

const config: IntakeConfig = {
  backHref: '/patient/care/male',
  doneHref: '/patient/care/male',
  careType: 'male',
  steps: [
    {
      kind: 'multi', q: "What brings you here?", sub: 'Select all that apply.',
      items: ['Erectile dysfunction', 'Low testosterone', 'Premature ejaculation', 'Low libido', "General men's wellness", 'Other'],
    },
    {
      kind: 'single', q: 'How long have you been experiencing this?',
      options: [
        { label: 'Less than 3 months' },
        { label: '3–12 months' },
        { label: '1–2 years' },
        { label: 'More than 2 years' },
      ],
    },
    {
      kind: 'multi', q: 'Do you have any of these conditions?', sub: 'Select all that apply.',
      items: ['Diabetes', 'High blood pressure', 'Heart disease', 'High cholesterol', 'Depression or anxiety', 'None of these'],
    },
    { kind: 'yesno', q: 'Are you currently taking any medications?' },
    {
      kind: 'single', q: 'How would you like to pay?',
      options: [
        { label: 'Use my insurance',  sub: "We'll verify coverage before your visit" },
        { label: 'Self-pay',          sub: 'Transparent pricing, no surprise bills' },
        { label: "I'm not sure yet",  sub: "We'll help you choose" },
      ],
    },
    {
      kind: 'reveal', emoji: '💪',
      title: "You're on the right track.",
      body: 'A physician specializing in men\'s health will review your intake and reach out within 24 hours — completely private.',
      summaryFn: (a) => [
        { label: 'Primary concern',   value: ((a['s0'] as string[]) ?? []).join(', ') || '—' },
        { label: 'Duration',          value: (a['s1'] as string) ?? '—' },
        { label: 'Current meds',      value: (a['s3'] as string) ?? '—' },
        { label: 'Payment',           value: (a['s4'] as string) ?? '—' },
        { label: 'Next step',         value: "Men's health consultation" },
      ],
    },
  ],
}

export default function MaleIntakePage() {
  return <IntakeFlow config={config} />
}
