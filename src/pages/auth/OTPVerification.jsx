import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import OTPInput from '../../components/OTPInput'
import { pageTransition } from '../../utils/animations'

export default function OTPVerification() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useMemo(() => new URLSearchParams(location.search), [location.search])
  const email = params.get('email') || ''

  const [otp, setOtp] = useState('')
  const [seconds, setSeconds] = useState(10 * 60)
  const [resending, setResending] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [])

  const verify = async () => {
    await api.post('/auth/verify-otp', { email, otp })
    toast.success('OTP verified')
    navigate(`/reset-password?email=${encodeURIComponent(email)}`)
  }

  const resend = async () => {
    setResending(true)
    try {
      await api.post('/auth/forgot-password', { email })
      toast.success('OTP resent')
      setSeconds(10 * 60)
    } finally {
      setResending(false)
    }
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return (
    <motion.main {...pageTransition} className="mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto max-w-md rounded-3xl border border-white/60 bg-white/70 p-6 shadow-lift backdrop-blur">
        <Link to="/" className="font-brand text-xl text-text-dark">
          FOODBRIDGE
        </Link>
        <p className="mt-4 font-heading text-2xl font-extrabold text-text-dark">
          Verify OTP
        </p>
        <p className="mt-2 text-sm font-semibold text-text-muted">
          Enter the 6-digit OTP sent to <span className="font-extrabold">{email}</span>.
        </p>

        <div className="mt-6">
          <OTPInput value={otp} onChange={setOtp} />
        </div>

        <div className="mt-4 flex items-center justify-between text-sm font-semibold text-text-muted">
          <p>
            Expires in <span className="font-extrabold">{mm}:{ss}</span>
          </p>
          <button
            disabled={seconds > 0 || resending}
            onClick={resend}
            className="font-extrabold text-primary-orange disabled:opacity-50"
          >
            {resending ? 'Resending…' : 'Resend OTP'}
          </button>
        </div>

        <button
          disabled={otp.length !== 6}
          onClick={verify}
          className="mt-6 w-full rounded-2xl bg-text-dark px-4 py-3 text-sm font-extrabold text-white shadow-glass transition hover:opacity-95 active:scale-[0.98] disabled:opacity-60"
        >
          Verify
        </button>
      </div>
    </motion.main>
  )
}

