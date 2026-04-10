import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import api from '../../api/axios'
import { pageTransition } from '../../utils/animations'

const schema = z.object({ email: z.string().email() })

export default function ForgotPassword() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async ({ email }) => {
    await api.post('/auth/forgot-password', { email })
    toast.success('OTP sent to your email')
    navigate(`/verify-otp?email=${encodeURIComponent(email)}`)
  }

  return (
    <motion.main {...pageTransition} className="mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto max-w-md rounded-3xl border border-white/60 bg-white/70 p-6 shadow-lift backdrop-blur">
        <Link to="/" className="font-brand text-xl text-text-dark">
          FOODBRIDGE
        </Link>
        <p className="mt-4 font-heading text-2xl font-extrabold text-text-dark">
          Forgot password
        </p>
        <p className="mt-2 text-sm font-semibold text-text-muted">
          Enter your registered email. We’ll send a 6-digit OTP (valid for 10
          minutes).
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-extrabold text-text-dark">
              Email
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-glass">
              <Mail size={18} className="text-text-muted" />
              <input
                {...register('email')}
                className="w-full bg-transparent text-sm font-semibold outline-none"
                placeholder="you@example.com"
              />
            </div>
            {errors.email ? (
              <p className="mt-1 text-xs font-bold text-state-error">
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <button
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-text-dark px-4 py-3 text-sm font-extrabold text-white shadow-glass transition hover:opacity-95 active:scale-[0.98] disabled:opacity-60"
          >
            {isSubmitting ? 'Sending…' : 'Send OTP'}
          </button>

          <p className="text-center text-sm font-semibold text-text-muted">
            Remembered it?{' '}
            <Link className="font-extrabold text-primary-orange" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </motion.main>
  )
}

