import { motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'
import { pageTransition } from '../utils/animations'

export default function MissionVision() {
  return (
    <motion.main
      {...pageTransition}
      className="mx-auto max-w-6xl px-4 py-10"
    >
      <h1 className="font-heading text-4xl font-extrabold text-text-dark">
        Mission & Vision
      </h1>

      <AnimatedSection className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-white/60 bg-white/70 p-7 shadow-glass backdrop-blur">
          <p className="text-sm font-extrabold text-primary-orange">Mission</p>
          <p className="mt-2 font-heading text-2xl font-extrabold text-text-dark">
            Reduce food waste by making redistribution effortless and safe.
          </p>
          <p className="mt-3 text-sm font-semibold text-text-muted">
            We provide a verified workflow that connects donors to NGOs through
            volunteers, with real-time updates and OTP-based handoffs.
          </p>
        </div>

        <div className="rounded-3xl border border-white/60 bg-white/70 p-7 shadow-glass backdrop-blur">
          <p className="text-sm font-extrabold text-primary-green">Vision</p>
          <p className="mt-2 font-heading text-2xl font-extrabold text-text-dark">
            A world where no edible food is wasted while anyone is hungry.
          </p>
          <p className="mt-3 text-sm font-semibold text-text-muted">
            FoodBridge aligns with SDG #2 (Zero Hunger) by empowering local
            communities with a scalable platform.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-10">
        <h2 className="font-heading text-2xl font-extrabold text-text-dark">
          Our goals
        </h2>
        <div className="mt-5 grid gap-4">
          {[
            ['Trusted handoffs (OTP verification)', 90],
            ['Faster matching (nearby discovery + assignments)', 80],
            ['City-wise growth with analytics', 70],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-glass backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-extrabold text-text-dark">{label}</p>
                <p className="text-sm font-extrabold text-text-muted">
                  {value}%
                </p>
              </div>
              <div className="mt-3 h-3 rounded-full bg-primary-orange/15">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="h-3 rounded-full bg-gradient-to-r from-primary-orange to-primary-green"
                />
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </motion.main>
  )
}

