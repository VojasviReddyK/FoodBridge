import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  HandHeart,
  HeartHandshake,
  Leaf,
  PackageCheck,
  Users,
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import FoodCard from '../components/FoodCard'
import api from '../api/axios'
import { pageTransition } from '../utils/animations'

const testimonials = [
  {
    name: 'Ayesha',
    role: 'Donor',
    text: 'Posting surplus food took 2 minutes. A volunteer picked it up the same evening.',
    stars: 5,
  },
  {
    name: 'Ravi',
    role: 'Volunteer',
    text: 'The OTP verification makes pickups feel safe and organized. Love the mission.',
    stars: 5,
  },
  {
    name: 'SNEHA Foundation',
    role: 'NGO',
    text: 'We served more meals with less uncertainty. The map view is a big help.',
    stars: 5,
  },
  {
    name: 'Meera',
    role: 'Donor',
    text: 'FoodBridge makes sure good food doesn’t end up in the bin. It’s empowering.',
    stars: 5,
  },
  {
    name: 'Arjun',
    role: 'Volunteer',
    text: 'Clear routes, instant updates, and real impact. This is what tech should do.',
    stars: 5,
  },
]

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-glass backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-orange/15 text-primary-orange">
          <Icon size={20} />
        </div>
        <div>
          <p className="font-heading text-2xl font-extrabold text-text-dark">
            {value}
          </p>
          <p className="text-sm font-semibold text-text-muted">{label}</p>
        </div>
      </div>
    </div>
  )
}

