'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import { GroupClass } from '@/types/GroupClass'
import axios from '@/lib/axios'
import { usePathname } from 'next/navigation'
import FormInput from '@/components/ui/FormInput'
import Button from '@/components/ui/Button'

export default function EditGroupClassPage() {
  const router = useRouter()
  const pathname = usePathname()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<GroupClass | null>(null)
  
  const classId = pathname.split('/').pop()

  useEffect(() => {
    const fetchClassDetails = async () => {
      if (!classId) return

      try {
        const { data } = await axios.get(`/api/v1/group-classes/${classId}`)
        setFormData({
          id: parseInt(classId),
          name: data.name,
          description: data.description,
          activityDay: data.activityDay.slice(0, 16),
          capacity: data.capacity
        })
      } catch (err) {
        setError('Nie udało się pobrać danych zajęć')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchClassDetails()
  }, [classId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      await axios.put(`/api/v1/group-classes/${classId}`, formData)
      router.push('/admin/group-classes')
    } catch (err) {
      setError('Nie udało się zaktualizować zajęć')
      console.error(err)
    }
  }

  if (loading || !formData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navigation />
        <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-600">Ładowanie danych...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Edytuj zajęcia grupowe
          </h1>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              id="name"
              type="text"
              label="Nazwa zajęć"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="np. Yoga dla początkujących"
              required
            />

            <FormInput
              id="description"
              type="textarea"
              label="Opis"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Szczegółowy opis zajęć..."
              rows={4}
              required
            />

            <FormInput
              id="activityDay"
              type="datetime-local"
              label="Data i godzina"
              value={formData.activityDay}
              onChange={(e) => setFormData({...formData, activityDay: e.target.value})}
              required
            />

            <FormInput
              id="capacity"
              type="number"
              label="Limit miejsc"
              value={formData.capacity}
              onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
              min="1"
              required
            />

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                onClick={() => router.push('/admin/group-classes')}
                className="border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Anuluj
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90"
              >
                Zapisz zmiany
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 