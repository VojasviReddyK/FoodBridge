import { motion } from 'framer-motion'
import { MapPin, Timer } from 'lucide-react'

export default function FoodCard({ donation, onRequest }) {
  const expiry = donation?.expiryTime ? new Date(donation.expiryTime) : null
  const minsLeft = expiry ? Math.max(0, Math.round((expiry - Date.now()) / 60000)) : null

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-glass backdrop-blur transition hover:shadow-lift"
    >
      <div className="aspect-[16/9] bg-gradient-to-br from-primary-orange/15 to-primary-green/15">
        {donation?.images?.[0] ? (
          <img
            src={donation.images[0]}
            alt={donation.foodName}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : null}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-heading text-lg font-extrabold text-text-dark">
              {donation.foodName}
            </p>
            <p className="text-sm text-text-muted">{donation.quantity}</p>
          </div>
          <span className="rounded-2xl bg-accent-yellow/25 px-3 py-1 text-xs font-extrabold text-text-dark">
            {donation.foodType?.toUpperCase?.() || 'FOOD'}
          </span>
        </div>

        <div className="mt-3 grid gap-2 text-sm text-text-muted">
          <div className="flex items-center gap-2">
            <MapPin size={16} /> {donation.city || 'Nearby'}
          </div>
          {minsLeft !== null ? (
            <div className="flex items-center gap-2">
              <Timer size={16} /> {minsLeft} min left
            </div>
          ) : null}
        </div>

        {onRequest ? (
          <button
            onClick={() => onRequest(donation)}
            className="mt-4 w-full rounded-2xl bg-primary-green px-4 py-3 text-sm font-extrabold text-white shadow-glass transition hover:brightness-105 active:scale-[0.98]"
          >
            Request Food
          </button>
        ) : null}
      </div>
    </motion.div>
  )
}

