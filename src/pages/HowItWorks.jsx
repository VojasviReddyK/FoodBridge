import { motion } from 'framer-motion'
import { pageTransition } from '../utils/animations'
import AnimatedSection from '../components/AnimatedSection'

function Flow({ title, steps }) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-glass backdrop-blur">
      <p className="font-heading text-xl font-extrabold text-text-dark">
        {title}
      </p>
      <ol className="mt-4 space-y-3">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-2xl bg-primary-orange/15 text-xs font-extrabold text-primary-orange">
              {i + 1}
            </span>
            <p className="text-sm font-semibold text-text-muted">{s}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <motion.main
      {...pageTransition}
      className="mx-auto max-w-6xl px-4 py-10"
    >
      <h1 className="font-heading text-4xl font-extrabold text-text-dark">
        How it works
      </h1>
      <p className="mt-3 max-w-3xl text-sm font-semibold text-text-muted">
        FoodBridge uses location + OTP verification to make surplus food
        redistribution trustworthy and fast.
      </p>

      <AnimatedSection className="mt-10 grid gap-4 md:grid-cols-3">
        <Flow
          title="Donor flow"
          steps={[
            'Register as Donor and verify your account.',
            'Post a donation with food details, photos, and pickup location.',
            'Share pickup OTP with volunteer, get notified on delivery.',
          ]}
        />
        <Flow
          title="Acceptor flow"
          steps={[
            'Register as Acceptor (NGO).',
            'Browse nearby available food and send a request.',
            'Receive delivery OTP and verify on delivery.',
          ]}
        />
        <Flow
          title="Volunteer flow"
          steps={[
            'Register as Volunteer and set your vehicle type.',
            'Get assigned pickups, follow route map.',
            'Verify pickup + delivery with OTPs; updates go live instantly.',
          ]}
        />
      </AnimatedSection>
    </motion.main>
  )
}

