import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ClipboardList, Map, User } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import FoodCard from '../../components/FoodCard'
import api from '../../api/axios'

export default function BrowseFood() {
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')
  const [type, setType] = useState('all')
  const [donations, setDonations] = useState([])

  useEffect(() => {
    // default to saved city/pincode if available
    setCity((localStorage.getItem('fb_city') || '').trim())
    setPincode((localStorage.getItem('fb_pincode') || '').trim())
  }, [])

  const load = async () => {
    const params = {}
    if (city) params.city = city
    if (pincode) params.pincode = pincode
    if (type !== 'all') params.type = type
    const { data } = await api.get('/acceptor/browse', { params })
    setDonations(data.donations || [])
  }

  useEffect(() => {
    load().catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, pincode, type])

  const requestFood = async (donation) => {
    await api.post(`/acceptor/request/${donation._id}`, { message: 'Requesting this donation' })
    toast.success('Request sent. OTP emailed to you once assigned.')
    load().catch(() => {})
  }

  return (
    <DashboardLayout
      title="Acceptor"
      links={[
        { to: '/acceptor/dashboard', label: 'Dashboard', icon: ClipboardList },
        { to: '/acceptor/browse', label: 'Browse Food', icon: Map },
        { to: '/acceptor/requests', label: 'My Requests', icon: ClipboardList },
        { to: '/acceptor/profile', label: 'Profile', icon: User },
      ]}
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="font-heading text-2xl font-extrabold text-text-dark">
            Browse food
          </p>
          <p className="mt-1 text-sm font-semibold text-text-muted">
            Filter by food type and your city/pincode.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            value={city}
            onChange={(e) => {
              const v = e.target.value
              setCity(v)
              localStorage.setItem('fb_city', v)
            }}
            className="w-40 rounded-2xl border border-white/60 bg-white/70 px-3 py-2 text-sm font-extrabold shadow-glass"
            placeholder="City"
          />
          <input
            value={pincode}
            onChange={(e) => {
              const v = e.target.value
              setPincode(v)
              localStorage.setItem('fb_pincode', v)
            }}
            className="w-36 rounded-2xl border border-white/60 bg-white/70 px-3 py-2 text-sm font-extrabold shadow-glass"
            placeholder="Pincode"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-2xl border border-white/60 bg-white/70 px-3 py-2 text-sm font-extrabold shadow-glass"
          >
            <option value="all">All types</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-veg</option>
            <option value="both">Both</option>
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {donations.map((d) => (
          <FoodCard key={d._id} donation={d} onRequest={requestFood} />
        ))}
        {donations.length === 0 ? (
          <div className="md:col-span-3 rounded-3xl border border-white/60 bg-white/70 p-6 text-sm font-semibold text-text-muted shadow-glass">
            No available donations matching your filters right now.
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  )
}

