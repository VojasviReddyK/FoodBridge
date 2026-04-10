import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import api from '../api/axios'
import AnimatedSection from '../components/AnimatedSection'
import { pageTransition } from '../utils/animations'

export default function Impact() {
  const [stats, setStats] = useState(null)
  const [charts, setCharts] = useState(null)

  useEffect(() => {
    let mounted = true
    api
      .get('/public/impact')
      .then(({ data }) => mounted && (setStats(data.stats), setCharts(data.charts)))
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [])

  const fallback = useMemo(
    () => ({
      stats: {
        mealsDonated: 12400,
        volunteers: 3200,
        ngos: 850,
        satisfaction: 98,
      },
      charts: {
        donationsPerMonth: [
          { month: 'Jan', value: 120 },
          { month: 'Feb', value: 180 },
          { month: 'Mar', value: 240 },
          { month: 'Apr', value: 310 },
        ],
        deliveriesByCity: [
          { city: 'Hyderabad', value: 210 },
          { city: 'Warangal', value: 88 },
          { city: 'Nizamabad', value: 54 },
        ],
        foodType: [
          { name: 'Veg', value: 62 },
          { name: 'Non-veg', value: 28 },
          { name: 'Both', value: 10 },
        ],
      },
    }),
    [],
  )

  const s = stats || fallback.stats
  const c = charts || fallback.charts

  return (
    <motion.main
      {...pageTransition}
      className="mx-auto max-w-6xl px-4 py-10"
    >
      <h1 className="font-heading text-4xl font-extrabold text-text-dark">
        Impact
      </h1>
      <p className="mt-3 max-w-3xl text-sm font-semibold text-text-muted">
        Real-time platform statistics and city-wise insights.
      </p>

      <AnimatedSection className="mt-10 grid gap-4 md:grid-cols-4">
        {[
          ['Meals donated', s.mealsDonated],
          ['Volunteers', s.volunteers],
          ['NGOs connected', s.ngos],
          ['Satisfaction rate', `${s.satisfaction}%`],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-glass backdrop-blur"
          >
            <p className="text-sm font-extrabold text-text-muted">{label}</p>
            <p className="mt-2 font-heading text-3xl font-extrabold text-text-dark">
              {value}
            </p>
          </div>
        ))}
      </AnimatedSection>

      <AnimatedSection className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="h-80 rounded-3xl border border-white/60 bg-white/70 p-4 shadow-glass backdrop-blur">
          <p className="px-2 pt-1 text-sm font-extrabold text-text-dark">
            Donations per month
          </p>
          <div className="mt-3 h-[calc(100%-40px)]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={c.donationsPerMonth}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#F97316"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="h-80 rounded-3xl border border-white/60 bg-white/70 p-4 shadow-glass backdrop-blur">
          <p className="px-2 pt-1 text-sm font-extrabold text-text-dark">
            Deliveries by city
          </p>
          <div className="mt-3 h-[calc(100%-40px)]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={c.deliveriesByCity}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="city" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#16A34A" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-10">
        <div className="h-80 rounded-3xl border border-white/60 bg-white/70 p-4 shadow-glass backdrop-blur">
          <p className="px-2 pt-1 text-sm font-extrabold text-text-dark">
            Food type distribution
          </p>
          <div className="mt-3 h-[calc(100%-40px)]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Pie
                  data={c.foodType}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  fill="#FBBF24"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </AnimatedSection>
    </motion.main>
  )
}

