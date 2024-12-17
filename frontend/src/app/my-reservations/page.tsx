'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import axiosInstance from '@/lib/axios'
import Navigation from '@/components/Navigation'
import ReservationsHeader from '@/components/ReservationsHeader'
import ActiveClassesCard from '@/components/reservations/ActiveClassesCard'
import ActiveTicketsCard from '@/components/reservations/ActiveTicketsCard'
import { GroupClass } from '@/types/GroupClass'
import { Ticket } from '@/types/ticket'

interface ReservationsData {
  groupClasses: GroupClass[]
  tickets: Ticket[]
}

export default function MyReservations() {
  const { user, loading: authLoading } = useAuth()
  const [reservations, setReservations] = useState<ReservationsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchReservations = async () => {
      if (!user) return

      try {
        const { data } = await axiosInstance.get('/api/v1/profile/reservations')
        setReservations(data)
      } catch (err) {
        setError('Wystąpił błąd podczas ładowania rezerwacji')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (!authLoading) {
      fetchReservations()
    }
  }, [user, authLoading])

  const handleCancelClass = async (classId: number) => {
    try {
      await axiosInstance.delete(`/api/v1/profile/group-classes/${classId}/cancel`)
      const { data } = await axiosInstance.get('/api/v1/profile/reservations')
      setReservations(data)
    } catch (err) {
      setError('Nie udało się anulować rezerwacji zajęć')
      console.error(err)
    }
  }

  const handleCancelTicket = async (ticketId: number) => {
    try {
      await axiosInstance.delete(`/api/v1/profile/tickets/${ticketId}/cancel`)
      const { data } = await axiosInstance.get('/api/v1/profile/reservations')
      setReservations(data)
    } catch (err) {
      setError('Nie udało się anulować karnetu')
      console.error(err)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-600">Ładowanie...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <ReservationsHeader />

          {loading && (
            <div className="mt-6 text-lg text-gray-600">Ładowanie...</div>
          )}

          {error && (
            <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          {!loading && !error && reservations && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <ActiveClassesCard 
                classes={reservations.groupClasses}
                onCancel={handleCancelClass}
              />
              <ActiveTicketsCard 
                tickets={reservations.tickets}
                onCancel={handleCancelTicket}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}