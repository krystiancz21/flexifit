import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'

interface User {
  id: number
  email: string
  role: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    
    if (!token) {
      router.push('/login')
      return
    }

    try {
      const decoded = jwtDecode(token) as { sub: string; role: string; id: number }
      setUser({
        id: decoded.id,
        email: decoded.sub,
        role: decoded.role
      })
    } catch (error) {
      console.error('Error decoding token:', error)
      localStorage.removeItem('authToken')
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }, [router])

  return { user, loading }
} 