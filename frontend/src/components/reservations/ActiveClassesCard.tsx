import { GroupClass } from '@/types/GroupClass'
import { formatDate } from '@/utils/dateUtils'

type ActiveClassesCardProps = {
  classes: GroupClass[]
  onCancel: (id: number) => void
}

export default function ActiveClassesCard({ classes, onCancel }: ActiveClassesCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Aktywne zajęcia grupowe</h3>
      {classes.length === 0 ? (
        <p className="text-gray-600">
          Brak zarezerwowanych zajęć grupowych
        </p>
      ) : (
        <div className="space-y-6">
          {classes.map((groupClass) => (
            <div key={groupClass.id} className="border-t pt-4 first:border-t-0 first:pt-0">
              <h4 className="font-medium text-gray-900 text-lg">{groupClass.name}</h4>
              <p className="mt-2 text-gray-600">{groupClass.description}</p>
              <p className="mt-2 text-gray-500">
                {formatDate(groupClass.activityDay)}
              </p>
              <button
                onClick={() => onCancel(groupClass.id)}
                className="mt-3 px-4 py-2 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 transition-colors"
              >
                Anuluj rezerwację
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 