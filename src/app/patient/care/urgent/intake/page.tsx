'use client'
import IntakeFlow, { IntakeConfig } from '@/components/IntakeFlow'

const config: IntakeConfig = {
  backHref: '/patient/care/urgent',
  doneHref: '/patient/care/urgent',
  careType: 'urgent',
  steps: [
    {
      kind: 'multi', q: 'What are you experiencing?', sub: 'Select all that apply.',
      items: ['Fever / chills', 'Sore throat', 'UTI symptoms', 'Ear pain', 'Rash or skin reaction', 'Nausea / vomiting', 'Sinus congestion', 'Eye irritation / pink eye', 'Cough', 'Headache'],
    },
    {
      kind: 'single', q: 'How long have you had these symptoms?',
      options: [
        { label: 'Less than 24 hours' },
        { label: '1–3 days' },
        { label: '3–7 days' },
        { label: 'More than a week' },
      ],
    },
    {
      kind: 'single', q: 'How severe are your symptoms right now?',
      options: [
        { label: 'Mild',     sub: 'Noticeable but manageable' },
        { label: 'Moderate', sub: "Affecting my day — I need relief" },
        { label: 'Severe',   sub: 'Very uncomfortable, need help now' },
      ],
    },
    { kind: 'yesno', q: 'Do you have any known allergies to medications?' },
    {
      kind: 'reveal', emoji: '⚡',
      title: 'A provider is ready for you.',
      body: 'Based on your symptoms, a licensed provider is available now. You\'ll be connected within minutes for a video visit.',
      summaryFn: (a) => [
        { label: 'Symptoms',   value: ((a['s0'] as string[]) ?? []).slice(0,3).join(', ') || '—' },
        { label: 'Duration',   value: (a['s1'] as string) ?? '—' },
        { label: 'Severity',   value: (a['s2'] as string) ?? '—' },
        { label: 'Allergies',  value: (a['s3'] as string) ?? '—' },
        { label: 'Next step',  value: 'Video visit — starting now' },
      ],
    },
  ],
}

export default function UrgentIntakePage() {
  return <IntakeFlow config={config} />
}
