import { zodResolver } from '@hookform/resolvers/zod'
import { MapPin } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import { passwordSchema } from './authSchema'
import { useAuth } from '../../hooks/useAuth'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: passwordSchema,
  phone: z.string().min(10),
  organizationName: z.string().min(2),
  address: z.string().min(5),
  city: z.string().min(2),
  pincode: z.string().min(4),
})

export default function RegisterAcceptor() {
  const navigate = useNavigate()
  const { register: doRegister } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (values) => {
    try {
      await doRegister({
        ...values,
        role: 'acceptor',
      })
      toast.success('Registered successfully. Please login.')
      navigate('/login')
    } catch (e) {
      toast.error(e?.message || 'Registration failed')
    }
  }

  return (
    <AuthLayout
      title="Join as an Acceptor"
      subtitle="Browse nearby donations and request food for the people you serve."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {[
          ['name', 'Contact name'],
          ['email', 'Email'],
          ['phone', 'Phone'],
          ['organizationName', 'Organization name'],
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
            {...register('password')}
            className="mt-2 w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-semibold shadow-glass"
          />
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

