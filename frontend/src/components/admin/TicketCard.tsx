import Image from 'next/image'
import { Ticket } from '@/types/ticket'
import { useRouter } from 'next/navigation'

type TicketCardProps = {
  ticket: Ticket
  onDelete: (id: number) => void
}

export default function TicketCard({ ticket, onDelete }: TicketCardProps) {
  const router = useRouter()

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 relative mt-16 border border-gray-100">
      <div className="absolute -top-10 right-4">
        {ticket.imageUrl ? (
          <Image 
            src={ticket.imageUrl}
            alt={ticket.name}
            width={120}
            height={120}
            className="rounded-xl object-cover border-4 border-white shadow-lg w-[120px] h-[120px]"
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        ) : (
          <div className="w-[120px] h-[120px] rounded-xl border-4 border-white shadow-lg bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-blue-400"
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
      <div className="pt-16">
        <h3 className="text-xl font-semibold text-gray-800 mb-1 truncate">
          {ticket.name}
        </h3>
        <p className="text-gray-600 mb-2 line-clamp-2">
          {ticket.description}
        </p>
        <div className="text-sm text-gray-500 space-y-1">
          <p className="truncate">Czas trwania: {ticket.durationInDays} dni</p>
          <p className="truncate">Cena: {ticket.price} zł</p>
          <p className="truncate">Status: {ticket.status}</p>
        </div>
        <div className="flex space-x-2 mt-4">
          <button
            onClick={() => router.push(`/admin/tickets/edit/${ticket.id}`)}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Edytuj
          </button>
          <button
            onClick={() => onDelete(ticket.id)}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Usuń
          </button>
        </div>
      </div>
    </div>
  )
} 