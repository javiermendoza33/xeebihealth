import TopBar from '@/components/TopBar'
import StatCard from '@/components/StatCard'

const RECENT_USERS = [
  { name: 'Maria Garcia',  role: 'Patient', joined: 'Jun 18', status: 'Active' },
  { name: 'Dr. James Lee', role: 'Doctor',  joined: 'Jun 17', status: 'Pending' },
  { name: 'Ana Martinez',  role: 'Patient', joined: 'Jun 17', status: 'Active' },
  { name: 'Dr. Priya Shah', role: 'Doctor', joined: 'Jun 15', status: 'Active' },
  { name: 'Robert Kim',    role: 'Patient', joined: 'Jun 14', status: 'Active' },
]

const ACTIVITY = [
  { event: 'New doctor registered',      detail: 'Dr. James Lee — Cardiology',     time: '2h ago' },
  { event: 'Subscription plan upgraded', detail: 'Patient #1847 → Pro plan',        time: '4h ago' },
  { event: 'System alert resolved',      detail: 'Video service latency spike',     time: '6h ago' },
  { event: 'Bulk import completed',      detail: '234 patients imported',           time: '1d ago' },
]

export default function AdminDashboard() {
  return (
    <>
      <TopBar title="Platform Overview" subtitle="XeebiHealth Super Admin" />
      <div className="p-8 space-y-8">

        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Total Patients"    value="3,847" sub="+124 this month"  accent="var(--teal)" />
          <StatCard label="Active Doctors"    value="89"    sub="12 pending approval" accent="var(--green)" />
          <StatCard label="Monthly Revenue"   value="$142K" sub="+18% vs last month" accent="var(--amber)" />
          <StatCard label="Video Calls Today" value="312"   sub="94% success rate"  accent="var(--teal)" />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Recent users */}
          <div className="col-span-2 rounded-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--divider)' }}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--divider)' }}>
              <p className="text-sm font-semibold text-white">Recent Users</p>
              <a href="/admin/patients" className="text-xs font-medium" style={{ color: 'var(--amber)' }}>Manage →</a>
            </div>
            <div className="divide-y" style={{ borderColor: 'var(--divider)' }}>
              {RECENT_USERS.map((user, i) => (
                <div key={i} className="flex items-center px-6 py-4 gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ background: 'var(--teal-dim)', color: 'var(--teal)' }}>
                    {user.name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>{user.role} · Joined {user.joined}</p>
                  </div>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{
                      background: user.status === 'Active' ? '#0D2E1A' : '#2E2A0D',
                      color: user.status === 'Active' ? 'var(--green)' : 'var(--amber)',
                    }}
                  >
                    {user.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity feed */}
          <div className="rounded-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--divider)' }}>
            <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--divider)' }}>
              <p className="text-sm font-semibold text-white">Activity Feed</p>
            </div>
            <div className="divide-y" style={{ borderColor: 'var(--divider)' }}>
              {ACTIVITY.map((item, i) => (
                <div key={i} className="px-6 py-4">
                  <p className="text-sm font-medium text-white">{item.event}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{item.detail}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--amber)', opacity: 0.7 }}>{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
