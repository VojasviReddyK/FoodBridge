import { motion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import { pageTransition } from '../utils/animations'

export default function DashboardLayout({ title, links, children }) {
  return (
    <motion.main {...pageTransition} className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-4 md:grid-cols-[260px,1fr]">
        <aside className="overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-glass backdrop-blur">
          <div className="border-b border-white/60 p-5">
            <Link to="/" className="font-brand text-xl text-text-dark">
              FOODBRIDGE
            </Link>
            <p className="mt-2 font-heading text-lg font-extrabold text-text-dark">
              {title}
            </p>
          </div>
          <nav className="p-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-extrabold transition',
                    isActive
                      ? 'bg-primary-orange/15 text-primary-orange'
                      : 'text-text-dark hover:bg-white/70',
                  ].join(' ')
                }
              >
                {l.icon ? <l.icon size={18} /> : null}
                {l.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <section className="min-h-[520px] rounded-3xl border border-white/60 bg-white/70 p-6 shadow-glass backdrop-blur">
          {children}
        </section>
      </div>
    </motion.main>
  )
}

