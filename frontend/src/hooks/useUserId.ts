import { jwtDecode } from 'jwt-decode'
import { JwtPayload } from '@/types/auth'

export function useUserId(): string {
  try {
    const token = localStorage.getItem('authToken')
    if (!token) return ''
    
    const decoded = jwtDecode<JwtPayload>(token)
    return decoded.userId?.toString() || ''
  } catch {
    return ''
  }
} 