'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import axios from '@/lib/axios'
import { Ticket } from '@/types/ticket'
import { PurchaseResponse } from '@/types/purchaseResponse'
import { useAuth } from '@/hooks/useAuth'
import { useUserId } from '@/hooks/useUserId'
import PageHeader from '@/components/PageHeader'
import TicketCard from '@/components/TicketCard'

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorPurchase, setErrorPurchase] = useState<string | null>(null)

  useAuth()
  const userId = useUserId()

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get<Ticket[]>('/api/v1/tickets')
      setTickets(data)
    } catch (err) {
      setError('Wystąpił błąd podczas pobierania karnetów')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = async (ticketId: number) => {
    try {
      const { data } = await axios.post<PurchaseResponse>(
        `/api/v1/tickets/${ticketId}/purchased-by/${userId}`
      )
      
      setSuccessMessage(`Zakupiono karnet ${data.name}!`)
      setTimeout(() => setSuccessMessage(''), 3000)
      setErrorPurchase(null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err.response?.data || 'Wystąpił błąd podczas zakupu karnetu'
      
      if (errorMessage.includes('User already have an active ticket')) {
        setErrorPurchase('Posiadasz już aktywny karnet tego rodzaju.')
      } else {
        setErrorPurchase(errorMessage)
      }
      
      console.error(err)
      setTimeout(() => setErrorPurchase(''), 3000)
      setSuccessMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <PageHeader
          title="Dostępne karnety"
          description="Wybierz i kup interesujący Cię bilet"
          adminLink="/admin/tickets"
        />

        <div className="px-4 py-6 sm:px-0">
          {loading && (
            <p className="text-lg text-gray-600">Ładowanie karnetów...</p>
          )}

          {error && (
            <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4 z-50">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              {successMessage}
            </div>
          )}

          {errorPurchase && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {errorPurchase}
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tickets.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-xl text-gray-600">
                    Aktualnie brak dostępnych karnetów
                  </p>
                </div>
              ) : (
                tickets.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onPurchase={handlePurchase}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 