import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { pageTransition } from '../../utils/animations'

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <motion.main {...pageTransition} className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid overflow-hidden rounded-[28px] border border-white/60 bg-white/60 shadow-lift backdrop-blur md:grid-cols-2">
        <div className="relative overflow-hidden bg-hero p-8 text-white md:p-10">
          <Link to="/" className="font-brand text-2xl">
            FOODBRIDGE
          </Link>
          <p className="mt-10 font-heading text-3xl font-extrabold">
            {title}
          </p>
          <p className="mt-3 max-w-sm text-sm font-semibold text-white/90">
            {subtitle}
          </p>
          <div className="mt-10 grid gap-3 text-sm font-semibold text-white/90">
            <p>• Verified OTP-based pickups and deliveries</p>
            <p>• Real-time notifications and assignments</p>
            <p>• Map-based discovery and routing</p>
          </div>
        </div>
        <div className="p-6 md:p-10">{children}</div>
      </div>
    </motion.main>
  )
}

