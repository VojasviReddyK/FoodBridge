import { useEffect, useState } from 'react'
import { ClipboardList, Map, QrCode, User } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import api from '../../api/axios'

export default function VolunteerDashboard() {
  const [stats, setStats] = useState(null)
  const [assignments, setAssignments] = useState([])

  useEffect(() => {
    api.get('/volunteer/dashboard-stats').then(({ data }) => setStats(data))
    api.get('/volunteer/assignments').then(({ data }) => setAssignments(data.assignments || []))
  }, [])

  const active = assignments.find((a) =>
    ['assigned', 'picked_up'].includes(a.status),
  )

  return (
    <DashboardLayout
      title="Volunteer"
      links={[
        { to: '/volunteer/dashboard', label: 'Dashboard', icon: ClipboardList },
        { to: '/volunteer/pickups', label: 'Assigned Pickups', icon: ClipboardList },
        { to: '/volunteer/otp', label: 'OTP Scanner', icon: QrCode },
        { to: '/volunteer/route', label: 'Route Map', icon: Map },
        { to: '/volunteer/profile', label: 'Profile', icon: User },
      ]}
    >
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ['Total Deliveries', stats?.delivered || 0],
          ['Active Assignments', stats?.active || 0],
          ['Rating', stats?.rating ? stats.rating.toFixed(1) : '—'],
          ['Distance Covered', stats?.distanceKm ? `${stats.distanceKm} km` : '—'],
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
        <p className="text-sm font-extrabold text-text-dark">Active assignment</p>
        <div className="mt-3 rounded-3xl border border-white/60 bg-white/70 p-6 shadow-glass">
          {active ? (
            <div className="grid gap-3 text-sm font-semibold text-text-muted">
              <p>
                <span className="font-extrabold text-text-dark">Food:</span>{' '}
                {active.foodName} · {active.quantity}
              </p>
              <p>
                <span className="font-extrabold text-text-dark">Donor:</span>{' '}
                {active.donor?.name} · {active.pickupAddress}
              </p>
              <p>
                <span className="font-extrabold text-text-dark">Acceptor:</span>{' '}
                {active.assignedAcceptor?.organizationName || active.assignedAcceptor?.name || '—'}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-2xl bg-primary-orange/10 px-3 py-1 text-xs font-extrabold text-primary-orange">
                  Donor OTP: {active.donorOTPVerified ? 'verified' : 'pending'}
                </span>
                <span className="rounded-2xl bg-primary-green/10 px-3 py-1 text-xs font-extrabold text-primary-green">
                  Acceptor OTP: {active.acceptorOTPVerified ? 'verified' : 'pending'}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm font-semibold text-text-muted">
              No active assignments right now.
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

