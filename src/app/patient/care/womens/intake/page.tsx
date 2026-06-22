import IntakeFlow, { IntakeConfig } from '@/components/IntakeFlow'

const config: IntakeConfig = {
  backHref: '/patient/care/womens',
  doneHref: '/patient/care/womens',
  steps: [
    {
      kind: 'multi', q: "What brings you here?", sub: 'Select all that apply.',
      items: ['Birth control', 'Annual OB/GYN exam', 'Hormone therapy (HRT)', 'STI testing', 'Fertility concerns', 'Pelvic pain', 'Vaginal health', 'Other'],
    },
    {
      kind: 'single', q: 'When was your last OB/GYN visit?',
      options: [
        { label: 'Within the past year' },
        { label: '1–2 years ago' },
        { label: '2+ years ago' },
        { label: "I've never had one" },
      ],
    },
    { kind: 'yesno', q: 'Are you currently using any form of birth control?' },
    {
      kind: 'multi', q: 'Do you have a history of any of the following?', sub: 'Select all that apply.',
      items: ['PCOS', 'Endometriosis', 'Uterine fibroids', 'Thyroid disorder', 'Ovarian cysts', 'None of these'],
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
      kind: 'reveal', emoji: '🌸',
      title: "Your care plan is ready.",
      body: 'A board-certified OB/GYN will review your intake and reach out within 24 hours to schedule your visit.',
      summaryFn: (a) => [
        { label: 'Primary concern',  value: ((a['s0'] as string[]) ?? []).join(', ') || '—' },
        { label: 'Last OB/GYN',     value: (a['s1'] as string) ?? '—' },
        { label: 'Birth control',    value: (a['s2'] as string) ?? '—' },
        { label: 'Payment',          value: (a['s4'] as string) ?? '—' },
        { label: 'Next step',        value: 'OB/GYN consultation' },
      ],
    },
  ],
}

export default function WomensIntakePage() {
  return <IntakeFlow config={config} />
}
