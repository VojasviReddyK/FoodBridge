import { zodResolver } from '@hookform/resolvers/zod'
import { ClipboardList, Map, QrCode, User } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import api from '../../api/axios'
import DashboardLayout from '../../components/DashboardLayout'
import { useAuth } from '../../hooks/useAuth'

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  vehicleType: z.string().min(2),
  city: z.string().min(2),
  pincode: z.string().min(4),
})

export default function VolunteerProfile() {
  const { user, refreshMe } = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (!user) return
    reset({
      name: user.name,
      phone: user.phone,
      vehicleType: user.vehicleType || 'bike',
      city: user.city,
      pincode: user.pincode || '',
    })
  }, [user, reset])

  const onSubmit = async (values) => {
    await api.put('/auth/me', values)
    await refreshMe()
    toast.success('Profile updated')
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
      <p className="font-heading text-2xl font-extrabold text-text-dark">
        My profile
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 grid gap-4 md:grid-cols-2"
      >
        {[
          ['name', 'Name'],
          ['phone', 'Phone'],
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
            />
            {errors[key] ? (
              <p className="mt-1 text-xs font-bold text-state-error">
                {errors[key].message}
              </p>
            ) : null}
          </div>
        ))}

        <div>
          <label className="text-sm font-extrabold text-text-dark">
            Vehicle type
          </label>
          <select
            {...register('vehicleType')}
            className="mt-2 w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-semibold shadow-glass"
          >
            <option value="bike">Bike</option>
            <option value="car">Car</option>
            <option value="van">Van</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <button
            disabled={isSubmitting}
            className="rounded-2xl bg-text-dark px-5 py-3 text-sm font-extrabold text-white shadow-glass transition hover:opacity-95 active:scale-[0.98] disabled:opacity-60"
          >
            {isSubmitting ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </form>
    </DashboardLayout>
  )
}

