import Image from 'next/image'
import { Ticket } from '@/types/ticket'

type TicketCardProps = {
  ticket: Ticket
  onPurchase: (ticketId: number) => void
}

export default function TicketCard({ ticket, onPurchase }: TicketCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-200">
      <div className="h-48 relative">
        {ticket.imageUrl ? (
          <Image 
            src={ticket.imageUrl} 
            alt={ticket.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100">
            <svg 
              className="w-16 h-16" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{ticket.name}</h2>
        <p className="text-gray-600 mb-4">{ticket.description}</p>
        <div className="space-y-2 text-sm text-gray-500 mb-4">
          <p>Czas trwania: {ticket.durationInDays} dni</p>
          <p>Wejścia: {ticket.allowedEntries === 'unlimited' ? 'Bez limitu' : ticket.allowedEntries}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            {ticket.price.toFixed(2)} zł
          </span>
          <button
            onClick={() => onPurchase(ticket.id)}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2.5 rounded-lg 
                     hover:opacity-90 transition-opacity font-medium"
          >
            Kup teraz
          </button>
        </div>
      </div>
    </div>
  )
} 