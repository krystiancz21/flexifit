import Link from 'next/link'

export default function ReservationsHeader() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Moje rezerwacje
      </h2>
      <p className="text-gray-600 mb-6">
        Przeglądaj swoje aktywne rezerwacje i karnety.
      </p>
      <div className="flex justify-end gap-4">
        <Link href="/group-classes">
          <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
            Zarezerwuj zajęcia
          </button>
        </Link>
        <Link href="/tickets">
          <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
            Kup karnet
          </button>
        </Link>
      </div>
    </div>
  )
} 