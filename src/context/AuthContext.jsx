import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import api from '../api/axios'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const refreshMe = useCallback(async () => {
    const token = localStorage.getItem('fb_token')
    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }
    try {
      const { data } = await api.get('/auth/me')
      setUser(data.user)
    } catch {
      setUser(null)
      localStorage.removeItem('fb_token')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshMe()
  }, [refreshMe])

  const login = async (payload) => {
    try {
      const { data } = await api.post('/auth/login', payload)
      localStorage.setItem('fb_token', data.token)
      setUser(data.user)
      return data
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.[0]?.msg ||
        'Login failed'
      throw new Error(message)
    }
  }

  const register = async (payload) => {
    try {
      const { data } = await api.post('/auth/register', payload)
      return data
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.[0]?.msg ||
        'Registration failed'
      throw new Error(message)
    }
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      localStorage.removeItem('fb_token')
      setUser(null)
    }
  }

  const value = useMemo(
    () => ({ user, loading, login, register, logout, refreshMe }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

