'use client'
import IntakeFlow, { IntakeConfig } from '@/components/IntakeFlow'

const config: IntakeConfig = {
  backHref: '/patient/care/primary',
  doneHref: '/patient/care/primary',
  careType: 'primary',
  steps: [
    {
      kind: 'single', q: 'What brings you to primary care?',
      options: [
        { label: 'Annual checkup',              sub: 'Preventive exam & routine labs' },
        { label: 'A specific health concern',   sub: 'Symptoms, pain, or something new' },
        { label: 'Medication refill',           sub: 'Renew an existing prescription' },
        { label: 'Chronic condition management',sub: 'Ongoing care for a known condition' },
      ],
    },
    {
      kind: 'multi', q: 'Do you have any of these conditions?', sub: 'Select all that apply.',
      items: ['Diabetes / pre-diabetes', 'High blood pressure', 'High cholesterol', 'Asthma', 'Thyroid disorder', 'Heart disease', 'None of these'],
    },
    { kind: 'yesno', q: 'Are you currently taking any prescription medications?' },
    {
      kind: 'single', q: 'When was your last physical exam?',
      options: [
        { label: 'Within the past year' },
        { label: '1–2 years ago' },
        { label: '2+ years ago' },
        { label: "I've never had one" },
      ],
    },
    {
      kind: 'single', q: 'How would you like to pay?',
      options: [
        { label: 'Use my insurance',   sub: "We'll verify coverage before your visit" },
        { label: 'Self-pay',           sub: 'Transparent pricing, no surprise bills' },
        { label: "I'm not sure yet",   sub: "We'll help you figure out the best option" },
      ],
    },
    {
      kind: 'reveal', emoji: '🩺',
      title: "You're all set!",
      body: 'A board-certified primary care physician will review your intake and reach out within 24 hours to schedule your visit.',
      summaryFn: (a) => [
        { label: 'Visit type',  value: (a['s0'] as string) ?? '—' },
        { label: 'Medications', value: a['s2'] === 'Yes' ? 'Yes — will review' : 'None' },
        { label: 'Last exam',   value: (a['s3'] as string) ?? '—' },
        { label: 'Payment',     value: (a['s4'] as string) ?? '—' },
        { label: 'Next step',   value: 'Provider consultation' },
      ],
    },
  ],
}

export default function PrimaryIntakePage() {
  return <IntakeFlow config={config} />
}
