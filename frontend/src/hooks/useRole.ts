import { jwtDecode } from 'jwt-decode'
import { JwtPayload } from '@/types/auth'

export function useRole(): string {
  try {
    const token = localStorage.getItem('authToken')
    if (!token) return 'USER'
    
    const decoded = jwtDecode<JwtPayload>(token)
    return decoded.role || 'USER'
  } catch {
    return 'USER'
  }
} 