'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import { Ticket } from '@/types/ticket'
import axios from '@/lib/axios'
import { toast } from 'react-hot-toast'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import FormInput from '@/components/ui/FormInput'
import Button from '@/components/ui/Button'

export default function EditTicketPage() {
  const router = useRouter()
  const pathname = usePathname()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<Ticket | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  
  // Pobieramy ID z URL
  const ticketId = pathname.split('/').pop()

  useEffect(() => {
    const fetchTicketDetails = async () => {
      if (!ticketId) return

      try {
        const { data } = await axios.get(`/api/v1/tickets/${ticketId}`)
        setFormData({
          id: parseInt(ticketId),
          name: data.name,
          description: data.description,
          durationInDays: data.durationInDays,
          price: data.price,
          imageUrl: data.imageUrl,
          allowedEntries: data.allowedEntries,
          status: data.status
        })
      } catch (err) {
        setError(`Nie udało się pobrać danych karnetu ${err}`)
      } finally {
        setLoading(false)
      }
    }

    fetchTicketDetails()
  }, [ticketId])

  const handleImageUpload = async (file: File) => {
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await axios.post('/api/v1/tickets/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      return response.data.imageUrl
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('Błąd podczas wgrywania zdjęcia')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      if (!formData) return
      
      let imageUrl = formData.imageUrl
      if (selectedImage) {
        imageUrl = await handleImageUpload(selectedImage)
      }

      const ticketData = {
        name: formData.name,
        description: formData.description,
        durationInDays: formData.durationInDays,
        price: formData.price,
        allowedEntries: formData.allowedEntries,
        status: formData.status,
        imageUrl: imageUrl
      }

      await axios.put(`/api/v1/tickets/${ticketId}`, ticketData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      
      toast.success('Karnet został zaktualizowany')
      router.push('/admin/tickets')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error:', err)
      setError(`Nie udało się zaktualizować karnetu: ${err.message}`)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0])
    }
  }

  if (loading || !formData) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-600">Ładowanie danych...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Edytuj karnet
          </h1>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              id="name"
              type="text"
              label="Nazwa karnetu"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />

            <FormInput
              id="description"
              type="textarea"
              label="Opis"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              required
            />

            <FormInput
              id="durationInDays"
              type="number"
              label="Czas trwania (dni)"
              value={formData.durationInDays}
              onChange={(e) => setFormData({...formData, durationInDays: parseInt(e.target.value)})}
              min="1"
              required
            />

            <FormInput
              id="price"
              type="number"
              label="Cena"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
              min="0"
              step="0.01"
              required
            />

            {formData.imageUrl && (
              <div className="mb-4">
                <Image 
                  src={formData.imageUrl}
                  alt={formData.name}
                  width={200}
                  height={150}
                  className="rounded-lg shadow-sm object-cover"
                  style={{ maxWidth: '200px', height: '150px' }}
                  unoptimized
                />
              </div>
            )}

            <FormInput
              id="image"
              type="file"
              label="Zdjęcie karnetu"
              value=""
              onChange={handleImageChange}
              required={false}
            />

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                onClick={() => router.push('/admin/tickets')}
                className="border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Anuluj
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Zapisz zmiany
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 