import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { passwordSchema } from './authSchema'
import AuthLayout from './AuthLayout'
import { useAuth } from '../../hooks/useAuth'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: passwordSchema,
  phone: z.string().min(10),
  address: z.string().min(5),
  city: z.string().min(2),
  pincode: z.string().min(4),
})

export default function RegisterDonor() {
  const navigate = useNavigate()
  const { register: doRegister } = useAuth()
  const [strength, setStrength] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  const pwd = watch('password') || ''
  const computeStrength = (p) => {
    let s = 0
    if (p.length >= 8) s += 1
    if (/[A-Z]/.test(p)) s += 1
    if (/[0-9]/.test(p)) s += 1
    if (/[^A-Za-z0-9]/.test(p)) s += 1
    return s
  }

  const onSubmit = async (values) => {
    try {
      await doRegister({
        ...values,
        role: 'donor',
      })
      toast.success('Registered successfully. Please login.')
      navigate('/login')
    } catch (e) {
      toast.error(e?.message || 'Registration failed')
    }
  }

  return (
    <AuthLayout
      title="Join as a Donor"
      subtitle="Post surplus food and help your community—fast pickup, real-time updates."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {[
          ['name', 'Full name'],
          ['email', 'Email'],
          ['phone', 'Phone'],
          ['address', 'Address'],
          ['city', 'City'],
          ['pincode', 'Pincode'],
        ].map(([key, label]) => (
          <div key={key}>
            <label className="text-sm font-extrabold text-text-dark">
              {label}
            </label>
            <input
              {...register(key)}
              className="mt-2 w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-semibold shadow-glass"
              placeholder={label}
            />
            {errors[key] ? (
              <p className="mt-1 text-xs font-bold text-state-error">
                {errors[key]?.message}
              </p>
            ) : null}
          </div>
        ))}

        <div>
          <label className="text-sm font-extrabold text-text-dark">
            Password
          </label>
          <input
            type="password"
            {...register('password', {
              onChange: (e) => setStrength(computeStrength(e.target.value || '')),
            })}
            className="mt-2 w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-semibold shadow-glass"
            placeholder="Min 8 chars, uppercase, number, special"
          />
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

        <div className="rounded-3xl border border-white/60 bg-white/70 p-4 text-sm font-semibold text-text-muted shadow-glass backdrop-blur">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            Location is captured via address, city, and pincode (no maps required).
          </div>
        </div>

        <button
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-text-dark px-4 py-3 text-sm font-extrabold text-white shadow-glass transition hover:opacity-95 active:scale-[0.98] disabled:opacity-60"
        >
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </button>

        <p className="text-center text-sm font-semibold text-text-muted">
          Already have an account?{' '}
          <Link className="font-extrabold text-primary-orange" to="/login">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