export default function Landing() {
  const heroWords = useMemo(
    () => 'Every Meal Saved is a Life Changed'.split(' '),
    [],
  )
  const [recent, setRecent] = useState([])

  useEffect(() => {
    let mounted = true
    api
      .get('/public/recent-donations')
      .then(({ data }) => mounted && setRecent(data.donations || []))
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [])

  const foodEmojis = ['🍱', '🥗', '🍞', '🍎', '🍛', '🥘', '🍌', '🥛']

  return (
    <motion.main
      {...pageTransition}
      className="mx-auto max-w-6xl px-4 py-8"
    >
      {/* SECTION 1 — HERO */}
      <section className="relative overflow-hidden rounded-[28px] bg-hero p-7 text-white shadow-lift md:p-12">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl md:text-4xl"
              style={{
                left: `${(i * 17) % 100}%`,
                top: `${(i * 29) % 100}%`,
              }}
              animate={{ y: [0, -12, 0], opacity: [0.7, 1, 0.7] }}
              transition={{
                duration: 3.8 + (i % 5),
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {foodEmojis[i % foodEmojis.length]}
            </motion.div>
          ))}
        </div>

        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
            <Leaf size={16} /> Connecting Communities, Combating Waste
          </p>

          <h1 className="mt-5 font-heading text-4xl font-extrabold leading-tight md:text-6xl">
            {heroWords.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="mr-3 inline-block"
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <p className="mt-4 max-w-2xl text-base text-white/90 md:text-lg">
            Bridging the gap between surplus food and hungry hearts — powered by
            donors, acceptors, and volunteers.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/register/donor"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-text-dark shadow-glass transition hover:-translate-y-0.5 hover:shadow-lift active:scale-[0.98]"
            >
              Donate Food →
            </Link>
            <Link
              to="/register/acceptor"
              className="inline-flex items-center justify-center rounded-2xl bg-black/20 px-5 py-3 text-sm font-extrabold text-white shadow-glass backdrop-blur transition hover:-translate-y-0.5 hover:bg-black/25 hover:shadow-lift active:scale-[0.98]"
            >
              Request Food →
            </Link>
          </div>

          <motion.div
            className="mt-12 flex justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="h-10 w-6 rounded-full border-2 border-white/60">
              <div className="mx-auto mt-2 h-2 w-2 rounded-full bg-white/80" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — LIVE IMPACT COUNTER */}
      <AnimatedSection className="mt-10 grid gap-4 md:grid-cols-4">
        <Stat icon={PackageCheck} value="12,400+" label="Meals Donated" />
        <Stat icon={Users} value="3,200+" label="Volunteers" />
        <Stat icon={HeartHandshake} value="850+" label="NGOs Connected" />
        <Stat icon={HandHeart} value="98%" label="Satisfaction Rate" />
      </AnimatedSection>

      {/* SECTION 3 — HOW IT WORKS */}
      <AnimatedSection className="mt-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-extrabold text-primary-orange">
              How it works
            </p>
            <h2 className="font-heading text-3xl font-extrabold text-text-dark">
              Simple, safe, and fast
            </h2>
          </div>
          <div className="hidden h-1 flex-1 rounded-full bg-gradient-to-r from-primary-orange/40 to-primary-green/40 md:block" />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              title: 'Post Your Surplus Food',
              text: 'Share food details, pickup location, and expiry time.',
              icon: PackageCheck,
            },
            {
              title: 'Volunteer Picks It Up',
              text: 'A volunteer is assigned, route is optimized, pickup verified via OTP.',
              icon: Users,
            },
            {
              title: 'Delivered to Those in Need',
              text: 'Delivery verified by OTP, everyone gets real-time updates.',
              icon: HandHeart,
            },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -18 : 18, y: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-glass backdrop-blur"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-green/15 text-primary-green">
                <s.icon size={20} />
              </div>
              <p className="mt-4 font-heading text-lg font-extrabold text-text-dark">
                {s.title}
              </p>
              <p className="mt-2 text-sm font-semibold text-text-muted">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* SECTION 4 — WHO CAN JOIN */}
      <AnimatedSection className="mt-12">
        <h2 className="font-heading text-3xl font-extrabold text-text-dark">
          Who can join?
        </h2>
        <p className="mt-2 text-sm font-semibold text-text-muted">
          Households and businesses donate. NGOs accept. Volunteers deliver.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              title: 'Donors',
              text: 'Households, hotels, restaurants, caterers.',
              to: '/register/donor',
              color: 'from-primary-orange/25 to-accent-yellow/20',
            },
            {
              title: 'Volunteers',
              text: 'Pick up and deliver with OTP verification.',
              to: '/register/volunteer',
              color: 'from-primary-green/25 to-accent-yellow/15',
            },
            {
              title: 'Acceptors',
              text: 'NGOs, orphanages, old age homes.',
              to: '/register/acceptor',
              color: 'from-accent-yellow/25 to-primary-orange/15',
            },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              whileHover={{ rotate: i === 1 ? 1 : -1, y: -4 }}
              className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-glass backdrop-blur"
            >
              <div
                className={[
                  'h-14 w-14 rounded-2xl bg-gradient-to-br',
                  c.color,
                ].join(' ')}
              />
              <p className="mt-4 font-heading text-xl font-extrabold text-text-dark">
                {c.title}
              </p>
              <p className="mt-2 text-sm font-semibold text-text-muted">
                {c.text}
              </p>
              <Link
                to={c.to}
                className="mt-4 inline-flex rounded-2xl bg-text-dark px-4 py-2 text-sm font-extrabold text-white transition hover:opacity-95 active:scale-[0.98]"
              >
                Join as {c.title}
              </Link>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* SECTION 5 — MISSION STRIP */}
      <section className="mt-12 overflow-hidden rounded-[28px] bg-primary-orange px-6 py-10 text-white shadow-lift">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center font-heading text-2xl font-extrabold md:text-3xl"
        >
          Together we can end food waste. One meal at a time.
        </motion.p>
      </section>

      {/* SECTION 6 — TESTIMONIALS */}
      <AnimatedSection className="mt-12">
        <h2 className="font-heading text-3xl font-extrabold text-text-dark">
          Voices from the community
        </h2>
        <div className="mt-6 overflow-hidden rounded-3xl border border-white/60 bg-white/60 shadow-glass backdrop-blur">
          <motion.div
            className="flex gap-4 p-4"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="min-w-[280px] rounded-3xl bg-white/70 p-5 shadow-glass"
              >
                <div className="flex items-center justify-between">
                  <p className="font-heading text-base font-extrabold text-text-dark">
                    {t.name}
                  </p>
                  <p className="text-xs font-bold text-text-muted">{t.role}</p>
                </div>
                <p className="mt-3 text-sm font-semibold text-text-muted">
                  “{t.text}”
                </p>
                <p className="mt-3 text-sm font-extrabold text-accent-yellow">
                  {'★'.repeat(t.stars)}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* SECTION 7 — RECENT DONATIONS */}
      <AnimatedSection className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-extrabold text-primary-green">
              Live feed
            </p>
            <h2 className="font-heading text-3xl font-extrabold text-text-dark">
              Recent donations
            </h2>
          </div>
          <Link
            to="/login"
            className="text-sm font-extrabold text-primary-orange hover:underline"
          >
            View All Available Food →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {recent.map((d) => (
            <FoodCard key={d._id} donation={d} />
          ))}
          {recent.length === 0 ? (
            <div className="md:col-span-4">
              <div className="h-28 rounded-3xl bg-white/60 shadow-glass backdrop-blur" />
            </div>
          ) : null}
        </div>
      </AnimatedSection>
    </motion.main>
  )
}

