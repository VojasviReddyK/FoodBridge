import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function RoleRoute({ role }) {
  const { user, loading } = useAuth()
  if (loading) return <Outlet />
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== role) return <Navigate to="/" replace />
  return <Outlet />
}

