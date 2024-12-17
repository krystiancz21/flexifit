'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import axios from '@/lib/axios'
import { toast } from 'react-hot-toast'
import FormInput from '@/components/ui/FormInput'
import Button from '@/components/ui/Button'

export default function AddTicketPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    durationInDays: 0,
    price: 0,
    allowedEntries: 'unlimited',
    status: 'ACTIVE'
  })

  const handleImageUpload = async (file: File) => {
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await axios.post('/api/v1/tickets/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
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
      const ticketData = {
        name: formData.name,
        description: formData.description,
        durationInDays: formData.durationInDays,
        price: formData.price,
        allowedEntries: formData.allowedEntries,
        status: formData.status,
      }

      if (selectedImage) {
        const imageUrl = await handleImageUpload(selectedImage)
        ticketData.imageUrl = imageUrl
      }

      await axios.post('/api/v1/tickets', ticketData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      
      toast.success('Karnet został dodany')
      router.push('/admin/tickets')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error:', err)
      setError(`Nie udało się dodać karnetu`)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]
        
        // Sprawdzenie rozmiaru pliku (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Plik jest za duży. Maksymalny rozmiar to 5MB')
            return
        }
        
        // Sprawdzenie typu pliku
        if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
            setError('Dozwolone są tylko pliki JPG i PNG')
            return
        }
        
        setSelectedImage(file)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Dodaj nowy karnet
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
              onChange={(e) => setFormData({
                ...formData,
                durationInDays: e.target.value === '' ? 0 : parseInt(e.target.value)
              })}
              min="0"
              required
            />

            <FormInput
              id="price"
              type="number"
              label="Cena"
              value={formData.price}
              onChange={(e) => setFormData({
                ...formData,
                price: e.target.value === '' ? 0 : parseFloat(e.target.value)
              })}
              min="0"
              step="0.01"
              required
            />

            <FormInput
              id="image"
              type="file"
              label="Zdjęcie karnetu"
              value=""
              onChange={handleImageChange}
              required={false}
            />

            <div className="flex justify-end space-x-3">
              <Button
                onClick={() => router.push('/admin/tickets')}
                className="bg-gray-500 hover:bg-gray-600"
              >
                Anuluj
              </Button>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                Dodaj karnet
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 