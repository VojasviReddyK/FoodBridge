import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useAuth } from '../../hooks/useAuth'
import AuthLayout from './AuthLayout'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
})

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  const goRoleDashboard = (role) => navigate(`/${role}/dashboard`)

  const onSubmit = async (values) => {
    try {
      const { user } = await login(values)
      toast.success('Welcome back!')
      goRoleDashboard(user.role)
    } catch (e) {
      toast.error(e?.message || 'Login failed')
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Login to manage donations, requests, assignments, and OTP verification."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm font-extrabold text-text-dark">Email</label>
          <input
            {...register('email')}
            className="mt-2 w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-semibold shadow-glass"
            placeholder="you@example.com"
          />
          {errors.email ? (
            <p className="mt-1 text-xs font-bold text-state-error">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div>
          <label className="text-sm font-extrabold text-text-dark">
            Password
          </label>
          <input
            type="password"
            {...register('password')}
            className="mt-2 w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-semibold shadow-glass"
            placeholder="Your password"
          />
          {errors.password ? (
            <p className="mt-1 text-xs font-bold text-state-error">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-text-dark px-4 py-3 text-sm font-extrabold text-white shadow-glass transition hover:opacity-95 active:scale-[0.98] disabled:opacity-60"
        >
          {isSubmitting ? 'Logging in…' : 'Login'}
        </button>

        <div className="flex items-center justify-between">
          <Link
            className="text-sm font-extrabold text-primary-orange"
            to="/forgot-password"
          >
            Forgot Password?
          </Link>
          <Link className="text-sm font-semibold text-text-muted" to="/">
            Back to home
          </Link>
        </div>

        <p className="text-center text-sm font-semibold text-text-muted">
          New here?{' '}
          <Link className="font-extrabold text-primary-orange" to="/register/donor">
            Create an account
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

