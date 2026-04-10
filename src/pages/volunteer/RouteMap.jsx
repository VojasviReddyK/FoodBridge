import { useEffect, useMemo, useState } from 'react'
import { ClipboardList, ExternalLink, Map, QrCode, User } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import api from '../../api/axios'

export default function RouteMap() {
  const [assignments, setAssignments] = useState([])
  const [donationId, setDonationId] = useState('')
  const [etaHint] = useState(null)

  const current = useMemo(
    () => assignments.find((a) => a._id === donationId) || null,
    [assignments, donationId],
  )

  useEffect(() => {
    api.get('/volunteer/assignments').then(({ data }) => {
      setAssignments(data.assignments || [])
      if (!donationId && data.assignments?.[0]?._id) setDonationId(data.assignments[0]._id)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openInExternalMaps = () => {
    if (!current) return
    const origin = encodeURIComponent(current.pickupAddress || '')
    const destination = encodeURIComponent(
      current.assignedAcceptor?.address || current.assignedAcceptor?.city || '',
    )
    if (!origin || !destination) return
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

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
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <p className="font-heading text-2xl font-extrabold text-text-dark">
            Route
          </p>
          <p className="mt-1 text-sm font-semibold text-text-muted">
            ETA: <span className="font-extrabold">{etaHint || 'Use external navigation'}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={donationId}
            onChange={(e) => setDonationId(e.target.value)}
            className="rounded-2xl border border-white/60 bg-white/70 px-3 py-2 text-sm font-extrabold shadow-glass"
          >
            {assignments.map((a) => (
              <option key={a._id} value={a._id}>
                {a.foodName} ({a.status})
              </option>
            ))}
          </select>
          <button
            onClick={openInExternalMaps}
            className="inline-flex items-center gap-2 rounded-2xl bg-text-dark px-4 py-2 text-sm font-extrabold text-white shadow-glass active:scale-[0.98]"
          >
            <ExternalLink size={16} /> Open in Maps
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-white/60 bg-white/70 p-6 shadow-glass">
        {current ? (
          <div className="grid gap-3 text-sm font-semibold text-text-muted">
            <p>
              <span className="font-extrabold text-text-dark">Pickup:</span>{' '}
              {current.pickupAddress}
              {current.pickupPincode ? `, ${current.pickupPincode}` : ''}
              {current.city ? `, ${current.city}` : ''}
            </p>
            <p>
              <span className="font-extrabold text-text-dark">Deliver to:</span>{' '}
              {current.assignedAcceptor?.organizationName || current.assignedAcceptor?.name || 'Acceptor'}
              {current.assignedAcceptor?.address ? ` · ${current.assignedAcceptor.address}` : ''}
              {current.assignedAcceptor?.pincode ? `, ${current.assignedAcceptor.pincode}` : ''}
              {current.assignedAcceptor?.city ? `, ${current.assignedAcceptor.city}` : ''}
            </p>
            <p className="text-xs font-semibold text-text-muted">
              Tip: Click “Open in Maps” for navigation (no API key required).
            </p>
          </div>
        ) : (
          <p className="text-sm font-semibold text-text-muted">
            No assignment selected.
          </p>
        )}
      </div>
    </DashboardLayout>
  )
}

