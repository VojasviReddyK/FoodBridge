import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Bell, ClipboardList, PlusCircle, User } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import { useSocket } from '../../hooks/useSocket'
import api from '../../api/axios'

export default function DonorDashboard() {
  const { socket } = useSocket()
  const [stats, setStats] = useState(null)
  const [recent, setRecent] = useState([])
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    api.get('/donor/dashboard-stats').then(({ data }) => setStats(data))
    api.get('/donor/donations').then(({ data }) => setRecent(data.donations || []))
  }, [])

  useEffect(() => {
    if (!socket) return
    const onOtpDonor = (payload) => {
      toast.success('Pickup OTP verified')
      setNotifications((n) => [{ type: 'pickup', ...payload }, ...n].slice(0, 8))
    }
    const onDelivered = (payload) => {
      toast.success('Donation delivered')
      setNotifications((n) => [{ type: 'delivered', ...payload }, ...n].slice(0, 8))
    }
    socket.on('otp:donor-verified', onOtpDonor)
    socket.on('donation:completed', onDelivered)
    return () => {
      socket.off('otp:donor-verified', onOtpDonor)
      socket.off('donation:completed', onDelivered)
    }
  }, [socket])

  return (
    <DashboardLayout
      title="Donor"
      links={[
        { to: '/donor/dashboard', label: 'Dashboard', icon: ClipboardList },
        { to: '/donor/post', label: 'Post Donation', icon: PlusCircle },
        { to: '/donor/history', label: 'My Donations', icon: ClipboardList },
        { to: '/donor/profile', label: 'Profile', icon: User },
      ]}
    >
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ['Total Donated', stats?.total || 0],
          ['Active Listings', stats?.active || 0],
          ['Completed', stats?.delivered || 0],
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

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <p className="text-sm font-extrabold text-text-dark">Recent donations</p>
          <div className="mt-3 overflow-hidden rounded-3xl border border-white/60 bg-white/60">
            <div className="grid grid-cols-4 gap-0 border-b border-white/60 p-3 text-xs font-extrabold text-text-muted">
              <p>Food</p>
              <p>Qty</p>
              <p>Status</p>
              <p className="text-right">Created</p>
            </div>
            <div className="divide-y divide-white/60">
              {recent.slice(0, 6).map((d) => (
                <div
                  key={d._id}
                  className="grid grid-cols-4 items-center p-3 text-sm font-semibold"
                >
                  <p className="text-text-dark">{d.foodName}</p>
                  <p className="text-text-muted">{d.quantity}</p>
                  <p className="text-text-dark">
                    <span className="rounded-2xl bg-primary-orange/10 px-3 py-1 text-xs font-extrabold text-primary-orange">
                      {d.status}
                    </span>
                  </p>
                  <p className="text-right text-xs text-text-muted">
                    {new Date(d.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {recent.length === 0 ? (
                <div className="p-6 text-sm font-semibold text-text-muted">
                  No donations yet. Post your first donation.
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-extrabold text-text-dark">Notifications</p>
            <Bell size={18} className="text-text-muted" />
          </div>
          <div className="mt-3 space-y-3">
            {notifications.map((n, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-white/60 bg-white/70 p-4 shadow-glass"
              >
                <p className="text-sm font-extrabold text-text-dark">
                  {n.type === 'pickup' ? 'Pickup verified' : 'Delivery complete'}
                </p>
                <p className="mt-1 text-xs font-semibold text-text-muted">
                  Donation: {n.donationId || n.donation?._id}
                </p>
              </div>
            ))}
            {notifications.length === 0 ? (
              <div className="rounded-3xl border border-white/60 bg-white/70 p-4 text-sm font-semibold text-text-muted shadow-glass">
                Real-time updates will appear here.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

