import { formatShortDate } from '@/utils/dateUtils'

interface TicketDetails {
  id: number
  name: string
  description: string
  price: number
  status: string
}

interface UserTicket {
  purchaseDate: string
  expirationDate: string
  ticket: TicketDetails
}

type ActiveTicketsCardProps = {
  tickets: UserTicket[]
  onCancel: (id: number) => void
}

export default function ActiveTicketsCard({ tickets, onCancel }: ActiveTicketsCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Aktywne karnety</h3>
      {tickets.length === 0 ? (
        <p className="text-gray-600">
          Brak aktywnych karnetów
        </p>
      ) : (
        <div className="space-y-6">
          {tickets.map((ticketData) => (
            <div key={ticketData.ticket.id} className="border-t pt-4 first:border-t-0 first:pt-0">
              <h4 className="font-medium text-gray-900 text-lg">{ticketData.ticket.name}</h4>
              <p className="mt-2 text-gray-600">{ticketData.ticket.description}</p>
              <p className="mt-2 text-gray-500">
                Ważny do: {formatShortDate(ticketData.expirationDate)}
              </p>
              <button
                onClick={() => onCancel(ticketData.ticket.id)}
                className="mt-3 px-4 py-2 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 transition-colors"
              >
                Anuluj karnet
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 