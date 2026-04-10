import { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Shield } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import api from '../../api/axios'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.get('/admin/stats').then(({ data }) => setStats(data))
    api.get('/admin/users').then(({ data }) => setUsers(data.users || []))
  }, [])

  const suspend = async (id) => {
    await api.put(`/admin/users/${id}/suspend`, { suspended: true })
    const { data } = await api.get('/admin/users')
    setUsers(data.users || [])
  }

  return (
    <DashboardLayout
      title="Admin"
      links={[{ to: '/admin/dashboard', label: 'Admin Dashboard', icon: Shield }]}
    >
      <p className="font-heading text-2xl font-extrabold text-text-dark">
        Analytics overview
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-5">
        {[
          ['Users', stats?.totals?.users ?? '—'],
          ['Donations', stats?.totals?.donations ?? '—'],
          ['Delivered', stats?.totals?.delivered ?? '—'],
          ['Food saved (kg)', stats?.totals?.foodSavedKg ?? '—'],
          ['Cities active', stats?.totals?.cities ?? '—'],
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

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="h-72 rounded-3xl border border-white/60 bg-white/70 p-4 shadow-glass">
          <p className="px-2 pt-1 text-sm font-extrabold text-text-dark">
            Donations (30 days)
          </p>
          <div className="mt-3 h-[calc(100%-40px)]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats?.charts?.donationsOverTime || []}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#F97316" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="h-72 rounded-3xl border border-white/60 bg-white/70 p-4 shadow-glass">
          <p className="px-2 pt-1 text-sm font-extrabold text-text-dark">
            Deliveries per city
          </p>
          <div className="mt-3 h-[calc(100%-40px)]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.charts?.deliveriesByCity || []}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="city" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#16A34A" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="h-72 rounded-3xl border border-white/60 bg-white/70 p-4 shadow-glass">
          <p className="px-2 pt-1 text-sm font-extrabold text-text-dark">
            Food type
          </p>
          <div className="mt-3 h-[calc(100%-40px)]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Pie
                  data={stats?.charts?.foodType || []}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  fill="#FBBF24"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <p className="text-sm font-extrabold text-text-dark">User management</p>
        <div className="mt-3 overflow-hidden rounded-3xl border border-white/60 bg-white/60">
          <div className="grid grid-cols-4 gap-0 border-b border-white/60 p-3 text-xs font-extrabold text-text-muted">
            <p>Name</p>
            <p>Role</p>
            <p>Email</p>
            <p className="text-right">Action</p>
          </div>
          <div className="divide-y divide-white/60">
            {users.slice(0, 20).map((u) => (
              <div
                key={u._id}
                className="grid grid-cols-4 items-center p-3 text-sm font-semibold"
              >
                <p className="text-text-dark">{u.name}</p>
                <p className="text-text-muted">{u.role}</p>
                <p className="truncate text-text-muted">{u.email}</p>
                <div className="text-right">
                  <button
                    onClick={() => suspend(u._id)}
                    className="rounded-2xl bg-text-dark px-3 py-2 text-xs font-extrabold text-white shadow-glass active:scale-[0.98]"
                  >
                    Suspend
                  </button>
                </div>
              </div>
            ))}
            {users.length === 0 ? (
              <div className="p-6 text-sm font-semibold text-text-muted">
                No users found.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

