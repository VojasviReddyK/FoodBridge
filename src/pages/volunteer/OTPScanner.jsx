import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { ClipboardList, Lock, Map, QrCode, Unlock, User } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import OTPInput from '../../components/OTPInput'
import api from '../../api/axios'

export default function OTPScanner() {
  const [assignments, setAssignments] = useState([])
  const [donationId, setDonationId] = useState('')
  const [donorOtp, setDonorOtp] = useState('')
  const [acceptorOtp, setAcceptorOtp] = useState('')

  const current = useMemo(
    () => assignments.find((a) => a._id === donationId) || null,
    [assignments, donationId],
  )

  const load = async () => {
    const { data } = await api.get('/volunteer/assignments')
    setAssignments(data.assignments || [])
    if (!donationId && data.assignments?.[0]?._id) setDonationId(data.assignments[0]._id)
  }

  useEffect(() => {
    load().catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const verifyDonor = async () => {
    await api.post('/volunteer/verify-donor-otp', { donationId, otp: donorOtp })
    toast.success('Pickup verified')
    setDonorOtp('')
    load().catch(() => {})
  }

  const verifyAcceptor = async () => {
    await api.post('/volunteer/verify-acceptor-otp', { donationId, otp: acceptorOtp })
    toast.success('Delivery verified')
    setAcceptorOtp('')
    load().catch(() => {})
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
            OTP verification
          </p>
          <p className="mt-1 text-sm font-semibold text-text-muted">
            Verify pickup and delivery to update status in real-time.
          </p>
        </div>
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
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-glass">
          <div className="flex items-center justify-between">
            <p className="font-heading text-lg font-extrabold text-text-dark">
              Donor OTP Verification
            </p>
            {current?.donorOTPVerified ? (
              <Unlock className="text-state-success" />
            ) : (
              <Lock className="text-text-muted" />
            )}
          </div>
          <p className="mt-2 text-sm font-semibold text-text-muted">
            Enter the 6-digit OTP provided by donor at pickup.
          </p>
          <div className="mt-5">
            <OTPInput value={donorOtp} onChange={setDonorOtp} />
          </div>
          <button
            disabled={donorOtp.length !== 6 || current?.donorOTPVerified}
            onClick={verifyDonor}
            className="mt-6 w-full rounded-2xl bg-primary-orange px-4 py-3 text-sm font-extrabold text-white shadow-glass transition hover:brightness-105 active:scale-[0.98] disabled:opacity-60"
          >
            Verify pickup OTP
          </button>
        </div>

        <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-glass">
          <div className="flex items-center justify-between">
            <p className="font-heading text-lg font-extrabold text-text-dark">
              Acceptor OTP Verification
            </p>
            {current?.acceptorOTPVerified ? (
              <Unlock className="text-state-success" />
            ) : (
              <Lock className="text-text-muted" />
            )}
          </div>
          <p className="mt-2 text-sm font-semibold text-text-muted">
            Enter the 6-digit OTP provided by acceptor at delivery.
          </p>
          <div className="mt-5">
            <OTPInput value={acceptorOtp} onChange={setAcceptorOtp} />
          </div>
          <button
            disabled={
              acceptorOtp.length !== 6 ||
              !current?.donorOTPVerified ||
              current?.acceptorOTPVerified
            }
            onClick={verifyAcceptor}
            className="mt-6 w-full rounded-2xl bg-primary-green px-4 py-3 text-sm font-extrabold text-white shadow-glass transition hover:brightness-105 active:scale-[0.98] disabled:opacity-60"
          >
            Verify delivery OTP
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}

