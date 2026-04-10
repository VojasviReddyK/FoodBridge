import { motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'
import { pageTransition } from '../utils/animations'

export default function About() {
  return (
    <motion.main
      {...pageTransition}
      className="mx-auto max-w-6xl px-4 py-10"
    >
      <h1 className="font-heading text-4xl font-extrabold text-text-dark">
        About FoodBridge
      </h1>
      <p className="mt-3 max-w-3xl text-sm font-semibold text-text-muted">
        FoodBridge was born from a simple truth: surplus food exists alongside
        hunger. We bring donors, NGOs, and volunteers together with a trusted
        OTP-based flow and real-time updates—so food reaches people, not bins.
      </p>

      <AnimatedSection className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          {
            title: 'Compassion',
            text: 'We design for dignity and safety at every handoff.',
          },
          {
            title: 'Community',
            text: 'Local action scales impact across neighborhoods and cities.',
          },
          {
            title: 'Consistency',
            text: 'Clear workflows, verification, and accountability.',
          },
        ].map((v) => (
          <div
            key={v.title}
            className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-glass backdrop-blur"
          >
            <p className="font-heading text-xl font-extrabold text-text-dark">
              {v.title}
            </p>
            <p className="mt-2 text-sm font-semibold text-text-muted">
              {v.text}
            </p>
          </div>
        ))}
      </AnimatedSection>

      <AnimatedSection className="mt-10">
        <h2 className="font-heading text-2xl font-extrabold text-text-dark">
          Milestones
        </h2>
        <div className="mt-4 grid gap-3">
          {[
            ['2025', 'Prototype tested with local NGOs'],
            ['2026', 'Real-time assignment + OTP verification launched'],
            ['Next', 'City-wise expansion with impact analytics'],
          ].map(([year, text]) => (
            <div
              key={year}
              className="flex items-center justify-between rounded-3xl border border-white/60 bg-white/70 p-5 shadow-glass backdrop-blur"
            >
              <p className="font-heading text-lg font-extrabold text-text-dark">
                {year}
              </p>
              <p className="text-sm font-semibold text-text-muted">{text}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </motion.main>
  )
}

