import TopBar from '@/components/TopBar'
import StatCard from '@/components/StatCard'

const UPCOMING = [
  { doctor: 'Dr. Emily Chen', specialty: 'Cardiology', date: 'Jun 23, 2026', time: '10:00 AM', type: 'Video' },
  { doctor: 'Dr. Marcus Lee',  specialty: 'Dermatology', date: 'Jun 27, 2026', time: '2:30 PM',  type: 'In-Person' },
  { doctor: 'Dr. Sofia Patel', specialty: 'General',    date: 'Jul 2, 2026',  time: '9:00 AM',  type: 'Video' },
]

const MESSAGES = [
  { from: 'Dr. Emily Chen',  preview: 'Your latest blood work results are in…', time: '2h ago', unread: true },
  { from: 'Pharmacy Team',   preview: 'Prescription refill approved.',           time: '1d ago', unread: false },
  { from: 'Dr. Sofia Patel', preview: 'Please complete your pre-visit form.',    time: '2d ago', unread: false },
]

export default function PatientDashboard() {
  return (
    <>
      <TopBar title="Dashboard" subtitle="Good morning, Javier 👋" />
      <div className="p-8 space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Upcoming Appointments" value="3" sub="Next: Jun 23" />
          <StatCard label="Unread Messages" value="1" sub="From Dr. Emily Chen" accent="var(--amber)" />
          <StatCard label="Active Prescriptions" value="4" sub="1 refill pending" accent="var(--green)" />
          <StatCard label="Lab Results" value="2" sub="New since last visit" />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Upcoming appointments */}
          <div className="col-span-2 rounded-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--divider)' }}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--divider)' }}>
              <p className="text-sm font-semibold text-white">Upcoming Appointments</p>
              <a href="/patient/appointments" className="text-xs font-medium" style={{ color: 'var(--teal)' }}>View all →</a>
            </div>
            <div className="divide-y" style={{ borderColor: 'var(--divider)' }}>
              {UPCOMING.map((apt, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-white">{apt.doctor}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{apt.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white">{apt.date}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{apt.time}</p>
                  </div>
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      background: apt.type === 'Video' ? 'var(--teal-dim)' : '#1A2E42',
                      color: apt.type === 'Video' ? 'var(--teal)' : 'var(--muted)',
                    }}
                  >
                    {apt.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="rounded-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--divider)' }}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--divider)' }}>
              <p className="text-sm font-semibold text-white">Messages</p>
              <a href="/patient/messages" className="text-xs font-medium" style={{ color: 'var(--teal)' }}>View all →</a>
            </div>
            <div className="divide-y" style={{ borderColor: 'var(--divider)' }}>
              {MESSAGES.map((msg, i) => (
                <div key={i} className="px-6 py-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-white flex items-center gap-2">
                      {msg.from}
                      {msg.unread && (
                        <span className="w-2 h-2 rounded-full inline-block" style={{ background: 'var(--teal)' }} />
                      )}
                    </p>
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>{msg.time}</span>
                  </div>
                  <p className="text-xs truncate" style={{ color: 'var(--muted)' }}>{msg.preview}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
