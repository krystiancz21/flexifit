'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import { GroupClass } from '@/types/GroupClass'
import { useRouter } from 'next/navigation'
import AdminProtected from '@/components/AdminProtected'
import axiosInstance from '@/lib/axios'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import GroupClassCard from '@/components/admin/GroupClassCard'

export default function AdminGroupClassesPage() {
  const router = useRouter()
  const [classes, setClasses] = useState<GroupClass[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchClasses = async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await axiosInstance.get('/api/v1/group-classes')
      setClasses(data)
    } catch (err) {
      setError('Wystąpił błąd podczas pobierania zajęć')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Czy na pewno chcesz usunąć te zajęcia?')) return

    try {
      await axiosInstance.delete(`/api/v1/group-classes/${id}`)
      await fetchClasses()
    } catch (err) {
      setError('Nie udało się usunąć zajęć')
      console.error(err)
    }
  }

  useEffect(() => {
    fetchClasses()
  }, [])

  return (
    <AdminProtected>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navigation />
        
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <AdminPageHeader
            title="Panel Administratora - Zajęcia Grupowe"
            description="Zarządzaj zajęciami - dodawaj, edytuj i usuwaj dostępne opcje"
            buttonText="Dodaj nowe zajęcia"
            onButtonClick={() => router.push('/admin/group-classes/add')}
          />

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <p className="text-lg text-gray-600">Ładowanie zajęć...</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {classes.map((groupClass) => (
                <GroupClassCard 
                  key={groupClass.id}
                  groupClass={groupClass}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminProtected>
  )
} 