'use client'
import IntakeFlow, { IntakeConfig } from '@/components/IntakeFlow'

const config: IntakeConfig = {
  backHref: '/patient/care/mental',
  doneHref: '/patient/care/mental',
  careType: 'mental',
  steps: [
    {
      kind: 'multi', q: "What's bringing you here?", sub: 'Select all that apply.',
      items: ['Anxiety', 'Depression', 'Stress / burnout', 'ADHD', 'Trauma / PTSD', 'Relationship issues', 'Grief or loss', 'Sleep problems', 'Other'],
    },
    {
      kind: 'single', q: 'How long have you been experiencing this?',
      options: [
        { label: 'Less than a month' },
        { label: '1–6 months' },
        { label: '6–12 months' },
        { label: 'More than a year' },
      ],
    },
    { kind: 'yesno', q: 'Have you worked with a therapist or psychiatrist before?' },
    { kind: 'yesno', q: 'Are you currently taking any mental health medications?' },
    {
      kind: 'single', q: 'What type of support are you looking for?',
      options: [
        { label: 'Therapy / counseling',     sub: 'Talk therapy with a licensed therapist' },
        { label: 'Medication management',    sub: 'Evaluation and prescription from a psychiatrist' },
        { label: 'Both therapy & medication',sub: 'Comprehensive mental health support' },
        { label: "I'm not sure yet",         sub: "We'll help you decide what's best" },
      ],
    },
    {
      kind: 'single', q: 'How would you like to pay?',
      options: [
        { label: 'Use my insurance',  sub: "We'll verify coverage before your visit" },
        { label: 'Self-pay',          sub: 'Transparent pricing, no surprise bills' },
        { label: "I'm not sure yet",  sub: "We'll help you figure out the best option" },
      ],
    },
    {
      kind: 'reveal', emoji: '🧠',
      title: "We're here for you.",
      body: 'A licensed therapist or psychiatrist will review your intake and reach out within 24 hours to get you started.',
      summaryFn: (a) => [
        { label: 'Main concerns',    value: ((a['s0'] as string[]) ?? []).join(', ') || '—' },
        { label: 'Duration',         value: (a['s1'] as string) ?? '—' },
        { label: 'Previous therapy', value: (a['s2'] as string) ?? '—' },
        { label: 'Support type',     value: (a['s4'] as string) ?? '—' },
        { label: 'Next step',        value: 'Provider match & intake review' },
      ],
    },
  ],
}

export default function MentalIntakePage() {
  return <IntakeFlow config={config} />
}
