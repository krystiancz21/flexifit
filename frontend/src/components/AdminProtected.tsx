'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useRole } from '@/hooks/useRole'

export default function AdminProtected({ children }: { children: React.ReactNode }) {
  const role = useRole()
  const router = useRouter()

  useEffect(() => {
    if (role !== 'ADMIN') {
      router.push('/dashboard')
    }
  }, [role, router])

  if (role !== 'ADMIN') {
    return null
  }

  return <>{children}</>
} 