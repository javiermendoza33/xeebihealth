interface TopBarProps {
  title: string
  subtitle?: string
}

export default function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <header
      className="h-16 flex items-center px-8"
      style={{ background: 'var(--sidebar-bg)', borderBottom: '1px solid var(--divider)' }}
    >
      <div>
        <h1 className="text-base font-semibold text-white">{title}</h1>
        {subtitle && <p className="text-xs" style={{ color: 'var(--muted)' }}>{subtitle}</p>}
      </div>
    </header>
  )
}
