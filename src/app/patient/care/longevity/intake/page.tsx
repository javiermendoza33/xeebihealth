'use client'
import IntakeFlow, { IntakeConfig } from '@/components/IntakeFlow'

const config: IntakeConfig = {
  backHref: '/patient/care/longevity',
  doneHref: '/patient/care/longevity',
  careType: 'longevity',
  steps: [
    {
      kind: 'multi', q: 'What are your longevity goals?', sub: 'Select all that apply.',
      items: ['Live longer & healthier', 'Optimize energy & vitality', 'Cognitive / brain health', 'Disease prevention', 'Athletic & physical performance', 'Hormonal balance', 'Stress & sleep optimization'],
    },
    {
      kind: 'single', q: 'How would you rate your current overall health?',
      options: [
        { label: 'Excellent', sub: 'I feel great and want to optimize further' },
        { label: 'Good',      sub: 'Mostly healthy with some room to improve' },
        { label: 'Fair',      sub: 'Some health concerns I want to address' },
        { label: 'Poor',      sub: 'Significant health issues I need help with' },
      ],
    },
    {
      kind: 'single', q: 'How often do you exercise?',
      options: [
        { label: 'Daily' },
        { label: '3–5× per week' },
        { label: '1–2× per week' },
        { label: 'Rarely or never' },
      ],
    },
    { kind: 'yesno', q: 'Do you currently take any supplements or prescription medications?' },
    {
      kind: 'single', q: 'How would you like to pay?',
      options: [
        { label: 'Use my insurance',  sub: "We'll verify coverage before your visit" },
        { label: 'Self-pay',          sub: 'Transparent pricing, no surprise bills' },
        { label: "I'm not sure yet",  sub: "We'll help you choose" },
      ],
    },
    {
      kind: 'reveal', emoji: '⏳',
      title: 'Your longevity plan is ready.',
      body: 'A preventive health physician will review your intake and design a personalized protocol — starting with a comprehensive biomarker panel.',
      summaryFn: (a) => [
        { label: 'Goals',           value: ((a['s0'] as string[]) ?? []).slice(0,2).join(', ') || '—' },
        { label: 'Current health',  value: (a['s1'] as string) ?? '—' },
        { label: 'Exercise',        value: (a['s2'] as string) ?? '—' },
        { label: 'Supplements',     value: (a['s3'] as string) ?? '—' },
        { label: 'Next step',       value: 'Longevity baseline assessment' },
      ],
    },
  ],
}

export default function LongevityIntakePage() {
  return <IntakeFlow config={config} />
}
