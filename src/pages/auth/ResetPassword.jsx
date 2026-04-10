import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import api from '../../api/axios'
import { passwordSchema } from './authSchema'
import { pageTransition } from '../../utils/animations'

const schema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export default function ResetPassword() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useMemo(() => new URLSearchParams(location.search), [location.search])
  const email = params.get('email') || ''
  const [show, setShow] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  const pwd = watch('password') || ''
  const strength =
    (pwd.length >= 8) +
    (/[A-Z]/.test(pwd) ? 1 : 0) +
    (/[0-9]/.test(pwd) ? 1 : 0) +
    (/[^A-Za-z0-9]/.test(pwd) ? 1 : 0)

  const onSubmit = async ({ password }) => {
    await api.post('/auth/reset-password', { email, password })
    toast.success('Password updated. Please login.')
    navigate('/login')
  }

  return (
    <motion.main {...pageTransition} className="mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto max-w-md rounded-3xl border border-white/60 bg-white/70 p-6 shadow-lift backdrop-blur">
        <Link to="/" className="font-brand text-xl text-text-dark">
          FOODBRIDGE
        </Link>
        <p className="mt-4 font-heading text-2xl font-extrabold text-text-dark">
          Reset password
        </p>
        <p className="mt-2 text-sm font-semibold text-text-muted">
          Set a new password for <span className="font-extrabold">{email}</span>.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-extrabold text-text-dark">
              New password
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-glass">
              <input
                type={show ? 'text' : 'password'}
                {...register('password')}
                className="w-full bg-transparent text-sm font-semibold outline-none"
                placeholder="New password"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="text-text-muted"
                aria-label="Toggle password visibility"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="mt-2 h-2 rounded-full bg-text-dark/10">
              <motion.div
                initial={false}
                animate={{ width: `${(strength / 4) * 100}%` }}
                className="h-2 rounded-full bg-gradient-to-r from-primary-orange to-primary-green"
              />
            </div>
            {errors.password ? (
              <p className="mt-1 text-xs font-bold text-state-error">
                {errors.password.message}
              </p>
            ) : null}
          </div>

          <div>
            <label className="text-sm font-extrabold text-text-dark">
              Confirm password
            </label>
            <input
              type={show ? 'text' : 'password'}
              {...register('confirmPassword')}
              className="mt-2 w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-semibold shadow-glass"
              placeholder="Confirm password"
            />
            {errors.confirmPassword ? (
              <p className="mt-1 text-xs font-bold text-state-error">
                {errors.confirmPassword.message}
              </p>
            ) : null}
          </div>

          <button
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-text-dark px-4 py-3 text-sm font-extrabold text-white shadow-glass transition hover:opacity-95 active:scale-[0.98] disabled:opacity-60"
          >
            {isSubmitting ? 'Updating…' : 'Update password'}
          </button>
        </form>
      </div>
    </motion.main>
  )
}

