'use client'
import IntakeFlow, { IntakeConfig } from '@/components/IntakeFlow'

const config: IntakeConfig = {
  backHref: '/patient/care/nutrition',
  doneHref: '/patient/care/nutrition',
  steps: [
    {
      kind: 'single', q: "What's your primary nutrition goal?",
      options: [
        { label: 'Lose weight',                sub: 'Create a sustainable calorie deficit' },
        { label: 'Build muscle',               sub: 'Optimize protein & recovery nutrition' },
        { label: 'Improve energy & mood',      sub: 'Eat to feel better every day' },
        { label: 'Manage a health condition',  sub: 'Diabetes, heart health, gut health & more' },
        { label: 'Athletic performance',       sub: 'Fuel training & competition' },
        { label: 'General healthy eating',     sub: 'Build better habits long-term' },
      ],
    },
    {
      kind: 'multi', q: 'Do you have any dietary restrictions?', sub: 'Select all that apply.',
      items: ['Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Nut allergy', 'Kosher', 'Halal', 'None'],
    },
    {
      kind: 'single', q: 'How would you describe your current eating habits?',
      options: [
        { label: 'Very healthy',       sub: 'I eat well and want to fine-tune' },
        { label: 'Somewhat healthy',   sub: 'Good most of the time' },
        { label: 'Average',            sub: 'Could definitely be better' },
        { label: 'Needs a lot of work',sub: "I'm ready for a real change" },
      ],
    },
    {
      kind: 'single', q: 'How often do you cook at home?',
      options: [
        { label: 'Almost always' },
        { label: 'Often (4–5× per week)' },
        { label: 'Sometimes (2–3× per week)' },
        { label: 'Rarely — I mostly eat out' },
      ],
    },
    {
      kind: 'single', q: 'How would you like to pay?',
      options: [
        { label: 'Use my insurance',  sub: "We'll verify coverage before your session" },
        { label: 'Self-pay',          sub: 'Transparent pricing, no surprise bills' },
        { label: "I'm not sure yet",  sub: "We'll help you choose" },
      ],
    },
    {
      kind: 'reveal', emoji: '🍎',
      title: 'Your nutrition plan is ready.',
      body: 'A registered dietitian will review your intake and build a personalized meal plan — tailored to your goals, preferences, and lifestyle.',
      summaryFn: (a) => [
        { label: 'Primary goal',       value: (a['s0'] as string) ?? '—' },
        { label: 'Dietary needs',      value: ((a['s1'] as string[]) ?? []).join(', ') || 'None' },
        { label: 'Current habits',     value: (a['s2'] as string) ?? '—' },
        { label: 'Payment',            value: (a['s4'] as string) ?? '—' },
        { label: 'Next step',          value: 'Dietitian match & meal plan' },
      ],
    },
  ],
}

export default function NutritionIntakePage() {
  return <IntakeFlow config={config} />
}
