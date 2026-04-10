import { motion, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ChevronDown, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const navLinkClass =
  'rounded-2xl px-3 py-2 text-sm font-semibold text-text-dark/90 hover:bg-white/60 hover:shadow-glass transition'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)

  useEffect(() => {
    return scrollY.on('change', (y) => setSolid(y > 28))
  }, [scrollY])

  const brand = (
    <Link
      to="/"
      className="font-brand text-xl tracking-wide text-text-dark hover:opacity-90"
    >
      FOODBRIDGE
    </Link>
  )

  const items = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/mission-vision', label: 'Mission & Vision' },
    { to: '/impact', label: 'Impact' },
    { to: '/contact', label: 'Contact' },
  ]

  const goDashboard = () => {
    if (!user?.role) return navigate('/login')
    navigate(`/${user.role}/dashboard`)
  }

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={[
        'sticky top-0 z-50 border-b border-white/30 backdrop-blur',
        solid ? 'bg-white/70 shadow-glass' : 'bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {brand}
          {user ? (
            <button
              onClick={goDashboard}
              className="hidden rounded-2xl bg-primary-orange/10 px-3 py-1 text-xs font-bold text-primary-orange md:inline"
            >
              {user.role?.toUpperCase()} DASHBOARD
            </button>
          ) : null}
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                [
                  navLinkClass,
                  isActive ? 'bg-white/70 shadow-glass' : '',
                ].join(' ')
              }
              end={it.to === '/'}
            >
              {it.label}
            </NavLink>
          ))}

          <div className="relative">
            <button
              onClick={() => setRegisterOpen((v) => !v)}
              className={[
                navLinkClass,
                'flex items-center gap-1 bg-white/40',
              ].join(' ')}
            >
              Register <ChevronDown size={16} />
            </button>
            {registerOpen ? (
              <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-3xl border border-white/50 bg-white/80 shadow-glass backdrop-blur">
                <Link
                  onClick={() => setRegisterOpen(false)}
                  to="/register/donor"
                  className="block px-4 py-3 text-sm font-semibold hover:bg-white/70"
                >
                  Donor
                </Link>
                <Link
                  onClick={() => setRegisterOpen(false)}
                  to="/register/acceptor"
                  className="block px-4 py-3 text-sm font-semibold hover:bg-white/70"
                >
                  Acceptor (NGO)
                </Link>
                <Link
                  onClick={() => setRegisterOpen(false)}
                  to="/register/volunteer"
                  className="block px-4 py-3 text-sm font-semibold hover:bg-white/70"
                >
                  Volunteer
                </Link>
              </div>
            ) : null}
          </div>

          {user ? (
            <button
              onClick={async () => {
                await logout()
                navigate('/')
              }}
              className="ml-2 inline-flex items-center gap-2 rounded-2xl bg-text-dark px-4 py-2 text-sm font-bold text-white hover:opacity-95 active:scale-[0.98]"
            >
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="ml-2 inline-flex items-center rounded-2xl bg-text-dark px-4 py-2 text-sm font-bold text-white hover:opacity-95 active:scale-[0.98]"
            >
              Login
            </Link>
          )}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-2xl bg-white/60 p-2 shadow-glass md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="md:hidden">
          <div className="mx-auto max-w-6xl space-y-2 px-4 pb-4">
            {items.map((it) => (
              <Link
                key={it.to}
                to={it.to}
                onClick={() => setOpen(false)}
                className="block rounded-2xl bg-white/60 px-4 py-3 text-sm font-semibold shadow-glass"
              >
                {it.label}
              </Link>
            ))}
            <div className="grid grid-cols-1 gap-2">
              <Link
                to="/register/donor"
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-white/60 px-4 py-3 text-sm font-semibold shadow-glass"
              >
                Register as Donor
              </Link>
              <Link
                to="/register/acceptor"
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-white/60 px-4 py-3 text-sm font-semibold shadow-glass"
              >
                Register as Acceptor
              </Link>
              <Link
                to="/register/volunteer"
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-white/60 px-4 py-3 text-sm font-semibold shadow-glass"
              >
                Register as Volunteer
              </Link>
              {user ? (
                <button
                  onClick={async () => {
                    await logout()
                    setOpen(false)
                    navigate('/')
                  }}
                  className="rounded-2xl bg-text-dark px-4 py-3 text-sm font-bold text-white"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-2xl bg-text-dark px-4 py-3 text-sm font-bold text-white"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </motion.header>
  )
}

