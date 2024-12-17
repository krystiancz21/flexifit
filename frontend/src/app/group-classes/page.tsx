'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import axiosInstance from '@/lib/axios'
import { useUserId } from '@/hooks/useUserId'
import { useAuth } from '@/hooks/useAuth'
import GroupClassCard from '@/components/GroupClassCard'
import PageHeader from '@/components/PageHeader'

interface GroupClass {
  id: number
  name: string
  description: string
  activityDay: string
  capacity: number
  userGroupClasses: Array<{ id: number }>
}

export default function GroupClassesPage() {
  const router = useRouter()
  const userId = useUserId()
  useAuth()

  const [isClient, setIsClient] = useState(false)
  const [loading, setLoading] = useState(true)
  const [classes, setClasses] = useState<GroupClass[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    setIsClient(true)
    const fetchClasses = async () => {
      try {
        const { data } = await axiosInstance.get('/api/v1/group-classes')
        setClasses(data)
      } catch (err) {
        setError('Nie udało się pobrać listy zajęć')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchClasses()
  }, [])

  const handleReservation = async (classId: number) => {
    if (!userId) {
      setError('Nie można zidentyfikować użytkownika')
      return
    }

    try {
      await axiosInstance.post(`/api/v1/group-classes/${classId}/purchased-by/${userId}`)
      router.push('/my-reservations')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.data === 'User is already enrolled in this class') {
        setError('Użytkownik już dokonał rezerwacji tych zajęć')
      } else {
        setError('Wystąpił błąd')
        console.error(err)
      }
    }
  }

  if (!isClient || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Ładowanie...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Zajęcia Grupowe"
          description="Wybierz i zarezerwuj interesujące Cię zajęcia"
          adminLink="/admin/group-classes"
        />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <GroupClassCard
              key={classItem.id}
              name={classItem.name}
              description={classItem.description}
              activityDay={classItem.activityDay}
              capacity={classItem.capacity}
              onReservation={() => handleReservation(classItem.id)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
