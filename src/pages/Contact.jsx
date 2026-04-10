import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import api from '../api/axios'
import { pageTransition } from '../utils/animations'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  message: z.string().min(10, 'Please add more details'),
})

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (values) => {
    await api.post('/public/contact', values)
    toast.success('Message sent. We will get back soon.')
    reset()
  }

  return (
    <motion.main
      {...pageTransition}
      className="mx-auto max-w-6xl px-4 py-10"
    >
      <h1 className="font-heading text-4xl font-extrabold text-text-dark">
        Contact
      </h1>
      <p className="mt-3 max-w-3xl text-sm font-semibold text-text-muted">
        Reach out for partnerships, onboarding NGOs, or volunteer drives.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-glass backdrop-blur">
          <p className="font-heading text-xl font-extrabold text-text-dark">
            Send us a message
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
            <div>
              <label className="text-sm font-extrabold text-text-dark">
                Name
              </label>
              <input
                {...register('name')}
                className="mt-2 w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-semibold shadow-glass"
                placeholder="Your name"
              />
              {errors.name ? (
                <p className="mt-1 text-xs font-bold text-state-error">
                  {errors.name.message}
                </p>
              ) : null}
            </div>
            <div>
              <label className="text-sm font-extrabold text-text-dark">
                Email
              </label>
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
                Message
              </label>
              <textarea
                {...register('message')}
                rows={5}
                className="mt-2 w-full resize-none rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-semibold shadow-glass"
                placeholder="Tell us how we can help…"
              />
              {errors.message ? (
                <p className="mt-1 text-xs font-bold text-state-error">
                  {errors.message.message}
                </p>
              ) : null}
            </div>
            <button
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-text-dark px-4 py-3 text-sm font-extrabold text-white shadow-glass transition hover:opacity-95 active:scale-[0.98] disabled:opacity-60"
            >
              {isSubmitting ? 'Sending…' : 'Send'}
            </button>
          </form>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-glass backdrop-blur">
          <iframe
            title="FoodBridge HQ - Hyderabad (OpenStreetMap)"
            className="h-[440px] w-full"
            loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=78.4300%2C17.3500%2C78.5500%2C17.4500&amp;layer=mapnik&amp;marker=17.3850%2C78.4867"
          />
        </div>
      </div>
    </motion.main>
  )
}

