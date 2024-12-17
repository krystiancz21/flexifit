import { GroupClass } from '@/types/GroupClass'
import { useRouter } from 'next/navigation'

type GroupClassCardProps = {
  groupClass: GroupClass
  onDelete: (id: number) => void
}

export default function GroupClassCard({ groupClass, onDelete }: GroupClassCardProps) {
  const router = useRouter()

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {groupClass.name}
      </h3>
      <p className="text-gray-600 mb-4">{groupClass.description}</p>
      <div className="text-sm text-gray-500 space-y-2">
        <p>Data: {new Date(groupClass.activityDay).toLocaleString('pl-PL')}</p>
        <p>Dostępne miejsca: {groupClass.capacity}</p>
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          onClick={() => router.push(`/admin/group-classes/edit/${groupClass.id}`)}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Edytuj
        </button>
        <button
          onClick={() => onDelete(groupClass.id)}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Usuń
        </button>
      </div>
    </div>
  )
} 