import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { ClipboardList, PlusCircle, User } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import api from '../../api/axios'

const schema = z.object({
  foodName: z.string().min(2),
  description: z.string().min(5),
  quantity: z.string().min(1),
  foodType: z.enum(['veg', 'non-veg', 'both']),
  expiryTime: z.string().min(1),
  pickupAddress: z.string().min(5),
  pickupPincode: z.string().min(4),
})

export default function PostDonation() {
  const [step, setStep] = useState(1)
  const [files, setFiles] = useState([])

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { foodType: 'veg' },
  })

  const next = async () => {
    const ok = await trigger(
      step === 1
        ? ['foodName', 'description', 'quantity', 'foodType', 'expiryTime']
        : ['pickupAddress', 'pickupPincode'],
    )
    if (ok) setStep((s) => Math.min(3, s + 1))
  }

  const prev = () => setStep((s) => Math.max(1, s - 1))

  const onSubmit = async (values) => {
    const fd = new FormData()
    Object.entries(values).forEach(([k, v]) => fd.append(k, v))
    files.forEach((f) => fd.append('images', f))

    const { data } = await api.post('/donor/donations', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    toast.success('Donation posted! OTP emailed to you.')
    return data
  }

  const values = getValues()

  return (
    <DashboardLayout
      title="Donor"
      links={[
        { to: '/donor/dashboard', label: 'Dashboard', icon: ClipboardList },
        { to: '/donor/post', label: 'Post Donation', icon: PlusCircle },
        { to: '/donor/history', label: 'My Donations', icon: ClipboardList },
        { to: '/donor/profile', label: 'Profile', icon: User },
      ]}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-heading text-2xl font-extrabold text-text-dark">
            Post a donation
          </p>
          <p className="mt-1 text-sm font-semibold text-text-muted">
            Step {step} of 3
          </p>
        </div>
        <div className="h-3 w-44 rounded-full bg-primary-orange/15">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-primary-orange to-primary-green"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        {step === 1 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-extrabold text-text-dark">
                Food name
              </label>
              <input
                {...register('foodName')}
                className="mt-2 w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-semibold shadow-glass"
                placeholder="E.g., Veg biryani"
              />
              {errors.foodName ? (
                <p className="mt-1 text-xs font-bold text-state-error">
                  {errors.foodName.message}
                </p>
              ) : null}
            </div>
            <div>
              <label className="text-sm font-extrabold text-text-dark">
                Quantity
              </label>
              <input
                {...register('quantity')}
                className="mt-2 w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-semibold shadow-glass"
                placeholder="E.g., 20 meals"
              />
              {errors.quantity ? (
                <p className="mt-1 text-xs font-bold text-state-error">
                  {errors.quantity.message}
                </p>
              ) : null}
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-extrabold text-text-dark">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={4}
                className="mt-2 w-full resize-none rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-semibold shadow-glass"
                placeholder="Add notes (allergens, packaging, etc.)"
              />
              {errors.description ? (
                <p className="mt-1 text-xs font-bold text-state-error">
                  {errors.description.message}
                </p>
              ) : null}
            </div>
            <div>
              <label className="text-sm font-extrabold text-text-dark">
                Food type
              </label>
              <select
                {...register('foodType')}
                className="mt-2 w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-semibold shadow-glass"
              >
                <option value="veg">Veg</option>
                <option value="non-veg">Non-veg</option>
                <option value="both">Both</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-extrabold text-text-dark">
                Expiry time
              </label>
              <input
                type="datetime-local"
                {...register('expiryTime')}
                className="mt-2 w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-semibold shadow-glass"
              />
              {errors.expiryTime ? (
                <p className="mt-1 text-xs font-bold text-state-error">
                  {errors.expiryTime.message}
                </p>
              ) : null}
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-extrabold text-text-dark">
                Images (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFiles(Array.from(e.target.files || []))}
                className="mt-2 block w-full text-sm"
              />
              {files.length ? (
                <p className="mt-2 text-xs font-semibold text-text-muted">
                  {files.length} image(s) selected
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="text-sm font-extrabold text-text-dark">
                Pickup address
              </label>
              <input
                {...register('pickupAddress')}
                className="mt-2 w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-semibold shadow-glass"
                placeholder="Pickup address"
              />
              {errors.pickupAddress ? (
                <p className="mt-1 text-xs font-bold text-state-error">
                  {errors.pickupAddress.message}
                </p>
              ) : null}
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-extrabold text-text-dark">
                Pickup pincode
              </label>
              <input
                {...register('pickupPincode')}
                className="mt-2 w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-semibold shadow-glass"
                placeholder="Pincode"
              />
              {errors.pickupPincode ? (
                <p className="mt-1 text-xs font-bold text-state-error">
                  {errors.pickupPincode.message}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-glass">
            <p className="font-heading text-xl font-extrabold text-text-dark">
              Review
            </p>
            <div className="mt-4 grid gap-2 text-sm font-semibold text-text-muted">
              <p>
                <span className="font-extrabold text-text-dark">Food:</span>{' '}
                {values.foodName}
              </p>
              <p>
                <span className="font-extrabold text-text-dark">Quantity:</span>{' '}
                {values.quantity}
              </p>
              <p>
                <span className="font-extrabold text-text-dark">Type:</span>{' '}
                {values.foodType}
              </p>
              <p>
                <span className="font-extrabold text-text-dark">Expiry:</span>{' '}
                {values.expiryTime}
              </p>
              <p>
                <span className="font-extrabold text-text-dark">Pickup:</span>{' '}
                {values.pickupAddress}
                {values.pickupPincode ? `, ${values.pickupPincode}` : ''}
              </p>
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={step === 1}
            className="rounded-2xl bg-white px-4 py-3 text-sm font-extrabold text-text-dark shadow-glass disabled:opacity-60"
          >
            Back
          </button>
          {step < 3 ? (
            <button
              type="button"
              onClick={next}
              className="rounded-2xl bg-text-dark px-4 py-3 text-sm font-extrabold text-white shadow-glass active:scale-[0.98]"
            >
              Next
            </button>
          ) : (
            <button
              disabled={isSubmitting}
              className="rounded-2xl bg-primary-green px-4 py-3 text-sm font-extrabold text-white shadow-glass active:scale-[0.98] disabled:opacity-60"
            >
              {isSubmitting ? 'Submitting…' : 'Submit donation'}
            </button>
          )}
        </div>
      </form>
    </DashboardLayout>
  )
}

