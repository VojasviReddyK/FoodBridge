import { createContext, useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'
import { useAuth } from '../hooks/useAuth'

export const SocketContext = createContext(null)

export function SocketProvider({ children }) {
  const { user } = useAuth()
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    if (!user?._id) {
      setSocket(null)
      return
    }

    const s = io(import.meta.env.VITE_SOCKET_URL, {
      withCredentials: true,
      transports: ['websocket'],
      auth: {
        token: localStorage.getItem('fb_token'),
      },
    })

    s.on('connect', () => {
      s.emit('room:join', { userId: user._id })
    })

    setSocket(s)
    return () => {
      s.disconnect()
    }
  }, [user?._id])

  const value = useMemo(() => ({ socket }), [socket])
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

