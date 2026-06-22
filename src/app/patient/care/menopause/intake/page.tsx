import IntakeFlow, { IntakeConfig } from '@/components/IntakeFlow'

const config: IntakeConfig = {
  backHref: '/patient/care/menopause',
  doneHref: '/patient/care/menopause',
  steps: [
    {
      kind: 'multi', q: 'Which symptoms are you experiencing?', sub: 'Select all that apply.',
      items: ['Hot flashes', 'Night sweats', 'Sleep problems', 'Mood changes / irritability', 'Brain fog', 'Vaginal dryness', 'Weight gain', 'Joint pain', 'Low libido', 'None yet — I want to prepare'],
    },
    {
      kind: 'single', q: 'Where are you in your menopause journey?',
      options: [
        { label: 'Perimenopause',    sub: 'Irregular periods, some symptoms starting' },
        { label: 'Menopause',        sub: '12+ months without a period' },
        { label: 'Post-menopause',   sub: 'Several years past menopause' },
        { label: "I'm not sure",     sub: "We'll help figure it out" },
      ],
    },
    { kind: 'yesno', q: 'Have you tried hormone therapy (HRT) before?' },
    {
      kind: 'multi', q: 'Do you have any of the following in your history?', sub: 'This helps us identify safe treatment options.',
      items: ['Breast cancer', 'Blood clots (DVT or PE)', 'Heart disease or stroke', 'Liver disease', 'Unexplained vaginal bleeding', 'None of these'],
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
      kind: 'reveal', emoji: '🌡️',
      title: 'Your menopause plan is ready.',
      body: 'A menopause-certified physician will review your intake and build a personalized treatment plan — whether that\'s HRT, non-hormonal options, or both.',
      summaryFn: (a) => [
        { label: 'Symptoms',          value: ((a['s0'] as string[]) ?? []).slice(0,3).join(', ') || '—' },
        { label: 'Stage',             value: (a['s1'] as string) ?? '—' },
        { label: 'Prior HRT',         value: (a['s2'] as string) ?? '—' },
        { label: 'Payment',           value: (a['s4'] as string) ?? '—' },
        { label: 'Next step',         value: 'Menopause physician consultation' },
      ],
    },
  ],
}

export default function MenopauseIntakePage() {
  return <IntakeFlow config={config} />
}
