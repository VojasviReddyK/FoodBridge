import { useEffect, useState } from 'react'
import { ClipboardList, Map, User } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import api from '../../api/axios'

export default function AcceptorDashboard() {
  const [stats, setStats] = useState(null)
  const [nearby, setNearby] = useState([])
  const [city, setCity] = useState('')

  useEffect(() => {
    api.get('/acceptor/dashboard-stats').then(({ data }) => setStats(data))
    api.get('/auth/me').then(({ data }) => setCity(data.user?.city || ''))
  }, [])

  useEffect(() => {
    api
      .get('/acceptor/browse', {
        params: { city },
      })
      .then(({ data }) => setNearby(data.donations || []))
      .catch(() => {})
  }, [city])

  return (
    <DashboardLayout
      title="Acceptor"
      links={[
        { to: '/acceptor/dashboard', label: 'Dashboard', icon: ClipboardList },
        { to: '/acceptor/browse', label: 'Browse Food', icon: Map },
        { to: '/acceptor/requests', label: 'My Requests', icon: ClipboardList },
        { to: '/acceptor/profile', label: 'Profile', icon: User },
      ]}
    >
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ['Total Received', stats?.received || 0],
          ['Pending Requests', stats?.pending || 0],
          ['Meals Served', stats?.mealsServed || 0],
          ['Rating', stats?.rating ? stats.rating.toFixed(1) : '—'],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-glass"
          >
            <p className="text-xs font-extrabold text-text-muted">{label}</p>
            <p className="mt-2 font-heading text-2xl font-extrabold text-text-dark">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <p className="text-sm font-extrabold text-text-dark">
          Available donations in your city
        </p>
        <div className="mt-3 overflow-hidden rounded-3xl border border-white/60 bg-white/60">
          <div className="grid grid-cols-3 gap-0 border-b border-white/60 p-3 text-xs font-extrabold text-text-muted">
            <p>Food</p>
            <p>Status</p>
            <p className="text-right">Expiry</p>
          </div>
          <div className="divide-y divide-white/60">
            {nearby.slice(0, 8).map((d) => (
              <div
                key={d._id}
                className="grid grid-cols-3 items-center p-3 text-sm font-semibold"
              >
                <p className="text-text-dark">{d.foodName}</p>
                <p>
                  <span className="rounded-2xl bg-primary-green/10 px-3 py-1 text-xs font-extrabold text-primary-green">
                    {d.status}
                  </span>
                </p>
                <p className="text-right text-xs text-text-muted">
                  {new Date(d.expiryTime).toLocaleString()}
                </p>
              </div>
            ))}
            {nearby.length === 0 ? (
              <div className="p-6 text-sm font-semibold text-text-muted">
                No available donations in your city right now.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

