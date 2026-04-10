import { useEffect, useState } from 'react'
import { ClipboardList, Map, User } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import api from '../../api/axios'

export default function RequestHistory() {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    api.get('/acceptor/requests').then(({ data }) => setRequests(data.requests || []))
  }, [])

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
      <p className="font-heading text-2xl font-extrabold text-text-dark">
        My requests
      </p>
      <p className="mt-1 text-sm font-semibold text-text-muted">
        Track approvals and assigned deliveries.
      </p>

      <div className="mt-6 space-y-3">
        {requests.map((r) => (
          <div
            key={r._id}
            className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-glass"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-heading text-lg font-extrabold text-text-dark">
                  {r.donation?.foodName || 'Donation'}
                </p>
                <p className="mt-1 text-xs font-semibold text-text-muted">
                  {new Date(r.createdAt).toLocaleString()}
                </p>
              </div>
              <span className="rounded-2xl bg-primary-green/10 px-3 py-1 text-xs font-extrabold text-primary-green">
                {r.status}
              </span>
            </div>
            {r.message ? (
              <p className="mt-3 text-sm font-semibold text-text-muted">
                {r.message}
              </p>
            ) : null}
          </div>
        ))}
        {requests.length === 0 ? (
          <div className="rounded-3xl border border-white/60 bg-white/70 p-6 text-sm font-semibold text-text-muted shadow-glass">
            No requests yet.
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  )
}

