import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="h-32 rounded-3xl bg-white/60 shadow-glass backdrop-blur" />
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace state={{ from: location }} />
  return <Outlet />
}

