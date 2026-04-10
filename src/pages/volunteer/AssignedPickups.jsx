import { useEffect, useState } from 'react'
import { ClipboardList, Map, QrCode, User } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import api from '../../api/axios'

export default function AssignedPickups() {
  const [assignments, setAssignments] = useState([])

  useEffect(() => {
    api.get('/volunteer/assignments').then(({ data }) => setAssignments(data.assignments || []))
  }, [])

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
      <p className="font-heading text-2xl font-extrabold text-text-dark">
        Assigned pickups
      </p>
      <p className="mt-1 text-sm font-semibold text-text-muted">
        Track your active and past deliveries.
      </p>

      <div className="mt-6 space-y-3">
        {assignments.map((a) => (
          <div
            key={a._id}
            className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-glass"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-heading text-lg font-extrabold text-text-dark">
                  {a.foodName} · {a.quantity}
                </p>
                <p className="mt-1 text-xs font-semibold text-text-muted">
                  Donor: {a.donor?.name} · {a.pickupAddress}
                </p>
              </div>
              <span className="rounded-2xl bg-primary-orange/10 px-3 py-1 text-xs font-extrabold text-primary-orange">
                {a.status}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-2xl bg-primary-orange/10 px-3 py-1 text-xs font-extrabold text-primary-orange">
                Pickup OTP {a.donorOTPVerified ? '✓' : '—'}
              </span>
              <span className="rounded-2xl bg-primary-green/10 px-3 py-1 text-xs font-extrabold text-primary-green">
                Delivery OTP {a.acceptorOTPVerified ? '✓' : '—'}
              </span>
            </div>
          </div>
        ))}
        {assignments.length === 0 ? (
          <div className="rounded-3xl border border-white/60 bg-white/70 p-6 text-sm font-semibold text-text-muted shadow-glass">
            No assignments yet.
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  )
}

