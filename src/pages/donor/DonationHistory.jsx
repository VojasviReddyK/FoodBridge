import { useEffect, useMemo, useState } from 'react'
import { ClipboardList, Filter, PlusCircle, User } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import api from '../../api/axios'

export default function DonationHistory() {
  const [donations, setDonations] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    api.get('/donor/donations').then(({ data }) => setDonations(data.donations || []))
  }, [])

  const filtered = useMemo(() => {
    if (filter === 'all') return donations
    if (filter === 'active') return donations.filter((d) => ['available', 'assigned', 'picked_up'].includes(d.status))
    return donations.filter((d) => d.status === filter)
  }, [donations, filter])

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
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="font-heading text-2xl font-extrabold text-text-dark">
            Donation history
          </p>
          <p className="mt-1 text-sm font-semibold text-text-muted">
            Track OTP status, volunteer/acceptor assignment, and timestamps.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-2xl bg-white/70 px-3 py-2 shadow-glass">
          <Filter size={16} className="text-text-muted" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent text-sm font-extrabold text-text-dark outline-none"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="delivered">Delivered</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {filtered.map((d) => (
          <details
            key={d._id}
            className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-glass"
          >
            <summary className="cursor-pointer list-none">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-heading text-lg font-extrabold text-text-dark">
                    {d.foodName}{' '}
                    <span className="text-sm font-semibold text-text-muted">
                      · {d.quantity}
                    </span>
                  </p>
                  <p className="mt-1 text-xs font-semibold text-text-muted">
                    Created {new Date(d.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className="rounded-2xl bg-primary-orange/10 px-3 py-1 text-xs font-extrabold text-primary-orange">
                  {d.status}
                </span>
              </div>
            </summary>

            <div className="mt-4 grid gap-3 text-sm font-semibold text-text-muted md:grid-cols-2">
              <p>
                <span className="font-extrabold text-text-dark">
                  Volunteer:
                </span>{' '}
                {d.assignedVolunteer?.name || '—'}
              </p>
              <p>
                <span className="font-extrabold text-text-dark">Acceptor:</span>{' '}
                {d.assignedAcceptor?.organizationName || d.assignedAcceptor?.name || '—'}
              </p>
              <p>
                <span className="font-extrabold text-text-dark">
                  Donor OTP verified:
                </span>{' '}
                {d.donorOTPVerified ? 'Yes' : 'No'}
              </p>
              <p>
                <span className="font-extrabold text-text-dark">
                  Acceptor OTP verified:
                </span>{' '}
                {d.acceptorOTPVerified ? 'Yes' : 'No'}
              </p>
              <p>
                <span className="font-extrabold text-text-dark">Picked up:</span>{' '}
                {d.pickedUpAt ? new Date(d.pickedUpAt).toLocaleString() : '—'}
              </p>
              <p>
                <span className="font-extrabold text-text-dark">Delivered:</span>{' '}
                {d.deliveredAt ? new Date(d.deliveredAt).toLocaleString() : '—'}
              </p>
            </div>
          </details>
        ))}
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-white/60 bg-white/70 p-6 text-sm font-semibold text-text-muted shadow-glass">
            No donations in this filter.
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  )
}

