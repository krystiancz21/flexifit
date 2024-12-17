import { formatDate } from '@/utils/dateUtils' // należy przenieść funkcję formatDate do utils

type GroupClassCardProps = {
  name: string
  description: string
  activityDay: string
  capacity: number
  onReservation: () => void
}

export default function GroupClassCard({ 
  name, 
  description, 
  activityDay, 
  capacity, 
  onReservation 
}: GroupClassCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">{name}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(activityDay)}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Dostępne miejsca: {capacity}</span>
          </div>
        </div>

        <button
          onClick={onReservation}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium py-2.5 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
        >
          Zarezerwuj miejsce
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
} 